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
 * @since         5.7.0
 */

import React from "react";
import { defaultProps } from "./DisplaySecretHistoryAdministration.test.data";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";
import DisplayAdministrationWorkspaceBreadcrumb from "../DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";
import DisplaySecretHistoryAdministration from "./DisplaySecretHistoryAdministration";
import { defaultSecretRevisionsSettingsDto } from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";
import SecretRevisionsSettingsEntity from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity";
import DisplaySecretHistoryAdministrationHelp from "./DisplaySecretHistoryAdministrationHelp";

export default {
  title: "Components/Administration/DisplaySecretHistoryAdministration",
  component: DisplaySecretHistoryAdministration,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/app/administration/secret-history"]}>
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
                    <div className="help-panel">
                      <div className="sidebar-help">
                        <div id="administration-help-panel">
                          <DisplaySecretHistoryAdministrationHelp />
                        </div>
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

const props = defaultProps();
props.context.port.addRequestListener("passbolt.secret-revisions.find-settings", () =>
  defaultSecretRevisionsSettingsDto(),
);
props.context.port.addRequestListener(
  "passbolt.secret-revisions.save-settings",
  (settings) => new SecretRevisionsSettingsEntity(settings.toDto()),
);
export const Initial = {
  args: props,
};

const propsWithoutSettings = defaultProps();
propsWithoutSettings.context.port.addRequestListener("passbolt.secret-revisions.find-settings", () =>
  SecretRevisionsSettingsEntity.createFromDefault().toDto(),
);
propsWithoutSettings.context.port.addRequestListener(
  "passbolt.secret-revisions.save-settings",
  (settings) => new SecretRevisionsSettingsEntity(settings.toDto()),
);
export const NoSettings = {
  args: propsWithoutSettings,
};
