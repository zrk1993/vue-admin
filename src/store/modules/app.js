const app = {
  state: {
    sidebar: {
      opened: true,
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    CLOSE_SIDEBAR: (state) => {
      state.sidebar.opened = false;
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
  },
};

export default app;
