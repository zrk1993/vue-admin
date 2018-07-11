<template>
  <div class="navbar">
    <tags-view class="tags-view"></tags-view>
    <el-menu class="user-profile-container" mode="horizontal">
      <div class="menu-icons">
        <span class="menu-icon" @click="$refreshView"><i class="el-icon-refresh icon" style="font-size: 19px;"></i></span>
        <span class="menu-icon"><i class="el-icon-message icon"></i></span>
        <el-dropdown trigger="click">
          <div class="user-profile-content">
            <img class="user-avatar" src="https://img.alicdn.com/tfs/TB1ONhloamWBuNjy1XaXXXCbXXa-200-200.png">
            <div class="user-profile-body">
              <span class="user-name">{{ user.realName }}</span>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                我的主页
              </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger';
import TagsView from './TagsView';

export default {
  name: 'NavBar',
  components: {
    Hamburger,
    TagsView,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$http.get('/system_permission/user/logout').then(() => {
        this.$router.push({ path: '/login' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 48px;
  line-height: 46px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

  .tags-view {
    width: 100%;
    margin: 0 200px 0 0;
  }

  .user-profile-container {
    position: absolute;
    top: 0px;
    right: 5px;
    width: 180px;
    cursor: pointer;
    align-items: center;
    border: none;
    .user-profile-content {
      display: flex;
      align-items: center;
      padding: 0;
    }
    .menu-icons {
      display: flex;
      align-items: center;
      .menu-icon {
        padding: 0 12px;
        .icon {
          display: inline-block;
          font-size: 18px;
          text-align: center;
        }
      }
    }
    .user-profile-body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-right: 14px;
    }
    .user-avatar {
      width: 24px;
      height: 24px;
      margin: 0 8px 0 12px;
      border-radius: 4px;
    }
    .user-name {
      color: rgba(0,0,0,.65);
    }
    .user-department {
      font-size: 12px;
      color: rgba(102, 102, 102, 0.65);
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: 0;
      top: 13px;
      font-size: 12px;
    }
  }
}
</style>

