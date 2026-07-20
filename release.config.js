module.exports = {
  branches: ['main'],
  preset: 'conventionalcommits',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', section: 'Refactoring' },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
  },
  releaseRules: [{ type: 'refactor', release: 'patch' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `./CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'npm version ${nextRelease.version} --no-git-tag-version && npm version ${nextRelease.version} --no-git-tag-version --prefix libs/ngx-typed-writer && npm run build',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/libs/ngx-typed-writer',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          `libs/**/package.json`,
          `package.json`,
          `package-lock.json`,
          `CHANGELOG.md`,
        ],
        message:
          'chore(release): -v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
