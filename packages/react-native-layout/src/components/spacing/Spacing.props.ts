export type SpacingProps =
  | { width?: number; height?: number; flex?: never }
  | { width?: never; height?: never; flex: boolean };
