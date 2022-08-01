import fs from "fs";
import path from "path";

import { convertToCss } from "./convertToCss";
// import { convertToTailwind } from "./convertToTailwind";

import type { ProjectFramework } from ".";
import { convertToTailwind } from "./convertToTailwind";

export const saveDocument = (
  fileName: string,
  fixedJSON: Record<string, any>,
  framework: ProjectFramework
) => {
  const fileDirectory = path.dirname(fileName);

  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }

  switch (framework) {
    case "css":
      return fs.writeFileSync(fileName, convertToCss(fixedJSON), "utf8");
    case "tailwind":
      return fs.writeFileSync(fileName, convertToTailwind(fixedJSON), "utf8");
    default:
      return fs.writeFileSync(
        fileName,
        "export const theme = " +
          JSON.stringify(fixedJSON, null, 2) +
          ";\n\n" +
          "export type GeneratedTheme = typeof theme;",
        "utf8"
      );
  }
};
