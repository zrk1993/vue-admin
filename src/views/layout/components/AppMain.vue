<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="isCache" :key="key"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!isCache" :key="key"></router-view>
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
    isCache() {
      console.log(!!this.cachedViews.find(i => i === this.key));
      return !!this.cachedViews.find(i => i === this.key);
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

