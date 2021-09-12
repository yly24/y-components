import React from 'react';
import IDialogPropsTypes from './IDialogPropsTypes';
import LazyRenderBox from './LazyRenderBox';
import Animate from 'rc-animate';

function noop() {}

export default class Dialog extends React.Component<IDialogPropsTypes, any> {
  static defaultProps = {
    afterClose: noop,
    className: '',
    mask: true,
    visible: false,
    closeable: true,
    maskClosable: true,
    prefixCls: 'rmc-dialog',
    onClose: noop,
  };

  dialogRef: any;
  borderRef: any;
  footerRef: any;
  wrapRef: any;

  componentWillUnmount() {
    document.body.style.overflow = '';
    if (this.wrapRef) {
      this.wrapRef.style.display = 'none';
    }
  }

  getZIndexStyle() {
    const style: any = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  }

  getWrapStyle() {
    const wrapStyle = this.props.wrapStyle || {};
    return { ...this.getZIndexStyle(), ...wrapStyle };
  }
  getMaskStyle() {
    const maskStyle = this.props.maskStyle || {};
    return { ...this.getZIndexStyle(), ...maskStyle };
  }

  getMaskTransitionName() {
    let { maskTransitionName, maskAnimation, prefixCls } = this.props;
    if (!maskTransitionName && maskAnimation) {
      maskTransitionName = `${prefixCls}-${maskAnimation}`;
    }
    return maskTransitionName;
  }

  getTransitionName() {
    let { transitionName, animation, prefixCls } = this.props;
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}`;
    }
    return transitionName;
  }

  getMaskElement() {
    const { mask, prefixCls, visible } = this.props;
    let maskElement;
    if (mask) {
      const maskTransitionName = this.getMaskTransitionName();
      maskElement = (
        <LazyRenderBox
          style={this.getMaskStyle()}
          key="mask-element"
          className={`${prefixCls}-mask`}
          hiddenClassName={`${prefixCls}-mask-hidden`}
          visible={visible}
          {...this.props.maskProps}
        />
      );
      if (maskTransitionName) {
        maskElement = (
          <Animate
            key="mask"
            showProps="visible"
            transitionAppear
            component=""
            transitionName={maskTransitionName}
          >
            {maskElement}
          </Animate>
        );
      }
    }
    return maskElement;
  }

  getDialogElement() {}

  onAnimationAppear = () => {};
  onAnimationLeave = () => {};

  close = e => {};
  onMaskClick = e => {};

  render() {
    const { props } = this;
    const { prefixCls, maskClosable } = props;
    const style = this.getWrapStyle();
    if (!props.visible) {
      style.display = 'none';
    }

    return (
      <div>
        {this.getMaskElement()}
        <div
          className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
          ref={el => (this.wrapRef = el)}
          onClick={maskClosable ? this.onMaskClick : undefined}
          role="dialog"
          aria-labelledby={props.title}
          style={style}
          {...props.wrapProps}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
