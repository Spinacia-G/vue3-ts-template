# Project Template
基于`Vue3`、`Typescript`、`Vite`的项目模板

## Usage

> This project requires Node >=16 [ES compatibility table](https://compat-table.github.io/compat-table/es2016plus/)

#### Install

```bash
# config registry
npm config set registry https://registry.npm.org/

pnpm install
# If you don't have pnpm installed, run: npm install pnpm -g
```

#### Development

```bash
pnpm dev
```

#### Build

```bash
pnpm build:prod
```

## Project Structure

- `api` 接口
- `assets` 静态资源
- `components` 公共组件
- `config` 全局配置文件
- `layout` 布局
- `router` 路由
- `store` 全局状态管理器
- `styles` 样式文件
- `types` 类型声明
- `utils` 工具库
- `views` 视图

## Features

- 编程语言 [`Typescript`](https://www.typescriptlang.org/docs/handbook/intro.html)
- 构建项目 [`Vite`](https://vitejs.dev/guide/)
  - `vite-plugin-compression` 对打包资源进行gzip压缩
  - [`vite-plugin-svg-icons`](https://github.com/vbenjs/vite-plugin-svg-icons) 引入svg图标的解决方案
- 前端框架 `Vue3`
  - `<script setup>`
- 包管理 `pnpm`
- 路由管理 `Vue Router`
  - 匹配失败的路由跳转到 `/404`
  - token过期跳转到 `/login`
  - 使用 `NProgress` 显示页面加载状态
- 全局状态管理 `Pinia`
  - `setup store` 组合式语法
- UI框架 `Element Plus`
- CSS预编译 `Sass`
- 原子化CSS框架 [`tailwindcss`](https://tailwindcss.com/docs/installation)
  - [Why use Atomic CSS?](https://andreipfeiffer.dev/blog/2022/scalable-css-evolution/part6-atomic-css)
- HTTP库 `Axios`
- Mock [`faker.js`](https://github.com/faker-js/faker)
- 代码规范 `Eslint` + `Prettier` + [`Stylelint`](https://github.com/stylelint-scss/stylelint-scss)
  - 一行80个字符/空格缩进2字符/不使用分号/单引号/不使用尾逗号
- 提交规范 `Husky`
- 其他
  - 几种常用的加密方式：`RSA`、`AES`、`sm2`、`sm4`
  - 登录登出流程：在`cookie`中保存`token`，在顶部导航栏组件的`onMounted`阶段根据token请求用户信息，如果token过期，自动返回到登录页面
  - 命名规范：
    - 组件 / 视图 - `pascal case` _such as `HomePage`_
    - 静态资源 / 工具类方法 - `kebab case` _such as `user-info.png`_
    - 变量 - `lower camel case` _such as `loginApi`_
  - [`VueUse`](https://vueuse.org/functions.html) 基于Vue组合式API的实用工具集
  - `/plugins/zip.py` python脚本文件，将打包文件压缩为zip格式并复制到剪贴板
    - 在`package.json`中配置`zip`脚本，自动执行python指令，参数从命令行传入
    - 压缩文件默认输出到`/release`目录，在`.gitignore`中被忽略

---

## Cheat Sheet

#### window全局变量声明

1、在 `types/window.d.ts` 中配置

```typescript
export {}

declare global {
  interface Window {
    valName: any
  }
}
```

#### UI fit

1、安装依赖包

```bash
pnpm add postcss-pxtorem
pnpm add amfe-flexible
```

2、在 `vite.config.ts` 中配置

```typescript
import postCssPxToRem from 'postcss-pxtorem'
...
css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // UI: 1920 * ...
          rootValue: 192,
          propList: ['*']
        })
      ]
    }
  }
```

3、在 `main.ts` 中引入

```typescript
import 'amfe-flexible'
```

#### Subdomain

在 `nginx.conf` 中配置：

```nginx
server {
  listen 7777;
  server_name localhost;
  
  location / {
    ...
  }
  
  location /subdomain-name {
    alias D:\...\dist;
    index index.html;
    try_files $uri $uri/ /subdomain-name/index.html;
  }
}
```

`/subdomain-name/` 与 `.env` 中的 `VITE_SUB_DOMAIN` 值保持一致
