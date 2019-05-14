import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import router from './router/index'
import store from './store'
import { sync } from 'vuex-router-sync'
import { FontAwesomeIcon } from './icons'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import App from 'components/app-root'

Vue.use(Vuetify)

// Registration of global components
Vue.component('icon', FontAwesomeIcon)

//Note: $http is the axios object now, so any method you can call on axios object, you can call on this.$http.
Vue.prototype.$http = axios

sync(store, router)

const app = new Vue({
  store,
  router,
  ...App
})

export {
  app,
  router,
  store
}
