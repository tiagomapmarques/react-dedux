import * as Redux from 'redux';
import * as Thunk from 'redux-thunk';
import { AppState, AppActionGroup, AppStateChangersGroup, Rule } from './types';
import {
  getConfig, replaceStateChangers, connect as deduxConnect, createStore as deduxCreateStore,
  FlexibleConfiguration, Store,
} from './react-dedux';

export interface TestConfig {
  describe: string;
  initialState: AppState;
  useRedux: boolean;
  fetchedRules: Rule[];
  config: FlexibleConfiguration;
};

export interface TestConfigReturn {
  stateChangers: AppStateChangersGroup;
  actions: AppActionGroup;
  connect: (...args: string[]) => Function;
  createStore: <S>() => Store<S>;
};

export const configureStates = (options: TestConfig): TestConfigReturn => {
  const config = getConfig(options.config);
  const getType = config.getActionType;

  const removeDomainFromInitialState = (initState: AppState): AppState => {
    return config.getDomainNames().reverse().reduce((acc, d) => ({ [d]: acc }), initState);
  }

  const getStateDomain = (getState: () => AppState): AppState => {
    const domains = config.getDomainNames();
    if (domains.length) {
      let getStateResult = getState();
      domains.forEach(d => {
        getStateResult = getStateResult[d];
      });
      return getStateResult;
    } else {
      return getState();
    }
  }

  const stateChangers: AppStateChangersGroup = {
    rules: {
      defaultValue: null,
      stateChangers: {
        set: (_, action) => action.rules,
      },
    },
  };

  const actions: AppActionGroup = {
    rules: {
      init: () => (dispatch, getState) => !getStateDomain(getState).rules && actions.rules.fetch()(dispatch, getState),

      fetch: () => (dispatch, getState) => actions.rules.set(options.fetchedRules)(dispatch, getState),

      set: rules => (dispatch, _) => dispatch({
        ...getType('rules', 'set'),
        rules,
      }),
    },
  };

  if (options.config.INIT_FUNCTION && options.config.INIT_FUNCTION !== getConfig().INIT_FUNCTION) {
    actions.rules[config.INIT_FUNCTION] = actions.rules.init;
    actions.rules.init = <any>undefined;
  }

  const connect = (...args: string[]) => deduxConnect(actions, config)(...args);

  const createStore = <S>(): Store<S> => {
    const initialStateNoDomain = removeDomainFromInitialState(options.initialState);
    if (options.useRedux) {
      const store = Redux.createStore((s: any) => s, initialStateNoDomain, Redux.applyMiddleware(Thunk.default));
      replaceStateChangers(store, stateChangers, config);
      return <Store<S>>store;
    } else {
      return deduxCreateStore<S>(stateChangers, config)(initialStateNoDomain);
    }
  };

  return { stateChangers, actions, connect, createStore };
};
