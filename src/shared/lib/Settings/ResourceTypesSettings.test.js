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
import resourceTypesFixture from "../../../react-extension/test/fixture/ResourceTypes/resourceTypes";
import SiteSettings from "./SiteSettings";
import siteSettingsFixture from "../../../react-extension/test/fixture/Settings/siteSettings";

describe("ResourceTypeSettings", () => {
  it("areResourceTypesEnabled is false if site settings is undefined", () => {
    const sut = new ResourceTypesSettings(undefined, []);
    expect(sut.areResourceTypesEnabled()).toBe(false);

    expect(sut.isResourceTypeEnabled('password-string')).toBe(false);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(false);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(false);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(false);

    expect(sut.mustEncryptDescription('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(false);
    expect(sut.mustEncryptDescription('a28a04cd-6f53-518a-967c-9963bf9cec51')).toBe(false);
  });

  it("resource type settings works if site settings and fixtures are set", () => {
    const siteSettings = new SiteSettings(siteSettingsFixture);
    const sut = new ResourceTypesSettings(siteSettings, resourceTypesFixture);

    expect(sut.areResourceTypesEnabled()).toBe(true);
    expect(sut.isResourceTypeEnabled('password-string')).toBe(true);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(true);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(true);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(true);

    expect(sut.mustEncryptDescription('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(false);
    expect(sut.mustEncryptDescription('a28a04cd-6f53-518a-967c-9963bf9cec51')).toBe(true);

    expect(sut.findResourceTypeSlugById('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe('password-string');
    expect(sut.findResourceTypeSlugById('nope')).toBe(undefined);

    expect(sut.findResourceTypeIdBySlug('password-string')).toBe('669f8c64-242a-59fb-92fc-81f660975fd3');
    expect(sut.findResourceTypeIdBySlug('nope')).toBe(undefined);

    expect(sut.assertResourceTypeIdIsLegacy('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(true);
    expect(sut.assertResourceTypeIdIsLegacy(undefined)).toBe(false);

    expect(sut.assertResourceTypeIdHasEncryptedDescription('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(false);
    expect(sut.assertResourceTypeIdHasEncryptedDescription(undefined)).toBe(false);
  });

  it("resource type settings works if site settings and some fixtures are set", () => {
    const siteSettings = new SiteSettings(siteSettingsFixture);
    const lessFixtures = [resourceTypesFixture[1]];
    const sut = new ResourceTypesSettings(siteSettings, lessFixtures);

    expect(sut.areResourceTypesEnabled()).toBe(true);

    expect(sut.isResourceTypeEnabled('password-string')).toBe(false);
    expect(sut.isResourceTypeEnabled('password-and-description')).toBe(true);
    expect(sut.isResourceTypeEnabled('nope')).toBe(false);

    expect(sut.isLegacyResourceTypeEnabled()).toBe(false);
    expect(sut.isEncryptedDescriptionEnabled()).toBe(true);

    expect(sut.mustEncryptDescription('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(true);

    expect(sut.findResourceTypeSlugById('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(undefined);
    expect(sut.findResourceTypeSlugById('a28a04cd-6f53-518a-967c-9963bf9cec51')).toBe('password-and-description');

    expect(sut.findResourceTypeIdBySlug('password-and-description')).toBe('a28a04cd-6f53-518a-967c-9963bf9cec51');
    expect(sut.findResourceTypeIdBySlug('password-string')).toBe(undefined);

    expect(sut.assertResourceTypeIdIsLegacy('669f8c64-242a-59fb-92fc-81f660975fd3')).toBe(false);
    expect(sut.assertResourceTypeIdHasEncryptedDescription('a28a04cd-6f53-518a-967c-9963bf9cec51')).toBe(true);
  });
});
