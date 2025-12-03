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
import ResourceTypesCollection from "../../models/entity/resourceType/resourceTypesCollection";
import {withResourceTypesLocalStorage} from "../../context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {KEEPASS_ICON_LIST} from "../../../react-extension/components/Resource/ResourceForm/keepassIconList.data";
import {ICON_TYPE_KEEPASS_ICON_SET, COLOR_TRANSPARENT} from "../../models/entity/resource/metadata/IconEntity";
import {getContrastedColor} from "../../utils/color";
import {PASSBOLT_DEFAULT_RESOURCE_TYPE_ICON_MAP} from "../../../react-extension/components/Resource/ResourceForm/passboltDefaultResourceTypeIcons.data";

export class ResourceIcon extends Component {
  static resourceTypeIdIconMap = {};

  /**
   * Returns the icon that needs to be displayed.
   * The icon is the one selected in the metadata or the default from the resource types if not set.
   * @returns {JSX}
   */
  getResourceIcon() {
    if (typeof(this.props.resource.metadata?.icon?.value) !== "number" || this.props.resource.metadata?.icon?.type !== ICON_TYPE_KEEPASS_ICON_SET) {
      return ResourceIcon.getDefaultResourceTypeIcon(this.props.resource.resource_type_id, this.props.resourceTypes);
    }
    return KEEPASS_ICON_LIST[this.props.resource.metadata.icon.value];
  }

  /**
   * Returns the CSS style to set background color that needs to be displayed.
   * @returns {{backgroundColor: string}|null}
   */
  getResourceColor() {
    const color = this.props.resource.metadata?.icon?.background_color;
    if (color) {
      return {backgroundColor: color};
    }
    return null;
  }

  /**
   * Returns the class to set the right contrasted color on the icon.
   * If the default color is used, empty string is returned instead.
   * @returns {string}
   */
  getContrastedColorClassName() {
    const color = this.getResourceColor();
    if (!color) {
      return "";
    }

    if (color.backgroundColor === COLOR_TRANSPARENT) {
      return "transparent";
    }

    const contrastedColor = getContrastedColor(color.backgroundColor);
    return contrastedColor === "#000000"
      ? "dark-stroke"
      : "clear-stroke";
  }

  /**
   * Returns a cached icon based on the given resource type id and the resource types.
   * @param {string} resourceTypeId
   * @param {ResourceTypesCollection} resourceTypes
   * @returns {ReactDOM}
   */
  static getDefaultResourceTypeIcon(resourceTypeId, resourceTypes) {
    if (!ResourceIcon.resourceTypeIdIconMap[resourceTypeId]) {
      const resourceTypeSlug = resourceTypes?.getFirstById(resourceTypeId)?.slug;
      ResourceIcon.resourceTypeIdIconMap[resourceTypeId] = PASSBOLT_DEFAULT_RESOURCE_TYPE_ICON_MAP[resourceTypeSlug];
    }

    return ResourceIcon.resourceTypeIdIconMap[resourceTypeId];
  }
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className={`teaser-image ${this.getContrastedColorClassName()}`} style={this.getResourceColor()}>
        {this.getResourceIcon()}
      </div>
    );
  }
}

ResourceIcon.propTypes = {
  resource: PropTypes.object,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
};

export default withResourceTypesLocalStorage(ResourceIcon);
