import {
  CSSMotionProps,
  MotionEventHandler,
  MotionEndEventHandler,
} from 'rc-motion';

const getCollapsedHeigh: MotionEventHandler = () => ({ height: 0, opacity: 1 });
const getRealHeigh: MotionEventHandler = node => ({
  height: node.scrollHeight,
  opacity: 1,
});
const getCurrentHeight: MotionEventHandler = node => ({
  height: node.offsetHeight,
});

const skipOpacityTransition: MotionEndEventHandler = (_, event) =>
  (event as TransitionEvent).propertyName === 'height';

// TODO 这几个勾子函数的作用
const collapseMotion: CSSMotionProps = {
  motionName: 'rc-collapse-motion',
  onEnterStart: getCollapsedHeigh,
  onEnterActive: getRealHeigh,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeigh,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: 'rc-collapse-content-hidden',
};

export default collapseMotion;
