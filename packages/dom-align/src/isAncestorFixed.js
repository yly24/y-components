import utils from './utils';

const { getParent } = utils;

const isAncestorFixed = (ele) => {
  if(utils.isWindow(ele) || ele.nodeType === 9) {
    return false
  }
  
  const doc = utils.getDocument(ele)
  const body = doc.body
  let parent = null
  for(parent = getParent(ele); parent !== doc && parent !== body; parent = getParent(parent)) {
    const positionStyle = utils.css(parent, 'position');
    if(positionStyle === 'fixed') {
      return true
    }
  }
  
  return false
}