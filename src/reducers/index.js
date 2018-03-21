import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifReducer } from 'redux-notifications';
import UsersReducer from './userReducer';
import GroupsReducer from './groupReducer';

const rootReducer = combineReducers({
  users: UsersReducer,
  groups: GroupsReducer,
  form: formReducer,
  notifs: notifReducer,
});

export default rootReducer;