###  更新fork别人的仓库代码至最新版本

1. 首先将别人的仓库添加到你的上游远程，通常命名为upstream.
git remote add upstream url(表示原作者仓库)
2. 用git remote -v可以看到一个origin是自己的，另外一个upstream原作者。
3. 更新代码：
git fetch upstream //去拉去原作者的仓库更新
git checkout master //切换到自己的master
git merge upstream/master //merge或者rebase到你的master