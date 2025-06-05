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
 * @since         4.4.0
 */

import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {MfaContextProvider, Providers} from "../../../contexts/MFAContext";
import DisplayMfaProviderConfiguration from "./DisplayMfaProviderConfiguration";
import {propsMfaWithProvider} from "./DisplayMfaProviderConfiguration.test.data";

export default {
  title: 'Components/MFA/DisplayMfaProviderConfiguration',
  component: DisplayMfaProviderConfiguration,
  decorators: [(Story, {args}) =>
    <MfaContextProvider {...args}>
      <MockTranslationProvider>
        <div id="container" className="page settings">
          <div id="app" className="app" tabIndex="1000" style={{margin: "-1rem"}}>
            <div className="panel main">
              <div className="panel left">
                <div className="sidebar-content">
                </div>
              </div>
              <div className="panel middle">
                <div className="header">
                </div>
                <div className="middle-right">
                  <div className="breadcrumbs-and-grid">
                    <div className="top-bar">
                    </div>
                    <div className="main-page">
                      <Story {...args}/>
                    </div>
                  </div>
                  <div className="help-panel">
                    <div className="sidebar-help">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MockTranslationProvider>;
    </MfaContextProvider>
  ]
};

export const Totp = {
  args: propsMfaWithProvider(Providers.TOTP)
};

export const Yubikey = {
  args: propsMfaWithProvider(Providers.YUBIKEY)
};

export const Duo = {
  args: propsMfaWithProvider(Providers.DUO)
};
