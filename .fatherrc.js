
// TODO 获取整个 packages 下的一级目录
export default {
  esm: { type: 'babel' },
  cjs: { type: 'babel' },
  // 用于替换 __VERSION__ pkg.version
  extraBabelPlugins: ['version'],
  pkgs: [
    'align',
    'collapse',
    'dialog'
  ],
}
