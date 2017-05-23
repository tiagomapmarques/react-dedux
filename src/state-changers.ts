import { combineReducers } from './combine-reducers';

import { getConfig } from './config';
import { Store, StateChangerGroupReduced, StateChangerGroupWithDefaultsList, AnyConfiguration } from './types';

export const stateChangersSelector = (...args: string[]) => (stateChangers: StateChangerGroupReduced): StateChangerGroupReduced =>
  Object.keys(stateChangers)
    .filter(key => args.indexOf(key) >= 0)
    .reduce((accumulator, key) => ({ ...accumulator, [key]: stateChangers[key] }), {});

export const replaceStateChangers = <S>(store: Store<S>, stateChangers: StateChangerGroupWithDefaultsList, config?: AnyConfiguration) =>
  store.replaceReducer(<any>combineReducers(stateChangers, getConfig(config)))
