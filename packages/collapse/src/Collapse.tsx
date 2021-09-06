import * as React from 'react';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import { CollapseProps, CollapsibleType } from './interface';
import { toArray } from 'rc-util';

function getActiveKeysArray(activeKey: React.Key | React.Key[]) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    const activeKeyType = typeof currentActiveKey;
    currentActiveKey =
      activeKeyType === 'string' || activeKeyType === 'number'
        ? [currentActiveKey]
        : [];
  }
  return currentActiveKey.map(key => String(key));
}

export interface CollapseState {
  activeKey: React.Key[];
}

class Collapse extends React.Component<CollapseProps, CollapseState> {
  static defaultProps = {
    prefixCls: 'rc-collapse',
    onChange() {},
    accordion: false,
    destroyInactivePanel: false,
  };

  // static Panel = CollapsePanel TODO 这个作用是什么

  constructor(props: CollapseProps) {
    super(props);

    const { activeKey, defaultActiveKey } = props;
    let currentActiveKey = defaultActiveKey;

    if ('activeKey' in props) {
      currentActiveKey = activeKey;
    }

    this.state = {
      activeKey: getActiveKeysArray(currentActiveKey),
    };
  }

  static getDerivedStateFromProps(nextProps: CollapseProps) {
    const newState: Partial<CollapseState> = {};
    if ('activeKey' in nextProps) {
      newState.activeKey = getActiveKeysArray(nextProps.activeKey);
    }
    return newState;
  }

  shouldComponentUpdate(nextProps: CollapseProps, nextState: CollapseState) {
    return (
      !shallowequal(this.props, nextProps) ||
      !shallowequal(this.state, nextState)
    );
  }
  onClickItem = () => {};
  getNewChild() {}
  getItems() {
    const { children } = this.props;
    return toArray(children).map(this.getNewChild);
  }
  setActiveKey = () => {};
  render() {
    const { prefixCls, className, style, accordion } = this.props;
    const collapseClassName = classNames({
      [prefixCls]: true,
      [className]: !!className,
    });
    return (
      <div
        className={collapseClassName}
        style={style}
        role={accordion ? 'tablist' : null}
      >
        {this.getItems()}
      </div>
    );
  }
}
