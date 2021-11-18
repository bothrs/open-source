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

  saveDocument(fileName, fixedJSON, framework)
}

export default main
