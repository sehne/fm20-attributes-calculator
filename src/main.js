import Vue from 'vue'
import App from './App.vue'
// import 'vue-material-design-icons/styles.css';
// import ArrowUpBoldIcon from 'vue-material-design-icons/ArrowUpBold.vue';
// import ArrowDownBoldIcon from 'vue-material-design-icons/ArrowDownBold.vue';
import Attribute from './Attribute.vue'

Vue.config.productionTip = false


Vue.mixin({
  data() {
    return {
    };
  },
  methods: {

  }
})

// Vue.component('arrow-up-bold-icon', ArrowUpBoldIcon);
// Vue.component('arrow-down-bold-icon', ArrowDownBoldIcon);
Vue.component('attribute', Attribute);

new Vue({
  render: h => h(App),
}).$mount('#app')
