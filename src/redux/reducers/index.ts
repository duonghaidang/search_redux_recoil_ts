/// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import searchReducer from './searchReducer';
/// Redux: Root Reducer
const reducers = combineReducers({
  searchReducer: persistReducer(
    {
      key: 'searchReducer',
      storage: AsyncStorage,
    },
    searchReducer,
  ),
});
// Exports
export default reducers;
