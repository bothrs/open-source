/**
 * Read and write from filesystem using promises.
 * @module
 */

import { readFile as _readFile, writeFile as _writeFile } from 'fs'

export function readFile(fileName: string, type = 'utf8'): Promise<string> {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    _readFile(fileName, type, (err: any, data: any) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function writeFile(fileName: string, data: string, type = 'utf8') {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    _writeFile(fileName, data, type, (err) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function readJSON(fileName: string) {
  return new Promise((resolve, reject) => {
    _readFile(fileName, 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data))
    })
  })
}

export function writeJSON(fileName: string, data: any) {
  return new Promise((resolve, reject) => {
    _writeFile(fileName, JSON.stringify(data), 'utf8', (err) => {
      err ? reject(err) : resolve(data)
    })
  })
}
