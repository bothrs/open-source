function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function capitalizeEachWord(value: string): string {
  return value.split(' ').map(capitalize).join(' ')
}

export { capitalize, capitalizeEachWord }
