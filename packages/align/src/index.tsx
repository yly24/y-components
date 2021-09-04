import React, { FC } from 'react';

export interface IAlignProps {
  /**
   * @description 这是类名
   * @default null
   */
  className?: string;
}

const Align: FC<IAlignProps> = () => {
  return <div>我是 align 组件</div>;
};

export default Align;
