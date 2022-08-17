export const convertToTailwind = (fixedJSON: Record<string, any>): string => {
  let tailwindObject: { [key: string]: { [key: string]: string } } = {colors: {}, fontFamily: {}, fontSize: {}, fontWeight: {}, lineHeight: {}, spacing: {}};
  Object.keys(fixedJSON).forEach((key) => {
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      writeNestedChildren(fixedJSON, key, designToken, tailwindObject, designToken)
    });
  });
  return JSON.stringify(tailwindObject);
};

const writeNestedChildren = (fixedJSON: Record<string, any>, key: string, designToken: string, tailwindObject: { [key: string]: { [key: string]: string } }, topLevelKey: string) => {
  if(fixedJSON[key][designToken].value) {
    if(Object.keys(tailwindObject).includes(camalize(topLevelKey))) {
      tailwindObject[camalize(designToken)][key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = fixedJSON[key][designToken].value
    } else {
      tailwindObject.colors[`${key.toLowerCase()}-${designToken.toLowerCase()}`] = fixedJSON[key][designToken].value
    }
  } else {
    Object.keys(fixedJSON[key][designToken]).forEach((test) => {
        writeNestedChildren(fixedJSON[key], designToken, test, tailwindObject, topLevelKey)
    })
  }
}

const camalize = function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
};