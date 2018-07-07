<template>
  <div class="app-wrapper" >
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main v-if="ready"></app-main>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from './components';

export default {
  name: 'layout',
  components: {
    NavBar,
    SideBar,
    AppMain,
  },
  data() {
    return {
      ready: false,
    };
  },
  created() {
    // 加载系统必要常量
    this.$store.dispatch('GetConstant').then(() => {
      this.ready = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  position: relative;
  height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  overflow: auto;
}

.sidebar-container {
  box-shadow: 1px 0 6px rgba(0, 21, 41, .3);
  transition: width 0.28s;
  width: 210px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
