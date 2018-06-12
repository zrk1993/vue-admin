<template>
  <scroll-bar>
    <div class="logo">
      <span class="site-name">ADMIN</span>
    </div>
    <el-menu
      class="menu-wrap"
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#00142a"
      text-color="hsla(0,0%,100%,.65)"
      active-text-color="#409EFF"
    >
      <side-bar-item :routes="routes"></side-bar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import SideBarItem from './SideBarItem';
import ScrollBar from '../ScrollBar';

export default {
  components: { SideBarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  line-height: 56px;
  background: #001529;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
.menu-wrap {
  border-right: none;
}
</style>
