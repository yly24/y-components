import React from 'react';
import Collapse, { Panel } from 'y-collapse';
import '../assets/index.less';
import collapseMotion from './_util/motionUtil'

const YCollapseDemo = () => {
  return (
    <Collapse style={{ margin: 20 }} openMotion={collapseMotion}>
      <Panel header="title">content</Panel>
      <Panel header="title">content</Panel>
      <Panel header="title">content</Panel>
    </Collapse>
  );
};

export default YCollapseDemo;
