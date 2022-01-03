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

  let response: { error?: Error; statusCode?: number; data?: string }

  response = await new Promise((resolve) => {
    const req = https.request(
      {
        hostname: 'api.zeplin.dev',
        port: 443,
        path: `/v1/projects/${zeplinProject}/design_tokens`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  let fixedJSON: string = ''
  framework === 'tailwind'
    ? (fixedJSON = convertToTailwind(JSON.parse(response.data || '{}')))
    : (fixedJSON = convertToCss(JSON.parse(response.data || '{}')))

  saveDocument(fileName, fixedJSON)

  return
}

export default main
