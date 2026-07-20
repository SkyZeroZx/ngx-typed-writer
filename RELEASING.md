# Publishing to npm without `NPM_TOKEN`

This project uses npm trusted publishing with GitHub Actions and OpenID Connect (OIDC). Each release receives a short-lived credential from npm, so no long-lived npm publish token is stored in GitHub.

## One-time npm setup

1. Sign in to [npmjs.com](https://www.npmjs.com/) with an owner of `ngx-typed-writer`.
2. Open the package, then **Settings > Trusted Publisher**.
3. Choose **GitHub Actions** and enter:
   - Organization or user: `SkyZeroZx`
   - Repository: `ngx-typed-writer`
   - Workflow filename: `release.yml`
   - Environment: leave empty
   - Allowed action: `npm publish`
4. Save the trusted publisher.

The workflow filename is case-sensitive and must be only `release.yml`, not `.github/workflows/release.yml`.

### CLI alternative

The npm CLI setup command requires npm 11.15 or newer, npm write access, and account-level 2FA:

```bash
npm install --global npm@11
npm login
npm trust github ngx-typed-writer \
  --repo SkyZeroZx/ngx-typed-writer \
  --file release.yml \
  --allow-publish
```

## Release

1. Merge or push Conventional Commits to `main`:
   - `fix:` creates a patch release.
   - `feat:` creates a minor release.
   - `BREAKING CHANGE:` creates a major release.
2. Open **GitHub > Actions > RELEASE > Run workflow**.
3. Enable `dry_run` for a preview, or leave it disabled to publish.

The workflow installs dependencies, runs lint/build, calculates the version with semantic-release, updates package versions and `CHANGELOG.md`, publishes `dist/libs/ngx-typed-writer` to npm, creates the Git tag, and pushes the release commit.

## Security cleanup

After the first successful OIDC release:

1. Delete the `NPM_TOKEN` repository secret from GitHub; the workflow no longer reads it.
2. In npm package settings, set publishing access to **Require two-factor authentication and disallow tokens**.

Trusted publishing automatically adds npm provenance to the published package.

## Troubleshooting

- `ENEEDAUTH`: verify owner, repository, and `release.yml` exactly match npm's trusted-publisher settings.
- OIDC failures: confirm the workflow has `id-token: write` and uses a GitHub-hosted runner.
- Git push failures: allow GitHub Actions write access to `main`, or adjust the branch protection rule for the release workflow.

Official references:

- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [semantic-release npm trusted publishing](https://github.com/semantic-release/npm#trusted-publishing-from-github-actions)
