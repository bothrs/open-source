import { writable } from 'svelte/store'

export const location = writable(
  process.browser &&
    localStorage.lastLocation &&
    JSON.parse(localStorage.lastLocation),
  () => {
    const navigator = (process.browser && window.navigator) || {}
    let init = false
    if (process.browser) {
      // Get first location as soon as possible
      navigator.geolocation.getCurrentPosition(setLocation, console.error, {
        maximumAge: Infinity,
        enableHighAccuracy: false,
      })
      // Keep watching
      init = navigator.geolocation.watchPosition(setLocation)
    }

    return () => {
      process.browser && navigator.geolocation.clearWatch(init)
    }

    function setLocation(data) {
      data = cloneAsObject(data)
      set(data)
      localStorage.lastLocation = JSON.stringify(data)
    }

    function cloneAsObject(obj) {
      if (obj === null || !(obj instanceof Object)) {
        return obj
      }
      var temp = obj instanceof Array ? [] : {}
      for (var key in obj) {
        temp[key] = cloneAsObject(obj[key])
      }
      return temp
    }
  }
)
