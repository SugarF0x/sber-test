export interface IPost {
  id: string;
  type: string;
  url: string;
  created_at: string; // can be turned to date
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string; // can be used as elements
  how_to_apply: string; // can be used as elements
  company_logo: any;
}

export type TStatus = 'fetching' | 'success' | 'error' | 'not_found';

export interface IAction {
  type: string;
  data?: any;
}

export interface IRootFavorites {
  status: TStatus;
  array: IPost[];
  ids: string[];
}

export interface IRootPosts {
  status: TStatus;
  array: IPost[];
  filter: string;
}

export interface IRootState {
  posts: IRootPosts;
  favorites: IRootFavorites;
}
