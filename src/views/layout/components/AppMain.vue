<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>

<style scoped>
.app-main {
  height: 100%;
  margin: 10px;
  overflow: hidden;
  background: #fff;
  overflow: auto;
}
</style>

