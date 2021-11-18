export const isVariableAnObject = (variable: any): boolean => {
  return !!variable && typeof variable === 'object' && !Array.isArray(variable)
}
