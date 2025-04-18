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
 * @since         5.0.0
 */

import React from "react";
import {MfaContextProvider} from "../../../contexts/MFAContext";
import {defaultProps} from "../DisplayProviderList/DisplayProviderList.test.data";
import DuoGetStarted from "./DuoGetStarted";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

export default {
  title: 'Components/MFA/DuoGetStarted',
  component: DuoGetStarted
};

const Template = args =>
  <MfaContextProvider {...args}>
    <MockTranslationProvider>
      <div className="panel middle">
        <div className="grid grid-responsive-12">
          <DuoGetStarted {...args} />
        </div>
      </div>
    </MockTranslationProvider>;
  </MfaContextProvider>;

export const Default = Template.bind({});
Default.args = defaultProps();
