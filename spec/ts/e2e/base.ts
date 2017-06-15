import 'jest';
import { ReactWrapper } from 'enzyme';
import { getConfig, Store } from './react-dedux';
import { AppState } from './types';
import { configureStates, TestConfig, TestConfigReturn } from './configure-states';
import { MyComponent, SimpleComponent, createRoot } from './components';

export const buildAndTest = (options: TestConfig) => {

  describe(options.describe, () => {
    const stateName = 'rules';
    let states: TestConfigReturn;
    let MyConnectedComponent: SimpleComponent;
    let store: Store<AppState>;
    let component: ReactWrapper<any, any>;

    beforeEach(() => {
      states = configureStates(options);
      store = states.createStore<AppState>();
      MyConnectedComponent = states.connect(stateName)(MyComponent);
      component = createRoot(store, MyConnectedComponent, stateName, getConfig(options.config).getActionsName(stateName));
    });

    it('builds the component', () => {
      expect(component.getNode()).toBeTruthy();
    });

    it('renders the standard text', () => {
      expect(component.find('#title').text()).toEqual('Hello World!');
    });

    describe('the state', () => {

      it('is not falsy', () => {
        expect(component.find('#rules').getNode()).toBeTruthy();
      });

      it('has the correct number of items', () => {
        const rules = Object.keys(options.initialState).indexOf('rules') >= 0 ? options.initialState.rules : options.fetchedRules;
        expect(component.find('#rules li').getNodes().length).toBe(rules.length);
      });
    });

    describe('the actions', () => {

      it('are not falsy', () => {
        expect(component.find('#actions').getNode()).toBeTruthy();
      });

      it('has the correct number of actions', () => {
        expect(component.find('#actions li').getNodes().length).toBe(Object.keys(states.actions.rules).length);
      });
    });
  });
};
