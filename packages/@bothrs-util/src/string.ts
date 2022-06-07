function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function capitalizeEachWord(value: string, delimiter = ' '): string {
  return value.split(delimiter).map(capitalize).join(delimiter)
}

export { capitalize, capitalizeEachWord }
