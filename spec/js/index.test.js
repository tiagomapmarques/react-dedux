import React from 'react';
import { Provider, getConfig } from '../../lib';
import { mount } from 'enzyme';
import { configureStates } from './configure-states';
import { MyComponent, createRoot } from './component';

const buildAndTest = options => {

  describe(options.describe, () => {
    let states;
    let MyConnectedComponent;
    let store;
    let component;

    beforeEach(() => {
      states = configureStates(options.initialState, options.fetchedRules, options.useRedux, options.config);
      store = states.createStore();
      MyConnectedComponent = states.connect('rules')(MyComponent);
      const config = getConfig(options.config);
      component = createRoot(store, MyConnectedComponent, 'rules', getConfig(options.config).getActionsName('rules'));
    });

    it('builds the component', () => {
      expect(component.node).toBeTruthy();
    });

    it('renders the standard text', () => {
      expect(component.find('#title').text()).toEqual('Hello World!');
    });

    describe('the state', () => {

      it('is not falsy', () => {
        expect(component.find('#rules').node).toBeTruthy();
      });

      it('has the correct number of items', () => {
        const rules = Object.keys(options.initialState).indexOf('rules') >= 0 ? options.initialState.rules : options.fetchedRules;
        expect(component.find('#rules li').nodes.length).toBe(rules.length);
      });
    });

    describe('the actions', () => {

      it('are not falsy', () => {
        expect(component.find('#actions').node).toBeTruthy();
      });

      it('has the correct number of actions', () => {
        expect(component.find('#actions li').nodes.length).toBe(Object.keys(states.actions.rules).length);
      });
    });
  });
};

const testABRedux = options => {
  buildAndTest(options);
  buildAndTest({
    ...options,
    describe: `${options.describe} with Redux`,
    useRedux: true,
  });
};

const testABDomainRedux = options => {
  const domainOne = 'domain';
  const domainTwo = 'subDomain';
  const splitter = (options.config && options.config.SPLITTER) || getConfig().SPLITTER;
  const optionsBase = domain => ({
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

const testABSplitterDomainRedux = options => {
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

const testABInitSplitterDomainRedux = options => {
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

const testABPrefixesInitSplitterDomainRedux = options => {
  const prefix = 'My';
  const suffix = 'Things';
  const optionsBase = (p, s) => ({
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
  const testConfig = {
    describe: 'Standard',
    initialState: { },
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
