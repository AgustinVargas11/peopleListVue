import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';

// for event emitting purposes
window.Event = new Vue();

Vue.use(Vuelidate);

new Vue({
    el: '#root',
    render: h => h(App)
});
