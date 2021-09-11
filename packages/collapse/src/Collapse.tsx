import * as React from 'react';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import { CollapseProps, CollapsibleType } from './interface';
import toArray from 'rc-util/lib/Children/toArray';
import CollapsePanel from './Panel'

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

  static Panel = CollapsePanel

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
  
  setActiveKey = (activeKey: React.Key[]) => {
    if(!('activeKey' in this.props)) {
      this.setState({activeKey})
    }
    this.props.onChange(this.props.accordion ? activeKey[0]: activeKey)
  };
  
  onItemClick = (key: React.Key) => {
    let {activeKey} = this.state
    
    if(this.props.accordion) {
      activeKey = activeKey[0] === key ? [] : [key]
    } else {
      activeKey = [...activeKey]
      const index = activeKey.indexOf(key)
      if(index > -1) {
        activeKey.splice(index, 1)
      } else {
        activeKey.push(key)
      }
    }
    
    this.setActiveKey(activeKey)
  };
  
  getNewChild = (child: React.ReactElement, index: number) => {
    if (!child) return null;
    const { activeKey } = this.state;
    const {
      prefixCls,
      openMotion,
      accordion,
      destroyInactivePanel: rootDestroyInactivePanel,
      expandIcon,
      collapsible,
    } = this.props;
    const key = child.key || String(index);
    
    let isActive = false
    if(accordion) {
      isActive = activeKey[0] === key
    } else {
      isActive = activeKey.indexOf(key) > -1
    }
    
    const {
      header,
      headerClass,
      destroyInactivePanel,
      collapsible: childCollapsible,
    } = child.props;
    
    const mergeCollapsible: CollapsibleType = childCollapsible ?? collapsible
    
    const props = {
      key,
      panelKey: key,
      header,
      headerClass,
      isActive,
      prefixCls,
      destroyInactivePanel: destroyInactivePanel ?? rootDestroyInactivePanel,
      openMotion,
      accordion,
      children: child.props.children,
      onItemClick: mergeCollapsible === 'disabled' ? null: this.onItemClick,
      expandIcon,
      collapsible: mergeCollapsible,
    }
    
    return React.cloneElement(child, props)
  }
  
  getItems() {
    const { children } = this.props;
    return toArray(children).map(this.getNewChild);
  }
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

export default Collapse