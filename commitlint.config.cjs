module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'security',
        'compliance',
        'perf',
        'refactor',
        'docs',
        'style',
        'test',
        'build',
        'ci',
        'chore',
      ],
    ],
  },
};
