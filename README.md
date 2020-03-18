# node gm 自动切图生成网页
把一张图片自动切成若干张，并生成网页。

## 1.安装环境
(1)node安装

官网：https://nodejs.org/zh-cn/

测试是否成功安装：控制台输入 npm -v  ,显示版本号即为成功

(2)GraphicsMagick安装

官网：http://www.graphicsmagick.org/download.html

测试是否成功安装，打开安装目录，双击gm.exe,黑色窗口一闪而过


## 2.下载项目

git clone 项目路径


## 3.安装依赖

npm install

## 4.目录结构

app.js /*入口文件*/

config.json /*配置文件，可修改标题、切图数量、生成目录名、网页背景色*/

demo.png /*需要生成网页的图片，命名不能变*/

index.html /*网页模板*/

package.lock.json /*项目配置文件*/


一般把需要生成网页的图替换demo.png，修改config.json中的配置即可。


## 5.生成网页

在当前目录执行命令 node app.js


成功后，在项目生成目录。目录名为config.json中的配置的dirName


