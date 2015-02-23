![React Infinity](http://naman.s3.amazonaws.com/react-infinity/react-infinity-2.png)

React Infinity is an implementation of the UITableView from iOS for the web. 
(Another famous implementation is [Infinity.js](http://airbnb.github.io/infinity/) by AirBnB.)

React Infinity is much more than just infinity.js repackaged for react.js. React Infinity has been written from the ground up for React.js with maximum performance and using the TransitionGroup addon, animations for every element coming in, going out, or moving around.


# THIS BRANCH IS UNDER-DEVELOPMENT. GO TO THE MASTER BRANCH IF YOU ARE NOT HERE TO CONTRIBUTE

## V2

version 2 of react-infinity is a major update.

Among other things, all animation has been moved from CSS transitions to requestAnimationFrame using a small part of famo.us

As of now, all the new code for v2 is in animagrid.js, the other code is still being develped.

animagrid, seperates the concerns of calculation and animations from the concerns of browser event listening etc. A new wrapper component needs to be built for legacy support.

animagrid is also currently lacking support for conditional rendering of elements or rendering pinterest-like layouts.

Work will continue over the next month or so.

Any contributions in this period will be greatly appreciated.


## Why?

Showing extremely long pages with a very large number of elements is becoming increasingly common on the web. However, sometimes with with very large number of elements, performance can suffer. As has been a guiding principle behind React.js, DOM nodes can be extremely expensive and can quickly hurt scroll performance of your page.

UITable on iOS solves this by simply only rendering the elements currently visible on the screen. React Infinity brings that logic the web. This way you can have a huge number of elements with smooth performance without memory issues. This is important to ensure a good experience while scrolling, and this is especially important on mobile devices, where the browser can crash if your website has too many DOM elements.

## Why React Infinity

React Infinity solves more than one problem. Inspired by the animations of Metafizzy's Isoptope, React Infinity provides smooth animations to elements, while they enter, leave, or change positions.

## Usage

I have tried to design an API that requires the minimum possible options to work, with sensible defaults, but when you do want, everything is extremely customisable. Also, standing on the strengths of React, there are no options to change data. Anytime, something changes, you can just re-render the React Infinity Component with it.

The basic props for React Inifinity

```

var Infinity = require('react-infinity');

// ...
  Infinite({data: data,
    elementWidth: 300,
    elementHeight: 300,
    margin: 300,
    childComponent: ArticleCard,
    transitionableName: el
  })
//...


```

The props are fairly straightforward.

**data** *array*

This is the data on which the content is based. It should be an array of objects that can have any data that your application may require and will be passed in to the childComponent that you pass in to render.

The only manadatory property of each object in data is an id field which is unique.

**elementWidth** *number*

Width of each element in pixels

**elementHeight** *number*

Height of each element in pixels

**margin** *number*

margin between the elements

**childComponent** *React Component*

This is the react component that is responsible for rendering each object in the data array. This can be any component and will receive the data you pass in. You are responsible for making sure that it renders in way that it conforms to size you have provided.

**transitionableName** *string*

As a temporary measure, you must create a transitionable by using the provided TransitionableBank, and pass it's name. You must then keep the value of the transitionable up-to date with the correct scrollTop value in pixels. The component will pull the correct transitionable from the Transitionable Bank, and do the rest. This will soon be replaced with a scrollTop property that will accept a whole range of different types of values:

(This is important to get the scroll position of the containing element. This could be the `window` object, or any other DOM element whose scroll position can be tracked to render the correct elements of the collection.
It can also be a famo.us transitionable. This way you can use custom scrolling libraries on touch screens like scrollability or iscroll and provide the scrollTop data even though no actual element is actually scrolling.)

There are more properties that you can pass in to customize the behaviour, such as a different size options for a mobile view and what the break point of that should be. Also, you can change the default behaviour from a vertical to horizontal scroll. Those properties are currently in flux and will be added soon in the future. Complete API and code examples will be added soon.

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

#### v1.0.0
- Fixed bug - incorrectly named function for removing event listener
- Pre-Rendering made an option and turned off by default
- Option to choose the DOM element for the container
- Update to React 0.12.x



