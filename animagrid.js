'use strict';

var React = require('react/addons');

if(!!global.document) {
  var Transitionable = require('famous/src/transitions/Transitionable');  
}

// var Transform = require('famous/src/core/Transform');

// function formatTransform(m) {
//   m[12] = Math.round(m[12]);
//   m[13] = Math.round(m[13]);

//   var result = 'matrix3d(';
//   for (var i = 0; i < 15; i++) {
//       result += (m[i] < 0.000001 && m[i] > -0.000001) ? '0,' : m[i] + ',';
//   }
//   result += m[15] + ')';
//   return result;
// }

var TransitionGroup = React.createFactory(React.addons.TransitionGroup);
var R = React.DOM;
var s = require('react-prefixr');

if(!!global.document){
  // shim layer with setTimeout fallback
  var requestAnimFrame = (function(){
    return  global.requestAnimationFrame       ||
            global.webkitRequestAnimationFrame ||
            global.mozRequestAnimationFrame    ||
            function( callback ){
              global.setTimeout(callback, 1000 / 60);
            };
  })();
}

var ContainerClass = React.createClass({

  getInitialState: function(){
    return {
      // scale: 0.5,
      // opacity: 0,
      // x: this.props.x,
      // y: this.props.y,
      transform: [this.props.x, this.props.y, 0.5, 0.01], // [x, y, scale, opacity]
      transitionable: !!global.document ? new Transitionable([this.props.x, this.props.y, 0.5, 0.01]) : [this.props.x, this.props.y, 0.5, 0.01]
    };
  },

  componentWillEnter: function(cb){
    
    setTimeout(cb, 100);
  },

  componentDidEnter: function(){
    // this.state.transitionable.delay(this.props.animIndex * 250);
    this.state.transitionable.set(
      [this.props.x, this.props.y, 1, 1],
      {duration: (this.props.skipAnimation ? 0 : 350), curve: 'easeInOut'}
    );
    this.loop();
    // this.setState({
    //   scale: 1, opacity: 1
    // });
  },

  componentWillReceiveProps: function(newProps){
    this.state.transitionable.halt();
    // this.state.transitionable.delay(this.props.animIndex * 250);
    this.state.transitionable.set(
      [newProps.x, newProps.y, 1, 1],
      {duration: (this.props.skipAnimation ? 0 : 350), curve: 'easeInOut'}
    );
  },

  // componentDidMount: function(){
  //   // setTimeout(this.componentDidEnter, 600);
  // },
  
  componentWillLeave: function(cb){
    // this.setState({
    //   scale: 0.5, opacity: 0
    // });
    setTimeout(cb, 500 ); //+ (this.props.animIndex * 250)
    this.state.transitionable.halt();
    // this.state.transitionable.delay(this.props.animIndex * 250);
    this.state.transitionable.set(
      [this.props.x, this.props.y, 0.5, 0.01],
      {duration: (this.props.skipAnimation ? 0 : 350), curve: 'easeInOut'}
    );
  },
  
  // componentDidLeave: function(){

  // },

  loop: function(){
    var currentVal = this.state.transitionable.get();
    if(this.state.transform.toString() !== currentVal.toString() && this.isMounted()){
      this.setState({transform: currentVal});
    }
    // console.log(currentVal);
    if(this.isMounted()){
      requestAnimFrame(this.loop);  
    }
  },

  render: function(){

    var transform = this.state.transform;
    var x = Math.round(transform[0]);
    var y = Math.round(transform[1]);
    var scale = transform[2];
    var opacity = transform[3];

    return R.div({
      style: s({
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.props.height,
        width: this.props.width,
        transform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
        opacity: opacity
        // transition: '0.3s ' + (this.props.animIndex * 0.1) + 's ease'//this.props.transition || '0.5s ease'
      })
    },
      this.props.children
    );
  }
});

var Container = React.createFactory(ContainerClass);



module.exports = React.createClass({
    displayName: 'Animagrid',

    getDefaultProps: function(){
      return {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        maxColumns: 99999,
        width: 400,
        height: 400,
        horizontalMargin: 0,
        verticalMargin: 0,
        containerWidth: 900,
        align: 'center'
      };
    },

    render: function(){
      return this._render(this.props, this.state);
    },

    _render: function (props, state) {

      var elementsPerRow = 0
        , totalHeight = 0
        , extraSpace = 0
        , extraPaddingLeft = 0
        , elements = [];

      if(!! props.data.length){
        elementsPerRow = Math.min(props.data.length, props.maxColumns, Math.floor((props.containerWidth - props.paddingLeft - props.paddingRight + props.horizontalMargin)/(props.width + props.horizontalMargin)));
        totalHeight = (Math.ceil(props.data.length / elementsPerRow) * (props.height + props.verticalMargin)) + props.paddingTop + props.paddingBottom - props.verticalMargin;
        extraSpace = props.containerWidth - (elementsPerRow * (props.width + props.horizontalMargin) - props.horizontalMargin + props.paddingLeft + props.paddingRight);

        extraPaddingLeft = props.align === 'left' ? 0 : props.align === 'right' ? extraSpace : Math.round(extraSpace/2);

        elements = props.data.map(function(element, index){

          // these numbers start at 0
          var row = Math.floor(index / elementsPerRow);
          var column = index % elementsPerRow;

          return {
            component : Container({
              height: this.props.height,
              width: this.props.width,
              key: 'i' + element.id,
              x: props.paddingLeft + extraPaddingLeft + ((props.width + props.horizontalMargin) * column),
              y: props.paddingTop + ((props.height + props.verticalMargin) * row),
              animIndex: (row + column), // Math.min((row + column), elementsPerRow * elementsPerRow),
              skipAnimation: ((row + column) > Math.max(elementsPerRow * 2, 6) )
            },
              props.factory(element)
            ),
            id: element.id
          };

        }.bind(this)).sort(function(a, b){
          return a.id - b.id;
        }).map(function(obj){
          return obj.component;
        });
      }

      return R[this.props.elName || 'div']({
        style: s({
          position: 'relative', height: totalHeight, width: '100%'//, transition: '0.5s linear'
        })
      }, 
        TransitionGroup({},
          elements
        )
      );
    }
});