<template>
  <div ref="titleContainer">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import anime from "animejs";
  const titleContainer = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (titleContainer.value) {
      const svgElement = titleContainer.value.querySelector("g");
      if (svgElement) {
        const paths = svgElement.querySelectorAll("path");
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
          anime({
            targets: path,
            strokeDashoffset: [length, 0],
            duration: 5000,
            easing: "easeInOutQuad",
            delay: 1000,
            direction: "alternate",
            loop: false
          });
        });
      }
    }
  });
</script>

<style lang="scss" scoped>

</style>