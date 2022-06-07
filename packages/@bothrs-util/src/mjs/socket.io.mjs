import { loadScript } from './loadScript.mjs'

// Lazy socket.io
export let instance

export function init() {
  if (!instance) {
    instance = loadScript('/socket.io/socket.io.js', 'socket_io').then(() => {
      return window.io()
    })
  }
  return instance
}

export function emit(a, b) {
  return init().then(io => io.emit(a, b))
}

export function on(a, b) {
  return init().then(io => io.on(a, b))
}

export function off(a, b) {
  return init().then(io => io.off(a, b))
}
