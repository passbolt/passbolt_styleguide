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
import ResourceTypesSettings from "./ResourceTypesSettings";
import SiteSettings from "./SiteSettings";
import siteSettingsFixture from "../../../react-extension/test/fixture/Settings/siteSettings";
import {resourceTypesCollectionDto} from "../../models/entity/resourceType/resourceTypesCollection.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_STRING
} from "../../models/entity/resourceType/resourceTypeEntity.test.data";

describe("ResourceTypeSettings", () => {
  it("areResourceTypesEnabled is false if site settings is undefined", () => {
    const sut = new ResourceTypesSettings(undefined, []);

    expect(sut.isResourceTypeEnabled('password-string')).toBe(false);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(false);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(false);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(false);

    expect(sut.mustEncryptDescription(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(false);
    expect(sut.mustEncryptDescription(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBe(false);
  });

  it("resource type settings works if site settings and fixtures are set", () => {
    const siteSettings = new SiteSettings(siteSettingsFixture);
    const sut = new ResourceTypesSettings(siteSettings, resourceTypesCollectionDto());

    expect(sut.isResourceTypeEnabled('password-string')).toBe(true);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(true);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(true);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(true);

    expect(sut.mustEncryptDescription(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(false);
    expect(sut.mustEncryptDescription(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBe(true);

    expect(sut.findResourceTypeSlugById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe('password-string');
    expect(sut.findResourceTypeSlugById('nope')).toBe(undefined);

    expect(sut.findResourceTypeIdBySlug('password-string')).toBe(TEST_RESOURCE_TYPE_PASSWORD_STRING);
    expect(sut.findResourceTypeIdBySlug('nope')).toBe(undefined);

    expect(sut.assertResourceTypeIdIsLegacy(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(true);
    expect(sut.assertResourceTypeIdIsLegacy(undefined)).toBe(false);

    expect(sut.assertResourceTypeIdHasEncryptedDescription(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(false);
    expect(sut.assertResourceTypeIdHasEncryptedDescription(undefined)).toBe(false);
  });

  it("resource type settings works if site settings and some fixtures are set", () => {
    const siteSettings = new SiteSettings(siteSettingsFixture);
    const lessFixtures = [resourceTypesCollectionDto()[1]];
    const sut = new ResourceTypesSettings(siteSettings, lessFixtures);

    expect(sut.isResourceTypeEnabled('password-string')).toBe(false);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(true);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(false);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(true);

    expect(sut.mustEncryptDescription(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(true);

    expect(sut.findResourceTypeSlugById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(undefined);
    expect(sut.findResourceTypeSlugById(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBe('password-and-description');

    expect(sut.findResourceTypeIdBySlug('password-and-description')).toBe(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
    expect(sut.findResourceTypeIdBySlug('password-string')).toBe(undefined);

    expect(sut.assertResourceTypeIdIsLegacy(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBe(false);
    expect(sut.assertResourceTypeIdHasEncryptedDescription(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBe(true);
  });
});
