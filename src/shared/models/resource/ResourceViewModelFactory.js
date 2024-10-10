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
 * @since         4.10.0
 */

import ResourcePasswordDescriptionTotpViewModel from "./ResourcePasswordDescriptionTotpViewModel";
import ResourceV5DefaultTotpViewModel from "./ResourceV5DefaultTotpViewModel";
import ResourcePasswordDescriptionViewModel from "./ResourcePasswordDescriptionViewModel";
import ResourceDefaultTotpViewModel from "./ResourceV5DefaultViewModel";
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";

/**
 * Factory ViewModel related resource
 */
class ResourceViewModelFactory {
  /**
   * Returns a ResourceViewModel built from a ResourceTypeEntity.
   * @param {ResourceTypeEntity} resourceType
   * @param {Object} dto
   * @returns {ResourceViewModel}
   */
  static createFromResourceType(resourceType, dto) {
    switch (resourceType?.slug) {
      case ResourcePasswordDescriptionViewModel.resourceTypeSlug:
        return new ResourcePasswordDescriptionViewModel(dto);
      case ResourcePasswordDescriptionTotpViewModel.resourceTypeSlug:
        return new ResourcePasswordDescriptionTotpViewModel(dto);
      case ResourceDefaultTotpViewModel.resourceTypeSlug:
        return new ResourceDefaultTotpViewModel(dto);
      case ResourceV5DefaultTotpViewModel.resourceTypeSlug:
        return new ResourceV5DefaultTotpViewModel(dto);
      case ResourcePasswordStringViewModel.resourceTypeSlug:
        return new ResourcePasswordStringViewModel(dto);
      default:
        throw new Error("No ViewModel has been found for the resource type.");
    }
  }
}

export default ResourceViewModelFactory;
