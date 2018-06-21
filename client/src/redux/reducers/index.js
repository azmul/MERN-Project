import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  datas: tableReducer,
  auth: authReducer,
  errors : errorsReducer
})