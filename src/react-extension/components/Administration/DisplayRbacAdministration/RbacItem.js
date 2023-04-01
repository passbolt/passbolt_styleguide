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
 * @since         3.11.2
 */

import React from "react";
import DisplayAdministrationInternationalisationActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationInternationalisationActions/DisplayAdministrationInternationalisationActions";
import Select from "../../Common/Select/Select";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {withAdminInternationalization} from "../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withTranslation} from "react-i18next";

/**
 * This component allows to display the internationalisation for the administration
 */
class RbacItem extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.rbacItem = this.props.rbacItem;
    this.userRbacElt = null;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  getDefaultState() {
    return {
      modified: false
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    // this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationInternationalisationActions);
    // this.props.adminInternationalizationContext.findLocale();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    // this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    // this.props.adminInternationalizationContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event, obj) {
    this.props.onChange(event);
    if (event.target.value !== this.rbacItem.default) {
      this.setState({'modified': true});
    }
  }

  render() {
    this.userRbacElt = <Select className="medium" items={this.rbacItem.options} value={this.rbacItem.default} onChange={this.handleInputChange} />;

    return (
      <div className={`flex-container inner level-3${this.state.modified ? ' highlighted': ''}`}>
        <div className="flex-item first border-right">
          <span>{this.rbacItem.name}</span>
        </div>
        <div className="flex-item border-right">
          <Select className="medium" items={this.rbacItem.options} value={this.rbacItem.default} disabled={true} />
        </div>
        <div className="flex-item">
          {this.userRbacElt}
        </div>
      </div>
    )
  }
}

RbacItem.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminInternationalizationContext: PropTypes.object, // The administration internationalization context
  rbacItem: PropTypes.object,
  onChange: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminInternationalization(withAdministrationWorkspace(withTranslation('common')(RbacItem))));
