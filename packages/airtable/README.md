# @bothrs/airtable

Utility methods for talking to Airtable, originating from @bothrs/util

## Getting started

`yarn add @bothrs/airtable`

## Contents

**app**: helper function to fall back to the airtable api link if needed
**headers**: build required headers for an airtable call
**create**: create a new record
**find**: find a record
**first**: return the first record
**select**: select some records
**selectAll**: return all record in a table
**update**: update a record with new data
**remove**: remove a record
**pack**: helper function to wrap data so it has n airtable format
**unpack**: helper function to get the relevant data from an airtable foramtted doc
**byIds**: helper function to write airtable filters in the url
**where**: helper function to write airtable filters in the url
