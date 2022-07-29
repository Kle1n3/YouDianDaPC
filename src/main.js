import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store'
// import '@/utlis/auth'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI);

// console.log(process.env);
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_URL);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
