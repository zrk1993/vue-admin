import Vue from 'vue';
import Vuex from 'vuex';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import app from './modules/app';
import constant from './modules/constant';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    permission,
    tagsView,
    app,
    constant,
  },
  getters,
});

export default store;
