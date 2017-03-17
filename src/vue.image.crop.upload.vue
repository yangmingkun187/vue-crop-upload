<style scoped>

  .input-wrapper {
    display: inline-block;
    margin: 50px auto;
    width: 100px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    background-color: #00b473;
    color: #ffffff;
  }

  input[type=file] {
    display: none;
  }

  .upload-image-btn {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
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
    font-size: 0;
    transform: translate3d(0,0,0) scale(1,1);
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
  .btn-group {
    position: absolute;
    bottom: 0;
    left: 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    z-index: 9;
    background-color: #000000;
  }
  .btn-group button{
    width: 80px;
    height: 50px;
    border: none;
    font-size: 18px;
    color: white;
    background-color: #000000;
  }
  .container {
    width: 100%;
    height: 100%;
  }
</style>

<template>

  <div class="upload-image-btn">
    <!--上传-->
    <label for="file" class="input-wrapper" v-show="!hasImage" >
      上传图片
      <input id="file" type="file" v-on:change="change"/>
    </label>

    <div class="crop-image-wrapper" v-show="hasImage">

      <div class="origin-image">
        <img v-bind:src="image.src" v-bind:style="{ width:image.width + 'px',height: image.height + 'px' }" alt=""/>
      </div>

      <div class="top-cover" v-bind:style="{height: styleObj.coverHeight + 'px'}"></div>

      <div class="visibility-container">
      </div>

      <div class="bottom-cover" v-bind:style="{height: styleObj.coverHeight + 'px'}"></div>

      <div class="btn-group">
        <button>取消</button>
        <button>完成</button>
      </div>
    </div>

  </div>

</template>

<script>
	import Touch from './lib/touch';

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
        },
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
	      const screenWidth = document.body.clientWidth;
	      const screenHeight = document.body.clientHeight;

	      _self.styleObj.coverHeight = (screenHeight - screenWidth) / 2;
	      document.querySelector('.visibility-container').style.cssText =
          'height:'+ screenWidth + 'px;margin-top:' + (-screenWidth / 2) + 'px';

	      _self.image.width = screenWidth;
        _self.image.height = screenWidth * _self.image.ratio;

	      document.querySelector('.origin-image').style.cssText =
		      'height:'+ _self.image.height + 'px;margin-top:' + -_self.image.height / 2 + 'px';

	      _self.bindHammer();
      },

			bindHammer() {
	      let $imageWrapper = document.querySelector('.origin-image');
	      let $container = document.querySelector('.visibility-container');
				new Touch($container,$imageWrapper)
      }
		}
	}
</script>