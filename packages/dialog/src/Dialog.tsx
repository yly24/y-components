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
  bodyRef: any;
  footerRef: any;
  headerRef: any;
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

  getDialogElement() {
    const props = this.props;
    const { closable, prefixCls } = props;
    let footer;
    if (props.footer) {
      footer = (
        <div
          className={`${prefixCls}-footer`}
          ref={el => (this.footerRef = el)}
        >
          {props.footer}
        </div>
      );
    }

    let header;
    if (props.title) {
      header = (
        <div
          className={`${prefixCls}-header`}
          ref={el => (this.headerRef = el)}
        >
          <div className={`${prefixCls}-title`}>{props.title}</div>
        </div>
      );
    }

    let closer;
    if (closable) {
      closer = (
        <button
          className={`${prefixCls}-close`}
          aria-label="Close"
          onClick={this.close}
        >
          <span className={`${prefixCls}-close-x`} />
        </button>
      );
    }

    const transitionName = this.getTransitionName();
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        role="document"
        ref={el => (this.dialogRef = el)}
        style={props.style || {}}
        className={`${prefixCls} ${props.className || ''}`}
        visible={props.visible}
      >
        <div className={`${prefixCls}-content`}>
          {closer}
          {header}
          <div
            className={`${prefixCls}-body`}
            style={props.style}
            ref={el => (this.bodyRef = el)}
          >
            {props.children}
          </div>
          {footer}
        </div>
      </LazyRenderBox>
    );

    return (
      <Animate
        key="dialog"
        showProp="visible"
        onAppear={this.onAnimationAppear}
        onLeave={this.onAnimationLeave}
        transitionName={transitionName}
        component=""
        transitionAppear
      >
        {dialogElement}
      </Animate>
    );
  }

  onAnimationAppear = () => {
    document.body.style.overflow = 'hidden';
  };

  onAnimationLeave = () => {
    document.body.style.overflow = 'hidden';

    if (this.wrapRef) {
      this.wrapRef.style.display = 'none';
    }
    if (this.props.onAnimateLeave) {
      this.props.onAnimateLeave();
    }
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  };

  close = e => {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
  };
  onMaskClick = e => {
    if (e.target === e.currentTarget) {
      this.close(e);
    }
  };

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
