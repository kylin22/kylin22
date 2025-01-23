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

    if (!container || !parent) {
      return;
    }

    for (let i = 0; i < NUM_STARS; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * parent?.offsetWidth}px`;
      star.style.top = `${Math.random() * parent?.offsetHeight}px`;

      const size = randFloat(0.5, 3);
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      star.style.backgroundColor = stars[Math.floor(Math.random() * stars.length)].color;
      star.style.zIndex = "1";
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
    z-index: -1;
  }

  .star {
    position: absolute;
    border-radius: 50%;
  }
</style>