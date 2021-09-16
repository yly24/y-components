import utils from './utils';

/**
 *   获取元素的位置和大小信息
 * @param {*} node
 * @returns {left, top, w, h}
 */
const getRegion = node => {
  let offset;
  let w;
  let h;

  // nodeType === 9 为 document
  if (!utils.isWindow(node) && node.nodeType !== 9) {
    offset = utils.offset(node);
    w = utils.outerWidth(node);
    h = utils.outerHeight(node);
  } else {
    const win = utils.getWindow(node);
    offset = {
      left: utils.getWindowScrollLeft,
      top: utils.getWindowScrollTop,
    };
    w = utils.viewPortWidth(win);
    h = utils.viewPortHeight(win);
  }

  return offset;
};

export default getRegion;
