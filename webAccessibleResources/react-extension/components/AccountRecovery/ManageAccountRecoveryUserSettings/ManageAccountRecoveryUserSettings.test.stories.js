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

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ManageAccountRecoveryUserSettings from "./ManageAccountRecoveryUserSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";


export default {
  title: 'Components/AccountRecovery/ManageAccountRecoveryUserSettings',
  component: ManageAccountRecoveryUserSettings
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ManageAccountRecoveryUserSettings {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;

export const OptOut = Template.bind({});
OptOut.args = {
  context: {
    locale: "en-US",
    userSettings: {
      // eslint-disable-next-line no-undef
      getTrustedDomain: () => process.env.ORIGIN_URL
    }
  },
  organizationPolicy: {
    creator: {
      profile: {
        first_name: "Ada",
        last_name: "Lovelace"
      },
      gpgkey: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
      }
    },
    policy: "opt-out",
    modified: "2021-05-25T09:08:34.123",
  },
  onClose: () => {}
};

export const OptIn = Template.bind({});
OptIn.args = {
  context: {
    locale: "en-US",
    userSettings: {
      // eslint-disable-next-line no-undef
      getTrustedDomain: () => process.env.ORIGIN_URL
    }
  },
  organizationPolicy: {
    creator: {
      profile: {
        first_name: "Ada",
        last_name: "Lovelace"
      },
      gpgkey: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
      }
    },
    policy: "opt-in",
    modified: "2021-05-25T09:08:34.123",
  },
  onClose: () => {}
};

export const Mandatory = Template.bind({});
Mandatory.args = {
  context: {
    locale: "en-US",
    userSettings: {
      // eslint-disable-next-line no-undef
      getTrustedDomain: () => process.env.ORIGIN_URL
    }
  },
  organizationPolicy: {
    creator: {
      profile: {
        first_name: "Ada",
        last_name: "Lovelace"
      },
      gpgkey: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
      }
    },
    policy: "mandatory",
    modified: "2021-05-25T09:08:34.123",
  },
  onClose: () => {}
};
