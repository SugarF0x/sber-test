import postsReducer from './posts';
import favoritesReducer from './favorites';
import { combineReducers } from 'redux';

export default combineReducers({
  posts: postsReducer,
  favorites: favoritesReducer
})
