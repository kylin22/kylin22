<template>
  <div id="icon-container">
    <TresCanvas>
      <Suspense>
        <TresPerspectiveCamera
          :position="[3, 3, 3]"
          :look-at="[0, 0, 0]"
        />
      </Suspense>
      <Suspense>
        <OrbitControls/>
      </Suspense>
      <Suspense>
        <TresMesh>
          <TresIcosahedronGeometry :args="[1.8, 0]"/>
          <TresMeshMatcapMaterial :color="0xac3232"/>
        </TresMesh>
      </Suspense>
      <Suspense>
        <TresMesh>
          <TresIcosahedronGeometry :args="[2, 0]"/>
          <TresMeshNormalMaterial :side="BackSide"/>
        </TresMesh>
      </Suspense>
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
  import { BackSide } from "three";
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