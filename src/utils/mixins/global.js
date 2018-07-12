import Vue from 'vue';

Vue.mixin({
  methods: {
    $refreshView() {
      debugger;
      this.$store.dispatch('refreshView', this.$route);
    },
  },
});
