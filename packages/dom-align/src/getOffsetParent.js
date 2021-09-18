import utils from './utils'

const {getParent} = utils


const getOffsetParent = (ele) => {
  if(utils.isWindow(ele) || ele.nodeType === 9) {
    return null
  }
}