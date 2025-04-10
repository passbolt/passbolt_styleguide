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
import NotifyError from "./NotifyError";

export default {
  title: 'Components/Common/Error/NotifyError',
  component: NotifyError
};

export const Default = {
  args: {
    error: {
      message: "The error message"
    }
  }
};

const error = new Error("The error message");
error.details = {
  some: "other details",
};

export const WithDetails = {
  args: {error}
};
