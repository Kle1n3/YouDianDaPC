const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    //配置svg-sprite-loader    
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/icons'))
      .end();
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(path.resolve('./src/icons')) //处理svg目录      
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
})
