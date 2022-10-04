module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'avoid',
        trailingComma: 'none',
        endOfLine: 'lf'
      }
    ],
    'no-undef': 'error',
    'no-useless-escape': 'off',
    'no-async-promise-executor': 'off',
    'vue/no-unused-components': 'off',
    'no-prototype-builtins': 'off',
    'vue/multi-word-component-names': 'off', // 关闭检验组件名称
    'vue/require-valid-default-prop': 'off',
    'vue/no-v-model-argument': 'off', // 关闭检验 v-model 必须添加参数
    'vue/no-multiple-template-root': 'off', //关闭检验 模板只能有一个根元素
    'vue/no-mutating-props': 'off', //关闭检验 子组件修改 props
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }]
  }
};
