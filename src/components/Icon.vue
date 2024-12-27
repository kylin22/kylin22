<template>
  <div id="icon-container">
    <TresCanvas shadows>
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls/>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshToonMaterial color="orange" />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script lang="ts" setup>
// import * from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<style lang="scss">
  #icon-container {
    height: 20%;
    width: 20%;
    z-index: 100;
    pointer-events: all;
  }
</style>