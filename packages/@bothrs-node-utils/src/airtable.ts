/**
 * Manage Airtable data.
 *
 * Example:
 *
 * `await select({ app: '', key: '' }, 'Blogposts')` => Load blogposts
 * @module
 */

import fetch from 'node-fetch'

import { serialize } from './url'

import type { Response } from 'node-fetch'

export function app(app: string) {
  return app.includes('/') ? app : 'https://api.airtable.com/v0/' + app + '/'
}

export function headers(key?: string) {
  if (!key) {
    throw new Error('AIRTABLE_API_KEY is a required env variable')
  }
  return {
    Authorization: 'Bearer ' + key,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export async function create<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  fields: T
): Promise<Unpacked<T>> {
  environment.log && environment.log('create', tableName, fields)
  const body = await fetch(app(environment.app) + tableName, {
    method: 'POST',
    headers: headers(environment.key),
    body: JSON.stringify({ fields }),
  }).then((r: Response) => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function find<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string
): Promise<Unpacked<T>> {
  environment.log && environment.log('find', tableName, id)
  const body = await fetch(app(environment.app) + tableName + '/' + id, {
    headers: headers(environment.key),
  }).then((r: Response) => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function first<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  filter: SelectOptions = {}
): Promise<Unpacked<T> | null> {
  environment.log && environment.log('first', tableName, filter)
  const items = await select<T>(environment, tableName, filter)
  return items.length > 0 ? items[0] : null
}

export async function select<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  filter: SelectOptions = {}
): Promise<Unpacked<T>[]> {
  environment.log && environment.log('select', tableName, filter)
  const body = await fetch(
    app(environment.app) + tableName + '?' + serialize(filter),
    {
      headers: headers(environment.key),
    }
  ).then((r: Response) => r.json())
  const { error, records } = body
  if (error) {
    throw new Error(error.message)
  }
  if (records) {
    return records.map(unpack)
  }
  console.error(body)
  return []
}

export async function selectAll<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  filter: SelectOptions = {},
  prepend: Packed<T>[] = []
): Promise<Unpacked<T>[]> {
  environment.log &&
    environment.log('selectAll', tableName, filter, prepend.length)
  const body = await fetch(
    app(environment.app) + tableName + '?' + serialize(filter),
    {
      headers: headers(environment.key),
    }
  ).then((r: Response) => r.json())
  const { error, offset, records } = body
  if (error) {
    throw new Error(error.message)
  }
  if (offset) {
    return selectAll<T>(
      environment,
      tableName,
      { ...filter, offset },
      // eslint-disable-next-line unicorn/prefer-spread
      prepend.concat(records)
    )
  }
  if (records) {
    // eslint-disable-next-line unicorn/prefer-spread
    return prepend.concat(records).map(unpack)
  }
  console.error(body)
  return []
}

export async function update<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string,
  fields: T
): Promise<Unpacked<T>> {
  environment.log && environment.log('update', tableName, fields)
  const body = await fetch(app(environment.app) + tableName + '/' + id, {
    method: 'PATCH',
    headers: headers(environment.key),
    body: JSON.stringify({ fields }),
  }).then((r: Response) => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function remove<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string
): Promise<Unpacked<T>> {
  environment.log && environment.log('remove', tableName, id)
  const body = await fetch(app(environment.app) + tableName + '/' + id, {
    method: 'DELETE',
    headers: headers(environment.key),
  }).then((r: Response) => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

// Helpers

export function pack<T extends FieldSet & { _id: string }>(
  fields: Unpacked<T>
): Packed<FieldSet> {
  return {
    id: fields._id,
    fields: { ...fields, _id: null, createdTime: null },
    createdTime: fields.createdTime,
  }
}

export function unpack<T extends FieldSet>({
  id: _id,
  fields,
  createdTime,
}: Packed<T>): Unpacked<T> {
  return {
    _id,
    createdTime,
    ...fields,
  }
}

// Filters

export function byIds(ids: string[]) {
  return {
    filterByFormula: "OR(RECORD_ID()='" + ids.join("',RECORD_ID()='") + "')",
  }
}

export function where(field: string, value: string) {
  return {
    filterByFormula: '{' + field + "}='" + value + "'",
  }
}

// TypeScript

export interface AirtableRecord {
  [key: string]: AirtableData
}

export type AirtableData = undefined | string | AirtableAttachment[]

export interface AirtableAttachment {
  url: string
  thumbnails: AirtableThumbnails
}

export interface AirtableThumbnails {
  small: AirtableThumbnail
  large: AirtableThumbnail
  full: AirtableThumbnail
}

export interface AirtableThumbnail {
  url: string
  width: number
  height: number
}

export interface Environment {
  app: string
  key?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log?: any
}

export interface SelectOptions {
  fields?: string[]
  filterByFormula?: string
  maxRecords?: number
  pageSize?: number
  view?: string
  offset?: number
}

export interface Packed<T extends FieldSet> {
  id: string
  fields: T
  createdTime: string
}

export type Unpacked<T extends FieldSet> = T & {
  _id: string
}

export interface FieldSet {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
