[**payload-passkey v0.3.0**](../README.md)

***

[payload-passkey](../README.md) / PayloadPasskeyOptions

# Type Alias: PayloadPasskeyOptions\<TModelName\>

> **PayloadPasskeyOptions**\<`TModelName`\> = `object`

Defined in: [types.ts:11](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L11)

## Type Parameters

### TModelName

`TModelName` *extends* `string` = `string`

## Properties

### baseURL

> **baseURL**: `string`

Defined in: [types.ts:74](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L74)

The canonical URL of the application that hosts Better Auth.
Do not include a trailing slash. `http://localhost` and
`http://localhost:<port>` are valid for local development; every other host
must use `https://`.

#### Examples

```ts
"http://localhost:3000"
```

```ts
"https://example.com"
```

***

### enableTotpCompatibility?

> `optional` **enableTotpCompatibility?**: `boolean`

Defined in: [types.ts:52](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L52)

Whether to enable compatibility with [Payload TOTP](https://github.com/GeorgeHulpoi/payload-totp).
Set to `true` when using payload-passkey alongside Payload TOTP.

#### Default

```ts
false
```

***

### generateId

> **generateId**: `NonNullable`\<`BetterAuthAdvancedOptions`\[`"database"`\]\>\[`"generateId"`\]

Defined in: [types.ts:91](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L91)

The ID generation strategy for Better Auth records stored through Payload.
If you are using PostgreSQL with default ID generation, set this to "serial".

***

### modelName

> **modelName**: `TModelName`

Defined in: [types.ts:59](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L59)

The singular Better Auth model name for the user records stored in Payload.
The corresponding `userCollection` is normally the plural form of this value,
for example, `"user"` with `"users"` or `"member"` with `"members"`.
If `modelName` ends with `"s"`, the `userCollection` must be the same as `modelName`, for example, `"status"` with `"status"`.

***

### origin?

> `optional` **origin?**: `$PasskeyOptions`\[`"origin"`\]

Defined in: [types.ts:30](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L30)

The origin where passkey registration and authentication take place.
Include the scheme, hostname, and optional port, but do not include a trailing slash.
Multiple origins may be provided when the application is served from more than one origin.
If omitted, the origin from each request is used.

#### Default

The request's `Origin` header

***

### rpID?

> `optional` **rpID?**: `$PasskeyOptions`\[`"rpID"`\]

Defined in: [types.ts:17](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L17)

The WebAuthn relying party ID used to scope passkeys to this website.
This is normally the hostname from `baseURL`, without a protocol, port, or path.

#### Default

The hostname from `baseURL`

***

### rpName?

> `optional` **rpName?**: `$PasskeyOptions`\[`"rpName"`\]

Defined in: [types.ts:22](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L22)

The human-readable name shown by browsers and authenticator devices for this website.

#### Default

```ts
"Better Auth"
```

***

### secret

> **secret**: `string`

Defined in: [types.ts:79](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L79)

The secret Better Auth uses to encrypt, sign, and hash authentication data.
Specify a randomly generated string of 32 characters or more.

***

### sessionRefreshBufferSeconds?

> `optional` **sessionRefreshBufferSeconds?**: `number`

Defined in: [types.ts:46](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L46)

The amount of time, in seconds, reserved at the end of a session's lifetime for
refreshing it. A larger value refreshes sessions earlier. This must be a non-negative
integer smaller than `sessionSeconds`, and the resulting refresh interval must be longer
than 60 seconds.

#### Default

```ts
120 (2 minutes)
```

***

### sessionSeconds?

> `optional` **sessionSeconds?**: `number`

Defined in: [types.ts:38](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L38)

The maximum lifetime of a Payload and Better Auth session, in seconds.
This value is also used as the Payload user's `auth.tokenExpiration`, so that
collection setting must match this option when it is configured explicitly.
This must be a positive integer.

#### Default

```ts
7200 (2 hours)
```

***

### trustedOrigins

> **trustedOrigins**: `string`[]

Defined in: [types.ts:86](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L86)

The origins that are allowed to make browser authentication requests.
Each origin should include its scheme, hostname, and optional port, but no path.
Better Auth trusts `baseURL` automatically; add other frontend origins here,
such as a separate frontend domain or a local development origin.

***

### userCollection

> **userCollection**: `BetterAuthUserCollectionSlug`\<`NoInfer`\<`TModelName`\>\>

Defined in: [types.ts:65](https://github.com/Robot-Inventor/payload-passkey/blob/bb4526712d856655a77d567b75a1d7b2e27568e5/src/types.ts#L65)

The slug of the Payload collection that stores users and should receive passkey
authentication. Authentication must be enabled on this collection. Use the
collection slug corresponding to `modelName`, normally its plural form.
