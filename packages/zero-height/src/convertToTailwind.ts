export const convertToTailwind = (fixedJSON: Record<string, any>): string => {
  //Add all the needed tailwind categories
  const tailwindObject: { [key: string]: { [key: string]: string } } = {
    colors: {},
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
    spacing: {},
  }
  //Go over each key from the zeroheight json eg. 'Colors', 'Components', ..
  Object.keys(fixedJSON).forEach((key) => {
    //Go over each design token within the key object eg. 'Background', 'font-family', 'font-size', ...
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      //Call the recursive function to enrich the tailwindObject object with the correct classes
      writeNestedChildren(
        fixedJSON,
        key,
        designToken,
        tailwindObject,
        designToken
      )
    })
  })
  return JSON.stringify(tailwindObject)
}

const writeNestedChildren = (
  fixedJSON: Record<string, any>,
  key: string,
  designToken: string,
  tailwindObject: { [key: string]: { [key: string]: string } },
  topLevelKey: string
) => {
  //Check if the current design token has a direct corresponding value
  if (fixedJSON[key][designToken].value) {
    //If true, check if the designtoken is equal to a tailwindcss categorie that we set in the beginning (needs formatting before comparing) 
    if (Object.keys(tailwindObject).includes(camalize(topLevelKey))) {
      //If true, add the design token tot the correct category and format the naming to be easly used as a tailwind class
      tailwindObject[camalize(designToken)][
        key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      ] = fixedJSON[key][designToken].value
    } else {
      //If false, this designtoken is a color, we format the naming and place it under the color category
      tailwindObject.colors[
        `${key.toLowerCase()}-${designToken.toLowerCase()}`
      ] = fixedJSON[key][designToken].value
    }
  } else {
    //If false, the value we want is nested deaper. We got over the keys of this object
    Object.keys(fixedJSON[key][designToken]).forEach((test) => {
      //We recall the current fucntion with an object one level deaper
      writeNestedChildren(
        fixedJSON[key],
        designToken,
        test,
        tailwindObject,
        topLevelKey
      )
    })
  }
}

//Camel cases the giver input string
const camalize = function camalize(string_: string) {
  return string_
    .toLowerCase()
    .replace(/[^\dA-Za-z]+(.)/g, (_m, chr) => chr.toUpperCase())
}
