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
 * @since         2.14.0
 */

import React from "react";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import NotifyExpiredSession from "./NotifyExpiredSession";
import { defaultProps } from "./NotifyExpiredSession.test.data";

export default {
  title: "Components/Authentication/NotifyExpiredSession",
  component: NotifyExpiredSession,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Initial = {
  args: defaultProps(),
};
