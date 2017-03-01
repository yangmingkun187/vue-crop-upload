
<template>
  <div class="vue-image-crop-upload-btn">
    <input name="imageFile" type="file">
  </div>
  <div class="image-crop-wrapper">
    <div class="image-crop-cover"></div>
    <div class="image-origin-image-wrapper"
         v-touch:pinch="resize"
         v-on:touchstart.self="drag">
    </div>
    <div class="image-crop-box"></div>
    <div class="image-crop-btn-groups">
      <button type="button" class="confirm">确认</button>
      <button type="button" class="cancel">取消</button>
    </div>
  </div>
</template>

<style>
  .image-crop-wrapper {
    width: 100%;

  }
</style>

<script>

  export default {
    props:{
    },
    data() {
      return {
        hasImage: false,
      }
    },
    methods: {

    },
  };

</script>
