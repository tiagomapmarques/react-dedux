import * as ReactRedux from 'react-redux';

import { AnyConfiguration, ActionGroupList } from './types';
import { getConfig } from './config';
import { actionsSelector } from './actions';
import { stateChangersSelector } from './state-changers';

export const connect = (actions: ActionGroupList, config?: AnyConfiguration): <P extends ActionGroupList>(..._: string[]) => ReactRedux.ComponentDecorator<P> =>
  (...args: string[]) => {
    const configuration = getConfig(config);
    return ReactRedux.connect(
      stateChangersSelector(configuration)(...args),
      actionsSelector(
        Object.keys(actions).reduce((accumulator: ActionGroupList, key) => ({
          ...accumulator,
          [configuration.getActionsName(key)]: actions[key],
        }), {}),
        configuration
      )(...args)
    );
  }
