import knexlib from 'knex'
import { production } from './knexfile-env.mjs'

export const knex = knexlib(production)
