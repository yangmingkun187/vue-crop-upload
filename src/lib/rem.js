(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      // 针对uc横竖屏rem html没有重绘的问题
      var style;
      if(style=document.getElementById("hackUCRem")){
        style.parentNode.removeChild(style);
      }
      style = document.createElement("style");
      style.id="hackUCRem";
      document.head.appendChild(style);
      // 在head中加入一个style标签，插入属性 html{font-size: 22px !important;}
      style.appendChild(document.createTextNode("html{font-size:"+20 * (clientWidth / 320)+"px !important;}"));
      // 常规写法
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
