import { writable } from 'svelte/store'

// Reconnect after 1s, 3s, 6s, ...
export function connectable(url) {
  const subs = []
  let timeout = 60000
  let ws

  function connect() {
    ws = new WebSocket(url)
    ws.onclose = () => setTimeout(connect, (timeout += 1000))
    ws.onerror = ws.close
    ws.onmessage = receive
    ws.onopen = event => {
      receive(event)
      timeout = 1000
    }
    return ws.close
  }

  function receive(event) {
    set(event.data)
  }

  const { set, subscribe } = writable(null, connect)

  return {
    subscribe,
    send(data) {
      if (ws && ws.readyState === ws.OPEN) {
        ws.send(data)
        return true
      }
      console.error('Not open', ws)
      return false
    },
  }
}

export function connectableJSON(url) {
  const { subscribe, send } = connectable(url)
  return {
    subscribe: handler => subscribe(data => handler(data && JSON.parse(data))),
    send: data => send(JSON.stringify(data)),
  }
}
