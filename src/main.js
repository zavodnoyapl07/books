import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ru from 'vee-validate/dist/locale/ru'
import VeeValidate, { Validator } from 'vee-validate'
import rules from './validators'

Vue.use(VeeValidate, {
    events: '',
    locale: 'ru',
})
Validator.localize('ru', ru)
rules()

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
