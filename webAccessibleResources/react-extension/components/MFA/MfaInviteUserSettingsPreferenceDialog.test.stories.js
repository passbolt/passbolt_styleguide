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
 * @since         3.10.0
 */

import React from "react";
import {MemoryRouter} from "react-router-dom";
import MockTranslationProvider from '../../test/mock/components/Internationalisation/MockTranslationProvider';
import MockPort from '../../test/mock/MockPort';
import MfaInviteUserSettingsPreferenceDialog from "./MfaInviteUserSettingsPreferenceDialog";

export default {
  title: 'Components/MFA/MfaInviteUserSettingsPreferenceDialog',
  component: MfaInviteUserSettingsPreferenceDialog
};

const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <MfaInviteUserSettingsPreferenceDialog {...args}/>
    </MemoryRouter>
  </MockTranslationProvider>;

export const Default = Template.bind({});
Default.args = {
  context: {
    port: new MockPort(),
    locale: "en-US",
  },
  onClose: () => {}
};

