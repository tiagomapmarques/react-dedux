import { StateChangerGroupList } from './types';

export const stateChangersSelector = (...args: string[]) => (stateChangers: StateChangerGroupList): StateChangerGroupList =>
  Object.keys(stateChangers)
    .filter(key => args.indexOf(key) >= 0)
    .reduce((accumulator, key) => ({ ...accumulator, [key]: stateChangers[key] }), {});
