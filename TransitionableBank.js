'use strict';

var Transitionable = require('famous/transitions/Transitionable');

var bank = {

};

module.exports = function (name, initialValue) {
  bank[name] = bank[name] || new Transitionable(initialValue || 0);

  return bank[name];
};
