# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Branches

| Branch Name | Features |
| :-- | :-- |
| [main](https://github.com/SpinaciaKeh/vue3-ts-template/tree/main) | [base features](#features) |
| [map-2d](https://github.com/SpinaciaKeh/vue3-ts-template/tree/map-2d) | [base features](#features) & [map class](#map-features) (with openlayers) |
| map-3d | [base features](#features) & map class (with Cesium) (**to-do**) |

## Project Structure

- `api` 接口
- `asserts` 静态资源
- `components` 公共组件
- `config` 全局配置文件
- `router` 路由
- `store` 全局状态管理器
- `styles` 样式文件
- `types` 类型声明
- `utils` 工具库
- `views` 视图

## Features

- 编程语言 `Typescript`
- 构建项目 `Vite`
- 前端框架 `Vue3`
- 包管理 `pnpm`
- 路由管理 `Vue Router`
  - 匹配失败的路由跳转到`/404`
  - token过期跳转到`/login`
  - 使用`NProgress`显示页面加载状态
- 状态管理 `Pinia`
  - `setup store`
- UI框架 `Element Plus`
  - 基于插件`unplugin-vue-components`和`unplugin-auto-imports`的组件自动导入
- CSS预编译 `Sass`
  - css reset
  - 响应式布局
  - 在`/styles/variables.scss`中创建的全局变量，不需要显示导入
- HTTP库 `Axios`
  - 基础的封装
- 代码规范 `Eslint` + `Prettier` + `Stylelint`
  - `[stylelint-scss](https://github.com/stylelint-scss/stylelint-scss)`规则根据个人习惯进行配置
  - 基于插件`eslint-config-prettier`和`eslint-plugin-prettier`处理`eslint`和`prettier`的冲突
  - 配置脚本`lint`、`format`和`lint:style`
- 提交规范 `Commitlint`(**to-do**) + `Husky`
- 其他
  - 一个完整的登录登出逻辑，在`cookie`中保存`token`
  - 打包完成后自动压缩成`.zip`文件并存放到`/release`目录下 (**to-do**)
  - `[VueUse](https://vueuse.org/functions.html)` 基于Vue组合式API的实用工具集
    - `[useWebsocket](https://github.com/vueuse/vueuse/blob/aca6a79227f7f8b06760d756dfbb4cc5958b445d/packages/core/useWebSocket/index.md)` 通过`protocols`携带`token`
    - `[onClickOutside](https://github.com/vueuse/vueuse/blob/aca6a79227f7f8b06760d756dfbb4cc5958b445d/packages/core/onClickOutside/index.md)`
  - unit test (**to-do**)

## Map Features

- 封装地图相关的一些常用功能 (**to-do**)
