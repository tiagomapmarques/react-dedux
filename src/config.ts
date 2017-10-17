import { Configuration, AnyConfiguration, FlexibleConfiguration } from './types';
import * as capitalise from 'capitalize';

const config: Configuration = {
  DOMAIN: '',
  ACTIONS_PREFIX: '',
  ACTIONS_SUFFIX: 'Actions',
  SPLITTER: '/',
  INIT_FUNCTION: 'init',
  getSplitter: () => '',
  getActionsName: (_: string) => '',
  getActionType: (_: string, __: string) => ({ type: '' }),
  getDomainNames: () => [],
};

const getAnyfix = (newFix: string, defaultFix: string): string => {
  return newFix === '' ? newFix : (newFix || defaultFix);
}

export const getPrefixAndSuffix = (newPrefix: string, defaultPrefix: string, newSuffix: string, defaultSuffix: string): FlexibleConfiguration => {
  const prefix = getAnyfix(newPrefix, defaultPrefix);
  let suffix = getAnyfix(newSuffix, defaultSuffix);
  if (!prefix && !suffix) {
    suffix = config.ACTIONS_SUFFIX;
  }
  return { ACTIONS_PREFIX: prefix, ACTIONS_SUFFIX: suffix };
}

const getSplitter = (newConfig: Configuration) => newConfig.SPLITTER || config.SPLITTER;

const buildHelpers = (newConfig: Configuration): Configuration => ({
  ...newConfig,
  getSplitter: () => getSplitter(newConfig),
  getActionsName: (name: string) => {
    const preAndSuffix = getPrefixAndSuffix(
      newConfig.ACTIONS_PREFIX, config.ACTIONS_PREFIX,
      newConfig.ACTIONS_SUFFIX, config.ACTIONS_SUFFIX
    );
    return (
      preAndSuffix.ACTIONS_PREFIX && `${preAndSuffix.ACTIONS_PREFIX}${capitalise(name)}${preAndSuffix.ACTIONS_SUFFIX}`
    ) || `${name}${preAndSuffix.ACTIONS_SUFFIX}`;
  },
  getActionType: (typeName: string, typeAction: string) => ({
    type: `${typeName}${getSplitter(newConfig)}${typeAction}`,
  }),
  getDomainNames: () => newConfig.DOMAIN.split(getSplitter(newConfig)).filter(d => !!d),
});

export const getConfig = (newConfig?: AnyConfiguration) =>
  buildHelpers({ ...config, ...newConfig });
