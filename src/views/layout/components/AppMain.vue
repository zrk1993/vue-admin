<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
  },
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

