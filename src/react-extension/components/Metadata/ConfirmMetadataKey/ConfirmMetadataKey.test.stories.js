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
 * @since         5.1.0
 */
import ConfirmMetadataKey from "./ConfirmMetadataKey";
import { defaultProps, defaultPropsWithRollback } from "./ConfirmMetadataKey.test.data";

export default {
  title: "Components/Metadata/ConfirmMetadataKey",
  component: ConfirmMetadataKey,
};

export const MetadataKeyRotation = {
  args: defaultProps(),
};

export const MetadataKeyRollback = {
  args: defaultPropsWithRollback(),
};
