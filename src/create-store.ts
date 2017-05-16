import { createStore as reduxCreateStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import * as thunk from 'redux-thunk';

import { reducer } from './reducer';
import { StateChangerGroupList, StateChangerGroupListReduced, Store, Configuration, StateDefaultValues } from './types';

declare var window: any;

let middleware: any[] = [ thunk.default ];
if (window && window.devToolsExtension && typeof window.devToolsExtension === 'function') {
  middleware = [ ...middleware, <Middleware>(window.devToolsExtension()) ];
}

const autoReduce = (reducersObject: StateChangerGroupList, defaultValues: StateDefaultValues, config: Configuration): StateChangerGroupListReduced =>
  Object.keys(reducersObject).reduce((accumulator, key) => ({
    ...accumulator,
    [key]: reducer(key, defaultValues[key], reducersObject[key], config),
  }), {});

export const createStore = <S>(reducersObject: StateChangerGroupList, defaultValues: StateDefaultValues, config: Configuration) =>
  (initialState?: S): Store<S> => reduxCreateStore(
    combineReducers(autoReduce(reducersObject, defaultValues, config)),
    initialState,
    applyMiddleware(...middleware)
  );
