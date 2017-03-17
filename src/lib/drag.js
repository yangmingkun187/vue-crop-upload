/*!
 * Drag.js
 * hammertime  hammerjs实例
 * $originImage 原图dom
 * $visibility 可移动div dom
 */
function Drag (hammertime,$originImage,$visibility) {
	
	if (!hammertime) {
		throw new Error('dependency on hammer!');
	}
	
	let translateX = 0,
		translateY = 0;

	const _self = this;
	_self.originImage = $originImage;
	_self.visibility = $visibility;
	
	// visibility zone
	_self.offsetRange = {
		top: _self.visibility.offsetTop,
		left: _self.visibility.offsetLeft,
		bottom: _self.visibility.offsetTop + _self.visibility.offsetHeight,
		right: _self.visibility.offsetLeft + _self.visibility.offsetWidth
	};
	
	// 创建图片的虚拟dom，使用transform做位移，避免重绘
	_self.virtualImage = {
		width: _self.originImage.offsetWidth,
		height: _self.originImage.offsetHeight,
		top: _self.originImage.offsetTop,
		left: _self.originImage.offsetLeft,
		bottom: _self.originImage.offsetTop + _self.originImage.offsetHeight,
		right: _self.originImage.offsetLeft + _self.originImage.offsetWidth
	};
	
	_self.imagePosition = {
		top: _self.originImage.offsetTop,
		left: _self.originImage.offsetLeft,
		bottom: _self.originImage.offsetTop + _self.originImage.offsetHeight,
		right: _self.originImage.offsetLeft + _self.originImage.offsetWidth
	};
	
	
	hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	
	hammertime.on('panstart', function(ev) {
		_self.originImage.style.transitionTimingFunction = '';
		_self.originImage.style.transitionDuration = '';
		
	});
	
	hammertime.on('panmove', function(ev) {
		
		let offset = {
			x: translateX + ev.deltaX,
			y: translateY + ev.deltaY
		};
		
		_self.originImage.style.transform = 'translate3d(' + offset.x + 'px,' + offset.y + 'px,0) scale(1,1)';

	});
	
	hammertime.on('panend', function(ev) {
		
		let xCache = 0, yCache = 0;
		// 右下角滑动
		
		
		if (ev.deltaX >= 0 && ev.deltaY >= 0) {
			
			if (_self.originPosition.left + ev.deltaX > _self.offsetRange.left) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = ev.deltaX;
			}
			if (_self.originPosition.top + ev.deltaY > _self.offsetRange.top) {
				yCache = ev.deltaY
			} else {
				yCache = _self.offsetRange.top - _self.originPosition.top;
			}
			
		} else if (ev.deltaX >= 0 && ev.deltaY <= 0) {		// 右上角滑动
			
			if (_self.originPosition.left + ev.deltaX > _self.offsetRange.left) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = ev.deltaX;
			}
			if (_self.originPosition.bottom + ev.deltaY < _self.offsetRange.bottom) {
				yCache = _self.offsetRange.bottom - _self.originPosition.bottom;
			} else {
				yCache = ev.deltaY
			}
			
		} else if (ev.deltaX <= 0 && ev.deltaY >= 0) {// 左下角滑动
			
			if (_self.originPosition.right + ev.deltaX < _self.offsetRange.right) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = ev.deltaX;
			}
			if (_self.originPosition.top + ev.deltaY > _self.offsetRange.top) {
				yCache = _self.offsetRange.top - _self.originPosition.top;
			} else {
				yCache = ev.deltaY
			}
			
		} else if (ev.deltaX <= 0 && ev.deltaY <= 0) {// 左上角滑动
			
			if (_self.originPosition.right + ev.deltaX < _self.offsetRange.right) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = ev.deltaX;
			}
			if (_self.originPosition.bottom + ev.deltaY < _self.offsetRange.bottom) {
				yCache = _self.offsetRange.bottom - _self.originPosition.bottom;
			} else {
				yCache = ev.deltaY
			}
		}
		
		translateX = xCache;
		translateY = yCache;
		
		_self.originImage.style.transform = 'translate3d(' + xCache + 'px,' + yCache + 'px,0) scale(1,1)';
		_self.originImage.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
		_self.originImage.style.transitionDuration = '700ms';
	});
}


module.exports = Drag;
