import React, { PureComponent } from 'react';
import Swipe from 'swipe-js-iso';
import isEqual from 'lodash.isequal';

class ReactSwipe extends PureComponent {
  static defaultProps = {
    swipeOptions: {},
    style: {
      container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative',
      },
      wrapper: {
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      },
      child: {
        float: 'left',
        width: '100%',
        position: 'relative',
        transitionProperty: 'transform',
      },
    },
    className: '',
    childCount: 0,
  };

  componentDidMount() {
    this.swipe = Swipe(this.containerEl, this.props.swipeOptions);
  }

  componentDidUpdate(prevProps) {
    const { childCount, swipeOptions } = this.props;
    const shouldUpdateSwipeInstance = prevProps.childCount !== childCount
      || !isEqual(prevProps.swipeOptions, swipeOptions);

    /*
    if (shouldUpdateSwipeInstance) {
      this.swipe.kill();
      this.swipe = Swipe(this.containerEl, this.props.swipeOptions);
    }
    */
  }

  componentWillUnmount() {
    this.swipe.kill();
    this.swipe = void 0;
  }

  slide(...args) {
    this.swipe.slide(...args);
  }

  getPos() {
    return this.swipe.getPos();
  }

  getNumSlides() {
    return this.swipe.getNumSlides();
  }

  next() {
    this.swipe.next();
  }

  prev() {
    this.swipe.prev();
  }

  render() {
    const {
      id, className, style, children,
    } = this.props;

    return (
      <div
        id={id}
        ref={el => (this.containerEl = el)}
        className={`react-swipe-container ${className}`}
        style={style.container}
      >
        <div style={style.wrapper}>
          {React.Children.map(children, (child) => {
            if (!child) {
              return null;
            }

            const childStyle = child.props.style
              ? { ...style.child, ...child.props.style }
              : style.child;

            return React.cloneElement(child, { style: childStyle });
          })}
        </div>
      </div>
    );
  }
}

export default ReactSwipe;
