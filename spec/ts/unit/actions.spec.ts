import 'jest';
import * as actions from '../../../lib/src/actions';
import { ActionGroupList, Configuration } from '../../../src/types';

describe('Actions', () => {

  describe('when exported', () => {
    const exportedMembers: [ { name: string; type: string; } ] = [
      { name: 'actionsSelector', type: 'function' },
    ];

    it('only exports one member', () => {
      expect(Object.keys(actions).length).toEqual(exportedMembers.length);
    });

    describe('the exported members', () => {

      it('have the correct name', () => {
        exportedMembers.forEach(member => {
          expect((<any>actions)[member.name]).toBeTruthy();
        });
      });

      it('have the correct type', () => {
        exportedMembers.forEach(member => {
          expect(typeof (<any>actions)[member.name]).toEqual('function');
        });
      });
    });
  });

  describe('#actionsSelector', () => {
    const actionsSelector = actions.actionsSelector;
    let config: Configuration;
    let actionGroupList: ActionGroupList;

    const generateConfig = (): Configuration => ({
      DOMAIN: '',
      ACTIONS_PREFIX: '',
      ACTIONS_SUFFIX: 'Actions',
      SPLITTER: '/',
      INIT_FUNCTION: 'init',
      getSplitter: () => '/',
      getActionsName: (name: string) => `${name}Actions`,
      getActionType: (type: string, name: string) => ({ type: `${type}/${name}` }),
      getDomainNames: () => [],
    });

    const generateActionGroupList = (...args: string[]): ActionGroupList => {
      return args.reduce((acc: ActionGroupList, arg) => {
        acc[arg] = {
          init: jest.fn(),
          set: jest.fn(),
        };
        (<any>acc[arg].init).mockReturnValue('init');
        (<any>acc[arg].set).mockReturnValue('set');
        return acc;
      }, {});
    };

    beforeEach(() => {
      config = generateConfig();
      actionGroupList = generateActionGroupList('rules', 'otherRules', 'noRules');
    });

    describe('when selecting objects', () => {
      let dispatch: jest.Mock<{}>;

      beforeEach(() => {
        dispatch = jest.fn();
      });

      it('selects one object correctly', () => {
        const result = actionsSelector(actionGroupList, config)('rules')(dispatch);
        expect(Object.keys(result).length).toBe(1);
        expect(Object.keys((<any>result).rules)).toEqual(Object.keys(actionGroupList.rules));
      });

      it('selects two objects correctly', () => {
        const result = actionsSelector(actionGroupList, config)('rules', 'otherRules')(dispatch);
        expect(Object.keys(result).length).toBe(2);
        expect(Object.keys((<any>result).rules)).toEqual(Object.keys(actionGroupList.rules));
        expect(Object.keys((<any>result).otherRules)).toEqual(Object.keys(actionGroupList.otherRules));
      });

      it('does not select non-existing objects', () => {
        const result = actionsSelector(actionGroupList, config)('whatRules')(dispatch);
        expect(Object.keys(result).length).toBe(0);
      });
    });

    describe('the resulting selection', () => {
      let dispatch: jest.Mock<{}>;
      let result: any;

      beforeEach(() => {
        dispatch = jest.fn();
        result = actionsSelector(actionGroupList, config)('rules')(dispatch);
      });

      it('has dispatched actions', () => {
        console.log(dispatch.mock.calls);
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0]).toEqual('init');
      });
    });
  });
});
