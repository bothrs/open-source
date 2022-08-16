
export const convertToTailwind = (fixedJSON: Record<string, any>): string => {
  // the accepted classes for the text styles, this is used to filter out fields e.g stretch
  // const tailwindAcceptedClassed = [
  //   "colors",
  //   "spacing",
  //   "fontFamily",
  //   "fontSize",
  //   "fontWeight",
  //   "lineHeight",
  // ];
  let tailwindObject: { [key: string]: { [key: string]: string } } = {colors: {}, fontFamily: {}, fontSize: {}, fontWeight: {}, lineHeight: {}, spacing: {}};
  //   let tailwindObject: Record<string, Record<string, string>> = {}
  Object.keys(fixedJSON).forEach((key) => {
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      writeNestedChildren(fixedJSON, key, designToken, tailwindObject)
    });
  });
  return JSON.stringify(tailwindObject);
};

const writeNestedChildren = (fixedJSON: Record<string, any>, key: string, designToken: string, tailwindObject: { [key: string]: { [key: string]: string } }) => {
  if(fixedJSON[key][designToken].value) {
    if(Object.keys(tailwindObject).includes(camalize(designToken))) {
      tailwindObject[camalize(designToken)][key] = fixedJSON[key][designToken].value
    }
  }
  // if (!fixedJSON[key][designToken].value) {
  //   Object.keys(fixedJSON[key][designToken]).forEach((test) => {
  //     const flattendValues = flattenObject(fixedJSON[key][designToken][test]);
  //     Object.keys(flattendValues).forEach((value) => {
  //       const camelCaseValue = camalize(value);
  //       console.log(camelCaseValue)
  //     });
  //   })
    
  // }
}

const camalize = function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
};