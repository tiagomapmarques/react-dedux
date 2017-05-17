import { Configuration, AnyConfiguration } from './types';

const config: Configuration = {
  ACTIONS_PREFIX: '',
  ACTIONS_SUFFIX: 'Actions',
  SPLITTER: '/',
  INIT_FUNCTION: 'init',
  getActionsName: (_: string) => '',
  getActionType: (_: string, __: string) => ({ type: '' }),
};

const buildHelpers = (newConfig: Configuration): Configuration => ({
  ...newConfig,
  getActionsName: (name: string) => `${newConfig.ACTIONS_PREFIX}${name}${newConfig.ACTIONS_SUFFIX}`,
  getActionType: (typeName: string, typeAction: string) => ({
    type: `${typeName}${newConfig.SPLITTER}${typeAction}`,
  }),
});

export const getConfig = (newConfig?: AnyConfiguration) =>
  buildHelpers({ ...config, ...newConfig });
