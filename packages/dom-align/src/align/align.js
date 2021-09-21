import utils from '../utils';
import getVisibleRectForElement from '../getVisibleRectForElement';
import getRegion from '../getRegion';

const doAlign = (el, tgtRegion, align, isTgtRegionVisible) => {
  let points = align.points;
  let offset = align.offset || [];
  let targetOffset = align.targetOffset || [];
  let overflow = align.overflow || {};
  const source = align.source || el;

  offset = [].concat(offset);
  targetOffset = [].concat(targetOffset);
  const newOverflowCfg = {};
  let fail = 0;
  const alwaysByViewport = !!(overflow && overflow.alwaysByViewport);

  const visibleRect = getVisibleRectForElement(source, alwaysByViewport);
  const elRegion = getRegion(source);

  // 将 offset 转换成百分比
  normalizeOffset(offset, elRegion);
  normalizeOffset(targetOffset, tgtRegion);

  let elFuturePos = getElFuturePos(
    elRegion,
    tgtRegion,
    points,
    offset,
    targetOffset,
  );

  let newEleRegion = utils.merge(elRegion, elFuturePos);

  // 当前可视区域不能放下当前节点时，允许调整
  if (
    visibleRect &&
    (overflow.adjustX || overflow.adjustY) &&
    isTgtRegionVisible
  ) {
    
  }

  if (newEleRegion.width !== elRegion.width) {
    utils.css(
      source,
      'width',
      utils.width(source) + newEleRegion.width - elRegion.width,
    );
  }

  if (newEleRegion.height !== elRegion.height) {
    utils.css(
      source,
      'height',
      utils.height(source) + newEleRegion.height - elRegion.width,
    );
  }

  utils.offset(
    source,
    {
      left: newEleRegion.left,
      top: newEleRegion.top,
    },
    {
      useCssRight: align.useCssRight,
      useCssBottom: align.useCssBottom,
      useCssTransform: align.useCssTransform,
      ignoreShake: align.ignoreShake,
    },
  );
};
