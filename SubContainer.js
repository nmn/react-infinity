var React = require('react');

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

module.exports = SubContainer;