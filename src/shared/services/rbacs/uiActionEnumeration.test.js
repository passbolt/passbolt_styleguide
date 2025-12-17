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
 * @since         4.6.0
 */

import { uiActions } from "./uiActionEnumeration";

describe("uiActions", () => {
  it("should have the expected UI action keys", () => {
    expect.assertions(18);

    expect(Object.keys(uiActions).length).toEqual(17);
    expect(uiActions["FOLDERS_USE"]).toEqual("Folders.use");
    expect(uiActions["RESOURCES_IMPORT"]).toEqual("Resources.import");
    expect(uiActions["RESOURCES_EXPORT"]).toEqual("Resources.export");
    expect(uiActions["RESOURCES_SEE_ACTIVITIES"]).toEqual("Resources.seeActivities");
    expect(uiActions["RESOURCES_SEE_COMMENTS"]).toEqual("Resources.seeComments");
    expect(uiActions["SECRETS_PREVIEW"]).toEqual("Secrets.preview");
    expect(uiActions["SECRETS_COPY"]).toEqual("Secrets.copy");
    expect(uiActions["SHARE_VIEW_LIST"]).toEqual("Share.viewList");
    expect(uiActions["TAGS_USE"]).toEqual("Tags.use");
    expect(uiActions["USERS_VIEW_WORKSPACE"]).toEqual("Users.viewWorkspace");
    expect(uiActions["MOBILE_TRANSFER"]).toEqual("Mobile.transfer");
    expect(uiActions["DESKTOP_TRANSFER"]).toEqual("Desktop.transfer");
    expect(uiActions["ADMINSTRATION_VIEW_WORKSPACE"]).toEqual("Administration.viewWorkspace");
    expect(uiActions["DUO_CONFIGURATION"]).toEqual("Duo.configuration");
    expect(uiActions["AVATAR_UPLOAD"]).toEqual("Avatar.upload");
    expect(uiActions["SHARE_FOLDER"]).toEqual("Folders.share");
    expect(uiActions["PROFIL_ACCOUNT_RECOVERY"]).toEqual("Profil.accountRecovery");
  });
});
