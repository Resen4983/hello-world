## 常规操作
- 拉取远程仓库代码
`git clone https://github.com/Resen4983/hello-world.git`
- 创建分支(不切换到新创建的分支)
`git branch stage1'
- 切换分支
`git checkout master // 切换到主分支`  
`git checkout stage1 // 切换到指定分支`
- 创建分支(并切换到创建的分支)
`git checkout -b stage1`
- 查看版本状态
`git status`

## 本地创建git仓库并同步到远程
- `mkdir <folder>` //创建本地文件夹
- `cd <folder>`
- `git init` // 在目录内容初始化
- `touch README.md` // 新建文档
- `git add README.md` // 添加到版本控制中
- `git commit -m 'first commit log' // 递交
- 在github上收到创建一个仓库repository
- `git remote add origin <https://github.com/...repository>` // 本地与远程仓库关联
- `git push -u origin master` // 由于新建的远程仓库是空的，所以要加上-u这个参数，了内容之后，下次再上传内容的时候只需下面这样就可以了
- `git push origin master` // 推送内容到远程仓库

