import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/user';
import 'vue-awesome/icons/users';
import 'vue-awesome/icons/lock';
import 'vue-awesome/icons/th-large';
import 'vue-awesome/icons/eye-slash';
import 'vue-awesome/icons/plus';
import 'vue-awesome/icons/commenting-o';
import 'vue-awesome/icons/comment-o';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/pencil';
import 'vue-awesome/icons/address-book-o';
import 'vue-awesome/icons/industry';
import 'vue-awesome/icons/html5';
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons/globe';
import 'vue-awesome/icons/bar-chart';
import 'vue-awesome/icons/cog';
import 'vue-awesome/icons/language';
import 'vue-awesome/icons/remove';
import 'vue-awesome/icons/archive';
import 'vue-awesome/icons/bars';
// or import all icons if you don't care about bundle size
// import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

// import ECharts from 'vue-echarts/components/ECharts';
import ECharts from 'vue-echarts';
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router/routes';
import store from './store';
import '@/icons'; // icon
import '@/permission'; // 权限

import moment from 'moment';

Vue.component('icon', Icon);
Vue.component('chart', ECharts);
Vue.use(ElementUI, {
  locale
});

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

Vue.prototype.clone = function(src) {
  return JSON.parse(JSON.stringify(src));
};

Vue.prototype.ok = function(message, duration) {
  return this.$message({
    type: 'success',
    message: message || 'Success.',
    showClose: true,
    duration: duration || 2000
  });
};
Vue.prototype.info = function(message, duration) {
  return this.$message({
    type: 'info',
    message: message || '',
    showClose: true,
    duration: duration || 2000
  });
};
Vue.prototype.warn = function(message, duration) {
  return this.$message({
    type: 'warning',
    message: message || 'Success.',
    showClose: true,
    duration: duration || 2000
  });
};
Vue.prototype.error = function(message, duration) {
  if (message.length > 200) {
    console.log(message);
    message = message.slice(0, 200) + '...';
  }
  return this.$message({
    type: 'error',
    message,
    showClose: true,
    duration: duration || 5000
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
