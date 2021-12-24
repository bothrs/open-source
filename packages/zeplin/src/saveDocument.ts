import fs from 'fs'
import path from 'path'

export const saveDocument = (fileName: string, fixedJSON: string) => {
  const fileDir = path.dirname(fileName)

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true })
  }
  return fs.writeFileSync(fileName, fixedJSON, 'utf8')
}
