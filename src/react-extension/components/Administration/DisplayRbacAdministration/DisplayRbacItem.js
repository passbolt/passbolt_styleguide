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
import {withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";

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
    this.props.onChange(role, this.props.actionName, event.target.value);
  }

  /**
   * Return the list of allowed control functions.
   * @returns {[{label: string, value: string},{label: string, value: string}]}
   */
  get allowedCtlFunctions() {
    const controls =  [
      {value: controlFunctions.ALLOW, label: this.props.t('Allow')},
      {value: controlFunctions.DENY, label: this.props.t('Deny')},
    ];

    if (this.props.actionName === uiActions.USERS_VIEW_WORKSPACE) {
      controls.push({value: controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP, label: this.props.t('Allow group manager'), title: this.props.t('Allow group manager')});
    }
    return controls;
  }

  /**
   * Get the row component class name.
   * @returns {string}
   */
  get rowClassName() {
    return this.props.actionName.toLowerCase().replaceAll(/[^\w]/ig, '-');
  }

  /**
   * Get the defined control function for the given role
   * @param {RoleEntity} role The role to get the control function for
   * @return {string|null}
   */
  getCtlFunctionForRole(role) {
    const rbac = this.props.rbacsUpdated?.findRbacByRoleAndActionName(role, this.props.actionName)
      || this.props.rbacs?.findRbacByRoleAndActionName(role, this.props.actionName);
    return rbac?.controlFunction || null;
  }

  /**
   * Check if the control has changed
   * @return {boolean}
   */
  hasChanged() {
    if (this.props.rbacsUpdated.findRbacByUiActionName(this.props.actionName)) {
      return true;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  render() {
    let customizableRoles = [];
    if (this.props.roles) {
      customizableRoles = this.props.roles;
    }

    return (
      <>
        <div className={`rbac-row ${this.rowClassName} flex-container inner level-${this.props.level} ${this.hasChanged() ? 'highlighted' : ''}`}>
          <div className="flex-item first">
            <span>{this.props.label}</span>
          </div>
          <div className="flex-item">
            <Select
              className={`admin inline`}
              items={this.allowedCtlFunctions}
              value={controlFunctions.ALLOW}
              disabled={true}/>
          </div>
          {customizableRoles.items.map(role => <div key={`${this.props.actionName}-${role.id}`} className="flex-item input">
            <Select
              className="inline"
              items={this.allowedCtlFunctions}
              value={this.getCtlFunctionForRole(role)}
              disabled={!(this.props.rbacs?.length > 0) || !this.getCtlFunctionForRole(role)}
              onChange={event => this.handleInputChange(event, role)}/>
            {
              !this.getCtlFunctionForRole(role) && <div className="warning-message">There is no valid setting found for this action.</div>
            }

          </div>
          )}
        </div>
      </>
    );
  }
}

DisplayRbacItem.propTypes = {
  label: PropTypes.string.isRequired, // The action label.
  level: PropTypes.number.isRequired, // The action level.
  actionName: PropTypes.string.isRequired, // The action name.
  rbacs: PropTypes.object, // The collection of rbacs.
  rbacsUpdated: PropTypes.object, // The collection of updated rbacs.
  roles: PropTypes.instanceOf(RolesCollection).isRequired, // The roles collection
  onChange: PropTypes.func.isRequired, // The translation function.
  t: PropTypes.func, // The translation function.
};

export default withTranslation('common')(DisplayRbacItem);
