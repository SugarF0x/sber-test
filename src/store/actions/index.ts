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

export function setFavorite(post: IPost): IAction {
  return {
    type: 'TO_FAVORITE',
    data: post,
  };
}

export function toggleDisplay() {
  return {
    type: 'TOGGLE_DISPLAY'
  }
}

export const fetchPosts = (desc: string, location: string) => {
  return function (dispatch: any) {
    dispatch(getPostsByQuery('fetching'))
    fetch(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?description=${ desc }&location=${ location }`,
          {headers: {origin: 'http://localhost:3000'}}
    )
      .then(res => res.json())
      .then(res => {
        if (res.length > 0) {
          dispatch(getPostsByQuery('success', res))
        } else {
          dispatch(getPostsByQuery('not_found'))
        }
      })
      .catch(() => {
        dispatch(getPostsByQuery('error'))
      });
  }
}