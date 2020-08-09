import Vue from 'vue'
import App from './App.vue'
// import 'vue-material-design-icons/styles.css';
// import ArrowUpBoldIcon from 'vue-material-design-icons/ArrowUpBold.vue';
// import ArrowDownBoldIcon from 'vue-material-design-icons/ArrowDownBold.vue';
import Attribute from './Attribute.vue'
import Player from './Player.vue'

Vue.config.productionTip = false


Vue.mixin({
  data() {
    return {
      currentTab: "home",
      currentLanguage: "en",
      translations: require('./assets/languages/en.json')
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    loadNewLanguage() {
      this.translations = require(`./assets/languages/${this.currentLanguage}.json`);
      // this.$forceUpdate();
    }
  }
})

// Vue.component('arrow-up-bold-icon', ArrowUpBoldIcon);
// Vue.component('arrow-down-bold-icon', ArrowDownBoldIcon);
Vue.component('attribute', Attribute);
Vue.component('player', Player);

new Vue({
  render: h => h(App),
}).$mount('#app')
