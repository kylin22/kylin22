<template>
  <div id="app" v-locomotive="{
      direction: 'vertical',
      smartphone: {
        smooth: true,
        direction: 'vertical',
      },
      tablet: {
        smooth: true,
        direction: 'vertical',
      },
    }">
    <div class="move-cursor vignette" id="intro-container" data-scroll-section>
      <Navigator/>
      <div id="draggable-world">
        <Stars/>
      </div>
      <ScrollPrompt/>
    </div>
    <div id="skills" data-scroll-section>
      <h1 data-scroll data-scroll-speed >Jumpscare</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Stars from "~/src/components/Stars.vue";
  import { useDragScroll } from "~/src/composables/dragScroll";
  import { useSquishyCursor } from "~/src/composables/squishyCursor";
  import Navigator from "~/src/components/Navigator.vue";
  import ScrollPrompt from "~/src/components/ScrollPrompt.vue";

  onMounted(() => {
    const container = document.getElementById("draggable-world");

    if (!container) {
      return;
    }

    useDragScroll(container);
    const { expanded } = useSquishyCursor(container);

    document.addEventListener("touchstart", (event) => {
      event.preventDefault();
    }, { passive: false });
    document.addEventListener("touchmove", (event) => {
      event.preventDefault();
    }, { passive: false });

    const addExpansionListeners = (element: Element) => {
      element.addEventListener("mouseenter", () => {
      expanded.value = true;
      });
      element.addEventListener("mouseleave", () => {
        expanded.value = false;
      });
    }

    const scrollbarThumb = document.querySelector(".c-scrollbar_thumb");
    if (!scrollbarThumb) return;
    addExpansionListeners(scrollbarThumb);

    const scrollPrompt = document.getElementById("scroll-prompt");
    if (!scrollPrompt) return;
    addExpansionListeners(scrollPrompt);
  });
  
  useHead({
    title: "☩ kylin ☩",
    meta: [
      { name: "description", content: "A personal website portfolio" }
    ]
  });
</script>

<style lang="scss">
  @import "~/src/assets/theme.scss";
  
  html, body, #__nuxt, #__layout {
    cursor: none;
    font-family: "Courier New", Courier, monospace;
    margin: 0px;
    background-color: $background-color;
    min-height: 100% !important;
    height: 100%;
    user-select: none;
    caret-color: transparent;
  }

  .vignette {
    z-index: 5;
    background: radial-gradient(circle, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #app {
    display: flex;
    width: 100%;
    height: 200vh;
    flex-direction: column;
  }

  #skills {
    position: relative;
    font-family: monospace;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    background-color: $primary-color;
    color: $background-color;

    & h1 {
      position: absolute;
      width: 100%;
      margin: 0px;
      font-size: 10em;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .c-scrollbar {
    z-index: 999;
  }

  .c-scrollbar_thumb {
    cursor: none;
    background-color: #ffffff4f;

    &:active {
      cursor: none;
    }
  }

  #intro-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  #draggable-world {
    display: block;
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    z-index: 1;
  }

  #cursor {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #c3a8e6;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    transition: scale 0.2s, width 0.2s, height 0.2s;
  }
</style>