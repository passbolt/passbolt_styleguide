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
 * @since         4.O.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import {withAdminRbac} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";

const TMP_ALLOWED_ACTIONS_CTL_FUNCTIONS = [
  {value: controlFunctions.ALLOW, label: 'Allow'},
  {value: controlFunctions.DENY, label: 'Deny'},
];

class DisplayRbacItem extends React.Component {
  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle select change.
   * @param {Event} event The html event occurring on the select component
   * @param {RoleEntity} role The role the select change for
   */
  handleInputChange(event, role) {
    this.props.adminRbacContext.updateRbacControlFunction(role, this.props.actionName, event.target.value);
  }

  /**
   * Get the defined control function for the given role
   * @param {RoleEntity} role The role to get the control function for
   * @return {string}
   */
  getCtlFunctionForRole(role) {
    return this.props.adminRbacContext.getCtlFunctionForActionAndRole(role.id, this.props.actionName);
  }

  /**
   * Check if the control has changed
   * @return {boolean}
   */
  hasChanged() {
    if (this.props.adminRbacContext.rbacsUpdated.findRbacByActionName(this.props.actionName)) {
      return true;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  render() {
    const roles = this.props.adminRbacContext.roles;
    let customizableRoles = [];
    if (roles) {
      customizableRoles = roles.items.filter(role => role.name === 'user');
    }

    return (
      <>
        <div className={`flex-container inner level-${this.props.level} ${this.hasChanged() ? 'highlighted' : ''}`}>
          <div className="flex-item first border-right">
            <span>{this.props.label}</span>
          </div>
          <div className="flex-item border-right">
            <Select
              className="medium"
              items={TMP_ALLOWED_ACTIONS_CTL_FUNCTIONS}
              value={controlFunctions.ALLOW}
              disabled={true}/>
          </div>
          {customizableRoles.map(role =>
            <div key={`${this.props.actionName}-${role.id}`} className="flex-item">
              <Select
                className="medium"
                items={TMP_ALLOWED_ACTIONS_CTL_FUNCTIONS}
                value={this.getCtlFunctionForRole(role)}
                onChange={event => this.handleInputChange(event, role)}/>
            </div>
          )}
        </div>
      </>
    );
  }
}

DisplayRbacItem.propTypes = {
  label: PropTypes.string, // The action label.
  level: PropTypes.number, // The action level.
  actionName: PropTypes.string, // The action name.
  onChange: PropTypes.func, // The translation function.
  adminRbacContext: PropTypes.object, // The administration rbac context
  t: PropTypes.func, // The translation function.
};

export default withAdminRbac(withTranslation('common')(DisplayRbacItem));
