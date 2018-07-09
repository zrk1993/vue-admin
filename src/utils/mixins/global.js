import Vue from 'vue';

Vue.mixin({
  methods: {
    $refreshView() {
      this.$store.dispatch('refreshView', this.$route);
    },
  },
});
