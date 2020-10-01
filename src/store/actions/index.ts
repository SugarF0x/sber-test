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
      };
    case "error":
      return {
        type: 'FETCH_POSTS_ERROR',
      };
    case "success":
      return {
        type: 'FETCH_POSTS_SUCCESS',
        data,
      };
    case "not_found":
      return {
        type: 'FETCH_POSTS_404',
      };
  }
}

export function favorite(id: string): IAction {
  return {
    type: 'FAVORITE',
    data: id,
  };
}
