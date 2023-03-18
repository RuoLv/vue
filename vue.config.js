module.exports = {
  devServer: {
    port: 8999, //  端口号的配置
    open: true,// 自动打开浏览器
    proxy: {
      //名字可以自定义，这里我用的是api
      '/conn.php': {
        target: 'http://43.143.44.146',//设置你调用的接口域名和端口号
        changeOrigin: true,
        rewrite:(path)=>path.replace(/^\/conn\.php/,"/conn.php")
      }
    }
  } ,
  lintOnSave: false
}