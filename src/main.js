import Vue from 'vue';
import App from './App';
// import VueRouter from 'vue-router';
import VueQuillEditor from 'vue-quill-editor'
import router from './router/index'
import axios from 'axios'
Vue.prototype.$axios = axios


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import "../static/css/module.css";


axios.defaults.baseURL = '/api';
Vue.config.productionTip = false


import "@/assets/icon/iconfont.css";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";


Vue.use(VueQuillEditor);
Vue.use(Element);
Vue.use(VueQuillEditor);

new Vue({
    el: '#app',
    router, // 注入到根实例中
    render: h => h(App)
})