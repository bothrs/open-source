import { flattenObject } from "./flattenObject";

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
  let tailwindObject: { [key: string]: { [key: string]: string } } = {};
  //   let tailwindObject: Record<string, Record<string, string>> = {}
  Object.keys(fixedJSON).forEach((key) => {
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      const flattendValues = flattenObject(fixedJSON[key][designToken]);
      // loop over every key of the flattend value
      Object.keys(flattendValues).forEach((value) => {
        const camelCaseValue = camalize(value);
        if (!tailwindObject[camelCaseValue])
          tailwindObject[camelCaseValue] = {}
        if (!fixedJSON[key][designToken].value) {
          const componentValues = flattenObject(fixedJSON[key][designToken]);
          Object.keys(componentValues).forEach((componentToken) => {
            tailwindObject[camelCaseValue][
              designToken
            ] = `${componentValues[componentToken]}`;
          });
        } else {
          // console.log(fixedJSON[key][designToken].value);
        }
      });
    });
  });
  return JSON.stringify(tailwindObject);
};

const camalize = function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
};
