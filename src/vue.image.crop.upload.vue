<style scoped>
  .upload-image-btn {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .crop-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000000;
  }

  .origin-image {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translate3d(0,0,0);
  }

  .origin-image img {
    width: 100%;
  }

  .visibility-container {
    position: absolute;
    width: 100%;
    top: 50%;
    border: 1px solid #ffffff;
    box-sizing: border-box;
  }

  .top-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    opacity: .6;
  }

  .bottom-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    opacity: .6;
  }

</style>

<template>

  <div class="upload-image-btn">
    <!--上传-->
    <input type="file" v-show="!hasImage" v-on:change="change"/>

    <div class="crop-image-wrapper" v-show="hasImage">

      <div class="origin-image">
        <img v-bind:src="image.src" v-bind:style="{ width:image.width + 'px',height: image.height + 'px' }" alt=""/>
      </div>

      <div class="top-cover" v-bind:style="{height: styleObj.coverHeight + 'px'}"></div>

      <div class="visibility-container"
           v-on:touchstart.self="drag" v-on:mousedown.self="drag"></div>

      <div class="bottom-cover" v-bind:style="{height: styleObj.coverHeight + 'px'}"></div>

    </div>

  </div>

</template>

<script>
	import Drag from './lib/drag';

	export default {
		data() {
			return {
				hasImage: false,
				image:{
					src: '',
					width:24,
					height:24,
					ratio: 1
				},
				styleObj: {
					coverHeight : 0
        }
			}
		},

		methods: {

			change(e) {
				const _self = this;

				_self.hasImage = true;

				let file = new FileReader();
				file.onload = function(e) {

					_self.initImage(e.target.result);
        };

        file.readAsDataURL(e.target.files[0]);
      },

      initImage(src) {
	      const _self = this;

	      let img = new Image();
	      img.src = src;
	      img.onload= function() {
		      _self.image.src = src;
		      _self.image.width = img.naturalWidth;
		      _self.image.height = img.naturalHeight;
          _self.image.ratio =  img.naturalHeight / img.naturalWidth;
		      _self.initCropImageWrapper();
	      }
      },

      initCropImageWrapper() {
	      const _self = this;
	      const screenWidth = window.screen.width;
	      const screenHeight = window.screen.height;

	      _self.styleObj.coverHeight = (screenHeight - screenWidth) / 2;
	      document.querySelector('.visibility-container').style.cssText =
          'height:'+ screenWidth + 'px;margin-top:' + (-screenWidth / 2) + 'px';

	      _self.image.width = screenWidth;
        _self.image.height = screenWidth * _self.image.ratio;

	      document.querySelector('.origin-image').style.cssText =
		      'margin-top:' + -_self.image.height / 2 + 'px';

      },

			drag(e) {
				e.preventDefault();
				e.stopPropagation();
				let $originImage = document.getElementsByClassName('origin-image')[0];
				let $visibility = document.getElementsByClassName('visibility-container')[0];
				let dragObj = new Drag($originImage, $visibility, e);
			}
		}
	}
</script>