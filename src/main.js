import Vue from 'vue'
import VueImageCropUpload from './vue.image.crop.upload.vue'
import VueTouch2 from 'vue-touch';

Vue.use(VueTouch2);

new Vue({
  el: '#app',
  render: app => app(VueImageCropUpload)
});
