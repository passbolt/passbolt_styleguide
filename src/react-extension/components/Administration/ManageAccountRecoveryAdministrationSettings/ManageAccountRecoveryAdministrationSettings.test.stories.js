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
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import {
  disabledPolicyProps, disabledPolicyPropsWithOrganisationKey,
  mandatoryPolicyProps, mandatoryPolicyPropsWithOrganisationKey, optInPolicyProps, optInPolicyPropsWithOrganisationKey,
  optOutPolicyProps, optOutPolicyPropsWithOrganisationKey
} from "./ManageAccountRecoveryAdministrationSettings.test.data";
import {AdminSubscriptionContextProvider} from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";

export default {
  title: 'Components/Administration/ManageAccountRecoveryAdministrationSettings',
  component: ManageAccountRecoveryAdministrationSettings,
  decorators: [(Story, {args}) =>
    <AdminSubscriptionContextProvider {...args}>
      <div id="container" className="page administration">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="main-page">
                    <Story {...args}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSubscriptionContextProvider>
  ]
};

export const Default = {
  args: disabledPolicyProps(),
};

export const Mandatory = {
  args: mandatoryPolicyProps(),
};

export const OptOut = {
  args: optOutPolicyProps(),
};

export const OptIn = {
  args: optInPolicyProps(),
};

export const DefaultWithOrganisationRecoveryKey = {
  args: disabledPolicyPropsWithOrganisationKey(),
};

export const MandatoryWithOrganisationRecoveryKey = {
  args: mandatoryPolicyPropsWithOrganisationKey(),
};

export const OptOutWithOrganisationRecoveryKey = {
  args: optOutPolicyPropsWithOrganisationKey(),
};

export const OptInWithOrganisationRecoveryKey = {
  args: optInPolicyPropsWithOrganisationKey(),
};
