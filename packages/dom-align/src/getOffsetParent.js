import utils from './utils';

const { getParent } = utils;

const getOffsetParent = ele => {
  if (utils.isWindow(ele) || ele.nodeType === 9) {
    return null;
  }

  const doc = utils.getDocument(ele);
  const body = doc.body;
  let parent;
  let positionStyle = utils.css(ele, 'position');
  const skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

  if (!skipStatic) {
    return ele.nodeName.toLowerCase() === 'html' ? null : getParent(ele);
  }

  for (
    parent = getParent(ele);
    parent && parent !== body && parent.nodeType !== 9;
    parent = getParent(ele)
  ) {
    positionStyle = utils.css(parent, 'position');
    if (positionStyle !== 'static') {
      return parent;
    }
  }

  return null;
};

export default getOffsetParent;
