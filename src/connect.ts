import { Configuration, ActionGroupList, Connector } from './types';
import { connect as reduxConnect } from 'react-redux';
import { actionsSelector } from './actions';
import { stateChangersSelector } from './state-changers';

export const connect = (actions: ActionGroupList, config: Configuration): Connector => (...args: string[]) =>
  reduxConnect(
    stateChangersSelector(...args),
    actionsSelector(
      Object.keys(actions).reduce((accumulator: ActionGroupList, key) => ({
        ...accumulator,
        [config.getActionsName(key)]: actions[key],
      }), {}),
      config
    )(...args)
  );
