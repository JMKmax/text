/*
* @Author: macnookpro
* @Date:   2019-05-30 23:23:21
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-30 23:23:33
*/
const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      	path.resolve(__dirname, './src/assets/less/index.less')
      ]
    }
  }
}