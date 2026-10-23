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
 * @since         5.17.0
 */
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import NamePasskeyDialog from "./NamePasskeyDialog";
import { defaultProps } from "./NamePasskeyDialog.test.data";
import { defaultPasskeysDtos } from "../../../contexts/MFAContext.test.data";

export default {
  title: "Components/MFA/NamePasskeyDialog",
  component: NamePasskeyDialog,
  decorators: [
    (Story, { args }) => (
      <MockTranslationProvider>
        <Story {...args} />
      </MockTranslationProvider>
    ),
  ],
};

export const Default = {
  args: defaultProps(),
};

export const SuggestedNameInUse = {
  args: defaultProps({ passkeys: defaultPasskeysDtos(1, { name: "Chrome on Mac" }) }),
};
