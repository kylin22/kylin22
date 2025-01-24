<template>
  <div id="scroll-prompt">
    Scroll down to continue
  </div>
</template>

<script lang="ts" setup>
  const PROMPT_TIME = 8000;
  const currentPage = ref<string>("stars");

  onMounted(() => {
    setTimeout(() => {
      if (currentPage.value === "stars") {
        const clickPrompt = document.getElementById("scroll-prompt");
        if (clickPrompt) {
          clickPrompt.style.opacity = "0.4";
        }
      }
    }, PROMPT_TIME);
  });
</script>

<style>

  #scroll-prompt {
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