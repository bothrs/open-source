/**
 * Read and write from filesystem using promises.
 * @module
 */

import { readFile as _readFile, writeFile as _writeFile } from 'fs'

export function readFile(fileName: string, type = 'utf8'): Promise<string> {
  return new Promise((resolve, reject) => {
    _readFile(fileName, type, (error: any, data: any) => {
      error ? reject(error) : resolve(data)
    })
  })
}

export function writeFile(fileName: string, data: string, type = 'utf8') {
  return new Promise((resolve, reject) => {
    _writeFile(fileName, data, type, (error) => {
      error ? reject(error) : resolve(data)
    })
  })
}

export function readJSON(fileName: string) {
  return new Promise((resolve, reject) => {
    _readFile(fileName, 'utf8', (error, data) => {
      error ? reject(error) : resolve(JSON.parse(data))
    })
  })
}

export function writeJSON(fileName: string, data: any) {
  return new Promise((resolve, reject) => {
    _writeFile(fileName, JSON.stringify(data), 'utf8', (error) => {
      error ? reject(error) : resolve(data)
    })
  })
}
