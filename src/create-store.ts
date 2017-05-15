import { createStore as reduxCreateStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import * as thunk from 'redux-thunk';

import { StateChangerGroupList, Store } from './types';

declare var window: any;

let middleware: any[] = [ thunk.default ];
if (window && window.devToolsExtension && typeof window.devToolsExtension === 'function') {
  middleware = [ ...middleware, <Middleware>(window.devToolsExtension()) ];
}

export const createStore = <S>(reducersObject: StateChangerGroupList) =>
  (initialState?: S): Store<S> => reduxCreateStore(
    combineReducers(reducersObject),
    initialState,
    applyMiddleware(...middleware)
  );
