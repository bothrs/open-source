import https from 'https'
import { exit } from 'process'

import { fixFontFamilies } from './fixFontFamilies'
import { promoteDanglingKeyValues } from './promoteDanglingKeyValues'
import { saveDocument } from './saveDocument'
export type ProjectFramework = 'web' | 'expo' | 'css' | 'tailwind'

export async function main(
  zeroHeightWorkspace: string,
  token: string,
  fileName: string,
  framework: ProjectFramework = 'web'
) {
  const url = `https://${zeroHeightWorkspace}/api/token_file/${token}/share`

  const response: { error?: Error; statusCode?: number; data?: string } =
    await new Promise((resolve) => {
      const request = https.request(
        {
          hostname: zeroHeightWorkspace,
          port: 443,
          path: `/api/token_file/${token}/share`,
          method: 'GET',
        },
        (result) => {
          result.setEncoding('utf8')

          let responseBody = ''

          result.on('data', (data) => {
            responseBody += data
          })

          result.on('end', function () {
            resolve({ statusCode: result.statusCode, data: responseBody })
          })
        }
      )

      request.on('error', (error) => {
        resolve({ error })
      })

      request.end()
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
  let fixedJSON = JSON.parse(response.data || '{}')
  if (framework !== 'tailwind') {
    fixedJSON = promoteDanglingKeyValues(fixedJSON)
    fixedJSON = fixFontFamilies(fixedJSON, framework)
  }
  saveDocument(fileName, fixedJSON, framework)

  // eslint-disable-next-line sonarjs/no-redundant-jump
  return
}

export default main
