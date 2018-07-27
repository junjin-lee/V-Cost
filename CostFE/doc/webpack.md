## webpack config


dev
```js
assetsSubDirectory: 'static',
assetsPublicPath: '/',
proxyTable: {},

// Various Dev Server settings
host: 'localhost', // can be overwritten by process.env.HOST
port: 9528, 

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9000/api"'
})
```

build
```js
// Template for index.html
index: path.resolve(__dirname, '../dist/index.html'),

// Paths
assetsRoot: path.resolve(__dirname, '../dist'),
assetsSubDirectory: 'static',

// you can set by youself according to actual condition
assetsPublicPath: './',



module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"https://localhost/api"'
}


```