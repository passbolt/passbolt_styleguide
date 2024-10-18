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
import ResourceV5DefaultViewModel from "./ResourceV5DefaultViewModel";
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";
import ResourceV5PasswordStringViewModel from "./ResourceV5PasswordStringViewModel";

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
  static createFromResourceTypeAndResourceViewModelDto(resourceType, dto) {
    switch (resourceType?.slug) {
      case ResourcePasswordDescriptionViewModel.resourceTypeSlug:
        return new ResourcePasswordDescriptionViewModel(dto);
      case ResourcePasswordDescriptionTotpViewModel.resourceTypeSlug:
        return new ResourcePasswordDescriptionTotpViewModel(dto);
      case ResourceV5DefaultViewModel.resourceTypeSlug:
        return new ResourceV5DefaultViewModel(dto);
      case ResourceV5DefaultTotpViewModel.resourceTypeSlug:
        return new ResourceV5DefaultTotpViewModel(dto);
      case ResourcePasswordStringViewModel.resourceTypeSlug:
        return new ResourcePasswordStringViewModel(dto);
      case ResourceV5PasswordStringViewModel.resourceTypeSlug:
        return new ResourceV5PasswordStringViewModel(dto);
      default:
        throw new Error("No ViewModel has been found for the resource type.");
    }
  }

  /**
   * Returns a ResourceViewModel built from a ResourceTypeEntity from resource entity.
   * @param {ResourceTypeEntity} resourceType
   * @param {Object} resourceDto
   * @returns {ResourceViewModel}
   */
  static createFromResourceTypeAndEntityDto(resourceType, resourceDto) {
    switch (resourceType?.slug) {
      case ResourcePasswordDescriptionViewModel.resourceTypeSlug:
        return ResourcePasswordDescriptionViewModel.createFromEntity(resourceDto);
      case ResourcePasswordDescriptionTotpViewModel.resourceTypeSlug:
        return ResourcePasswordDescriptionTotpViewModel.createFromEntity(resourceDto);
      case ResourceV5DefaultViewModel.resourceTypeSlug:
        return ResourceV5DefaultViewModel.createFromEntity(resourceDto);
      case ResourceV5DefaultTotpViewModel.resourceTypeSlug:
        return ResourceV5DefaultTotpViewModel.createFromEntity(resourceDto);
      case ResourcePasswordStringViewModel.resourceTypeSlug:
        return ResourcePasswordStringViewModel.createFromEntity(resourceDto);
      case ResourceV5PasswordStringViewModel.resourceTypeSlug:
        return ResourceV5PasswordStringViewModel.createFromEntity(resourceDto);
      default:
        throw new Error("No ViewModel has been found for the resource type.");
    }
  }
}

export default ResourceViewModelFactory;
