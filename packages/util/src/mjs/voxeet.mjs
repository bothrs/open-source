import { loadScript } from './loadScript.mjs'

const config = {
  customerKey: process.env.VOXEET_KEY,
  customerSecret: process.env.VOXEET_SECRET,
}

let loading = null
let instances = {}

export async function voxeet(id) {
  if (!id) {
    throw new Error('Conference id is required to start Voxeet')
  }

  await loadScript(
    'https://unpkg.com/@voxeet/voxeet-web-sdk@1.9.3/dist/voxeet-sdk.js',
    'VoxeetSDK'
  )

  if (!instances[id]) {
    instances[id] = new window.VoxeetSdk()
    await instances[id].initialize(config.customerKey, config.customerSecret)
    console.log('Voxeet instances', instances)
  }

  return instances[id]
}

export function startScreenShare(id) {
  return instances[id].startScreenShare(['screen'])
}

export function stopScreenShare(id) {
  return instances[id].stopScreenShare(['screen'])
}
