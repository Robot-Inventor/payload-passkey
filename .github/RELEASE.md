# Release process

This repository keeps two release lines while Payload v4 is in prerelease.

## Payload v3 (`latest`)

`main` targets Payload v3 and publishes stable versions under the `latest` tag. Keep the changesets on this branch as usual.

## Payload v4 (`next`)

`payload-4` targets Payload v4 and publishes prereleases under the `next` tag. The branch has `.changeset/pre.json` with the `next` tag, so `changeset version` and `changeset publish` use prerelease versions and the `next` tag automatically.

Apply Payload v4 fixes only to `payload-4`. Changes that affect both majors should be made on `main` first, then merged or cherry-picked into `payload-4`.

## Making Payload v4 the stable release

1. On `payload-4`, run `bunx changeset pre exit` and `bun run format`, then commit and push. This is the only supported use of `pre exit`; the workflow cannot distinguish it from an accidental exit, so require a review before merging the resulting Version Packages PR.
2. Merge the Version Packages PR that versions `4.0.0` on `payload-4`. The release workflow publishes `4.0.0` under the `latest` tag and removes `pre.json` from the branch.
3. Merge `payload-4` into `main` before releasing anything else from `main`, resolving the Payload version and dependency differences in favor of Payload v4. Update the pinned Payload dev dependencies to the stable release and remove the `next` installation note from `README.md`.
4. Make future stable releases from `main`. Create a `v3` branch from the last Payload v3 release tag if Payload v3 needs further maintenance.

Do not release Payload v3 from `main` between steps 2 and 3; that would move the `latest` tag back to 3.x.

## Payload v3 maintenance

The automated release workflow does not run on a `v3` branch. Publish maintenance releases manually:

1. Add a changeset and run `bunx changeset version` on the `v3` branch, then commit the version and changelog changes.
2. Run `bun run build && bunx changeset publish --tag v3`.

The release workflow rejects `.changeset/pre.json` on `main` and rejects a prerelease version there. On `payload-4`, it rejects a missing `.changeset/pre.json` unless `package.json` already contains a stable `4.x` version. This keeps both release lines on their intended tags.
