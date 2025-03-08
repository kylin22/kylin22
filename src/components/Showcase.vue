<template>
  <div id="showcase" data-scroll-section>
    <h1>Skills</h1>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  @import "~/src/assets/theme.scss";

  #showcase {
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
</style>