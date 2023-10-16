module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    // off/0 关闭规则；warn/1 启用并视作警告；error/2 启用并视作错误
    // 生产环境不要使用console和debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许使用any类型
    '@typescript-eslint/no-explicit-any': ['off'],
    // 允许使用空函数
    '@typescript-eslint/no-empty-function': ['off'],
    // 允许使用ts-ignore
    '@typescript-eslint/ban-ts-ignore': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off']
  }
}
