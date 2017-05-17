import { connect as reduxConnect } from 'react-redux';

import { AnyConfiguration, ActionGroupList, Connector } from './types';
import { getConfig } from './config';
import { actionsSelector } from './actions';
import { stateChangersSelector } from './state-changers';

export const connect = (actions: ActionGroupList, config?: AnyConfiguration): Connector =>
  (...args: string[]) => {
    const configuration = getConfig(config);
    return reduxConnect(
      stateChangersSelector(...args),
      actionsSelector(
        Object.keys(actions).reduce((accumulator: ActionGroupList, key) => ({
          ...accumulator,
          [configuration.getActionsName(key)]: actions[key],
        }), {}),
        configuration
      )(...args)
    );
  }
