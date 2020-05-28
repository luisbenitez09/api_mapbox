import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import vuecookie from 'vue-cookie';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  vuecookie,
  render: h => h(App)
}).$mount('#app')
