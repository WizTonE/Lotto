/**
 * jQuery: animate background position
 * Author: Marc Löhe
 * Based on a work by Alexander Farkas
 */
(function ($) {

  $.extend($.fx.step,{
    backgroundPosition: function(fx) {
      if (fx.state === 0) {
        var start = $.curCSS(fx.elem,'backgroundPosition');
        start = toArray(start);
        fx.start = [start[0], start[2]];
        fx.unit = [start[1], start[3]];
        if (typeof(fx.end) == 'string') {
          var end = toArray(fx.end);
          fx.end = [end[0],end[2]];
          fx.unit = [end[1],end[3]];
        } else if (typeof(fx.end) == 'object') {
          var props = ['left', 'top'];
          var params = fx.end;
          fx.end = [];
          $.each(props, function(i, prop) {
            if(prop in params) {
              var val = parseVal(params[prop]);
              fx.end[i] = val[0];
              fx.unit[i] = val[1];
            } else {
              fx.end[i] = fx.start[i];
            }
          });
        }            
      }
      
      var nowPosX = [];
      nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
      nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
      fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

      function parseVal(strg) {
        strg = strg.replace(/left|top/,'0px');
        strg = strg.replace(/right|bottom/,'100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/,"$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1], 10), res[2]];
      }
      
      function toArray(strg){
         var res = strg.match(/(\S+)\s(\S+)/);
         return $.merge(parseVal(res[1]), parseVal(res[2]));
      }
    }
  });
}(jQuery));