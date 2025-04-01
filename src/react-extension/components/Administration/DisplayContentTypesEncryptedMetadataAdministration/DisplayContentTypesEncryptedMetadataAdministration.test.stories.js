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
 * @since         4.11.0
 */

import React from "react";
import {within} from '@storybook/test';
import {
  allowedVersionErrorProps,
  defaultProps,
  resourceTypesDeletedProps
} from "./DisplayContentTypesEncryptedMetadataAdministration.test.data";
import DisplayContentTypesEncryptedEncryptedMetadataAdministration from "./DisplayContentTypesEncryptedMetadataAdministration";
import {MemoryRouter} from "react-router-dom";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";
import DisplayAdministrationWorkspaceBreadcrumb
  from "../DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";

export default {
  title: 'Components/Administration/DisplayContentTypesEncryptedMetadataAdministration',
  component: DisplayContentTypesEncryptedEncryptedMetadataAdministration,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/administration']}>
      <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
        <div id="container" className="page administration">
          <div id="app" className="app" style={{margin: "-1rem"}}>
            <div className="panel main">
              <div className="panel left">
                <div className="sidebar-content">
                  <div className="top-bar-left-navigation">
                    <div className="navigation">
                    </div>
                  </div>
                  <div className="sidebar-content-left">
                  </div>
                </div>
              </div>
              <div className="panel middle">
                <div className="header">
                </div>
                <div className="middle-right">
                  <div className="breadcrumbs-and-grid">
                    <div className="top-bar">
                      <DisplayAdministrationWorkspaceBreadcrumb/>
                    </div>
                    <div className="main-page">
                      <Story {...args}/>
                    </div>
                  </div>
                  <div className="help-panel">
                    <div className="sidebar-help">
                      <div id="administration-help-panel">
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
  ],
};

export const Initial = {
  args: defaultProps()
};

export const WithValidationError = {
  args: allowedVersionErrorProps(),
  // Trigger the form validation.
  play:  async({canvasElement}) => {
    const canvas = within(canvasElement);
    const form = canvas.getByTestId("submit-form");
    form.requestSubmit();
  }
};

export const WithWarnings = {
  args: resourceTypesDeletedProps()
};
