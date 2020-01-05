## yarn
- 初始化
`yarn init -y` -y为所以选项默认
- 安装依赖
`yarn`或者`yarn install`,如果线上环境不安装dependencies的话就`yarn install --production`
- 添加模块 `-D/--dev` 为一些开发环境使用到的模块,非运行时引用的,一次添加多个可以用空格隔开
`yarn add -D webpack webpack-dev-server'
- 添加指定版本模块包
'yarn add package-name@version'
- 移除依赖包
`yarn remove [package]`
- 跟新模块包
`yarn upgrade package@version