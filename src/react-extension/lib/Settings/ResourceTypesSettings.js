/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
const DEFAULT_RESOURCE_TYPES_SLUGS = {
  PASSWORD_STRING: 'password-string',
  PASSWORD_AND_DESCRIPTION: 'password-and-description',
};

export default class ResourceTypesSettings {
  /**
   * Constructor
   * @param {SiteSettings} settings
   * @param {array} resourceTypes
   */
  constructor(settings, resourceTypes) {
    if (!settings) {
      this.settings = false;
    } else {
      this.settings = settings;
    }

    if (!Array.isArray(resourceTypes)) {
      this.resourceTypes = [];
    } else {
      this.resourceTypes = resourceTypes;
    }
  }

  /**
   * Get list of default resource type slugs
   *
   * @returns {{PASSWORD_AND_DESCRIPTION: string, PASSWORD_STRING: string}}
   * @constructor
   */
  get DEFAULT_RESOURCE_TYPES_SLUGS() {
    return DEFAULT_RESOURCE_TYPES_SLUGS;
  }

  /**
   * Is legacy password type (without encrypted description enabled)
   * @returns {boolean}
   */
  isLegacyResourceTypeEnabled() {
    return this.isResourceTypeEnabled(this.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING);
  }

  /**
   * Is new password type enabled ()
   * @returns {boolean}
   */
  isEncryptedDescriptionEnabled() {
    return this.isResourceTypeEnabled(this.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION);
  }

  /**
   * Find out if a given resource type is enabled
   * @param {string} slug the resource type slug
   * @returns {boolean}
   */
  isResourceTypeEnabled(slug) {
    if (!this.areResourceTypesEnabled()) {
      return false;
    }
    return this.resourceTypes.some(type => type.slug === slug);
  }

  /**
   * Are resource types supported?
   * @returns {boolean}
   */
  areResourceTypesEnabled() {
    if (!this.settings || !this.settings.canIUse('resourceTypes')) {
      return false;
    }
    if (!Array.isArray(this.resourceTypes) || !this.resourceTypes) {
      return false;
    }
    return this.resourceTypes.length > 0;
  }

  /**
   * Must the description be kept encrypted?
   * E.g. prevent downgrading from an encrypted description to a cleartext one
   * @return {string} resourceTypeId
   * @returns {boolean}
   */
  mustEncryptDescription(resourceTypeId) {
    // No content type present => legacy mode, keep in cleartext
    if (!this.areResourceTypesEnabled() || typeof resourceTypeId === 'undefined') {
      return false;
    }
    // If only encrypted content type is present => always encrypt description
    if (!this.isLegacyResourceTypeEnabled() && this.isEncryptedDescriptionEnabled()) {
      return true;
    }
    // If only legacy content type is present => always keep in cleartext
    if (this.isLegacyResourceTypeEnabled() && !this.isEncryptedDescriptionEnabled()) {
      return false;
    }

    // If previously created as encrypted description => keep encrypted
    return this.assertResourceTypeIdHasEncryptedDescription(resourceTypeId);
  }

  /*
   * =============================================================
   *  Finders
   * =============================================================
   */
  /**
   * Find a resource type for a give slug
   * @param {string} slug
   * @returns {undefined|string}
   */
  findResourceTypeIdBySlug(slug) {
    if (!this.areResourceTypesEnabled()) {
      return undefined;
    }
    const type = this.resourceTypes.find(type => type.slug === slug);
    if (type && type.id) {
      return type.id;
    }
    return undefined;
  }

  /**
   * Find a resource type for a given id
   * @param {string} id
   * @returns {undefined|string}
   */
  findResourceTypeSlugById(id) {
    if (!this.areResourceTypesEnabled()) {
      return undefined;
    }
    const type = this.resourceTypes.find(type => type.id === id);
    if (type && type.slug) {
      return type.slug;
    }
    return undefined;
  }

  /*
   * =============================================================
   *  By ID assertions
   * =============================================================
   */
  /**
   * Assert a resource type id matches the given slug
   *
   * @param currentId
   * @param expectedSlug
   * @returns {boolean}
   */
  assertResourceTypeSlugById(currentId, expectedSlug) {
    if (!currentId || !expectedSlug) {
      return false;
    }
    return this.findResourceTypeSlugById(currentId) === expectedSlug;
  }

  /**
   * @params {string} uuid of the resource type
   * @returns {boolean} true if typeId matches PASSWORD_AND_DESCRIPTION slug
   */
  assertResourceTypeIdHasEncryptedDescription(resourceTypeId) {
    /*
     * TODO add other content types with encrypted description
     * Check using the json provided with the resource types
     */
    return this.assertResourceTypeSlugById(
      resourceTypeId,
      this.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );
  }

  /**
   * @params {string} uuid of the resource type
   * @returns {boolean} true if typeId matches PASSWORD_STRING slug
   */
  assertResourceTypeIdIsLegacy(resourceTypeId) {
    return this.assertResourceTypeSlugById(
      resourceTypeId,
      this.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
    );
  }
}
