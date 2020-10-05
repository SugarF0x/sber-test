import {IAction, IPost, IRootFavorites} from "../types";

let defaultFavorites = {
  status: 'success',
  array: [],
  ids: []
} as IRootFavorites;
let storage          = localStorage.getItem('favs');
if (storage) {
  let parsed = JSON.parse(storage);
  defaultFavorites.array = parsed.array;
  defaultFavorites.ids   = parsed.ids;
}

function removeIndex(arr: string[], i: number): string[] {
  delete arr[i];
  arr = arr.filter((element: string | undefined) => {
    return element !== undefined;
  });
  return arr;
}

function storeLocally(obj: IRootFavorites) {
  localStorage.setItem('favs', JSON.stringify(obj));
}

export default (state = defaultFavorites, action: IAction) => {
  function mutateState(toMutate: { status?: string, array?: IPost[], ids?: string[] }): IRootFavorites {
    return Object.assign({}, state, toMutate)
  }

  switch (action.type) {
    case 'FAVORITE':
      if (state.ids.indexOf(action.data.id) !== -1) {
        let result = removeIndex(state.ids, state.ids.indexOf(action.data.id));
        storeLocally(mutateState({ ids: result }));
        return mutateState({ ids: result });
      } else {
        let result = [
          ...state.ids,
          action.data.id,
        ];
        storeLocally(mutateState({ ids: result }));
        return mutateState({ ids: result });
      }
    case 'FETCH_FAVORITES_START':
    case 'FETCH_FAVORITES_ERROR':
    case 'FETCH_FAVORITES_SUCCESS':
    default:
      return state;
  }
}
