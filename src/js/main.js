import Vue from 'vue'
import App from './App.vue'
import './polyfill';

// for event emitting purposes
window.Event = new Vue();

new Vue({
    el: '#root',
    render: h => h(App)
});
