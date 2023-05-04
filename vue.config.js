const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    externals: {
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://m.maoyan.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/bmap": {
        target: "https://restapi.amap.com",
        changeOrigin: true,
        pathRewrite: {
          "^/bmap": "",
        },
      }
    },
  },
});
