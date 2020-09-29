import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui'
Vue.use(element)


Vue.config.productionTip = false

new Vue({
    el: "#app",
    router,
    render: h => h(App)
})