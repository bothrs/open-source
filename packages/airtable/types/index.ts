export type AirtableRecord = {
  [key: string]: AirtableData
}

export type AirtableData = undefined | string | AirtableAttachment[]

export type AirtableAttachment = {
  url: string
  thumbnails: AirtableThumbnails
}

export type AirtableThumbnails = {
  small: AirtableThumbnail
  large: AirtableThumbnail
  full: AirtableThumbnail
}

export type AirtableThumbnail = {
  url: string
  width: number
  height: number
}

export type Environment = {
  app: string
  key?: string
  log?: Function
}

export type SelectOptions = {
  fields?: string[]
  filterByFormula?: string
  maxRecords?: number
  pageSize?: number
  view?: string
  offset?: number
}

export type Packed<T extends FieldSet> = {
  id: string
  fields: T
  createdTime: string
}

export type Unpacked<T extends FieldSet> = T & {
  _id: string
}

export type FieldSet = {
  [key: string]: any
}
