/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://startsource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

/**
 * The workflow context
 */
export const WorkflowContext = React.createContext({
  workflows: [], // The current of displayed workflows
  start: () => {}, // Start a workflow
  stop: () => {} // Stop a workflow
});

/**
 * The related context provider
 */
export default class WorkflowContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      workflows: [],
      start: (Workflow, workflowProps) => {
        const workflowKey = uuidv4();
        this.setState({workflows: [...this.state.workflows, {key: workflowKey, Workflow, workflowProps}]});
        return workflowKey;
      },
      stop: async workflowKey => await this.setState({workflows: this.state.workflows.filter(workflow => workflowKey !== workflow.key)})
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <WorkflowContext.Provider value={this.state}>
        {this.props.children}
      </WorkflowContext.Provider>
    );
  }
}
WorkflowContextProvider.displayName = 'WorkflowContextProvider';
WorkflowContextProvider.propTypes = {
  children: PropTypes.any
};

/**
 * Workflow Context Consumer HOC
 * @param WrappedComponent
 */
export function withWorkflow(WrappedComponent) {
  return class WithWorkflow extends React.Component {
    render() {
      return (
        <WorkflowContext.Consumer>
          {
            workflowContext => <WrappedComponent workflowContext={workflowContext} {...this.props} />
          }
        </WorkflowContext.Consumer>
      );
    }
  };
}
