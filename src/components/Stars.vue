<template>
  <div id="stars-container"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";
  import anime from "animejs";
  import { randFloat } from "three/src/math/MathUtils.js";
  import { stars } from "../models/Star";

  onMounted(() => {
    const container = document.getElementById("stars-container");
    const parent = container?.parentElement;
    const NUM_STARS = 300;
    const STAR_MIN = 0.5;
    const STAR_MAX = 3;

    if (!container || !parent) {
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

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      console.log('Click event!', target);
      if (target && target.classList.contains('star')) {
        const starId = target.getAttribute('data-star-id');
        console.log('Star clicked!', starId, target);
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
  }

  .star {
    position: absolute;
    border-radius: 50%;
  }

  .star::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    z-index: -1;
    background: transparent;
  }
</style>