// https://stylelint.io/user-guide/configure/

/** @type {import('stylelint').Config}*/
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  overrides: [
    {
      files: ['**/*.(html,vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [],
  rules: {
    'import-notation': null,
    'hue-degree-notation': null,
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'custom-property-pattern': null,
  },
}
