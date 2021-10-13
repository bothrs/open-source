import fs from 'fs'
import path from 'path'
import { ProjectFramework } from '.'
import { converToCss } from './convertToCss'

export const saveDocument = (
  fileName: string,
  fixedJSON: Record<string, any>,
  framework: ProjectFramework
) => {
  const fileDir = path.dirname(fileName)

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true })
  }

  if (framework === 'css') {
    return fs.writeFileSync(fileName, converToCss(fixedJSON), 'utf8')
  } else {
    return fs.writeFileSync(
      fileName,
      'export const theme = ' +
        JSON.stringify(fixedJSON, null, 2) +
        ';\n\n' +
        'export type GeneratedTheme = typeof theme;',
      'utf8'
    )
  }
}
