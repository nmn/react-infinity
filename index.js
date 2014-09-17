'use strict';

var s = require('react-prefixr');
var React = require('react/addons');
var TransitionGroup = React.addons.TransitionGroup;

var Transitionable = require('./TransitionableBank');
var RAFList = require('./RAFList');

var SubContainer = React.createClass({
  displayName: 'React-Infinity',
  getInitialState: function () {
    return {
      transform: this.props.transform + ' scale(1)',
      opacity: '0'
    };
  },
  componentDidMount: function (argument) {
    this.setState({transform: this.props.transform + ' scale(1)', opacity: '1'});
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({transform: newProps.transform + ' scale(1)'});
  },
  componentWillEnter: function (cb) {
    this.setState({transform: this.props.transform + ' scale(1)', opacity: '0'});
    setTimeout(cb, 100);
  },
  componentDidEnter: function () {
    this.setState({transform: this.props.transform + ' scale(1)', opacity: '1'});
  },
  componentWillLeave: function (cb) {
    this.setState({transform: this.props.transform + ' scale(1)', opacity: '0'});
    setTimeout(cb, 400);
  },
  render: function () {
    return React.DOM.div({style: s({
      position: 'absolute',
      top: '0',
      left: '0',
      transform: this.state.transform,
      width: this.props.width,
      height: this.props.height,
      transition: this.props.transition,
      opacity: this.state.opacity
    })},
      this.props.children
    );
  }
});

/*
- The properties I can expect:
i) Height and width of every element. (Object with max-width or min-widths, for multiple, undefined === 100%)
   // NOT YET: OR every single data element with its own height and width for Masonry style layouts
   // NOT YET: OR Detect Height automatically after rendering for Masonry

ii) Function to use for rendering actual content withing animated/positioned divs

iii) component:[string] Element name for conatainers. Defaults to div

iv) data: Array of data points (may include size data)

v) Total number of elements to be shown, defaults to Array.length

vi) OPTIONAL: callback for scrolling and loading elements toward the end of the dataset (for loading more via AJAX)

vii) Max number of columns: Defaults to infinite.

viii) Align: defaults to center

ix) Callbacks for breakpoints. Given in an array

x) Transition duration, curve and delay per element (for staggered animations) defaults to 0.5s ease. And 0 stagger.

xi) classname, elementClassName

*/


