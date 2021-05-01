import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const DEFAULT_TITLE = '奈特人生';
router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

// Import Swiper
import Swiper from 'swiper'
import 'swiper/swiper.min.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

new Swiper ('.swiper-container', {

  direction: 'vertical',
  slideToClickedSlide: true,
  centeredSlides: true,
  slidesPerView: 7,
  
  // Mousewheel
  mousewheel: { // this method can't work
    invert: true,
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

});