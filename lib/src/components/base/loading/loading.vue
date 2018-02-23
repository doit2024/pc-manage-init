<template>
  <div class="loading">
    <div class="loading-box">
      <img src="./svgs/puff.svg">
      <!-- <img src="./loaders/audio.svg"> -->
      <!-- <img src="./loaders/ball-triangle.svg"> -->
      <!-- <img src="./loaders/bars.svg"> -->
      <!-- <img src="./loaders/circles.svg"> -->
      <!-- <img src="./loaders/grid.svg"> -->
      <!-- <img src="./loaders/oval.svg"> -->
      <!-- <img src="./loaders/rings.svg"> -->
      <!-- <img src="./loaders/tail-spin.svg"> -->
    </div>
  </div>
</template>

<style lang=scss>
  $size: 80px;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    &-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $size;
      height: $size;
    }
  }

</style>
