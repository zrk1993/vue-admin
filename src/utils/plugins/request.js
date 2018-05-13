import axios from 'axios';

// create an axios instance
const request = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
});

request.install = function install(Vue) {
  Vue.axios = axios;

  Object.defineProperties(Vue.prototype, {
    axios: {
      get: function get() {
        return request;
      },
    },
    $http: {
      get: function get() {
        return request;
      },
    },
    $request: {
      get: function get() {
        return request;
      },
    },
  });
};

export { request as default, axios };
