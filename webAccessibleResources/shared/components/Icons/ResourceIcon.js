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
import KeySVG from "../../../img/svg/key.svg";
import TotpSVG from "../../../img/svg/totp.svg";
import PasswordWithTotpSVG from "../../../img/svg/password_with_totp.svg";
import ResourceTypesCollection from "../../models/entity/resourceType/resourceTypesCollection";
import {withResourceTypesLocalStorage} from "../../context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";


const resourceTypeSlugIconMap = {
  'password-string': <KeySVG/>,
  'password-and-description': <KeySVG/>,
  'v5-default': <KeySVG/>,
  'v5-password-string': <KeySVG/>,
  'totp': <TotpSVG/>,
  'v5-totp-standalone': <TotpSVG/>,
  'password-description-totp': <PasswordWithTotpSVG/>,
  'v5-default-with-totp': <PasswordWithTotpSVG/>,
};

export class ResourceIcon extends Component {
  static resourceTypeIdIconMap = {};

  /**
   * Returns a cached icon based on the given resource type id and the resource types.
   * @param {string} resourceTypeId
   * @param {ResourceTypesCollection} resourceTypes
   * @returns {ReactDOM}
   */
  static getResourceTypeIcon(resourceTypeId, resourceTypes) {
    if (!ResourceIcon.resourceTypeIdIconMap[resourceTypeId]) {
      const resourceTypeSlug = resourceTypes.getFirstById(resourceTypeId).slug;
      ResourceIcon.resourceTypeIdIconMap[resourceTypeId] = resourceTypeSlugIconMap[resourceTypeSlug];
    }

    return ResourceIcon.resourceTypeIdIconMap[resourceTypeId];
  }
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="teaser-image">
        {ResourceIcon.getResourceTypeIcon(this.props.resource.resource_type_id, this.props.resourceTypes)}
      </div>
    );
  }
}

ResourceIcon.propTypes = {
  resource: PropTypes.object,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
};

export default withResourceTypesLocalStorage(ResourceIcon);
