## Introduction

Here you can find a list of all the main utils being exported by this package.
More in depth, generated, documentation can be found on the [gh pages](https://bothrs.github.io/util/).

If you're reading this on the gh pages, use the sidebar on the right!

All standard `typescript` modules can be found in the docs, but there are also a lot of mjs files that could be useful. Here's a list of available mjs modules:

## mjs

The mjs files contain code that could benefit from
some triage; either refactored into `ts` files or removed.

#### airtable-translation.mjs

Download translations table from Airtable and write to file that can be imported.

#### airtable-translations.mjs

Optimistically load translations table from Airtable.

#### cli.mjs

Manage command line.

`console.log(green('Success'))` => Log "success" in green

#### cloudimg.mjs

Demo CDN integration

#### color.mjs

Command line colors

`console.log(green('Success'))` => Log "success" in green

#### connectable.mjs

Svelte store for reconnecting websocket.

#### cookie.mjs

Read and write cookies.

#### copyToClipboard.mjs

Copy to clipboard

#### date.mjs

Manage dates

#### download.mjs

Download files

#### format.mjs

Format strings

#### hash.mjs

Hash shorthands

`const hash = md5('test')`

#### idle.mjs

Svelte store for user inactivity

#### jwt.mjs

`const { sub } = unsafeDecode('eY...')` => Decode JWT

#### knex-env.mjs

Load knex instance with config based on standard env variables.

`import { knex } from 'knex-env'` => Ready to use knex instance

#### knexfile-env.mjs

Knex config based on standard env variables.

#### leaflet.mjs

Load leaflet JS and CSS.

#### loadScript.mjs

Load scripts, stylesheets and CSS.

#### location.mjs

Svelte store for location

#### log.mjs

Stream logs to a file.

#### mailgun.mjs

Send mailgun messages.

#### markdown.mjs

Render basic markdown to HTML.

#### math.mjs

Functions with numbers

#### messenger.mjs

Load Messenger SDK.

#### modal.mjs

Disable scroll behind modals.

#### orientation.mjs

Svelte store for device orientation

#### password.mjs

Hash and verify passwords.

#### sample.mjs

Get a random element from an array.

#### sentry-env.mjs

Initialize Sentry based on standard env variables.

#### smtp.mjs

Send emails with nodemailer based on standard env variables.

#### socket.io.mjs

Connect to a socket.io server.

#### store.mjs

Svelte store helpers

#### theme.mjs

Svelte store for light/dark theme

#### translate.mjs

Translation helpers

#### typeform.mjs

Launch a Typeform widget.

#### voxeet.mjs

Load the Voxeet SDK.

#### xss.mjs

Helpers to protect against XSS
