<template>
  <div id="title-container" ref="titleContainer">
    <slot></slot>
    <div id="subtitle" class="hidden">
      <p>Student and Programmer</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import anime from "animejs";

  const props = defineProps<{
    currentPage: string;
  }>();

  const titleContainer = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (titleContainer.value) {
      const svgElement = titleContainer.value.querySelector("g");
      const subtitle = titleContainer.value.querySelector("#subtitle");
      if (svgElement && subtitle) {
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
            loop: false,
            begin: () => {
              // start second animation slightly early to account for path completion
              setTimeout(() => {
                anime({
                  targets: path,
                  translateY: -25,
                  duration: 1000,
                  easing: "easeInOutQuad",
                  complete: () => {
                    subtitle.classList.remove('hidden');
                    subtitle.classList.add('visible');
                  }
                });
              }, 3000);
            }
          });
        });
      }
    }
  });
</script>

<style lang="scss" scoped>
  #title-container {
    margin-top: 45px;
  }
  
  #subtitle {
    position: relative;
    font-size: 0.5em;
    color: white;
    text-align: center;
    transition: opacity 1s, top 0.75s;

    &.hidden {
      opacity: 0;
      top: 0em;
    }

    &.visible {
      opacity: 1;
      top: -5em;
    }
  }
</style>