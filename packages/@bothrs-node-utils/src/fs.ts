/**
 * Read and write from filesystem using promises.
 * @module
 */

import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

export const readFileAsync = promisify(readFile)
export const writeFileAsync = promisify(writeFile)

export function readJSON<T = Record<string, unknown>>(
  fileName: string
): Promise<T> {
  return readFileAsync(fileName, 'utf8').then((data) => JSON.parse(data))
}

export function writeJSON(fileName: string, data: unknown): Promise<void> {
  return writeFileAsync(fileName, JSON.stringify(data), 'utf8')
}
