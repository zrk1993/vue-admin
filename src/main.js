// The Vue build version to load with the `import` command
import Vue from 'vue';
import ElementUI from 'element-ui';
import './styles/element-variables.scss';

import App from './App';
import request from './utils/plugins/request';
import router from './router';
import autoHeight from './utils/directive/auto-height';
import './utils/mixins/global';
import store from './store';

import './styles/base.css';
import './styles/index.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(request);

Vue.directive('auto-height', autoHeight);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: h => h(App),
});
