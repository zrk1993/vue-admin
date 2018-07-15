import Vue from 'vue';

Vue.mixin({
  methods: {
    $refreshView() {
      this.$store.dispatch('refreshView', this.$route);
    },
    $hasPermission(code) {
      return this.$store.state.user.permList.some(i => i.code === code);
    },
  },
});
