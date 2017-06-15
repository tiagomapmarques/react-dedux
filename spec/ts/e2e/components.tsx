import * as React from 'react';
import { mount } from 'enzyme';
import { Provider, Store } from './react-dedux';
import { Rule, RulesActionGroup } from './types';

type ComponentProps = {
  stateName: string;
  actionsName: string;
};
export class SimpleComponent extends React.Component<ComponentProps, {}> { }

export class MyComponent extends SimpleComponent {
  render() {
    const { stateName, actionsName } = this.props;
    const rules: Rule[] = (this.props as any)[stateName];
    const rulesActions: RulesActionGroup = (this.props as any)[actionsName];

    return (
      <div id="main">
        <div id="title">Hello World!</div>
        { rules && rules.length ? (
          <ul id="rules">
            { rules.map(rule => (<li key={`rule-${rule.id}`}>{rule.text}</li>)) }
          </ul>
        ) : false }
        { rulesActions && Object.keys(rulesActions).length ? (
          <ul id="actions">
            { Object.keys(rulesActions).map(action => (<li key={`action-${action}`}>{action}</li>)) }
          </ul>
        ) : false }
      </div>
    );
  }
}

export const createRoot = (store: Store<any>, MainComponent: any, stateName: string, actionsName: string) => mount(
  <Provider store={store}>
    <MainComponent
      stateName={stateName}
      actionsName={actionsName}
    />
  </Provider>
);
