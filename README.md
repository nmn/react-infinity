![React Infinity](http://naman.s3.amazonaws.com/react-infinity/react-infinity-2.png)

React Infinity is an implementation of the UITableView from iOS for the web. 
(Another famous implementation is [Infinity.js](http://airbnb.github.io/infinity/) by AirBnB.)

React Infinity is much more than just infinity.js repackaged for react.js. React Infinity has been written from the ground up for React.js with maximum performance and using the TransitionGroup addon, animations for every element coming in, going out, or moving around.


## Why?

[![Join the chat at https://gitter.im/nmn/react-infinity](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nmn/react-infinity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Showing extremely long pages with a very large number of elements is becoming increasingly common on the web. However, sometimes with with very large number of elements, performance can suffer. As has been a guiding principle behind React.js, DOM nodes can be extremely expensive and can quickly hurt scroll performance of your page.

UITable on iOS solves this by simply only rendering the elements currently visible on the screen. React Infinity brings that logic the web. This way you can have a huge number of elements with smooth performance without memory issues. This is important to ensure a good experience while scrolling, and this is especially important on mobile devices, where the browser can crash if your website has too many DOM elements.

## Why React Infinity

React Infinity solves more than one problem. Inspired by the animations of Metafizzy's Isoptope, React Infinity provides smooth animations to elements, while they enter, leave, or change positions.

## Usage

I have tried to design an API that requires the minimum possible options to work, with sensible defaults, but when you do want, everything is extremely customisable. Also, standing on the strengths of React, there are no options to change data. Anytime, something changes, you can just re-render the React Infinity Component with it.

The basic props for React Infinity

```js

var Infinity = require('react-infinity');

// ...
  Infinity({
    data: data, //Array of objects.
    elementWidth: 300, // Width of one element
    elementHeight: 300, // height of one element
    margin: 300,
    childComponent: ArticleCard, // React Class that will render actual cards. Must accept one object from the data array as props

    /* optional values:
    transitionable: // an object of type famous.Transitionable. transitionable.get() will replace window.scrollY
    mobileWidth: // breakpoint for switching to mobile view
    justifyOnMobile: // pass true to switch to a list instead of a grid on mobile.
    elementMobileHeight: // element height to use for mobile view
    elementMobileWidth: // element width to use for mobile view when `justifyOnMobile === false`
    scrollDelta: // Number of pixels from the top of the page to where React-Infinity is placed.
    */
  })
//...

```

The props are fairly straightforward.

**data** *array*

This is the data on which the content is based. It should be an array of objects that can have any data that your application may require and will be passed in to the childComponent as props that you pass in to render.

The only manadatory property of each object in data is an id field which is unique.

**elementWidth** *number*

Width of each element in pixels for desktop view.

**elementHeight** *number*

Height of each element in pixels for desktop view

**margin** *number*

margin between the elements. This is both the vertical and horizontal margin. v2.0 will bring more flexibility

**childComponent** *React Class*

This is the react component that is responsible for rendering each object in the data array. This can be any component and will receive the data you pass in. You are responsible for making sure that it renders in way that it conforms to size you have provided.



## Example

There will soon be a fully customisable example to let you experience the power of React Infinity. You can take a look at 
[*the* Scribbler](https://scribbler.co) to see an early version of React Infinity in action.

## Support

React Infinity is in active development and is being dogfooded at [Rushmore.fm](https://rushmore.fm). The project will be using the same version of React Infinity as on react, and bugs will be fixed promptly and performance improvements will land early.

On the other hand, React Infinity does some things well, and lets you take care of the other things. If you run in to a problem where you're not being able to accomplish something with React-Infinity that you want to, I may be able to let you know of a way. But some things may simply not be possible, such as a masonry layout.

## Contribution

While it is in early development, the API will not change dramatically. After a short period of small evolution, the API will quickly be stabilized and any breaking changes in the API will not be accepted. That said, any other improvements are welcome. Testing a UI component can be hard, and I'm particularly interested in any help setting up tests for this component.

The style guide is important, but it's fairly straightforward.
- 2 spaces
- no JSX
- try to be consistent with the existing code
- Prefer clear code over comments.

Also, please feel free to leave issues with questions, bugs, feature requests etc.


## Changelog

#### v1.2.1
- Made transitionable completely optional. Will use window.scrollY by default.
- Lots of small bug fixes.

#### v1.0.0
- Fixed bug - incorrectly named function for removing event listener
- Pre-Rendering made an option and turned off by default
- Option to choose the DOM element for the container
- Update to React 0.12.x



