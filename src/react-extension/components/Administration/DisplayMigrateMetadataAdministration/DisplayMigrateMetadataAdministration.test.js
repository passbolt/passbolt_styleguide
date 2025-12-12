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
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdminUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import {v4 as uuidv4} from "uuid";
import {act} from "react";

describe("DisplayMigrateMetadataAdministration as per the specifications", () => {
  it("As a signed-in administrator I can see migration metadata form", async() => {
    expect.assertions(6);
    const props = defaultProps();

    let page;
    await act(
      async() => page = new DisplayMigrateMetadataAdministrationPage(props)
    );
    await waitForTrue(() => page.exists());

    expect(page.exists()).toStrictEqual(true);

    expect(page.title.textContent).toBe("Migrate metadata");
    expect(page.migrationState.textContent).toBe("Required");
    expect(page.resourcesMigrationState.textContent).toBe("31 to be migrated (31 shared resources, 0 personal resources)");
    /*
     * expect(page.foldersMigrationState.textContent).toBe("All migrated");
     * expect(page.tagsMigrationState.textContent).toBe("All migrated");
     * expect(page.commentsMigrationState.textContent).toBe("All migrated");
     */

    expect(page.resourcesMigrationCheckbox.checked).toStrictEqual(true);
    /*
     * expect(page.foldersMigrationCheckbox.checked).toStrictEqual(false);
     * expect(page.tagsMigrationCheckbox.checked).toStrictEqual(false);
     * expect(page.commentsMigrationCheckbox.checked).toStrictEqual(false);
     */

    expect(page.formWarningBanner.textContent).toBe("Warning: If you have integrations, you will have to make sure they are updated before triggering the migration.");
  });

  it("As a signed-in administrator I can see migration metadata form disabled", async() => {
    expect.assertions(2);
    const props = defaultProps({context: defaultAdministratorAppContext({loggedInUser: defaultAdminUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})})});

    const page = new DisplayMigrateMetadataAdministrationPage(props);
    await waitForTrue(() => page.exists());

    expect(page.exists()).toStrictEqual(true);

    expect(page.formErrorBanner.textContent).toBe("You lack access to the shared metadata key. Please ask another administrator to share it with you.");
  });

  it("Should not display the warning banner if everything is migrated", async() => {
    expect.assertions(4);
    const props = withMigrationFullyDone();

    let page;
    await act(
      async() => page = new DisplayMigrateMetadataAdministrationPage(props)
    );
    await waitForTrue(() => page.exists());

    expect(page.migrationState.textContent).toBe("Done");
    expect(page.resourcesMigrationState.textContent).toBe("All migrated");
    /*
     * expect(page.foldersMigrationState.textContent).toBe("All migrated");
     * expect(page.tagsMigrationState.textContent).toBe("All migrated");
     * expect(page.commentsMigrationState.textContent).toBe("All migrated");
     */

    expect(page.formWarningBanner).toBeNull();
    expect(page.formErrorBanner).toBeNull();
  });
});
