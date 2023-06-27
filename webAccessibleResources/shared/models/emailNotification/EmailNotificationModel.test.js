/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {defaultSettingsModel, mockResult, withoutSourceSettingsModel} from "../../../react-extension/components/Administration/DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration.test.data";
import EmailNotificationModel from "./EmailNotificationModel";

describe("EmailNotificationModel", () => {
  it("should initialize the model with param", () => {
    const model = new EmailNotificationModel(mockResult);
    expect(model).toEqual(defaultSettingsModel());
  });

  it("should initialize the model with default value", () => {
    const model = new EmailNotificationModel();
    expect(model).toEqual(withoutSourceSettingsModel());
  });
});
