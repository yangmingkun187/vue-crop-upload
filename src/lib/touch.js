import Hammer from 'hammerjs';

export default class Touch {
	
	constructor($container,$imageWrapper) {
	
	  let HM = new Hammer($container);
	
	  // visibility zone
	  let offsetRange = {
		  top: $container.offsetTop,
		  left: $container.offsetLeft,
		  bottom: $container.offsetTop + $container.offsetHeight,
		  right: $container.offsetLeft + $container.offsetWidth
	  };
	
	  // 创建图片的虚拟dom，使用transform做位移，避免重绘
	  let virtualImage = {
		  width: $imageWrapper.offsetWidth,
		  height: $imageWrapper.offsetHeight,
		  top: $imageWrapper.offsetTop,
		  left: $imageWrapper.offsetLeft,
		  bottom: $imageWrapper.offsetTop + $imageWrapper.offsetHeight,
		  right: $imageWrapper.offsetLeft + $imageWrapper.offsetWidth
	  };
	
	  HM.get('pinch').set({ enable: true });
	  HM.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	
	  let PanObj = this.pan($imageWrapper,offsetRange,virtualImage);
	  HM.on('panstart', PanObj.start);
	  HM.on('panmove', PanObj.move);
	  HM.on('panend', PanObj.end);
	
  }
  
	pan($imageWrapper,offsetRange,virtualImage) {
		
		let translateX = 0,
			translateY = 0,
			translate3dStr = 'translate3d(0,0,0) ',
			scaleStr = 'scale(1,1)';
		
		let start = function(ev) {
			let transformArray = $imageWrapper.style.transform.split('scale');
			translate3dStr = transformArray[0] ? transformArray[0] : translate3dStr;
			scaleStr = transformArray[1] ? 'scale' + transformArray[1] : scaleStr;
			
			$imageWrapper.style.transitionTimingFunction = '';
			$imageWrapper.style.transitionDuration = '';
		};
		
		let move = function(ev) {
			let offset = {
				x: translateX + ev.deltaX,
				y: translateY + ev.deltaY
			};
			translate3dStr = 'translate3d(' + offset.x + 'px,' + offset.y + 'px,0) ';
			$imageWrapper.style.transform = translate3dStr + scaleStr;
		};
		
		let end = function(ev) {
			let xCache = 0, yCache = 0;
			// 右下角滑动
			
			if (ev.deltaX >= 0 && ev.deltaY >= 0) {
				
				if (virtualImage.left + ev.deltaX > offsetRange.left) {
					xCache = offsetRange.left;
				} else {
					xCache = ev.deltaX;
				}
				if (virtualImage.top + ev.deltaY > offsetRange.top) {
					yCache = ev.deltaY
				} else {
					yCache = offsetRange.top - virtualImage.top;
				}
				
			} else if (ev.deltaX >= 0 && ev.deltaY <= 0) {		// 右上角滑动
				
				if (virtualImage.left + ev.deltaX > offsetRange.left) {
					xCache = offsetRange.left;
				} else {
					xCache = ev.deltaX;
				}
				if (virtualImage.bottom + ev.deltaY < offsetRange.bottom) {
					yCache = offsetRange.bottom - virtualImage.bottom;
				} else {
					yCache = ev.deltaY
				}
				
			} else if (ev.deltaX <= 0 && ev.deltaY >= 0) {// 左下角滑动
				
				if (virtualImage.right + ev.deltaX < offsetRange.right) {
					xCache = offsetRange.left;
				} else {
					xCache = ev.deltaX;
				}
				if (virtualImage.top + ev.deltaY > offsetRange.top) {
					yCache = offsetRange.top - virtualImage.top;
				} else {
					yCache = ev.deltaY
				}
				
			} else if (ev.deltaX <= 0 && ev.deltaY <= 0) {// 左上角滑动
				
				if (virtualImage.right + ev.deltaX < offsetRange.right) {
					xCache = offsetRange.left;
				} else {
					xCache = ev.deltaX;
				}
				if (virtualImage.bottom + ev.deltaY < offsetRange.bottom) {
					yCache = offsetRange.bottom - virtualImage.bottom;
				} else {
					yCache = ev.deltaY
				}
			}
			
			translateX = xCache;
			translateY = yCache;
			translate3dStr = 'translate3d(' + xCache + 'px,' + yCache + 'px,0) ';
			
			$imageWrapper.style.transform = translate3dStr + scaleStr;
			$imageWrapper.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
			$imageWrapper.style.transitionDuration = '700ms';
		};
		
		return {
			start , move , end
		}
		
	};
}
