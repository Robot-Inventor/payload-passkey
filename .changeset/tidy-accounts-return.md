---
"payload-passkey": patch
---

fix(deps): update dependency @delmaredigital/payload-better-auth to ^0.14.0

If you applied the `accounts.issuer` migration introduced by `@delmaredigital/payload-better-auth` 0.11.0, review your database schema before upgrading. Better Auth 1.7.3 and later no longer populate `issuer`, so a leftover `NOT NULL` constraint can cause account creation and linking to fail. This requirement comes from the earlier Better Auth upgrade, not from this dependency update itself.

Run `payload migrate:create` in your application and review the generated migration to remove the obsolete `issuer` column and its index. At minimum, remove the `NOT NULL` constraint before or alongside upgrading Better Auth past 1.7.2. No cleanup is needed if your database never had this column or you have already applied the cleanup.
