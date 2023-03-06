import https from 'https'
import { exit } from 'process'

import { convertToCss } from './convertToCss'
import { convertToTailwind } from './convertToTailwind'
import { saveDocument } from './saveDocument'
export type ProjectFramework = 'tailwind' | 'css'

export default async function main(
  zeplinProject: string,
  token: string,
  fileName: string,
  framework: ProjectFramework = 'css'
) {
  const url = `https://api.zeplin.dev/v1/projects/${zeplinProject}/design_tokens`

  const response: { error?: Error; statusCode?: number; data?: string } =
    await new Promise((resolve) => {
      const request = https.request(
        {
          hostname: 'api.zeplin.dev',
          port: 443,
          path: `/v1/projects/${zeplinProject}/design_tokens`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  let fixedJSON: string = ''
  framework === 'tailwind'
    ? (fixedJSON = convertToTailwind(JSON.parse(response.data || '{}')))
    : (fixedJSON = convertToCss(JSON.parse(response.data || '{}')))

  saveDocument(fileName, fixedJSON)

  // eslint-disable-next-line sonarjs/no-redundant-jump
  return
}
