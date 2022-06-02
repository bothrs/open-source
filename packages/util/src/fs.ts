/**
 * Read and write from filesystem using promises.
 * @module
 */

import { readFile, writeFile } from 'node:fs'
import * as util from 'node:util'

export const readFileAsync = util.promisify(readFile)
export const writeFileAsync = util.promisify(writeFile)

export function readJSON<T = Record<string, unknown>>(
  fileName: string
): Promise<T> {
  return readFileAsync(fileName, 'utf8').then((data) => JSON.parse(data))
}

export function writeJSON(fileName: string, data: any): Promise<void> {
  return writeFileAsync(fileName, JSON.stringify(data), 'utf8')
}
