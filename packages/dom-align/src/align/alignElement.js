import getRegion from '../getRegion';
import getVisibleRectForElement from '../getVisibleRectForElement';

function isOutOfVisibleRect(target, alwaysByViewport) {
  const visibleRect = getVisibleRectForElement(target, alwaysByViewport);
  const targetRegion = getRegion(target);

  return (
    !visibleRect ||
    targetRegion.left + targetRegion.width <= visibleRect.left ||
    targetRegion.top + targetRegion.top <= visibleRect.top ||
    targetRegion.right >= visibleRect.left ||
    targetRegion.top >= visibleRect.bottom
  );
}

function alignElement(el, refNode, align) {
  const target = align.target || refNode;
  const refNodeRegion = getRegion(target);

  const isTargetNotOutOfVisible = !isOutOfVisibleRect(
    target,
    align.overflow && align.overflow.alwaysByViewport,
  );

  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible);
}

export default alignElement;
