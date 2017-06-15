import { getConfig } from './react-dedux';
import { buildAndTest } from './base';
import { TestConfig } from './configure-states';

const testABRedux = (options: TestConfig) => {
  buildAndTest(options);
  buildAndTest({
    ...options,
    describe: `${options.describe} with Redux`,
    useRedux: true,
  });
};

const testABDomainRedux = (options: TestConfig) => {
  const domainOne = 'domain';
  const domainTwo = 'subDomain';
  const splitter = (options.config && options.config.SPLITTER) || getConfig().SPLITTER;
  const optionsBase = (domain: string) => ({
    ...options,
    describe: `${options.describe} with Domain "${domain}"`,
    config: {
      ...options.config,
      DOMAIN: domain,
    },
  });

  testABRedux(options);
  testABRedux(optionsBase(domainOne));
  testABRedux(optionsBase(`${splitter}`));
  testABRedux(optionsBase(`${domainOne}${splitter}`));
  testABRedux(optionsBase(`${splitter}${domainTwo}`));
  testABRedux(optionsBase(`${domainOne}${splitter}${domainTwo}`));
};

const testABSplitterDomainRedux = (options: TestConfig) => {
  const newSplitter = '.';
  testABDomainRedux(options);
  testABDomainRedux({
    ...options,
    describe: `${options.describe} with Splitter "${newSplitter}"`,
    config: {
      ...options.config,
      SPLITTER: newSplitter,
    },
  });
};

const testABInitSplitterDomainRedux = (options: TestConfig) => {
  const newInit = 'boot';
  testABSplitterDomainRedux(options);
  testABSplitterDomainRedux({
    ...options,
    describe: `${options.describe} with Init "${newInit}"`,
    config: {
      ...options.config,
      INIT_FUNCTION: newInit,
    },
  });
};

const testABPrefixesInitSplitterDomainRedux = (options: TestConfig) => {
  const prefix = 'My';
  const suffix = 'Things';
  const optionsBase = (p: string, s: string) => ({
    ...options,
    describe: `${options.describe} with Prefixes "${p}+${s}"`,
    config: {
      ...options.config,
      ACTIONS_PREFIX: p,
      ACTIONS_SUFFIX: s,
    },
  });

  testABInitSplitterDomainRedux(options);
  testABInitSplitterDomainRedux(optionsBase('', ''));
  testABInitSplitterDomainRedux(optionsBase(prefix, ''));
  testABInitSplitterDomainRedux(optionsBase('', suffix));
  testABInitSplitterDomainRedux(optionsBase(prefix, suffix));
};

describe('Dedux', () => {
  const testConfig: TestConfig = {
    describe: 'Standard',
    initialState: { },
    useRedux: false,
    fetchedRules: [
      { id: 1, text: 'First Rule' },
      { id: 2, text: 'Second Rule' },
    ],
    config: { },
  };

  testABPrefixesInitSplitterDomainRedux(testConfig);

  testABPrefixesInitSplitterDomainRedux({
    ...testConfig,
    describe: 'No init',
    initialState: { rules: [{ id: 0, text: 'No Rules' }] },
  });
});
