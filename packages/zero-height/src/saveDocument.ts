import fs from 'fs'
import path from 'path'

import { convertToCss } from './convertToCss'

import type { ProjectFramework } from '.'

export const saveDocument = (
  fileName: string,
  fixedJSON: Record<string, any>,
  framework: ProjectFramework
) => {
  const fileDirectory = path.dirname(fileName)

  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true })
  }

  return framework === 'css'
    ? fs.writeFileSync(fileName, convertToCss(fixedJSON), 'utf8')
    : fs.writeFileSync(
        fileName,
        'export const theme = ' +
          JSON.stringify(fixedJSON, null, 2) +
          ';\n\n' +
          'export type GeneratedTheme = typeof theme;',
        'utf8'
      )
}
