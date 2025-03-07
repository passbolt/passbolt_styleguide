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
import React from "react";
import PropTypes from "prop-types";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import KeySVG from "../../../../img/svg/key.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

/**
 * This component display the note section of a resource
 */
class DisplayResourcesListDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      open: false,
      error: false,
      isSecretDecrypting: false,
      isSecretDecrypted: false,
      description: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleUnselectClickEvent = this.handleUnselectClickEvent.bind(this);
  }

  /**
   * Get the sidebar subtitle
   */
  getResourceTypeSubtitle(resource) {
    // Resources types might not be yet initialized at the moment this component is rendered.
    if (!this.props.resourceTypes) {
      return "";
    }

    const resourceType = this.props.resourceTypes.getFirstById(resource.resource_type_id);
    switch (resourceType?.slug) {
      case "password-string":
        return this.props.t("Password");
      case "password-and-description":
        return this.props.t("Password and Encrypted description");
      case "password-description-totp":
        return this.props.t("Password, Encrypted description and TOTP");
      case "totp":
        return this.props.t("TOTP");
      default:
        return this.props.t("Resource");
    }
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Handle when the user selects the folder parent.
   */
  handleUnselectClickEvent(resource) {
    this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
  }

  getPermissionSubtitle(resource) {
    switch (resource.permission.type) {
      case 0: {
        return this.props.t("No access");
      }
      case 1: {
        return this.props.t("Can read");
      }
      case 7: {
        return this.props.t("Can edit");
      }
      case 15: {
        return this.props.t("Is owner");
      }
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const resources = this.props.resourceWorkspaceContext.selectedResources;
    const count = resources.length;
    return (
      <div className="sidebar resource multiple-resources-selected">
        <div className="sidebar-title">
          {this.props.t(`${count} resources selected`)}
        </div>
        <div className="sidebar-content">
          {resources.map(resource =>
            <div key={resource.id} className="sidebar-header">
              <div className="teaser-image">
                <KeySVG />
              </div>
              <div className="title-area">
                <h3>
                  <div className="title-wrapper">
                    <span className="name">{resource.metadata.name}</span>
                  </div>
                  <span className="subtitle">{this.getResourceTypeSubtitle(resource)}</span>
                  <span className="subtitle">{this.getPermissionSubtitle(resource)}</span>
                </h3>
                <button type="button" className="title-link button-transparent inline" title={this.props.t("Remove this resource from the selection")} onClick={() => this.handleUnselectClickEvent(resource)}>
                  <CloseSVG />
                  <span className="visuallyhidden"><Trans>Remove this resource from the selection</Trans></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DisplayResourcesListDetails.propTypes = {
  context: PropTypes.any, // The application context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection),
  resourceWorkspaceContext: PropTypes.any, // The resource
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withResourceTypesLocalStorage(withTranslation('common')(DisplayResourcesListDetails))));
