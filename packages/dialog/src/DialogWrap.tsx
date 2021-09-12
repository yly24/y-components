import React from 'react';
import ReactDOM from 'react-dom';
import IDialogPropsTypes from './IDialogPropsTypes';

function noop() {}

const IS_REACT_16 = !!(ReactDOM as any).createPortal;

const CAN_USE_DOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default class DialogWrap extends React.Component<
  IDialogPropsTypes,
  any
> {
  static defaultProps = {
    visible: false,
    className: 'rmc-dialog',
    onClose: noop,
  };

  _component: any;
  container: any;

  componentDidMount() {
    if (this.props.visible) {
      this.componentDidUpdate();
    }
  }

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  }

  componentWillUnmount() {
    if (this.props.visible) {
      if (!IS_REACT_16) {
      }
    }
  }

  componentDidUpdate() {
    if (!IS_REACT_16) {
    }
  }

  saveRef = node => {
    if (IS_REACT_16) {
      this._component = node;
    }
  };

  getComponent = visible => {
    const props = { ...this.props };
    ['visible', 'onAnimationLeave'].forEach(key => {
      if (props.hasOwnProperty(key)) {
        delete props[key];
      }
    });

    return (
      <div
        {...props}
        visible={visible}
        onAnimationLeave={this.removeContainer}
        ref={this.saveRef}
      />
    );
  };

  getContainer = () => {
    if (!this.container) {
      const container = document.createElement('div');
      const containerId = `${
        this.props.prefixCls
      }-container-${new Date().getTime()}`;
      container.setAttribute('id', containerId);
      document.body.appendChild(container);
      this.container = container;
    }
    return this.container;
  };

  removeContainer = () => {
    if (this.container) {
      if (!IS_REACT_16) {
        ReactDOM.unmountComponentAtNode(this.container);
      }
      (this.container as any).parentNode.removeChildren(this.container);
      this.container = null;
    }
  };

  renderDialog(visible) {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.getComponent(visible),
      this.getContainer(),
    );
  }

  render() {
    if (!CAN_USE_DOM) return null;
    const { visible } = this.props;
    if (IS_REACT_16 && (visible || this._component)) {
      return (ReactDOM as any).createPortal(
        this.getComponent(visible),
        this.getContainer(),
      );
    }
    return null as any;
  }
}
