<template>
  <div class="list">
    <div class="phantom"></div>
    <div>
      qqqqqqqq
    </div>
  </div>
</template>

<style scoped>
.list {
  height: 400px;
  border: 1px solid #222;
  overflow: auto;
  position: relative;
}
.phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
  height: 1000px;
}
</style>
