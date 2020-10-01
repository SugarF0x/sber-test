import { IAction } from '../types';

export function getDummyPosts(query: string): IAction {
  return {
    type: 'GET_DUMMY_POSTS',
    data: query
  }
}

export function favorite(id: string): IAction {
  return {
    type: 'FAVORITE',
    data: id
  }
}
