#!/usr/bin/env node
import minimist from 'minimist'
import path from 'path'
import { exit } from 'process'
import main, { ProjectFramework } from './index'

const argv = minimist(process.argv.slice(2))

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
  console.warn('No fileName was given, default file will be created.')
}

main(zeroHeightWorkspace, token, fileName, framework)
