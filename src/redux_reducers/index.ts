import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import plantsListsReducer from './plantsListsReducer';
import plantsReducer from './plantsReducer';
import registerReducer from './registerReducer';

export const rootReducer = combineReducers({
  loginData: loginReducer,
  registerData: registerReducer,
  plantsListsData: plantsListsReducer,
  plantsData: plantsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
