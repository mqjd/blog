#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

npm audit fix --force

npm install -legacy-peer-deps
# 生成静态文件
npm run build 

# 进入生成的文件夹
cd public

# deploy to github
githubUrl=https://mqjd:${GITHUB_TOKEN}@github.com/mqjd/mqjd.github.io.git
git config --global user.name "mqjd"
git config --global user.email "1378415278@qq.com"

git init
git add -A
git commit -m "来自github actions的自动部署"
git push -f $githubUrl master # 推送到github

cd - # 退回开始所在目录
rm -rf public