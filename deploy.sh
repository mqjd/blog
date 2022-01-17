#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git config --global user.name "mqjd"
git config --global user.email "1378415278@qq.com"

githubUrl=https://mqjd:${GITHUB_TOKEN}@github.com/mqjd/mqjd.github.io.git
giteeUrl=https://MQJD:${GITEE_TOKEN}@gitee.com/MQJD/mqjd.git master
# codingUrl=htps://JshEHrjrhN:${CODING_TOKEN}@mqjd.coding.net/mqjd/m/blog.git

npm install -legacy-peer-deps
npm install --force

# 部署github
npm run build

# bash ./optimize.sh

cd public
git init
git add -A
git commit -m "来自github actions的自动部署"
git push -f $githubUrl master # 推送到github


# 部署gitee
cd ..
sed -i "s#cdn.jsdelivr.net/gh/mqjd/assets@latest#mqjd.gitee.io/assets#g" gatsby-config.js
npm run build

cd public
git init
git add -A
git commit -m "来自github actions的自动部署"
git push -f $giteeUrl master # 推送到gitee


cd - # 退回开始所在目录
rm -rf public