/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../AppContext/AppContext";
import CanUse from "../../services/rbacs/canUseService";
import RoleEntity from "../../models/entity/role/roleEntity";

export const RbacContext = React.createContext({
  canIUseUiAction: () => {}
});

/**
 * The related context provider
 */
export class RbacContextProvider extends React.Component {
  /**
   * @inheritDoc
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
      canIUseUiAction: this.canIUseUiAction.bind(this)
    };
  }

  /**
   * Check if the user can use the given ui action.
   * @param {string} actionName The name of the UI action to check for.
   * @return {boolean}
   */
  canIUseUiAction(actionName) {
    const role = new RoleEntity(this.props.context.loggedInUser.role);
    return CanUse.canRoleUseUiAction(role, this.props.context.rbacs, actionName);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <RbacContext.Provider value={this.state}>
        {this.props.children}
      </RbacContext.Provider>
    );
  }
}

RbacContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(RbacContextProvider);

/**
 * Rbac Context Consumer HOC
 * @param WrappedComponent
 */
export function withRbac(WrappedComponent) {
  return class WithRbac extends React.Component {
    render() {
      return (
        <RbacContext.Consumer>
          {
            rbacContext => <WrappedComponent rbacContext={rbacContext} {...this.props} />
          }
        </RbacContext.Consumer>
      );
    }
  };
}
