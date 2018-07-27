// vue.config.js
// see https://github.com/marcelklehr/toposort/issues/20
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 9528,
    proxy: {
      '/api': {
        target: 'http://localhost:8100'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      console.log(args);

      args[0].chunksSortMode = 'none';
      return args;
    });
  }
};
