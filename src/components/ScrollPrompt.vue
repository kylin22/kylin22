<template>
  <div id="scroll-prompt" ref="scrollPrompt" @click="scrollDown">
    Scroll down to continue
  </div>
</template>

<script lang="ts" setup>
  import { scroll } from "~/plugins/locomotive";

  const PROMPT_TIME = 8000;
  const currentPage = ref("stars");
  const scrollPrompt = useTemplateRef("scrollPrompt");

  const scrollDown = () => {
    if (!scrollPrompt.value) return;
    console.log("scrolling");
    const nextSection = document.getElementById("skills");
    if (!nextSection) return;
    scroll.scrollTo(nextSection);
  };

  onMounted(() => {
    setTimeout(() => {
      if (currentPage.value !== "stars") return;
      const clickPrompt = document.getElementById("scroll-prompt");
      if (!clickPrompt) return;
      clickPrompt.style.opacity = "0.4";
      if (!scrollPrompt.value) return;
      scrollPrompt.value.style.pointerEvents = "all";
    }, PROMPT_TIME);
  });
</script>

<style>

  #scroll-prompt {
    pointer-events: none;
    z-index: 100;
    position: absolute;
    bottom: 1em;
    font-size: 0.8em;
    color: white;
    opacity: 0;
    border-radius: 10px;
    border: 2px solid;
    padding: 5px;
    box-shadow: 0 0 5px 2px;
    transition: opacity 2s;
    left: 50%;
    transform: translateX(-50%);
  }
</style>