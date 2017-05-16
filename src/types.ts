import * as ReactRedux from 'react-redux';

export interface Configuration {
  ACTIONS_PREFIX: string;
  ACTIONS_SUFFIX: string;
  SPLITTER: string;
  INIT_FUNCTION: string;
  getActionsName: (name: string) => string;
  getActionType: (typeName: string, typeAction: string) => ActionObject;
}

export interface FlexibleConfiguration {
  ACTIONS_PREFIX?: string;
  ACTIONS_SUFFIX?: string;
  SPLITTER?: string;
  INIT_FUNCTION?: string;
}

export interface ActionObject {
  type: string;
  [key: string]: any;
}

export type Action = (...args: any[]) => ActionDispatchable;
export type ActionDispatchable = (dispatch: DispatchFunction, getState: GetStateFunction) => void;

export interface ActionGroup {
  [key: string]: Action;
}

export interface ActionGroupDispatched {
  [key: string]: DispatchedFunction;
}

export interface ActionGroupList {
  [key: string]: ActionGroup;
}

export interface ActionGroupDispatchedList {
  [key: string]: ActionGroupDispatched;
}

export type StateChanger<S> = (previousState: S, action: ActionObject) => S;

export interface StateChangerGroup<S> {
  [key: string]: StateChanger<S>;
}

export interface StateChangerGroupList {
  [key: string]: StateChangerGroup<any>;
}

export type StateChangerReduced<S> = StateChanger<S>;

export interface StateChangerGroupListReduced {
  [key: string]: StateChangerReduced<any>;
}

export interface StateDomain<S> {
  [key: string]: S;
}

export interface StateValues {
  [key: string]: StateDomain<any> | any;
}

export interface StateDefaultValues {
  [key: string]: any;
}

export type DispatchedFunction = (...args: any[]) => void;
export type DispatchFunction = (_: ActionObject | ActionDispatchable) => void;
export type GetStateFunction = () => StateDomain<any>;

export type Store<S> = ReactRedux.Store<S>;

export type Connector = (..._: string[]) => ReactRedux.ComponentDecorator<{}, any>;
export type StoreCreator = <S extends StateValues>(_?: StateValues) => Store<S>;

export declare function connect(actions: ActionGroupList, config: Configuration): Connector;
export declare function createStore<S>(reducersObject: StateChangerGroupList): Store<S>;
export declare function reducer<S>(typeName: string, stateChangers: StateChangerGroup<S>, config: Configuration): StateChangerReduced<S>
export declare function getConfig(newConfig?: FlexibleConfiguration): Configuration;
