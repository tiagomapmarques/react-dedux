import {
  StateChangerGroupWithDefaults, StateChangerGroupWithDefaultsList,
  ActionGroupList, ActionGroup, ActionDispatchable,
} from './react-dedux';

export interface Rule {
  id: number;
  text: string;
};

export interface RulesActionGroup extends ActionGroup {
  init: () => ActionDispatchable;
  fetch: () => ActionDispatchable;
  set: (_: Rule[]) => ActionDispatchable;
};

export interface AppActionGroup extends ActionGroupList {
  rules: RulesActionGroup;
}

export interface AppStateChangersGroup extends StateChangerGroupWithDefaultsList {
  rules: StateChangerGroupWithDefaults<Rule[]>;
}

export type AppState = any;
