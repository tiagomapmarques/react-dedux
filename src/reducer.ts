import { getConfig } from './config';
import { Configuration, ActionObject, StateChangerGroup, StateChangerReduced } from './types';

export const reducer = <S>(typeName: string, defaultValue: any, stateChangers: StateChangerGroup<S>, config: Configuration): StateChangerReduced<S> =>
  (prevState: S, action: ActionObject): S => {
    const splitter = config.SPLITTER || getConfig().SPLITTER;
    const actionType = action.type.split(splitter);
    if (actionType.length === 2 && actionType[0].toLowerCase() === typeName.toLowerCase()) {
      return stateChangers[actionType[1]](prevState, action);
    }
    return prevState || defaultValue;
  };
