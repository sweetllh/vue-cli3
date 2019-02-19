module.exports = {
    //baseUrl  : process.env.NODE_ENV === "production" ? "./": "/",
    publicPath: process.env.NODE_ENV === "production" ? "./": "/",
    outputDir: 'dist',
    assetsDir: '',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
    devServer      : {
        open: true,
        // host   : '192.168.0.118',
        // port   : 8080,
        https  : false,
        hotOnly: false,
        proxy  : null,
        before : app => {
        }
      },
}