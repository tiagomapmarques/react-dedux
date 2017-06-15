import * as Redux from 'redux';
import * as Thunk from 'redux-thunk';
import * as Dedux from '../../lib';

export const configureStates = (initialState, fetchedRules, useRedux, flexConfig) => {
  const config = Dedux.getConfig(flexConfig);
  const getType = config.getActionType;

  let initialStateWithDomain = initialState;
  config.getDomainNames().reverse().forEach(d => {
    initialStateWithDomain = {
      [d]: initialStateWithDomain,
    };
  });

  const getStateDomain = getState => {
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

  const stateChangers = {
    rules: {
      defaultValue: null,
      stateChangers: {
        set: (prevState, action) => action.rules,
      },
    },
  };

  const actions = {
    rules: {
      init: () => (dispatch, getState) => !getStateDomain(getState).rules && actions.rules.fetch()(dispatch),

      fetch: () => dispatch => actions.rules.set(fetchedRules)(dispatch),

      set: rules => dispatch => dispatch({
        ...getType('rules', 'set'),
        rules,
      }),
    },
  };

  if (flexConfig.INIT_FUNCTION && flexConfig.INIT_FUNCTION !== Dedux.getConfig().INIT_FUNCTION) {
    actions.rules[config.INIT_FUNCTION] = actions.rules.init;
    actions.rules.init = undefined;
  }

  const connect = (...args) => Dedux.connect(actions, config)(...args);

  const createStore = () => {
    if (useRedux) {
      const store = Redux.createStore(s => s, initialStateWithDomain, Redux.applyMiddleware(Thunk.default));
      Dedux.replaceStateChangers(store, stateChangers, config);
      return store;
    } else {
      return Dedux.createStore(stateChangers, config)(initialStateWithDomain);
    }
  };

  return { stateChangers, actions, connect, createStore };
};
