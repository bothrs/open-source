import { serialize } from './url.mjs'

const baseUrl = '/api/'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export function create(tableName, fields) {
  return fetch(baseUrl + tableName, {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body: JSON.stringify(fields),
  }).then(r => r.json())
}

export function find(tableName, id) {
  return fetch(baseUrl + tableName + '/' + id, {
    credentials: 'same-origin',
    headers,
  }).then(r => r.json())
}

export function remove(tableName, id) {
  return fetch(baseUrl + tableName + '/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers,
  }).then(r => r.json())
}

export function select(tableName, filter) {
  return fetch(baseUrl + tableName + '?' + serialize(filter), {
    credentials: 'same-origin',
    headers,
  }).then(r => r.json())
}

export function update(tableName, id, fields) {
  return fetch(baseUrl + tableName + '/' + id, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers,
    body: JSON.stringify(fields),
  }).then(r => r.json())
}
