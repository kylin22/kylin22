<template>
  <div id="stars-container">
    <svg id="star-info"></svg>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";
  import anime from "animejs";
  import { randFloat } from "three/src/math/MathUtils.js";
  import { Star, stars } from "../models/Star";
  import { Vector2 } from "three";

  onMounted(() => {
    const container = document.getElementById("stars-container");
    const svgContainer = document.getElementById("star-info");
    const parent = container?.parentElement;
    const NUM_STARS = 300;
    const STAR_MIN = 0.5;
    const STAR_MAX = 3;

    interface InfoAnimation {
      element: SVGLineElement | HTMLElement;
      animation: anime.AnimeInstance;
      star: HTMLElement;
    }
    const infoAnimations: InfoAnimation[] = [];

    if (!container || !parent || !svgContainer) {
      return;
    }

    for (let i = 0; i < NUM_STARS; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * parent?.offsetWidth}px`;
      star.style.top = `${Math.random() * parent?.offsetHeight}px`;

      const size = randFloat(STAR_MIN, STAR_MAX);
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const starID = Math.floor(Math.random() * stars.length);
      star.style.backgroundColor = stars[starID].color;
      star.style.zIndex = "1";
      star.setAttribute('data-star-id', starID.toString());
      container.appendChild(star);

      anime({
        targets: star,
        opacity: [0, 1],
        duration: Math.random() * 1000 + 1000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true
      });
    }

    const displayStarInfo = (starElement: HTMLElement) => {
      const INFO_BOX_WIDTH = 190;
      const INFO_BOX_HEIGHT = 75;
      const LINE_LENGTH = 100;
      const LINE_ANIMATE_TIME = 300;
      const BOX_ANIMATE_TIME = 300;
      const MAX_DIGITS = 5;

      const getStarLocation = () => {
        const starSize = parseFloat(starElement.style.width);
        const x = parseFloat(starElement.style.left) + starSize / 2;
        const y = parseFloat(starElement.style.top) + starSize / 2;
        return new Vector2(x, y);
      }

      const generateInfoLocation = (startPoint: Vector2) => {
        const angle = Math.random() * 2 * Math.PI;
        const endPoint = new Vector2().copy(startPoint).add(new Vector2(Math.cos(angle), Math.sin(angle)).multiplyScalar(LINE_LENGTH));
        return { angle: angle, endPoint: endPoint}
      }

      const lineAnimation = (line: SVGLineElement, endPoint: Vector2) => anime({
        targets: line,
        x2: endPoint.x,
        y2: endPoint.y,
        endDelay: BOX_ANIMATE_TIME,
        duration: LINE_ANIMATE_TIME,
        easing: "easeInOutSine",
        autoplay: false,
      });

      
      const displayInfoText = (boxElement: HTMLElement, star: Star) => {
        let temperature = star.temperature.toString().length > 5 ? star.temperature.toExponential(1) : star.temperature;
        let luminosity = star.luminosity.toString().length > 5 ? star.luminosity.toExponential(1) : star.luminosity;
        boxElement.innerHTML += `
          <h3>${star.type}</h3>
          <p>Class: ${star.starClass}</p>
          <p>Temperature: ${temperature} K</p>
          <p>Luminosity: ${luminosity} L<sub>☉</sub></p>
        `;
      }

      const infoBoxAnimation = (boxElement: HTMLElement, endLeft: number, endTop: number, star: Star) => anime({
        targets: boxElement,
        width: `${INFO_BOX_WIDTH}px`,
        height: `${INFO_BOX_HEIGHT}px`,
        left: endLeft,
        top: endTop,
        duration: BOX_ANIMATE_TIME,
        easing: "easeInOutSine",
        delay: LINE_ANIMATE_TIME,
        autoplay: false,
        complete: () => {
          displayInfoText(boxElement, star);
        }
      });
      
      const generateInfoLine = (startPoint: Vector2, color: string) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line.setAttribute("x1", startPoint.x.toString());
        line.setAttribute("y1", startPoint.y.toString());
        line.setAttribute("x2", startPoint.x.toString());
        line.setAttribute("y2", startPoint.y.toString());
        line.classList.add("info-line");
        line.style.stroke = color;

        svgContainer.appendChild(line);

        return line;
      }

      const generateInfoBox = (lineAngle: number, location: Vector2, color: string) => {
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        infoBox.style.outline = `2px solid ${color}`;
        infoBox.style.color = color;
        infoBox.style.left = `${location.x}px`;
        infoBox.style.top = `${location.y}px`;

        let endLeft = location.x;
        let endTop = location.y;

        if (lineAngle >= 0 && lineAngle < Math.PI / 2) {
          // First quadrant
        } else if (lineAngle >= Math.PI / 2 && lineAngle < Math.PI) {
          // Second quadrant
          endLeft -= INFO_BOX_WIDTH;
        } else if (lineAngle >= Math.PI && lineAngle < (3 * Math.PI) / 2) {
          // Third quadrant
          endTop -= INFO_BOX_HEIGHT;
          endLeft -= INFO_BOX_WIDTH;
        } else if (lineAngle >= (3 * Math.PI) / 2 && lineAngle < 2 * Math.PI) {
          // Fourth quadrant
          endTop -= INFO_BOX_HEIGHT;
        }

        container!.appendChild(infoBox);

        setTimeout(() => {
          infoBox.style.opacity = "1";
        }, LINE_ANIMATE_TIME);

        return { infoBox, endLeft, endTop };
      }

      const getStarObject = (starElement: HTMLElement) => {
        const starId = starElement.getAttribute('data-star-id');
        if (!starId) {
          return;
        }
        const star = stars[parseInt(starId)];
        return star;
      }

      const removeOldInfo = () => {
        const removeInfoElement = (infoAnimation: InfoAnimation) => {
          infoAnimation.element.parentNode!.removeChild(infoAnimation.element);
          infoAnimations.splice(infoAnimations.indexOf(infoAnimation), 1);
        }
        infoAnimations.forEach((infoAnimation) => {
          if (!infoAnimation.animation.completed) {
            return;
          }
          infoAnimation.animation.delay = 0;
          infoAnimation.animation.reverse();
          infoAnimation.animation.play();
          if (infoAnimation.element instanceof HTMLElement) {
            infoAnimation.element.innerHTML = "";
            setTimeout(() => {
              removeInfoElement(infoAnimation);
            }, BOX_ANIMATE_TIME);
          } else {
            infoAnimation.animation.finished.then(() => {
              removeInfoElement(infoAnimation);
            });
          }
        });
      }

      if (infoAnimations.some((infoAnimation) => infoAnimation.star === starElement)) {
        return;
      }

      removeOldInfo();

      const startPoint = getStarLocation();
      const { angle, endPoint } = generateInfoLocation(startPoint);
      const star = getStarObject(starElement);
      if (!star) {
        return;
      }
      const infoLine = generateInfoLine(startPoint, star.color);
      const { infoBox, endLeft, endTop } = generateInfoBox(angle, endPoint, star.color); 
      if (!infoBox) {
        return;
      }

      const expandLine = lineAnimation(infoLine, endPoint);
      const expandBox = infoBoxAnimation(infoBox, endLeft, endTop, star);
      expandLine.play();
      expandBox.play();
      infoAnimations.push({ element: infoLine, animation: expandLine, star: starElement });
      infoAnimations.push({ element: infoBox, animation: expandBox, star: starElement });
    };

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('star')) {
        displayStarInfo(target);
      }
    });
  });
</script>

<style lang="scss">
  #stars-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: all;
  }

  #star-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .star {
    position: absolute;
    border-radius: 50%;
  }

  .star::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    z-index: -1;
    background: transparent;
  }

  .info-line {
    stroke-width: 2px;
  }

  .info-box {
    box-sizing: border-box;
    padding: 3px;
    position: absolute;
    width: 0px;
    height: 0px;
    opacity: 0;
    font-size: smaller;

    & h3, & p {
      opacity: 1;
      transition: opacity 0.3s;
      margin: 1px;
    }
  }
</style>