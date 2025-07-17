// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'w3-css/w3.css'
import 'w3-css/4/w3pro.css'
import 'w3-css/4/w3mobile.css'
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueQRCodeComponent from 'vue-qrcode-component'
import VueMoment from 'vue-moment'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import feather from 'vue-icon'
import axios from 'axios'

Vue.use(VuejsDialog);
Vue.prototype.$http = axios
Vue.use(VueMoment);
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Mint);
Vue.config.productionTip = false
Vue.use(feather, 'v-icon')
export const serverBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
