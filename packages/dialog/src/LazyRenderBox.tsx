import React from 'react';

export interface ILazyRenderBoxPropTypes {
  className?: string;
  visible?: boolean;
  hiddenClassName?: string;
  role?: string;
  style?: {};
}

export default class LazyRenderBox extends React.Component<
  ILazyRenderBoxPropTypes,
  any
> {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }

  render() {
    let { className, hiddenClassName, visible } = this.props;
    if (!!hiddenClassName && !visible) {
      className += ` ${hiddenClassName}`;
    }
    const props: any = { ...this.props };
    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return <div {...props} />;
  }
}
