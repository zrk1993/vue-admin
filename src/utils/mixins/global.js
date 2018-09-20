import Vue from 'vue';

Vue.mixin({
  methods: {
    $refreshView() {
      this.$store.dispatch('refreshView', this.$route);
    },
    $hasPermission(roles) {
      const roleList = this.$store.state.user.roleList;
      console.log(roleList);
      return roleList && roleList.some(item => roles.some(i => i === item));
    },
  },
});
