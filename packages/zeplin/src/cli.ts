#!/usr/bin/env node
import minimist from 'minimist'
import path from 'path'
import { exit } from 'process'

import main, { ProjectFramework } from './index'

interface Arguments extends minimist.ParsedArgs {
  tailwind?: boolean
  token?: string
  projectId?: string
  destination?: string
}

const argv: Arguments = minimist(process.argv.slice(2))

const framework: ProjectFramework = argv.tailwind ? 'tailwind' : 'css'

const zeplinProject = argv.projectId

const fileName = path.join(
  process.cwd(),
  argv.destination ||
    (argv.tailwind ? './tailwindExtend.json' : './variables.css')
)

if (!zeplinProject) {
  console.error('No projectId was given.')
  exit(9)
}
const token = argv.token

if (!token) {
  console.error('No bearer token was given.')
  exit(9)
}
if (!argv.destination) {
  console.warn(`No destination was given, file was created at "${fileName}".`)
}

main(zeplinProject, token, fileName, framework)
