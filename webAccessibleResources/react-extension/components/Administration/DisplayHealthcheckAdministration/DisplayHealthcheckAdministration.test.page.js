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
 * @since         4.5.0
 */

import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import AppContext from '../../../../shared/context/AppContext/AppContext';
import MockTranslationProvider from '../../../test/mock/components/Internationalisation/MockTranslationProvider';
import DisplayHealthcheckAdministration from './DisplayHealthcheckAdministration';
import DisplayAdministrationHealthcheckActions from '../DisplayAdministrationWorkspaceActions/DisplayAdministrationHealthcheckActions/DisplayAdministrationHealthcheckActions';

/**
 * The DisplayHealthcheckAdministration component represented as a page
 */
export default class DisplayHealthcheckAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayAdministrationHealthcheckActions {...props} />
          <DisplayHealthcheckAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  get toolbarActionsRefreshButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[0];
  }

  /**
   * Returns the health check status element
   */
  get healthCheckStatus() {
    return this._page.container.querySelector('.healthcheck-settings');
  }

  /**
   * Returns the healthcheck environment section
   */
  get healthCheckEnvironment() {
    return this._page.container.querySelector('.healthcheck-environment-section');
  }

  /**
   * Returns the healthcheck environment sub sections isSucesss
   */
  get isAllHealthcheckSubSectionEnvironmentSuccess() {
    const healthcheckSuccesses = this.healthCheckEnvironment.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 7;
  }

  /**
   * Returns the healthcheck environment sub sections isFailed
   */
  get isAllHealthcheckSubSectionEnvironmentFailed() {
    const healthcheckFails = this.healthCheckEnvironment.querySelectorAll('.healthcheck-fail');
    return healthcheckFails.length === 7;
  }


  /**
   * Returns the healthcheck configuration files section
   */
  get healthCheckConfigurationFiles() {
    return this._page.container.querySelector('.healthcheck-configFiles-section');
  }

  /**
   * Returns the healthcheck environment sub sections isSucesss
   */
  get isAllHealthcheckSubSectionConfigFilesSuccess() {
    const healthcheckSuccesses = this.healthCheckConfigurationFiles.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 2;
  }

  /**
   * Returns the healthcheck environment sub sections isFailed
   */
  get isAllHealthcheckSubSectionConfigFilesWarned() {
    const healthcheckWarned = this.healthCheckConfigurationFiles.querySelectorAll('.healthcheck-warning');
    return healthcheckWarned.length === 2;
  }


  /**
   * Returns the healthcheck core section
   */
  get healthCheckCore() {
    return this._page.container.querySelector('.healthcheck-core-section');
  }

  /**
   * Returns the healthcheck core sub sections isSucesss
   */
  get isAllHealthcheckSubSectionCoreSuccess() {
    const healthcheckSuccesses = this.healthCheckCore.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 5;
  }

  /**
   * Returns the healthcheck core sub sections isFailed
   */
  get isAllHealthcheckSubSectionCoreFailed() {
    const healthcheckFails = this.healthCheckCore.querySelectorAll('.healthcheck-fail');
    return healthcheckFails.length === 6;
  }

  /**
   * Returns the healthcheck SSL section
   */
  get healthCheckSSL() {
    return this._page.container.querySelector('.healthcheck-ssl-section');
  }

  /**
   * Returns the healthcheck SSL sub sections isSucesss
   */
  get isAllHealthcheckSubSectionSSLSuccess() {
    const healthcheckSuccesses = this.healthCheckSSL.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 3;
  }

  /**
   * Returns the healthcheck SSL sub sections isFailed
   */
  get isAllHealthcheckSubSectionSSLFailed() {
    const healthcheckFails = this.healthCheckSSL.querySelectorAll('.healthcheck-fail');
    const healthcheckWarnings = this.healthCheckSSL.querySelectorAll('.healthcheck-warning');
    return healthcheckFails.length === 2 && healthcheckWarnings.length === 1;
  }


  /**
   * Returns the healthcheck database section
   */
  get healthCheckDatabase() {
    return this._page.container.querySelector('.healthcheck-database-section');
  }

  /**
   * Returns the healthcheck database sub sections isSucesss
   */
  get isAllHealthcheckSubSectionDatabaseSuccess() {
    const healthcheckSuccesses = this.healthCheckDatabase.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 3;
  }

  /**
   * Returns the healthcheck database sub sections isFailed
   */
  get isAllHealthcheckSubSectionDatabaseFailed() {
    const healthcheckFails = this.healthCheckDatabase.querySelectorAll('.healthcheck-fail');
    return healthcheckFails.length === 2;
  }


  /**
   * Returns the healthcheck GPG section
   */
  get healthCheckGPG() {
    return this._page.container.querySelector('.healthcheck-gpg-section');
  }

  /**
   * Returns the healthcheck GPG sub sections isSucesss
   */
  get isAllHealthcheckSubSectionGPGSuccess() {
    const healthcheckSuccesses = this.healthCheckGPG.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 15;
  }

  /**
   * Returns the healthcheck GPG sub sections isFailed
   */
  get isAllHealthcheckSubSectionGPGFailed() {
    const healthcheckFails = this.healthCheckGPG.querySelectorAll('.healthcheck-fail');
    return healthcheckFails.length === 15;
  }


  /**
   * Returns the healthcheck app section
   */
  get healthCheckApp() {
    return this._page.container.querySelector('.healthcheck-app-section');
  }

  /**
   * Returns the healthcheck app sub sections isSucesss
   */
  get isAllHealthcheckSubSectionAppSuccess() {
    const healthcheckSuccesses = this.healthCheckApp.querySelectorAll('.healthcheck-success');
    const healthcheckInfos = this.healthCheckApp.querySelectorAll('.healthcheck-info');

    return healthcheckSuccesses.length === 9 && healthcheckInfos.length === 2;
  }

  /**
   * Return the healthcheck app sub section isSuccess with air gapped
   */
  get isAllHealthcheckSubSectionAppSuccessAirGapped() {
    const healthcheckSuccesses = this.healthCheckApp.querySelectorAll('.healthcheck-success');
    const healthcheckInfos = this.healthCheckApp.querySelectorAll('.healthcheck-info');
    const healthcheckFails = this.healthCheckApp.querySelectorAll('.healthcheck-fail');

    return healthcheckSuccesses.length === 8 && healthcheckInfos.length === 2 && healthcheckFails.length === 1;
  }

  /**
   * Returns the healthcheck app sub sections isFailed
   */
  get isAllHealthcheckSubSectionAppFailed() {
    const healthcheckFails = this.healthCheckApp.querySelectorAll('.healthcheck-fail');
    const healthcheckWarnings = this.healthCheckApp.querySelectorAll('.healthcheck-warning');
    const healthcheckInfos = this.healthCheckApp.querySelectorAll('.healthcheck-info');
    return healthcheckFails.length === 5 && healthcheckInfos.length === 2 && healthcheckWarnings.length === 4;
  }


  /**
   * Returns the healthcheck SMTP section
   */
  get healthCheckSmtp() {
    return this._page.container.querySelector('.healthcheck-smtp-section');
  }

  /**
   * Returns the healthcheck SMTP sub sections isSucesss
   */
  get isAllHealthcheckSubSectionSMTPSuccess() {
    const healthcheckSuccesses = this.healthCheckSmtp.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 4;
  }

  /**
   * Returns the healthcheck SMTP sub sections isFailed
   */
  get isAllHealthcheckSubSectionSMTPFailed() {
    const healthcheckFails = this.healthCheckSmtp.querySelectorAll('.healthcheck-fail');
    const healthcheckWarnings = this.healthCheckSmtp.querySelectorAll('.healthcheck-warning');
    return healthcheckFails.length === 2 && healthcheckWarnings.length === 2;
  }

  /**
   * Returns the healthcheck directorySync section
   */
  get healthcheckDirectorySync() {
    return this._page.container.querySelector('.healthcheck-directorySync-section');
  }

  /**
   * Returns the healthcheck directorySync sub sections isSucesss
   */
  get isAllHealthcheckSubSectionDirectorySyncSuccess() {
    const healthcheckSuccesses = this.healthcheckDirectorySync.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 1;
  }

  /**
   * Returns the healthcheck directorySync sub sections isFailed
   */
  get isAllHealthcheckSubSectionDirectorySyncWarned() {
    const healthcheckWarnings = this.healthcheckDirectorySync.querySelectorAll('.healthcheck-warning');
    return healthcheckWarnings.length === 1;
  }

  /**
   * Returns the healthcheck sso section
   */
  get healthcheckSso() {
    return this._page.container.querySelector('.healthcheck-sso-section');
  }

  /**
   * Returns the healthcheck sso sub sections isSucesss
   */
  get isAllHealthcheckSubSectionSsoSuccess() {
    const healthcheckSuccesses = this.healthcheckSso.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 1;
  }

  /**
   * Returns the healthcheck sso sub sections isFailed
   */
  get isAllHealthcheckSubSectionSsoWarned() {
    const healthcheckWarnings = this.healthcheckSso.querySelectorAll('.healthcheck-warning');
    return healthcheckWarnings.length === 1;
  }

  /**
   * Returns the healthcheck metadata section
   */
  get healthcheckMetadata() {
    return this._page.container.querySelector('.healthcheck-metadata-section');
  }

  /**
   * Returns the healthcheck metadata sub sections isSuccess
   */
  get isAllHealthcheckSubSectionMetadataSuccess() {
    const healthcheckSuccesses = this.healthcheckMetadata.querySelectorAll('.healthcheck-success');
    return healthcheckSuccesses.length === 4;
  }

  /**
   * Returns the healthcheck metadata sub sections isFailed
   */
  get isAllHealthcheckSubSectionMetadataFailed() {
    const healthcheckFails = this.healthcheckMetadata.querySelectorAll('.healthcheck-fail');
    return healthcheckFails.length === 4;
  }

  /**
   * Click on the element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.healthCheckStatus !== null;
  }

  isRefreshButtonEnabled() {
    return !this.toolbarActionsRefreshButton.hasAttribute("disabled");
  }
}
