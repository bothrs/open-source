import { saveDocument } from './saveDocument'
import fs from 'fs'
import * as convertToCss from './convertToCss'
jest.mock('fs')

const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync')

describe('@bothrs/zero-height ~ saveDocument', () => {
  beforeEach(() => {
    mkdirSyncSpy.mockClear()
  })

  test('should create folder if it does not exist', () => {
    //@ts-ignore
    fs.existsSync.mockReturnValue(false)
    saveDocument('folder/test.ts', { test: 'hoit' }, 'web')

    expect(mkdirSyncSpy).toHaveBeenCalledWith('folder', { recursive: true })
    expect(mkdirSyncSpy).toHaveBeenCalled()
  })

  test('should not create folder if it does exist', () => {
    //@ts-ignore
    fs.existsSync.mockReturnValue(true)
    saveDocument('folder/test.ts', { test: 'hoit' }, 'web')

    expect(mkdirSyncSpy).not.toHaveBeenCalled()
  })

  test('should write css file for "css"', () => {
    const mock = jest.spyOn(convertToCss, 'convertToCss')

    saveDocument('folder/test.css', { test: 'hoit' }, 'css')

    expect(mock).toHaveBeenCalled()
  })
})
