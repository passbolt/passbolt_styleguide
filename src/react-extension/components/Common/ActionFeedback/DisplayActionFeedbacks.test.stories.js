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
 * @since         3.6.0
 */
import {
  propsWithOneErrorMessage,
  propsWithOneSuccessMessage,
  propsWithOneWarningMessage,
} from "./DisplayActionFeedbacks.test.data";
import DisplayActionFeedbacks from "./DisplayActionFeedbacks";

export default {
  title: "Components/Common/ActionFeedback",
  component: DisplayActionFeedbacks,
};

export const Success = {
  args: propsWithOneSuccessMessage,
};

export const Error = {
  args: propsWithOneErrorMessage,
};

export const Warning = {
  args: propsWithOneWarningMessage,
};
