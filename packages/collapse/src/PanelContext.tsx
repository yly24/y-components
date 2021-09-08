import * as React from 'react';
import classNames from 'classnames';
import { CollapsePanelProps } from './interface';

const PanelContent = React.forwardRef<
  HTMLDivElement,
  CollapsePanelProps & { children: React.ReactNode }
>((props, ref) => {
  const {
    prefixCls,
    forceRender,
    className,
    style,
    children,
    isActive,
    role,
  } = props;

  const [rendered, setRendered] = React.useState(isActive || forceRender);

  React.useEffect(
    () => {
      if (isActive || forceRender) {
        setRendered(true);
      }
    },
    [forceRender, isActive],
  );
  

  if (!rendered) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={classNames(`${prefixCls}-content`, className, {
        [`${prefixCls}-content-active`]: isActive,
        [`${prefixCls}-content-inactive`]: !isActive,
      })}
      style={style}
      role={role}
    >
      <div className={`${prefixCls}-content-box`}>{children}</div>
    </div>
  );
});

PanelContent.displayName = 'PanelContent';

export default PanelContent;
