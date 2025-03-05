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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import AddResourcePassword from "./AddResourcePassword";
import AddResourceTotp from "./AddResourceTotp";
import AddResourceNote from "./AddResourceNote";
import AddResourceDescription from "./AddResourceDescription";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";

/**
 * The component orchestrates the resource form edition and creation.
 */
class OrchestrateResourceForm extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.resourceFormSelected) {
      case ResourceEditCreateFormEnumerationTypes.PASSWORD:
        return <AddResourcePassword resource={this.props.resource} onChange={this.props.onChange}/>;
      case ResourceEditCreateFormEnumerationTypes.TOTP:
        return <AddResourceTotp resource={this.props.resource}/>;
      case ResourceEditCreateFormEnumerationTypes.NOTE:
        return <AddResourceNote resource={this.props.resource}/>;
      case ResourceEditCreateFormEnumerationTypes.DESCRIPTION:
        return <AddResourceDescription resource={this.props.resource}/>;
      default:
        return <></>;
    }
  }
}
OrchestrateResourceForm.propTypes = {
  resourceFormSelected: PropTypes.string, // The resource form selected to display
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(OrchestrateResourceForm);

