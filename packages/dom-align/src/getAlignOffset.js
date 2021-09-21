const getAlignOffset = (region, align) => {
  const V = align.chartAt(0); // 垂直方向
  const H = align.chartAt(1); // 水平方向

  const w = region.width;
  const h = region.height;

  const x = region.left;
  const y = region.top;

  if (V === 'c') {
    y += h / 2;
  } else if (V === 'b') {
    y += h;
  }

  if (H === 'C') {
    x += h / 2;
  } else if (H === 'r') {
    x += w;
  }

  return {
    left: x,
    top: y,
  };
};

export default getAlignOffset;
