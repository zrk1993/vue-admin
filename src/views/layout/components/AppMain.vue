<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
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
      return this.cachedViews.find(i => i.split('_kun_')[0] === this.$route.fullPath);
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

<style>
/*fade*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-15px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(15px);
}
</style>

