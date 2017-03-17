function Scale(hammertime, $originImage, $visibility) {
	let isScale = false,
		translate3DStr = 'translate3d(0,0,0)',
		scaleStr = 'scale(1,1)';
	
	hammertime.on('doubletap', function (ev) {
		ev.preventDefault();
		
		let styleArray = $originImage.style.transform.split(' ');
		translate3DStr = styleArray[0] ? styleArray[0] : 'translate3d(0,0,0)';
		scaleStr = styleArray[1] ? styleArray[1] : 'scale(1,1)';
		
		if (isScale) {
			scaleStr = 'scale(1,1)';
		} else {
			scaleStr = 'scale(1.5,1.5)';
		}
		
		$originImage.style.transform = translate3DStr + ' ' + scaleStr;
		isScale = !isScale;
	});
}

module.exports = Scale;
