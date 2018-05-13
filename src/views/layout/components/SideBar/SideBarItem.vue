<template>
  <div class="side-bar-item">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <i v-if="item.children[0]&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span v-if="item.children[0] && item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <side-bar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :navs="[child]" :key="child.path"></side-bar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if="child && child.meta.icon" :class="child.meta.icon"></i>
              <span v-if="child && child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    routes: {
      type: Array,
    },
  },
  data() {
    return {
      isNest: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar-item {
  a {
    text-decoration: none;
    display: inline-block;
    width: 100%;
  }
  .el-submenu .el-menu-item {
    padding-left: 48px !important;
    background-color: #000c17 !important;
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item,
  .el-submenu .el-menu-item {
    &.is-active {
      background-color: #188fff !important;
      color: #fff !important;
    }
  }
  .el-submenu__title i {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
