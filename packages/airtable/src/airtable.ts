/**
 * Manage Airtable data.
 *
 * Example:
 *
 * `await select({ app: '', key: '' }, 'Blogposts')` => Load blogposts
 * @module
 */

import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'query-string'

import type {
  FieldSet,
  Environment,
  Unpacked,
  SelectOptions,
  Packed,
  SelectAllResponse,
} from './types'

// Internal Methods
// ------------------------------------------------------------------------- /
function fetchWithAxios<T>(
  url: string,
  config: Pick<AxiosRequestConfig<any>, 'data' | 'headers' | 'method'>
): Promise<AxiosResponse<T>> {
  return Axios({
    url,
    ...config,
  }).catch((error) => {
    throw new Error(error.toJSON())
  })
}

export function app(app: string) {
  return app.includes('/') ? app : 'https://api.airtable.com/v0/' + app + '/'
}

export function headers(key: any) {
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

  const response = await fetchWithAxios<Packed<T>>(
    app(environment.app) + tableName,
    {
      method: 'POST',
      headers: headers(environment.key),
      data: {
        fields,
      },
    }
  )

  return unpack(response.data)
}

export async function find<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string
): Promise<Unpacked<T>> {
  environment.log && environment.log('find', tableName, id)

  const response = await fetchWithAxios<Packed<T>>(
    app(environment.app) + tableName + '/' + id,
    {
      headers: headers(environment.key),
    }
  )

  return unpack(response.data)
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

  const response = await fetchWithAxios<SelectAllResponse<T>>(
    app(environment.app) + tableName + '?' + qs.stringify(filter),
    {
      headers: headers(environment.key),
    }
  )

  const { records } = response.data

  if (records) {
    return records.map(unpack)
  }

  console.error(response.data)
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
  const response = await fetchWithAxios<SelectAllResponse<T>>(
    app(environment.app) + tableName + '?' + qs.stringify(filter),
    {
      headers: headers(environment.key),
    }
  )

  const { offset, records } = response.data

  if (offset) {
    return selectAll<T>(environment, tableName, { ...filter, offset }, [
      ...prepend,
      ...records,
    ])
  }
  if (records) {
    return [...prepend, ...records].map(unpack)
  }
  console.error(response.data)
  return []
}

export async function update<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string,
  fields: T
): Promise<Unpacked<T>> {
  environment.log && environment.log('update', tableName, fields)

  const response = await fetchWithAxios<Packed<T>>(
    app(environment.app) + tableName + '/' + id,
    {
      method: 'PATCH',
      headers: headers(environment.key),
      data: { fields },
    }
  )

  return unpack(response.data)
}

export async function remove<T extends FieldSet>(
  environment: Environment,
  tableName: string,
  id: string
): Promise<Unpacked<T>> {
  environment.log && environment.log('remove', tableName, id)

  const response = await fetchWithAxios<Packed<T>>(
    app(environment.app) + tableName + '/' + id,
    {
      method: 'DELETE',
      headers: headers(environment.key),
    }
  )

  return unpack(response.data)
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

export function where(field: string, value: any) {
  return {
    filterByFormula: '{' + field + "}='" + value + "'",
  }
}
