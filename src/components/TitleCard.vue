<template>
  <div 
    id="title-container" 
    ref="titleContainer"
    @mouseover="mouseOver" 
    @mouseleave="mouseLeave"
  >
    <slot></slot>
    <div id="subtitle" class="hidden">
      <p>{{ subtitleText }}</p>
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

  const titleContainer = ref<HTMLDivElement | null>(null);
  const ghostTextVisible = ref(false);

  const hoverTextList = ["ADVOCATE FOR INTERACTIVITY", "PASSIONATE ECLECTIC", "MEDIOCRE PROGRAMMER"];
  const subtitleText = ref("STUDENT AND PROGRAMMER");
  const normalText = "STUDENT AND PROGRAMMER";
  let shufflingInterval: null | NodeJS.Timeout = null;
  let shufflingStop: null | NodeJS.Timeout = null;
  let currentHoverText = "";

  const mouseOver = () => {
    ghostTextVisible.value = true;
    if (!currentHoverText) {
      const randomHoverText = hoverTextList[Math.floor(Math.random() * hoverTextList.length)]
      shuffleText(randomHoverText);
      currentHoverText = randomHoverText;
    }
  };

  const mouseLeave = () => {
    currentHoverText = "";
    ghostTextVisible.value = false;
    shuffleText(normalText);
  };
  
  const shuffleText = (target: string) => {
    if (shufflingInterval) {
      clearInterval(shufflingInterval);
    }
    if (shufflingStop) {
      clearTimeout(shufflingStop);
    }

    const randomCharacter = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
      return chars.charAt(Math.floor(Math.random() * chars.length));
    };

    shufflingStop = setTimeout(() => {
      if (shufflingInterval) {
        clearInterval(shufflingInterval);
      }
      subtitleText.value = target;
    }, 2000);

    shufflingInterval = setInterval(() => {
      let shufflingText = subtitleText.value;
      if (shufflingText.length > target.length) {
        shufflingText = shufflingText.substring(0, target.length);
      }
      for (let i = 0; i < target.length; i++) {
        if (shufflingText[i] === target[i]) {
          continue;
        }
        if (target[i] === " ") {
          shufflingText = shufflingText.substring(0, i) + " " + shufflingText.substring(i + 1);
          continue;
        }
        shufflingText = shufflingText.substring(0, i) + randomCharacter() + shufflingText.substring(i + 1);
      }
      subtitleText.value = shufflingText;

      if (shufflingText === target && shufflingInterval) {
        clearInterval(shufflingInterval);
      }
    }, 15);
  };
  
  const generateTitlePathAnimation = (element: HTMLElement, path: SVGPathElement) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    
    const pushUpAnimation = anime({
      targets: path,
      translateY: -25,
      duration: 1000,
      easing: "easeInOutQuad",
      complete: () => {
        element.classList.remove('hidden');
        element.classList.add('visible');
      }
    });
    pushUpAnimation.pause();
    
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
          pushUpAnimation.play();
        }, 3000);
      }
    });
  }

  onMounted(() => {
    if (!titleContainer.value) {
      return;
    }
    const svgElement = titleContainer.value.querySelector("g");
    const subtitle = titleContainer.value.querySelector("#subtitle") as HTMLElement;
    if (!(svgElement && subtitle)) {
      return;
    }

    const paths = svgElement.querySelectorAll("path");
    paths.forEach(path => {
      generateTitlePathAnimation(subtitle, path);
    });
  });
</script>

<style lang="scss" scoped>
  #title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4em;
    z-index: 20;
    pointer-events: all;
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

  p {
    pointer-events: all;
  }

  .ghost-text {
    width: 5em;
    color: transparent;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.1);
    z-index: 0;
  }
</style>