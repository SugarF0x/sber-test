export interface IPost {
  id: string,
  type: string,
  url: string,
  created_at: string, // can be turned to date
  company: string,
  company_url: string,
  location: string,
  title: string,
  description: string, // can be used as elements
  how_to_apply: string, // can be used as elements
  company_logo: any
}

export interface IAction {
  type: string
  data?: any
}

export interface IRootState {
  posts: IPost[],
  favorites: string[]
}
