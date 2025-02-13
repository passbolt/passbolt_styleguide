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
 * @since         4.12.0
 */

import {defaultProps, withMigrationFullyDone} from "./DisplayMigrateMetadataAdministration.test.data";
import {waitForTrue} from '../../../../../test/utils/waitFor';
import DisplayMigrateMetadataAdministrationPage
  from "./DisplayMigrateMetadataAdministration.test.page";

describe("DisplayMigrateMetadataAdministration as per the specifications", () => {
  it("As a signed-in administrator I can see migration metadata form", async() => {
    expect.assertions(12);
    const props = defaultProps();

    const page = new DisplayMigrateMetadataAdministrationPage(props);
    await waitForTrue(() => page.exists());

    expect(page.exists()).toStrictEqual(true);

    expect(page.title.textContent).toBe("Migrate metadata");
    expect(page.migrationState.textContent).toBe("Partial");
    expect(page.resourcesMigrationState.textContent).toBe("31 to be migrated");
    expect(page.foldersMigrationState.textContent).toBe("All migrated");
    expect(page.tagsMigrationState.textContent).toBe("All migrated");
    expect(page.commentsMigrationState.textContent).toBe("All migrated");

    expect(page.resourcesMigrationCheckbox.checked).toStrictEqual(true);
    expect(page.foldersMigrationCheckbox.checked).toStrictEqual(false);
    expect(page.tagsMigrationCheckbox.checked).toStrictEqual(false);
    expect(page.commentsMigrationCheckbox.checked).toStrictEqual(false);

    expect(page.formBanner.textContent).toBe("If you have integrations, you will have to make sure they are updated before triggering the migration.");
  });

  it("Should not display the warning banner if efverything is migrated", async() => {
    expect.assertions(6);
    const props = withMigrationFullyDone();

    const page = new DisplayMigrateMetadataAdministrationPage(props);
    await waitForTrue(() => page.exists());

    expect(page.migrationState.textContent).toBe("Done");
    expect(page.resourcesMigrationState.textContent).toBe("All migrated");
    expect(page.foldersMigrationState.textContent).toBe("All migrated");
    expect(page.tagsMigrationState.textContent).toBe("All migrated");
    expect(page.commentsMigrationState.textContent).toBe("All migrated");

    expect(page.formBanner).toBeNull();
  });
});
