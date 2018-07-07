import request from '../../utils/plugins/request';

const app = {
  state: {
    constant: {},
  },
  mutations: {
    SET_CONSTANT: (state, constant) => {
      state.constant = constant;
    },
  },
  actions: {
    GetConstant({ commit }) {
      return new Promise((resolve, reject) => {
        request.get('/system_conf/constant/list').then((data) => {
          commit('SET_CONSTANT', data.result);
          resolve(data.result);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};

export default app;
