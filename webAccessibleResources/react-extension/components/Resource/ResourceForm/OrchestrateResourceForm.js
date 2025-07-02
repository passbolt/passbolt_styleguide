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
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import AddResourceUris from "./AddResourceUris";
import AddResourceAppearance from "./AddResourceAppearance";
import AddResourceCustomFields from "./AddResourceCustomFields";

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
        return <AddResourcePassword
          resource={this.props.resource}
          onChange={this.props.onChange}
          warnings={this.props.warnings}
          errors={this.props.errors}
          passwordEntropy={this.props.passwordEntropy}
          consumePasswordEntropyError={this.props.consumePasswordEntropyError}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.TOTP:
        return <AddResourceTotp
          resource={this.props.resource}
          onChange={this.props.onChange}
          warnings={this.props.warnings}
          errors={this.props.errors}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS:
        return <AddResourceCustomFields
          resource={this.props.resource}
          onChange={this.props.onChange}
          warnings={this.props.warnings}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.NOTE:
        return <AddResourceNote
          resource={this.props.resource}
          onChange={this.props.onChange}
          resourceType={this.props.resourceType}
          onConvertToDescription={this.props.onConvertToDescription}
          isAllowedToConvertNote={this.props.isAllowedToConvertNote}
          warnings={this.props.warnings}
          errors={this.props.errors}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.DESCRIPTION:
        return <AddResourceDescription
          resource={this.props.resource}
          onChange={this.props.onChange}
          resourceType={this.props.resourceType}
          onConvertToNote={this.props.onConvertToNote}
          warnings={this.props.warnings}
          errors={this.props.errors}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.URIS:
        return <AddResourceUris
          resource={this.props.resource}
          onChange={this.props.onChange}
          warnings={this.props.warnings}
          errors={this.props.errors}
          disabled={this.props.disabled}
        />;
      case ResourceEditCreateFormEnumerationTypes.APPEARANCE:
        return <AddResourceAppearance
          resource={this.props.resource}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />;
      default:
        return <></>;
    }
  }
}
OrchestrateResourceForm.propTypes = {
  resourceFormSelected: PropTypes.string, // The resource form selected to display
  resource: PropTypes.object, // The resource to edit or create
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource type entity
  onChange: PropTypes.func, //The resource setter
  onConvertToNote: PropTypes.func, //The resource note to convert
  onConvertToDescription: PropTypes.func, //The resource description to convert
  isAllowedToConvertNote: PropTypes.bool, // The user is allowed to convert a note into a description
  passwordEntropy: PropTypes.number, // the current password entropy if any
  consumePasswordEntropyError: PropTypes.func, // a password entropy state consumer callback
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object, // The errors entity error validation
  disabled: PropTypes.bool // The disabled property
};

export default withTranslation("common")(OrchestrateResourceForm);

