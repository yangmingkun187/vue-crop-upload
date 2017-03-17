import Hammer from 'hammerjs';

export default class Touch {
	
	constructor($container,$imageWrapper) {
		
		if (!Hammer) {
			throw new Error('[vue-touch] cannot locate Hammer.js.')
		}
	
	  let HM = new Hammer($container);
	
	  // visibility zone
	  let offsetRange = {
		  width: $container.offsetWidth,
		  height: $container.offsetHeight,
		  top: $container.offsetTop,
		  left: $container.offsetLeft
	  };
	
	  // 创建图片的虚拟dom，使用transform做位移，避免重绘
	  let virtualImage = {
		  width: $imageWrapper.offsetWidth,
		  height: $imageWrapper.offsetHeight,
		  top: $imageWrapper.offsetTop,
		  left: $imageWrapper.offsetLeft
	  };
	
	  HM.get('pinch').set({ enable: true });
	  HM.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	
	  let PanObj = this.pan($imageWrapper,offsetRange,virtualImage);
	  HM.on('panstart', PanObj.start);
	  HM.on('panmove', PanObj.move);
	  HM.on('panend', PanObj.end);
	
  }
  
	pan($imageWrapper,offsetRange,virtualImage) {
		
		let transformer = {
			x: 0,
			y: 0
		};
		
		let translate3dStr = 'translate3d(0,0,0) ',
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
				x: transformer.x + ev.deltaX,
				y: transformer.y + ev.deltaY
			};
			translate3dStr = 'translate3d(' + offset.x + 'px,' + offset.y + 'px,0) ';
			$imageWrapper.style.transform = translate3dStr + scaleStr;
		};
		
		let end = function(ev) {
			
			let maxX = offsetRange.left - virtualImage.left;
			let maxY = offsetRange.top - virtualImage.top;
			
			if(maxX < 0 || maxY < 0) {
				$imageWrapper.style.transform = 'translate3d(0,0,0) scale(1,1)';
				$imageWrapper.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
				$imageWrapper.style.transitionDuration = '700ms';
				return;
			}
			
			if(transformer.x + Math.abs(ev.deltaX) > maxX) {
				transformer.x += ev.deltaX > 0 ? maxX : -maxX;
			} else {
				transformer.x += ev.deltaX;
			}
			
			if(transformer.y + Math.abs(ev.deltaY) > maxY) {
				transformer.y += ev.deltaY > 0 ? maxY : -maxY;
			} else {
				transformer.y += ev.deltaY;
			}
			
			translate3dStr = 'translate3d(' + transformer.x + 'px,' + transformer.y + 'px,0) ';
			
			$imageWrapper.style.transform = translate3dStr + scaleStr;
			$imageWrapper.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
			$imageWrapper.style.transitionDuration = '700ms';
			
			virtualImage.top += transformer.y;
			virtualImage.left += transformer.x;
		};
		
		return {
			start , move , end
		}
		
	};
}
