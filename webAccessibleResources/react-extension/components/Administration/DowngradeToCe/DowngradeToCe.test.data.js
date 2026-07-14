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
 * @since         5.14.0
 */

import MockPort from "../../../test/mock/MockPort";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultNavigationContext } from "../../../contexts/NavigationContext.test.data";
import SubscriptionEntity from "../../../../shared/models/entity/subscription/subscriptionEntity";
import SiteSettingsEntity from "../../../../shared/models/entity/siteSettings/siteSettingsEntity";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import {
  mockSubscription,
  mockSubscriptionExpired,
  mockSubscriptionGoingToExpire,
} from "../DisplaySubscriptionKey/DisplaySubscriptionKey.test.data";

/**
 * Site settings with the "edition" plugin.
 * @returns {SiteSettingsEntity}
 */
function siteSettingsWithEditionPlugin() {
  const settings = {
    ...siteSettingsFixture,
    passbolt: {
      ...siteSettingsFixture.passbolt,
      plugins: {
        ...siteSettingsFixture.passbolt.plugins,
        edition: { enabled: true },
      },
    },
  };

  return new SiteSettingsEntity(settings);
}

/**
 * Default props with a subscription key going to expire
 * @param props
 * @return {Object}
 */
export function defaultProps(props = {}) {
  const port = new MockPort();

  const context = {
    onGetSubscriptionKeyRequested: () => new SubscriptionEntity(mockSubscriptionGoingToExpire),
    siteSettings: siteSettingsWithEditionPlugin(),
    ...props?.context,
    port,
  };

  return {
    dialogContext: defaultDialogContext(),
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
    navigationContext: defaultNavigationContext(),
    ...props,
    context: defaultAppContext(context),
  };
}

/**
 * Default props with an expired subscription key
 * @return {Object}
 */
export function expiredProps() {
  return defaultProps({
    context: {
      onGetSubscriptionKeyRequested: () => new SubscriptionEntity(mockSubscriptionExpired),
    },
  });
}

/**
 * Default props with a valid subscription key
 * @return {Object}
 */
export function validSubscriptionProps() {
  return defaultProps({
    context: {
      onGetSubscriptionKeyRequested: () => new SubscriptionEntity(mockSubscription),
    },
  });
}
