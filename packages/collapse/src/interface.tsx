import * as React from 'react';
import { CSSMotionProps } from 'rc-motion';

export type CollapsibleType = 'header' | 'disabled';

export interface CollapseProps {
  prefixCls?: string;
  activeKey?: string;
  defaultActiveKey?: React.Key | React.Key[];
  openMotion: CSSMotionProps;
  onChange(key: React.Key | React.Key[]): void;
  accordion?: boolean;
  className?: string;
  style: React.CSSProperties;
  destroyInactivePanel?: boolean;
  expandIcon?: (props: object) => React.ReactNode;
  collapsible: CollapsibleType;
}

export interface CollapsePanelProps {
  id?: string;
  header?: string | React.ReactNode;
  prefixCls?: string;
  headerClass?: string;
  showArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  openMotion?: CSSMotionProps;
  destroyInactivePanel?: boolean;
  accordion?: boolean;
  forceRender?: boolean;
  extra?: string | React.ReactNode;
  onItemClick?: (panelKey: string | number) => void;
  expandIcon?: (props: object) => React.ReactNode;
  panelKey?: string;
  role?: string;
  collapsible?: CollapsibleType;
}
