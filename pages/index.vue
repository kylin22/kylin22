<template>
  
  <div class="move-cursor vignette" id="app-container">
    <Navigator/>
    <div id="draggable-world">
      <Stars/>
    </div>
    <ScrollPrompt/>
  </div>
  
</template>

<script setup lang="ts">
  import Stars from "~/src/components/Stars.vue";
  import { useDragScroll } from "~/src/composables/dragScroll";
  import { useSquishyCursor } from "~/src/composables/squishyCursor";
  import AudioManager from "../src/utils/audioManager";
  import Navigator from "~/src/components/Navigator.vue";
  import ScrollPrompt from "~/src/components/ScrollPrompt.vue";
  const audioManager = new AudioManager()

  onMounted(() => {
    audioManager.addAudio("click", "/sfx/click.wav"); 
    const container = document.getElementById("draggable-world");
    if (container) {
      useDragScroll(container);
      useSquishyCursor(container);
    }

    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    }, false);
    document.addEventListener("touchstart", (event) => {
      event.preventDefault();
    }, { passive: false });
    document.addEventListener("touchmove", (event) => {
      event.preventDefault();
    }, { passive: false });
  });
  
  useHead({
    title: "☩ kylin ☩",
    meta: [
      { name: "description", content: "A personal website portfolio" }
    ]
  });

  //TODO text scramble transition for hover subtitle text
  //TODO move out animation for language text
</script>

<style lang="scss">
  @import "~/src/assets/theme.scss";
  
  html, body, #__nuxt, #__layout, #app-container {
    cursor: none;
    font-family: "Courier New", Courier, monospace;
    margin: 0px;
    background-color: $background-color;
    min-height: 100% !important;
    height: 100%;
    user-select: none;
    caret-color: transparent;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .vignette {
    z-index: 5;
    background: radial-gradient(circle, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .move-cursor {
    cursor: url("~/src/assets/cursors/move.png"), auto;
  }

  .selectable {
    cursor: url("~/src/assets/cursors/curstext.png"), auto;
  }

  #draggable-world {
    display: block;
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    z-index: 1;
    pointer-events: none;
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
    transition: width 0.2s, height 0.2s;
    &.expand {
      width: 10px;
      height: 10px;
    }
  }
</style>