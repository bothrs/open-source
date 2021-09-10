/**
 *
 * Manage Airtable data based on standard env variables.
 *
 * Example:
 *
 * `await select('Blogposts')` => Load blogposts
 * @module
 */

import {
  create as createPure,
  find as findPure,
  first as firstPure,
  select as selectPure,
  selectAll as selectAllPure,
  update as updatePure,
  remove as removePure,
  Environment,
  FieldSet,
  Packed,
  SelectOptions,
  Unpacked,
} from './airtable'
export { byIds, pack, serialize, unpack, where } from './airtable'

export const env: Environment = {
  log: process.env.AIRTABLE_LOG ? console.log : undefined,
  app: process.env.AIRTABLE_APP || 'http://localhost:20011/',
  key: process.env.AIRTABLE_API_KEY,
}

export async function create<T extends FieldSet>(
  tableName: string,
  fields: T
): Promise<Unpacked<T>> {
  return createPure(env, tableName, fields)
}

export async function find<T extends FieldSet>(
  tableName: string,
  id: string
): Promise<Unpacked<T>> {
  return findPure(env, tableName, id)
}

export async function first<T extends FieldSet>(
  tableName: string,
  filter: SelectOptions = {}
): Promise<T | null> {
  return firstPure(env, tableName, filter)
}

export async function select<T extends FieldSet>(
  tableName: string,
  filter: SelectOptions = {}
): Promise<T[]> {
  return selectPure(env, tableName, filter)
}

export async function selectAll<T extends FieldSet>(
  tableName: string,
  filter: SelectOptions = {},
  prepend: Packed<T>[] = []
): Promise<T[]> {
  return selectAllPure(env, tableName, filter, prepend)
}

export async function update<T extends FieldSet>(
  tableName: string,
  id: string,
  fields: T
): Promise<Unpacked<T>> {
  return updatePure(env, tableName, id, fields)
}

export async function remove(tableName: string, id: string): Promise<FieldSet> {
  return removePure(env, tableName, id)
}
