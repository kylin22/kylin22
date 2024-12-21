<template>
  <div id="stars-container"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";
  import anime from "animejs";
  import { randFloat } from "three/src/math/MathUtils.js";

  onMounted(() => {
    const container = document.getElementById("stars-container");
    const parent = container?.parentElement;
    const NUM_STARS = 300;
    const starColors = [
      //stars
      "#9db4ff", "#a2b9ff", "#a7bcff", "#aabfff", "#afc3ff",
      "#baccff", "#c0d1ff", "#cad8ff", "#e4e8ff", "#edeeff",
      "#fbf8ff", "#fff9f9", "#fff5ec", "#fff4e8", "#fff1df",
      "#ffebd1", "#ffd7ae", "#ffc690", "#ffbe7f", "#ffbb7b",
      "#ffbb7b",
      //other bodies
      "#00ffec", "#ffe1c7", "#ffdeba", "#49d6ff"
    ];

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

      star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
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