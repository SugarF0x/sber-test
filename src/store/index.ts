import { createStore } from "redux";
import rootReducer from './reducers';

const wind = window as any;
export default createStore(rootReducer, (wind.__REDUX_DEVTOOLS_EXTENSION__) as any && wind.__REDUX_DEVTOOLS_EXTENSION__());
