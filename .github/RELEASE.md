# Release process

This repository keeps two release lines while Payload v4 is in prerelease.

## Payload v3 (`latest`)

`main` targets Payload v3 and publishes stable versions under the `latest` tag. Keep the changesets on this branch as usual.

## Payload v4 (`next`)

`payload-4` targets Payload v4 and publishes prereleases under the `next` tag. The branch has `.changeset/pre.json` with the `next` tag, so `changeset version` and `changeset publish` use prerelease versions and the `next` tag automatically.

Apply Payload v4 fixes only to `payload-4`. Changes that affect both majors should be made on `main` first, then merged or cherry-picked into `payload-4`.

## Making Payload v4 the stable release

1. Run `changeset pre exit` on `payload-4`.
2. Merge `payload-4` into `main`, resolving the Payload version and dependency differences in favor of Payload v4.
3. Let the release workflow publish `4.0.0` under the `latest` tag.
4. Create a `v3` branch from the last Payload v3 release tag if Payload v3 needs further maintenance.
