<template>
  <div id="icon-container" data-scroll-sticky>
    <div id="icon">
      <TresCanvas>
        <TresPerspectiveCamera
          :position="[3, 3, 3]"
          :look-at="[0, 0, 0]"
        />
        <OrbitControls :enable-zoom="false" :enable-pan="false"/>
        <TresMesh>
          <TresIcosahedronGeometry :args="[1.8, 0]"/>
          <TresMeshMatcapMaterial :color="0xac3232"/>
        </TresMesh>
        <TresMesh>
          <TresIcosahedronGeometry :args="[2, 0]"/>
          <TresMeshNormalMaterial :side="BackSide"/>
        </TresMesh>
      </TresCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BackSide } from "three";
  import { OrbitControls } from "@tresjs/cientos";
  import { TresCanvas } from "@tresjs/core";
  import anime from "animejs";
  import { scroll } from "~/plugins/locomotive";
  let iconCollapsed = false;
  const CORNER_MARGIN = 20;

  onMounted(async () => {
    await nextTick();

    const iconContainer = document.getElementById("icon-container");
    if (iconContainer) {
      iconContainer.style.animation = "visible 1.5s forwards";
    }

    if (scroll) {
      scroll.on('scroll', (args) => {
        if (args.scroll.y > 20 && !iconCollapsed) {
          trigger();
        } else if (args.scroll.y < 20 && iconCollapsed) {
          trigger();
        }
      });
    }
  });
  
  const trigger = () => {
    const iconContainer = document.getElementById("icon-container");
    const icon = document.getElementById("icon");
    if (iconContainer && icon) {
      const rect = iconContainer.getBoundingClientRect();
      iconCollapsed = !iconCollapsed;
      anime({
        targets: iconContainer,
        top: iconCollapsed ? -(rect.top + CORNER_MARGIN) : 0,
        left: iconCollapsed ? -(rect.left + CORNER_MARGIN) : 0,
        duration: 500,
        easing: "easeInOutSine",
      });
      anime({
        targets: icon,
        scale: iconCollapsed ? 0.5 : 1,
        duration: 600,
        easing: "easeInOutSine",
      });
    }
  };
</script>

<style lang="scss">
  #icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 10em;
    width: 10em;
    z-index: 100;
    opacity: 0;
  }

  @keyframes visible {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  #icon {
    position: absolute;
    width: 100%;
    height: 100%;
    
  }
</style>