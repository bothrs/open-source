import fs from 'fs'
import path from 'path'

export const saveDocument = (fileName: string, fixedJSON: string) => {
  const fileDirectory = path.dirname(fileName)

  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true })
  }
  return fs.writeFileSync(fileName, fixedJSON, 'utf8')
}
