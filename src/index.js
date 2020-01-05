import Vue from 'vue';
import App from './app.vue';
import './assets/styles/index.styl';

const app = document.createElement('div');
document.body.appendChild(app);

new Vue({
    render: h => h(App)
}).$mount(app)