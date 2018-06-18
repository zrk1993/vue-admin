<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>

<style scoped>
.app-main {
  height: calc(100% - 70px);
  margin: 15px 15px 5px;
  overflow: hidden;
  background: #fff;
  overflow: auto;
}
</style>

