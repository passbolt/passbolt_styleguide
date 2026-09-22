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
 * @since         5.13.0
 */
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { defaultAdministratorAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import SiteSettingsEntity from "../../../../shared/models/entity/siteSettings/siteSettingsEntity";
import { defaultCeSiteSettings } from "../../../../shared/models/entity/siteSettings/siteSettingsEntity.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export const defaultProps = (props = {}) => ({
  context: defaultAdministratorAppContext(),
  dialogContext: defaultDialogContext(),
  actionFeedbackContext: defaultActionFeedbackContext(),
  ...props,
});

/**
 * Props of an administrator running the community edition, which cannot tune the offline settings.
 * @param {Object} props The props to override
 * @returns {object}
 */
export const communityEditionProps = (props = {}) =>
  defaultProps({
    context: defaultAdministratorAppContext({
      siteSettings: new SiteSettingsEntity(defaultCeSiteSettings()),
    }),
    ...props,
  });
