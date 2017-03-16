let moves,moveEnd;

export default class Drag {
	
	constructor($originImage, $visibility, e) {
		
		const _self = this;
		_self.originImage = $originImage;
		_self.visibility = $visibility;
		
		_self.originPosition = {
			top: _self.originImage.offsetTop,
			left: _self.originImage.offsetLeft,
			bottom: _self.originImage.offsetTop + _self.originImage.offsetHeight,
			right: _self.originImage.offsetLeft + _self.originImage.offsetWidth
		};
		
		_self.offsetRange = {
			top: _self.visibility.offsetTop,
			left: _self.visibility.offsetLeft,
			bottom: _self.visibility.offsetTop + _self.visibility.offsetHeight,
			right: _self.visibility.offsetLeft + _self.visibility.offsetWidth
		};
		
		_self.startPosition = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		};
		_self.originImage.style.transitionTimingFunction = '';
		_self.originImage.style.transitionDuration = '';
		
		moves = function(e) {
			_self.move(e);
		};
		moveEnd = function(e) {
			_self.stopMove(e);
		};
		
		document.addEventListener('touchmove', moves, false);
		document.addEventListener('touchend', moveEnd, false);
	}
	
	move(e) {
		const _self = this;
		
		if (!_self.originImage) return false;
		
		let movePosition = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
		
		let offset = {
			x: movePosition.x - _self.startPosition.x,
			y: movePosition.y - _self.startPosition.y
		};
		
		_self.originImage.style.transform = 'translate3d(' + offset.x + 'px,' + offset.y + 'px,0)';
	}
	
	stopMove(e) {
		const _self = this;
		
		let stopPosition = {
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY
		};
		
		let stopOffset = {
			x: stopPosition.x - _self.startPosition.x,
			y: stopPosition.y - _self.startPosition.y
		};
		
		let xCache = 0, yCache = 0;
		
		
		// 右下角滑动
		if(stopOffset.x > 0 && stopOffset.y > 0) {
			
			if(_self.originPosition.left + stopOffset.x > _self.offsetRange.left) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = stopOffset.x;
			}
			if(_self.originPosition.top + stopOffset.y > _self.offsetRange.top) {
				yCache = _self.offsetRange.top - _self.originPosition.top;
			} else {
				yCache = stopOffset.y
			}
			_self.originImage.style.transform = 'translate3d('+xCache+'px,'+yCache+'px,0)';
		}
		
		// 右上角滑动
		if(stopOffset.x > 0 && stopOffset.y < 0) {
			
			if(_self.originPosition.left + stopOffset.x > _self.offsetRange.left) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = stopOffset.x;
			}
			if(_self.originPosition.bottom + stopOffset.y < _self.offsetRange.bottom) {
				yCache = _self.offsetRange.bottom - _self.originPosition.bottom;
			} else {
				yCache = stopOffset.y
			}
			_self.originImage.style.transform = 'translate3d('+xCache+'px,'+yCache+'px,0)';
		}
		
		// 左下角滑动
		if(stopOffset.x < 0 && stopOffset.y > 0) {
			
			if(_self.originPosition.right + stopOffset.x < _self.offsetRange.right) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = stopOffset.x;
			}
			if(_self.originPosition.top + stopOffset.y > _self.offsetRange.top) {
				yCache = _self.offsetRange.top - _self.originPosition.top;
			} else {
				yCache = stopOffset.y
			}
			_self.originImage.style.transform = 'translate3d('+xCache+'px,'+yCache+'px,0)';
		}
		
		// 左上角滑动
		if(stopOffset.x < 0 && stopOffset.y < 0) {
			
			if(_self.originPosition.right + stopOffset.x < _self.offsetRange.right) {
				xCache = _self.offsetRange.left;
			} else {
				xCache = stopOffset.x;
			}
			if(_self.originPosition.bottom + stopOffset.y < _self.offsetRange.bottom) {
				yCache = _self.offsetRange.bottom - _self.originPosition.bottom;
			} else {
				yCache = stopOffset.y
			}
			_self.originImage.style.transform = 'translate3d('+xCache+'px,'+yCache+'px,0)';
		}
		
		_self.originImage.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
		_self.originImage.style.transitionDuration = '700ms';

		document.removeEventListener('touchmove', moves, false);
		document.removeEventListener('touchend', moveEnd, false);
	}
}
