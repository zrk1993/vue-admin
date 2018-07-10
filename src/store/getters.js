const getters = {
  permission_routers: state => state.permission.routers,
  sidebar: state => state.app.sidebar,
  constant: state => state.constant.constant,
  baseApiUrl: state => state.app.baseApiUrl,
};

export default getters;
