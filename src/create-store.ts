import { createStore as reduxCreateStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import * as thunk from 'redux-thunk';

import { getConfig } from './config';
import { reducer } from './reducer';
import { StateChangerGroupWithDefaultsList, StateChangerGroupReduced, Store, Configuration, AnyConfiguration } from './types';

declare var window: any;

let middleware: any[] = [ thunk.default ];
if (window && window.devToolsExtension && typeof window.devToolsExtension === 'function') {
  middleware = [ ...middleware, <Middleware>(window.devToolsExtension()) ];
}

const autoReduce = (stateChangers: StateChangerGroupWithDefaultsList, config: Configuration): StateChangerGroupReduced =>
  Object.keys(stateChangers).reduce((accumulator, key) => ({
    ...accumulator,
    [key]: reducer(key, stateChangers[key].defaultValue, stateChangers[key].stateChangers, config),
  }), {});

export const createStore = <S>(stateChangers: StateChangerGroupWithDefaultsList, config?: AnyConfiguration) =>
  (initialState?: S): Store<S> => reduxCreateStore(
    combineReducers(autoReduce(stateChangers, getConfig(config))),
    initialState,
    applyMiddleware(...middleware)
  );
