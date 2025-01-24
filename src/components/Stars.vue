<template>
  <div id="stars-container">
    <svg id="star-info"></svg>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";
  import anime, { get } from "animejs";
  import { randFloat } from "three/src/math/MathUtils.js";
  import { stars } from "../models/Star";
  import { Vector2 } from "three";

  onMounted(() => {
    const container = document.getElementById("stars-container");
    const svgContainer = document.getElementById("star-info");
    const parent = container?.parentElement;
    const NUM_STARS = 300;
    const STAR_MIN = 0.5;
    const STAR_MAX = 3;

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
      const INFO_BOX_WIDTH = 100;
      const INFO_BOX_HEIGHT = 50;
      const LINE_ANIMATE_TIME = 300;
      const BOX_ANIMATE_TIME = 300;

      const getStarLocation = () => {
        const starSize = parseFloat(starElement.style.width);
        const x = parseFloat(starElement.style.left) + starSize / 2;
        const y = parseFloat(starElement.style.top) + starSize / 2;
        return new Vector2(x, y);
      }

      const generateInfoLocation = (startPoint: Vector2) => {
        const angle = Math.random() * 2 * Math.PI;
        const length = 80;
        const endPoint = new Vector2().copy(startPoint).add(new Vector2(Math.cos(angle), Math.sin(angle)).multiplyScalar(length));
        return { angle: angle, endPoint: endPoint}
      }
      
      const displayInfoLine = (startPoint: Vector2, endPoint: Vector2, color: string) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line.setAttribute("x1", startPoint.x.toString());
        line.setAttribute("y1", startPoint.y.toString());
        line.setAttribute("x2", startPoint.x.toString());
        line.setAttribute("y2", startPoint.y.toString());
        line.style.stroke = color;
        line.style.strokeWidth = "2px";

        svgContainer.appendChild(line);

        anime({
          targets: line,
          x2: endPoint.x,
          y2: endPoint.y,
          duration: LINE_ANIMATE_TIME,
          easing: "easeInOutSine"
        });
      }

      const displayInfoBox = (lineAngle: number, location: Vector2, color: string) => {
        const starsContainer = document.getElementById("stars-container");
        if (!starsContainer) {
          return;
        }
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        infoBox.style.outline = `2px solid ${color}`;
        infoBox.style.boxSizing = "border-box";
        infoBox.style.position = "absolute";
        infoBox.style.width = "0px";
        infoBox.style.height = "0px";
        infoBox.style.left = `${location.x}px`;
        infoBox.style.top = `${location.y}px`;
        infoBox.style.opacity = "0";

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

        starsContainer.appendChild(infoBox);

        setTimeout(() => {
          infoBox.style.opacity = "1";
        }, LINE_ANIMATE_TIME);

        anime({
          targets: infoBox,
          width: `${INFO_BOX_WIDTH}px`,
          height: `${INFO_BOX_HEIGHT}px`,
          left: endLeft,
          top: endTop,
          duration: BOX_ANIMATE_TIME,
          easing: "easeInOutSine",
          delay: LINE_ANIMATE_TIME
        });

        return infoBox;
      }

      const getStarObject = (starElement: HTMLElement) => {
        const starId = starElement.getAttribute('data-star-id');
        if (!starId) {
          return;
        }
        const star = stars[parseInt(starId)];
        return star;
      }

      const displayStarInfo = (boxElement: HTMLElement) => {
        
      }

      const startPoint = getStarLocation();
      const { angle, endPoint } = generateInfoLocation(startPoint);
      const star = getStarObject(starElement);
      if (!star) {
        return;
      }
      displayInfoLine(startPoint, endPoint, star.color);
      const infoBox = displayInfoBox(angle, endPoint, star.color); 
      if (!infoBox) {
        return;
      }
      displayStarInfo(infoBox);
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
</style>