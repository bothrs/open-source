import https from 'https'
import { exit } from 'process'

import { fixFontFamilies } from './fixFontFamilies'
import { promoteDanglingKeyValues } from './promoteDanglingKeyValues'
import { saveDocument } from './saveDocument'
export type ProjectFramework = 'web' | 'expo' | 'css'

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
    if (response.statusCode === undefined) {
      console.error(response.error)
    } else {
      console.error(
        `Request to "${url}" failed with status ${response.statusCode}.`
      )
    }

    return exit(1)
  }

  let fixedJSON = promoteDanglingKeyValues(JSON.parse(response.data || '{}'))

  fixedJSON = fixFontFamilies(fixedJSON, framework)

  saveDocument(fileName, fixedJSON, framework)

  // eslint-disable-next-line sonarjs/no-redundant-jump
  return
}

export default main
