<template>
  <div id="icon-container">
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
</template>

<script setup lang="ts">
  import { BackSide } from "three";
  import { OrbitControls } from "@tresjs/cientos";
  import { TresCanvas } from "@tresjs/core";
  onMounted(() => {
    const iconContainer = document.getElementById("icon-container");
    if (iconContainer) {
      iconContainer.style.animation = "visible 1.5s forwards";
    }
  });
</script>

<style lang="scss">
  #icon-container {
    height: 10em;
    width: 10em;
    z-index: 100;
    pointer-events: all;
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
</style>