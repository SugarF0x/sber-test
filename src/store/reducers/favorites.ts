import { IAction } from "../types";

let defaultFavorites = [] as string[];
let storage          = localStorage.getItem('favs');
if (storage) defaultFavorites = JSON.parse(storage);

function removeIndex(arr: string[], i: number): string[] {
  delete arr[i];
  arr = arr.filter((element: string | undefined) => {
    return element !== undefined;
  });
  return arr;
}

function storeLocally(array: string[]) {
  if (array[0])
    localStorage.setItem('favs', JSON.stringify(array));
  else
    localStorage.removeItem('favs');
}

export default (state = defaultFavorites, action: IAction) => {
  switch (action.type) {
    case 'FAVORITE':
      if (state.indexOf(action.data) !== -1) {
        let result = removeIndex(state, state.indexOf(action.data));
        storeLocally(result);
        return result;
      } else {
        let result = [
          ...state,
          action.data,
        ];
        storeLocally(result);
        return result;
      }
    default:
      return state;
  }
}
