## N-cost

使用 Vue + Node + Express + MongoDB 搭成本管理平台

# 技术栈  

## 后端技术栈

后端主要采用了：  

1.Node  
2.Express  
3.Mongoose  
4.部分接口遵循Restful风格  
5.MongoDB  

## 前端技术栈

前端主要采用了：  

1.Vue  
2.axios  
3.ElementUI  
4.vue-echarts  
5.vue-router  

还有其他一些琐碎的技术我就不在这里一一列举了。

# 项目效果图  

## 登陆页面

![登录](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/login.png)  

## 用户管理

![用户管理](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/user.png)  

## 类别管理

![类别管理](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/category.png)  

## 费用子项管理

![费用子项管理](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/item.png)  

## 成本管理

![成本管理](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/cost.png)  

## 报表管理

![报表](https://github.com/junjin-lee/V-Cost/blob/master/doc/images/report.png)  


# 快速运行  

1.克隆本项目到本地  

```
https://github.com/junjin-lee/V-Cost.git
```  

2.找到项目中doc下的子目录db下有sql文件，可以导入到mongodb中

3.在vs code中运行v-cost项目  

4.进入到后端项目costBE目录中，在命令行依次输入如下命令：  

```
# 安装依赖
npm install

# 在 localhost:8100 启动项目
npm start
``` 
5.进入到前端项目costFE目录中，在命令行依次输入如下命令：  

```
# 安装依赖
npm install

# 在 localhost:9528 启动项目
npm run serve
```  
 

**OK，至此，服务端就启动成功了，此时我们直接在地址栏输入```http://localhost:9528/```即可访问我们的项目**  
**步骤4、5中需要大家对NodeJS、NPM等有一定的使用经验，不熟悉的小伙伴可以先自行搜索学习下，推荐[Vue官方教程](https://cn.vuejs.org/v2/guide/)。**  


