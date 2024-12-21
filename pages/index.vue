<template>
  <div class="move-cursor" id="app-container" @mousedown="audioManager.playSound('click');">
    <div id="draggable-world" class="vignette">
      <Stars/>
    </div>
    <TitleCard/>
  </div>
</template>

<script setup lang="ts">
  import TitleCard from "~/src/components/TitleCard.vue";
  import Stars from "~/src/components/Stars.vue";
  import { useDragScroll } from "~/src/composables/dragScroll";
  import AudioManager from "../src/utils/audioManager";
  const audioManager = new AudioManager()

  onMounted(() => {
    audioManager.addAudio("click", "/sfx/click.wav"); 
    const container = document.getElementById("draggable-world");
    if (container) {
      useDragScroll(container);
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
</script>

<style lang="scss">
  @import "~/src/assets/theme.scss";

  html, body, #__nuxt, #__layout, #app-container {
    cursor: url("~/src/assets/cursors/curs.png"), auto;
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
    background: radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%);
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
    width: 200%;
    height: 200%;
    z-index: 1;
  }

  #test {
    display: block;
    width: 400px;
    height: 400px;
    border: 2px white;
  }  
</style>