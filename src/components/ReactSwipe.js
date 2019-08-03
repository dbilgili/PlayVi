import React, { PureComponent } from 'react';
import Swipe from 'swipe-js-iso';

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

  constructor() {
    super();
    this.containerEl = React.createRef();
  }

  componentDidMount() {
    const { swipeOptions } = this.props;
    this.swipe = Swipe(this.containerEl.current, swipeOptions);
  }

  componentWillUnmount() {
    this.swipe.kill();
    this.swipe = undefined;
  }

  getPos() {
    return this.swipe.getPos();
  }

  getNumSlides() {
    return this.swipe.getNumSlides();
  }

  slide(...args) {
    this.swipe.slide(...args);
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
        ref={this.containerEl}
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
