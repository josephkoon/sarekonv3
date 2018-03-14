import { combineReducers } from 'redux';

import userReducer from './user_reducer'
import filtersReducer from './filters_reducer'
import dvdListReducer from './dvdList_reducer'
import dvdsReducer from './dvds_reducer'

const rootReducer = combineReducers({
  user: userReducer,
  filters: filtersReducer,
  dvdList: dvdListReducer,
  dvds: dvdsReducer
});

export default rootReducer;
