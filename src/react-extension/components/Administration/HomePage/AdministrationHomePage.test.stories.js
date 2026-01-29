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
import AdministrationHomePage from "./AdministrationHomePage";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";
import DisplayAdministrationWorkspaceBreadcrumb from "../DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";
import { defaultAdministrationWorkspaceContext } from "../../../contexts/AdministrationWorkspaceContext.test.data";
import { AdministrationWorkspaceMenuTypes } from "../../../contexts/AdministrationWorkspaceContext";
import { siteSettingsCe } from "../../../test/fixture/Settings/siteSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultNavigationContext } from "../../../contexts/NavigationContext.test.data";

export default {
  title: "Components/Administration/AdministrationHomePage",
  component: AdministrationHomePage,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/app/administration"]}>
        <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
          <div id="container" className="page administration">
            <div id="app" className="app" style={{ margin: "-1rem" }}>
              <div className="panel main">
                <div className="panel left">
                  <div className="sidebar-content">
                    <div className="top-bar-left-navigation">
                      <div className="navigation"></div>
                    </div>
                    <div className="sidebar-content-left"></div>
                  </div>
                </div>
                <div className="panel middle">
                  <div className="header"></div>
                  <div className="middle-right">
                    <div className="breadcrumbs-and-grid">
                      <div className="top-bar">
                        <DisplayAdministrationWorkspaceBreadcrumb
                          administrationWorkspaceContext={args.administrationWorkspaceContext}
                        />
                      </div>
                      <div className="main-page">
                        <Story {...args} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TranslationProvider>
      </MemoryRouter>
    ),
  ],
};

const betaMetadataProApiContext = defaultAppContext();
betaMetadataProApiContext.siteSettings.settings.passbolt.plugins.metadata.isInBeta = true;

export const ProApi = {
  args: {
    context: betaMetadataProApiContext,
    navigationContext: defaultNavigationContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HOME,
    }),
    metadataGettingStartedSettings: { enabled: false },
  },
};

export const ProApiWithGettingStarted = {
  args: {
    context: defaultAppContext(),
    navigationContext: defaultNavigationContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HOME,
    }),
    metadataGettingStartedSettings: { enabled: true },
  },
};

export const CeApi = {
  args: {
    context: {
      siteSettings: new SiteSettings(siteSettingsCe),
    },
    navigationContext: defaultNavigationContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HOME,
    }),
    metadataGettingStartedSettings: { enabled: false },
  },
};
