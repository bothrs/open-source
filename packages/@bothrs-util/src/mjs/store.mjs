import { run_all, not_equal, noop } from 'svelte/internal'
import { readable, writable, get } from 'svelte/store'

import { ls } from './ls.mjs'

export { readable, writable, get }

export const neverP = /*#__PURE__*/ new Promise(() => {})
export const emptyArray = []

// export function loadableBasic(start, value) {
//   const { set, subscribe } = writable(value, start)
//   return {
//     load (invalidate) {
//       console.log('loadableBasic load', invalidate)
//       return Promise.resolve(start(set, invalidate)).then(() => value);
//     },
//     subscribe
//   }
// }

function deep_not_equal(a, b) {
  if (typeof a === 'object' && a && typeof b === 'object' && b) {
    const akeys = Object.keys(a)
    for (let i = 0; i < akeys.length; i++) {
      if (not_equal(a[akeys[i]], b[akeys[i]])) {
        return true
      }
    }
    const bkeys = Object.keys(b)
    for (let i = 0; i < bkeys.length; i++) {
      if (not_equal(a[bkeys[i]], b[bkeys[i]])) {
        return true
      }
    }
  }

  return not_equal(a, b)
}

export function loadable(db, table, filter, value = []) {
  const subscribers = []
  let stop

  if (process.browser && window.__SAPPER__) {
    value =
      window.__SAPPER__.preloaded
        .map(a => a && a['loadable$' + table])
        .find(a => a) || emptyArray
    filter =
      filter ||
      window.__SAPPER__.preloaded
        .map(a => a && a['filter$' + table])
        .find(a => a) ||
      {}
    if (value !== emptyArray) {
      console.log('preloaded', table, value, filter)
    }
  }
  filter = filter || {}

  function set(newValue) {
    if (newValue === value) return
    value = newValue
    subscribers.forEach(s => s[1]())
    subscribers.forEach(s => s[0](value))
  }

  function find(id) {
    if (!process.browser) console.log('find', table, id)
    return db.find(table, id)
  }
  function select() {
    if (!process.browser) console.log('select', table)
    if (filter) {
      return db
        .select(table, filter)
        .then(set)
        .then(() => value)
    }
    set(emptyArray)
    return value
  }
  function create(data) {
    return db.create(table, data).then(a => select() && a)
  }
  function update(id, data) {
    const changed = value.filter(
      item => item._id === id && Object.assign(item, data)
    ).length
    changed && set(value.slice())
    // TODO: check if id
    return db.update(table, id, data)
  }
  function setFilter(newFilter) {
    if (deep_not_equal(newFilter, filter)) {
      filter = newFilter
      set(emptyArray)
      return true
    }
  }

  return {
    create,
    find,
    select,
    update,
    setFilter,
    set,
    get() {
      return value
    },
    subscribe(run, invalidate = noop) {
      const subscriber = [run, invalidate]
      subscribers.push(subscriber)
      run(value)

      return function () {
        const index = subscribers.indexOf(subscriber)
        if (index !== -1) subscribers.splice(index, 1)
      }
    },
  }
}

export function readableAsync(update, value) {
  return readable(value, set => {
    let inited = false
    return update(prom => {
      if (prom && prom.then) {
        prom.then(set)
        if (!inited) {
          set(value)
        }
      } else {
        set(prom)
      }
      inited = true
    })
  })
}

export function derivedAsync(stores, fn = () => {}, value = {}) {
  const single = !Array.isArray(stores)
  if (single) stores = [stores]

  const auto = fn.length < 2

  return readableAsync(set => {
    let inited = false
    const values = []

    let pending = 0

    const sync = () => {
      if (pending) return
      const result = fn(single ? values[0] : values, set)
      if (auto && value !== (value = result)) set(result)
    }

    const unsubscribers = stores.map((store, i) =>
      store.subscribe(
        value => {
          values[i] = value
          pending &= ~(1 << i)
          if (inited) sync()
        },
        () => {
          pending |= 1 << i
        }
      )
    )

    inited = true
    sync()

    return function stop() {
      run_all(unsubscribers)
    }
  }, value)
}

export function crudLocal(key) {
  const prefix = key + '/'
  const subscribers = []
  let stop
  let value = []

  function set(newValue) {
    if (newValue === value) return
    value = newValue
    subscribers.forEach(s => s[1]())
    subscribers.forEach(s => s[0](value))
  }

  function find(id) {
    return ls(prefix + id)
  }
  function select() {
    console.log('select', key)
    return process.browser
      ? Object.keys(localStorage)
          .filter(key => key.startsWith(prefix))
          .map(key => ls(key))
      : value
  }
  function create(data) {
    data.id = Math.random().toString()
    data.createdAt = new Date().toJSON()
    data.updatedAt = new Date().toJSON()
    return ls(prefix + data.id, data) && set(select()) && data
  }
  function update(id, data) {
    const existing = ls(prefix + id)
    Object.assign(
      existing,
      {
        updatedAt: new Date().toJSON(),
      },
      data
    )
    // TODO: check if id
    return ls(prefix + id, data) && set(select()) && data
  }
  function remove(id) {
    const existing = ls(prefix + id)
    if (existing) {
      delete localStorage[prefix + id]
      set(select())
    }
  }

  return {
    create,
    find,
    select,
    update,
    remove,
    subscribe(run, invalidate = noop) {
      if (subscribers.length === 0) {
        set(select())
      }

      const subscriber = [run, invalidate]
      subscribers.push(subscriber)
      run(value)

      return function () {
        const index = subscribers.indexOf(subscriber)
        if (index !== -1) subscribers.splice(index, 1)
      }
    },
  }
}

export function writableLocal(key, value, update) {
  if (process.browser && window.localStorage[key]) {
    value = ls(key)
  }
  const { set, subscribe } = writable(value, update)
  return {
    set(v) {
      set(v)
      setTimeout(() => ls(key, v), 16)
    },
    subscribe,
  }
}

export function sortBy(arr, field) {
  return arr.slice().sort((a, b) => {
    return a[field] < b[field] ? -1 : a[field] === b[field] ? 0 : 1
  })
}
