<template>
  <div 
    id="title-container" 
    ref="titleContainer"
    @mouseover="ghostTextVisible = true" 
    @mouseleave="ghostTextVisible = false"
  >
    <slot></slot>
    <div id="subtitle" class="hidden">
      <p v-if="!ghostTextVisible">Student and Programmer</p>
      <p v-else>Advocate for Interactivity</p>
    </div>
  </div>
  <div id="background-text" :class="{ hidden: !ghostTextVisible }">
    <div id="chinese" class="ghost-text">
      // 麒 麟 //
    </div>
    <div id="japanese" class="ghost-text">
      // きりん //
    </div>
  </div>
</template>

<script lang="ts" setup>
  import anime from "animejs";
  import Icon from "./Icon.vue";

  const props = defineProps<{
    currentPage: string;
  }>();

  const titleContainer = ref<HTMLDivElement | null>(null);
  const ghostTextVisible = ref(false);

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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4em;
    z-index: 20;
  }
  
  #subtitle {
    position: relative;
    color: white;
    width: 20em;
    text-align: center;
    transition: opacity 1s, top 0.75s;

    &.hidden {
      opacity: 0;
      top: 0em;
    }

    &.visible {
      opacity: 1;
      top: -4em;
    }
  }

  #background-text {
    position: absolute;
    height: 8em;
    font-family: noto-sans-cjk-jp, sans-serif;
    font-size: 2.6em;
    font-weight: bold;
    color: white;
    text-align: center;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: opacity 1s;

    &.hidden {
      opacity: 0;
    }
  }

  .ghost-text {
    width: 5em;
    color: transparent;
    text-shadow: 0 0 4px rgba(212, 191, 219, 0.5);
    z-index: 0;
  }
</style>