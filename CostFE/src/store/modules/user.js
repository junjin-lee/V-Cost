import {
  login,
  logout,
  getInfo
} from '@/api/login';
import {
  getToken,
  setToken,
  removeToken,
  setUser,
  getUser,
  removeUser
} from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data;
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // try load user data from cache
        const data = getUser();
        console.log(data);
        if (data) {
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.username);
          commit('SET_AVATAR', data.avatar);

          return resolve(data);
        } else {
          getInfo()
            .then(response => {
              const data = response.data;

              console.log('data is: ', data);

              if (!data) {
                console.log('user not register yet: ', getToken());

                // initUser().then(
                //   response => {
                //     const data = response.data;

                //     commit('SET_ROLES', data.role);
                //     commit('SET_NAME', data.email);
                //     commit('SET_AVATAR', data.avatar);

                //     // cache user data in browser
                //     setUser(data);

                //     resolve(data);
                //   },
                //   err => reject(err)
                // );
              } else {
                commit('SET_ROLES', data.role);
                commit('SET_NAME', data.username);
                commit('SET_AVATAR', data.avatar);

                // cache user data in browser
                setUser(data);

                resolve(data);
              }
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            removeUser();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        removeUser();
        resolve();
      });
    }
  }
};

export default user;