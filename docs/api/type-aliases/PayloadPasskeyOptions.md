[**payload-passkey v1.1.0**](../README.md)

***

[payload-passkey](../README.md) / PayloadPasskeyOptions

# Type Alias: PayloadPasskeyOptions\<TModelName\>

> **PayloadPasskeyOptions**\<`TModelName`\> = `object`

Defined in: [types.ts:12](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L12)

## Type Parameters

### TModelName

`TModelName` *extends* `string` = `string`

## Properties

### baseURL

> **baseURL**: `string`

Defined in: [types.ts:75](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L75)

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

Defined in: [types.ts:53](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L53)

Whether to enable compatibility with [Payload TOTP](https://github.com/GeorgeHulpoi/payload-totp).
Set to `true` when using payload-passkey alongside Payload TOTP.

#### Default

```ts
false
```

***

### firstUserAdmin?

> `optional` **firstUserAdmin?**: `boolean` \| `FirstUserAdminOptions`

Defined in: [types.ts:108](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L108)

Automatically make the first registered user an admin.
Enabled by default. Set to false to disable, or provide options to customize.

#### Default

```ts
true
```

#### Examples

```ts
// Disable
betterAuthCollections({
    betterAuthOptions: authOptions,
    firstUserAdmin: false,
})
```

```ts
// Custom roles
betterAuthCollections({
    betterAuthOptions: authOptions,
    firstUserAdmin: {
        adminRole: 'super-admin',
        defaultRole: 'member',
    },
})
```

***

### generateId

> **generateId**: `NonNullable`\<`BetterAuthAdvancedOptions`\[`"database"`\]\>\[`"generateId"`\]

Defined in: [types.ts:113](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L113)

The ID generation strategy for Better Auth records stored through Payload.
If you are using PostgreSQL with default ID generation, set this to "serial".

***

### modelName

> **modelName**: `TModelName`

Defined in: [types.ts:60](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L60)

The singular Better Auth model name for the user records stored in Payload.
The corresponding `userCollection` is normally the plural form of this value,
for example, `"user"` with `"users"` or `"member"` with `"members"`.
If `modelName` ends with `"s"`, the `userCollection` must be the same as `modelName`, for example, `"status"` with `"status"`.

***

### origin?

> `optional` **origin?**: `$PasskeyOptions`\[`"origin"`\]

Defined in: [types.ts:31](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L31)

The origin where passkey registration and authentication take place.
Include the scheme, hostname, and optional port, but do not include a trailing slash.
Multiple origins may be provided when the application is served from more than one origin.
If omitted, the origin from each request is used.

#### Default

The request's `Origin` header

***

### rpID?

> `optional` **rpID?**: `$PasskeyOptions`\[`"rpID"`\]

Defined in: [types.ts:18](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L18)

The WebAuthn relying party ID used to scope passkeys to this website.
This is normally the hostname from `baseURL`, without a protocol, port, or path.

#### Default

The hostname from `baseURL`

***

### rpName?

> `optional` **rpName?**: `$PasskeyOptions`\[`"rpName"`\]

Defined in: [types.ts:23](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L23)

The human-readable name shown by browsers and authenticator devices for this website.

#### Default

```ts
"Better Auth"
```

***

### secret

> **secret**: `string`

Defined in: [types.ts:80](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L80)

The secret Better Auth uses to encrypt, sign, and hash authentication data.
Specify a randomly generated string of 32 characters or more.

***

### sessionRefreshBufferSeconds?

> `optional` **sessionRefreshBufferSeconds?**: `number`

Defined in: [types.ts:47](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L47)

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

Defined in: [types.ts:39](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L39)

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

Defined in: [types.ts:87](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L87)

The origins that are allowed to make browser authentication requests.
Each origin should include its scheme, hostname, and optional port, but no path.
Better Auth trusts `baseURL` automatically; add other frontend origins here,
such as a separate frontend domain or a local development origin.

***

### userCollection

> **userCollection**: `BetterAuthUserCollectionSlug`\<`NoInfer`\<`TModelName`\>\>

Defined in: [types.ts:66](https://github.com/Robot-Inventor/payload-passkey/blob/541eb9e21070f7dbce3b29d8adc3a5fc5a859086/src/types.ts#L66)

The slug of the Payload collection that stores users and should receive passkey
authentication. Authentication must be enabled on this collection. Use the
collection slug corresponding to `modelName`, normally its plural form.
