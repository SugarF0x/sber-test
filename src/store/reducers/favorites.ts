import { IAction } from "../types";
const defaultFavorites = [] as string[];

const dummyData = ["569bfcdc-fad1-4563-ae57-8585831db596"];

export default (state = defaultFavorites, action: IAction) => {
  switch (action.type) {
    case 'FAVORITE':
      return dummyData
    default:
      return state;
  }
}
