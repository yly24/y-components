import React from 'react';
import YCollapse, { Panel } from 'y-collapse';
import '../assets/index.less';
import collapseMotion from './_util/motionUtil'

const YCollapseDemo = () => {
  return (
    <YCollapse style={{ margin: 20 }} openMotion={collapseMotion}>
      <Panel header="title">content</Panel>
      <Panel header="title">content</Panel>
      <Panel header="title">content</Panel>
    </YCollapse>
  );
};

export default YCollapseDemo;
