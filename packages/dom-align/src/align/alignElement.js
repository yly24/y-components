import getRegion from '../getRegion';

function alignElement(el, refNode, align) {
  const target = align.target || refNode;
  const refNodeRegion = getRegion(target);

  const isTargetNotOutOfVisible = !isOutOfVisibleRect(
    target,
    align.overflow && align.overflow.alwaysByViewport,
  );
  
  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible)
}
