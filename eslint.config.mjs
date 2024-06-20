import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  rules: {
    'eqeqeq': 'off',
    'vue/eqeqeq': 'off',
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/singleline-html-element-content-newline': 'off',
  },
})
