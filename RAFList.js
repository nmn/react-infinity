'use strict';

require('./RequestAnimationFramePolyfill');

var renderList = [];
var RequestAnimationFrame = global.requestAnimationFrame;

function loop(){
  renderList.forEach(function(fn){
    fn();
  });

  RequestAnimationFrame(loop);
}

if(!!global.document) {
  loop();
}

module.exports.bind = function(func){
  if(typeof func !== 'function'){
    throw 'Must Pass in a function';
  }
  renderList.push(func);
};

module.exports.unbind = function(func){
  for(var i = 0; i < renderList.length; i++){
    if(renderList[i] === func){
      renderList.splice(i, 1);
      return;
    }
  }
};