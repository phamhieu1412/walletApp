import { persistCombineReducers } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import { reducer as UserRedux } from './UserRedux';

const config = {
  key: `org.reactjs.native.example.walletMyApp-root`,
  storage: FilesystemStorage,
  // blacklist: ['netInfo', 'toast', 'nav', 'layouts', 'sideMenu', 'filters'],
  // whitelist: ['user'],
  timeout: 60000, // 1 minute timeout
};

export default persistCombineReducers(config, {
  user: UserRedux,
});