import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from '../../';

export class MyComponent extends Component {
  render() {
    const { stateName, actionsName } = this.props;
    const rules = this.props[stateName];
    const rulesActions = this.props[actionsName];

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

export const createRoot = (store, MainComponent, stateName, actionsName) => mount(
  <Provider store={store}>
    <MainComponent
      stateName={stateName}
      actionsName={actionsName}
    />
  </Provider>
);
