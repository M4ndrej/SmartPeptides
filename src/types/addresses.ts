export type CountriesDataList = CountriesData[]

export interface CountriesData {
  code: string
  name: string
  hidden: boolean
  states: State[]
  _links: Links
}

export interface State {
  code: any
  name: string
  hidden: boolean
}

export interface Links {
  self: Self[]
  collection: Collection[]
}

export interface Self {
  href: string
}

export interface Collection {
  href: string
}