var Infinite = React.createClass({

  getDefaultProps: function () {
    return {
      data: [],
      maxColumns: 100,
      align: 'center',
      transition: '0.5s ease',
      delay: 0,
      className: 'infinite-container',
      elementClassName: '',
      component: 'div',
      mobileWidth: 480,
      justifyOnMobile: true,
      margin: 0,
      scrollDelta: 0
    };
  },

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    maxColumns: React.PropTypes.number,
    align: React.PropTypes.string,
    transition: React.PropTypes.string,
    delay: React.PropTypes.number,
    className: React.PropTypes.string,
    elementHeight: React.PropTypes.number,
    elementWidth: React.PropTypes.number,
    mobileWidth: React.PropTypes.number,
    elementMobileHeight: React.PropTypes.number,
    elementMobileWidth: React.PropTypes.number,
    margin: React.PropTypes.number,
    justifyOnMobile: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      transitionable: Transitionable(this.props.transitionableName),
      scrollTop: 0,
      windowWidth: this.props.windowWidth || 800,
      windowHeight: this.props.windowHeight || 600,
      loaded: false,
      scrollDelta: 0,
      extra: {
        count: 0
      }
    };
  },

  componentDidMount: function () {

    // this.onResize = this.onResize.bind(this);
    // this.onScroll = this.onScroll.bind(this);

    global.addEventListener('resize', this.onResize);

    RAFList.bind(this.onScroll);
    //this.props.scrollContainer.addEventListener('scroll', this.onScroll);

    // this.props.scrollContainer.addEventListener('touchstart', this.onTouchStart);
    // this.props.scrollContainer.addEventListener('touchmove', this.onTouchMove);
    // this.props.scrollContainer.addEventListener('touchend', this.onTouchEnd);
    // Causes Bad performance for now.

    this.setState({
      loaded: true,
      windowWidth: global.innerWidth,
      windowHeight: global.innerHeight,
      elementWidth: this.props.elementWidth || this.refs.element1.getDOMNode().getClientRects()[0].width,
      elementHeight: this.props.elementHeight || this.refs.element1.getDOMNode().getClientRects()[0].height,
      scrollTop: this.state.transitionable.get()
    });
  },

  onScroll: function () {

    this.state.extra.count++;

    // move some logic here for visible element calculation.

    // set flag for animation off
    if(this.state.extra.count % 20 === 0) {
      var scrollTop = this.state.transitionable.get();
      if(this.state.scrollTop !== scrollTop){
        this.setState({scrollTop: scrollTop});
      }
    }
    

  },

  // onTouchStart: function (evt) {
  //   var startY = evt.touches[0].pageY;
  //   this.setState({
  //     startY: startY,
  //     startScrollTop: this.state.scrollTop
  //   });
    
  // },
  // onTouchMove: function (evt) {

  //   var newY = evt.touches[0].pageY;
  //   var delta = this.state.startY - newY;

  //   if(this.state.scrollTop === this.state.startScrollTop){
  //     this.setState({
  //       scrollDelta: delta
  //     });
  //   }
    
  // },
  // onTouchEnd: function (evt) {
  //   console.log(":( oh god, no more control!");
  // },

  // willReceiveProps: function (argument) {
  //   // set flag for animation on. Filtering content is completely external.
  // },

  onResize: function () {
    this.setState({windowHeight: global.innerHeight, windowWidth: global.innerWidth});
  },

  componentWillUnmount: function () {
    global.removeListener('resize', this.onResize);
    RAFList.unbind(this.onScroll);
    //this.props.scrollContainer.removeEventListener('scroll', this.onResize);

    // this.props.scrollContainer.removeEventListener('touchstart', this.onTouchStart);
    // this.props.scrollContainer.removeEventListener('touchmove', this.onTouchMove);
    // this.props.scrollContainer.removeEventListener('touchend', this.onTouchEnd);
  },

  render: function(){
    if(this.state.loaded === false){
      return React.DOM.div({className: 'infinite-container', style: {fontSize: '0', position: 'relative', textAlign: this.props.align}},
        this.props.data.map(function (elementData, i) {
          return React.DOM[this.props.component]({style: {display: 'inline-block', margin: '32px', verticalAlign: 'top'}}, this.props.childComponent(elementData));
        }.bind(this))
      );
    }

    var windowWidth = this.state.windowWidth;
    var windowHeight = this.state.windowHeight;

    var elementWidth = this.props.mobileWidth <= windowWidth ? this.props.elementWidth : this.props.elementMobileWidth;
    var elementHeight = this.props.mobileWidth <= windowWidth ? this.props.elementHeight : this.props.elementMobileHeight;
    var margin = this.props.margin;

    if(!!this.props.justifyOnMobile && this.props.mobileWidth > windowWidth) {
      elementWidth = windowWidth;
      margin = 0;
    }

    var elementsPerRow = Math.max(1, Math.floor((windowWidth - margin) / (elementWidth + margin)));
    var extraSpace = windowWidth - elementsPerRow * (elementWidth + margin) + margin;
    var offset = this.props.align === 'left' ? 0 :
                 this.props.align === 'center' ? Math.round(extraSpace/2) : extraSpace;

    var scrollTop = this.state.scrollTop + this.state.scrollDelta;
    var rowsAbove = Math.floor((scrollTop - margin) / (elementHeight + margin));
    var visibleRows = Math.ceil(((rowsAbove * (elementHeight + margin)) + windowHeight)/(elementHeight+margin));

    var extra = elementsPerRow === 1 ? Math.ceil(visibleRows/2) : 2;
    var lowerLimit = (rowsAbove - extra) * elementsPerRow;
    var higherLimit = (visibleRows + extra*2) * elementsPerRow;

    var elementsToRender = [];

    this.props.data.forEach(function (obj, index) {
      if(index >= lowerLimit && index < higherLimit){
        var column = index % elementsPerRow;
        var row = Math.floor(index / elementsPerRow);
        elementsToRender.push(SubContainer({
          key: obj.id || obj._id,
          transform: 'translate('+ (offset + column * (elementWidth + margin))  +'px, '+ (margin + row * (elementHeight + margin)) +'px)',
          width: elementWidth + 'px',
          height: elementHeight + 'px',
          transition: this.props.transition
        }, this.props.childComponent(obj)));
      }
    }.bind(this));

    return React.DOM.div({className: 'infinite-container', style: {
      height: (margin + (elementHeight + margin) * Math.ceil(this.props.data.length/elementsPerRow)) + 'px',
      width: '100%',
      position: 'relative'}
    },
      TransitionGroup(null, elementsToRender)
    );
    
  }

});

module.exports = Infinite;