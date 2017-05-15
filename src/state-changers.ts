import { StateChangerGroupList } from './types';

export const stateChangersSelector = (...args: string[]) => (reducers: StateChangerGroupList): StateChangerGroupList =>
  Object.keys(reducers)
    .filter(key => args.indexOf(key) >= 0)
    .reduce((accumulator, key) => ({ ...accumulator, [key]: reducers[key] }), {});
