import { IAction, TStatus, IPost } from '../types';

export function getDummyPosts(): IAction {
  return {
    type: 'GET_DUMMY_POSTS',
  };
}

export function getPostsByQuery(status: TStatus, data?: IPost[]): IAction {
  switch (status) {
    case "fetching":
      return {
        type: 'FETCH_POSTS_START',
        data
      };
    case "error":
      return {
        type: 'FETCH_POSTS_ERROR',
        data
      };
    case "success":
      return {
        type: 'FETCH_POSTS_SUCCESS',
        data,
      };
    case "not_found":
      return {
        type: 'FETCH_POSTS_404',
        data
      };
  }
}

export function setFavorite(id: string): IAction {
  return {
    type: 'FAVORITE',
    data: id,
  };
}
