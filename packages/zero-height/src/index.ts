import fs from 'fs'

import https from 'https'
import path from 'path'
import { exit } from 'process'

export type ProjectFramework = 'web' | 'expo'

const isVariableAnObject = (variable: any): boolean => {
  return variable && typeof variable === 'object' && !Array.isArray(variable)
}

function fixFontFamilies(
  object: Record<string, any>,
  framework: ProjectFramework
) {
  const objectCopy = { ...object }

  Object.entries(objectCopy).forEach(([key, value]) => {
    if (isVariableAnObject(value)) {
      objectCopy[key] = fixFontFamilies(value, framework)
    }

    if (key === 'font-family') {
      const originalFontFamily = value
      const fixedFontFamily = originalFontFamily
        .split(', ')
        [framework === 'expo' ? 1 : 0].split("'")
        .join('')

      if (fixedFontFamily) {
        objectCopy[key] = fixedFontFamily
      }
    }
  })

  return objectCopy
}

const promoteDanglingKeyValues = (object: Record<string, any>) => {
  const objectCopy = { ...object }

  const keys = Object.keys(object)

  if (keys.length === 1 && !isVariableAnObject(object[keys[0]])) {
    return object[keys[0]]
  }

  for (const key of keys) {
    if (isVariableAnObject(object[key])) {
      const result = promoteDanglingKeyValues(object[key])

      objectCopy[key] = result
    }
  }

  return objectCopy
}

export async function main(
  zeroHeightWorkspace: string,
  token: string,
  fileName: string,
  framework: 'web' | 'expo' = 'web'
) {
  const url = `https://${zeroHeightWorkspace}/api/token_file/${token}/share`

  let response: { error?: Error; statusCode?: number; data?: string }

  response = await new Promise((resolve) => {
    const req = https.request(
      {
        hostname: zeroHeightWorkspace,
        port: 443,
        path: `/api/token_file/${token}/share`,
        method: 'GET',
      },
      (res) => {
        res.setEncoding('utf8')

        let responseBody = ''

        res.on('data', (data) => {
          responseBody += data
        })

        res.on('end', function () {
          resolve({ statusCode: res.statusCode, data: responseBody })
        })
      }
    )

    req.on('error', (error) => {
      resolve({ error })
    })

    req.end()
  })

  if (response.statusCode !== 200) {
    if (typeof response.statusCode !== 'undefined') {
      console.error(
        `Request to "${url}" failed with status ${response.statusCode}.`
      )
    } else {
      console.error(response.error)
    }

    return exit(1)
  }

  let fixedJSON = promoteDanglingKeyValues(JSON.parse(response.data || '{}'))

  fixedJSON = fixFontFamilies(fixedJSON, framework)

  const fileDir = path.dirname(fileName)

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true })
  }

  return fs.writeFileSync(
    fileName,
    'export const theme = ' +
      JSON.stringify(fixedJSON, null, 2) +
      ';\n\n' +
      'export type GeneratedTheme = typeof theme;',
    'utf8'
  )
}

export default main
