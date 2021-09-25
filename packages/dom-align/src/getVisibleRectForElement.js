import getOffsetParent from './getOffsetParent';
import utils from './utils';
import isAncestorFixed from './isAncestorFixed';

const getVisibleRectForElement = (element, alwaysByViewPort) => {
  const visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity,
  };

  const el = getOffsetParent(element);
  const doc = utils.getDocument(element);
  const win = doc.defaultView || doc.parentWindow;
  const body = doc.body;
  const documentElement = doc.documentElement;

  while (el) {
    if (
      (navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
      (el !== body &&
        el !== documentElement &&
        utils.css(el, 'overflow' !== 'visible'))
    ) {
      const pos = utils.offset(el);
      pos.left += el.clientWidth;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.bottom = Math.min(
        visibleRect.bottom,
        pos.top + el.clientHeight,
      );
      visibleRect.left = Math.max(visibleRect.left, pos.left);
      visibleRect.right = Math.min(
        visibleRect.right,
        pos.left + el.clientWidth,
      );
    } else if (el === body || el === documentElement) {
      break;
    }

    el = getOffsetParent(el);
  }

  // Set element position to fixed
  // make sure absolute element itself don't affect it's visible area
  // https://github.com/ant-design/ant-design/issues/7601
  let originalPosition = null;
  if (!utils.isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    const position = utils.css(element, 'position');
    if (position === 'absolute') {
      element.style.position = 'fixed';
    }
  }

  const scrollX = utils.getWindowScrollLeft(win);
  const scrollY = utils.getWindowScrollTop(win);
  const viewPortWidth = utils.viewPortWidth(win);
  const viewPortHeight = utils.viewPortHeight(win);
  let documentWidth = documentElement.scrollWidth;
  let documentHeight = documentElement.scrollHeight;

  const bodyStyle = window.getComputedStyle(body);
  if (bodyStyle.overflowX === 'hidden') {
    documentWidth = window.innerWidth;
  }
  if (bodyStyle.overflowY === 'hidden') {
    documentHeight = window.innerHeight;
  }

  if (originalPosition) {
    element.style.position = originalPosition;
  }

  if (alwaysByViewPort || isAncestorFixed(element)) {
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewPortWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + clientHeight);
  } else {
    const maxVisibleWidth = Math.max(documentWidth, scrollX + viewPortWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);

    const maxVisibleHeight = Math.max(documentHeight, scrollY + viewPortHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }

  return visibleRect.top >= 0 &&
    visibleRect.left >= 0 &&
    visibleRect.bottom > visibleRect.top &&
    visibleRect.right > visibleRect.left
    ? visibleRect
    : null;
};

export default getVisibleRectForElement;
