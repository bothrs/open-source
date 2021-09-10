#!/usr/bin/env node
import minimist from 'minimist'
import path from 'path'
import { exit } from 'process'
import main, { ProjectFramework } from './index'

interface Args extends minimist.ParsedArgs {
  expo?: boolean
  token?: string
  workspace?: string
  destination?: string
}

const argv: Args = minimist(process.argv.slice(2))

const framework: ProjectFramework = argv.expo ? 'expo' : 'web'

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
if (!argv.file) {
  console.warn(`No fileName was given, file was created at "${fileName}".`)
}

main(zeroHeightWorkspace, token, fileName, framework)
