/* config-overrides.js */
const {
  override,
  fixBabelImports,
  addWebpackResolve
} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
