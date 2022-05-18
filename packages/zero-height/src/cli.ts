#!/usr/bin/env node
import minimist from 'minimist'
import path from 'path'
import { exit } from 'process'

import main, { ProjectFramework } from './index'

interface Arguments extends minimist.ParsedArgs {
  expo?: boolean
  css?: boolean
  token?: string
  workspace?: string
  destination?: string
}

const argv: Arguments = minimist(process.argv.slice(2))

const framework: ProjectFramework = argv.expo
  ? 'expo'
  : argv.css
  ? 'css'
  : 'web'

const token = argv.token || process.env.ZERO_HEIGHT_TOKEN

const zeroHeightWorkspace = argv.workspace

const fileName = path.join(
  process.cwd(),
  argv.destination || './zero-height-theme.ts'
)

if (!zeroHeightWorkspace) {
  console.error('No workspace was given.')
  exit(9)
}
if (!token) {
  console.error('No token was given.')
  exit(9)
}
if (!argv.destination) {
  console.warn(`No destination was given, file was created at "${fileName}".`)
}

main(zeroHeightWorkspace, token, fileName, framework)
