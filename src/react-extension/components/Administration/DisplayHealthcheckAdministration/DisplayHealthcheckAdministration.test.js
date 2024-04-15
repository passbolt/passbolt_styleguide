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
import {
  defaultProps,
} from './DisplayHealthcheckAdministration.test.data';
import DisplayHealthcheckAdministrationPage from './DisplayHealthcheckAdministration.test.page';
import {
  defaultAdministrationHealthcheckContext, mockHealthcheckAirGappedEnvironment, mockHealthcheckDataAllChecksFail
} from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext.test.data";

describe("See the healthCheck settings", () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe('As AD, I should see the healthcheck status on the administration page', () => {
    let page, props;

    beforeEach(() => {
      props = defaultProps();
      page = new DisplayHealthcheckAdministrationPage(props);
    });

    it('should be able to refresh', async() => {
      expect.assertions(2);
      expect(props.adminHealthcheckContext.loadHealthcheckData).toHaveBeenCalledTimes(1);
      await page.click(page.toolbarActionsRefreshButton);
      // Should be called twice: first on render, second on refresh
      expect(props.adminHealthcheckContext.loadHealthcheckData).toHaveBeenCalledTimes(2);
    });

    it('should render and enable the refresh button', () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      expect(page.isRefreshButtonEnabled()).toBeTruthy();
    });

    it('should display all the healthcheck sections', () => {
      expect.assertions(8);
      expect(page.healthCheckEnvironment).not.toBeNull();
      expect(page.healthCheckApp).not.toBeNull();
      expect(page.healthCheckGPG).not.toBeNull();
      expect(page.healthCheckConfigurationFiles).not.toBeNull();
      expect(page.healthCheckDatabase).not.toBeNull();
      expect(page.healthCheckSmtp).not.toBeNull();
      expect(page.healthCheckSSL).not.toBeNull();
      expect(page.healthCheckCore).not.toBeNull();
    });

    it('should display all subssections success status', () => {
      expect.assertions(16);
      expect(page.isAllHealthcheckSubSectionEnvironmentSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionConfigFilesSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionCoreSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionSSLSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionDatabaseSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionAppSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionGPGSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionSMTPSuccess).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionEnvironmentFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionConfigFilesWarned).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionCoreFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionSSLFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionDatabaseFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionAppFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionGPGFailed).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionSMTPFailed).toBeFalsy();
    });
  });

  describe('As AD, I should see the healthcheck status failed on the administration page', () => {
    let page, props;

    beforeEach(() => {
      props = defaultProps({adminHealthcheckContext: defaultAdministrationHealthcheckContext({healthcheckData: mockHealthcheckDataAllChecksFail})});
      page = new DisplayHealthcheckAdministrationPage(props);
    });
    it('should display all subssections fail status', async() => {
      expect.assertions(16);
      expect(page.isAllHealthcheckSubSectionEnvironmentFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionConfigFilesWarned).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionCoreFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionSSLFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionDatabaseFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionAppFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionGPGFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionSMTPFailed).toBeTruthy();
      expect(page.isAllHealthcheckSubSectionEnvironmentSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionConfigFilesSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionCoreSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionSSLSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionDatabaseSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionAppSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionGPGSuccess).toBeFalsy();
      expect(page.isAllHealthcheckSubSectionSMTPSuccess).toBeFalsy();
    });
  });

  describe('As AD running an air gaped environment, I should see the application sub section healthcheck status failing on the administration page', () => {
    let page, props;

    beforeEach(() => {
      props = defaultProps({adminHealthcheckContext: defaultAdministrationHealthcheckContext({healthcheckData: mockHealthcheckAirGappedEnvironment})});
      page = new DisplayHealthcheckAdministrationPage(props);
    });
    it('should display a fail for the app sub section on a air gaped environment', async() => {
      expect.assertions(1);
      expect(page.isAllHealthcheckSubSectionAppSuccessAirGapped).toBeTruthy();
    });
  });

  describe('As AD, I should see the button disabled during loading', () => {
    let page;
    const props = defaultProps({adminHealthcheckContext: defaultAdministrationHealthcheckContext({isProcessing: () => true})});

    beforeEach(() => {
      page = new DisplayHealthcheckAdministrationPage(props);
    });
    it('should display refresh button disabled', async() => {
      expect.assertions(1);
      expect(page.isRefreshButtonEnabled()).toBeFalsy();
    });
  });

  describe('As AD, I should not be able to refresh the data if the endpoint is disabled', () => {
    it('should display refresh button disabled', async() => {
      expect.assertions(1);
      const adminHealthcheckContext = defaultAdministrationHealthcheckContext({
        isHealthcheckEndpointEnabled: () => false,
        isProcessing: () => false
      });

      const props = defaultProps({adminHealthcheckContext});
      const page = new DisplayHealthcheckAdministrationPage(props);

      expect(page.isRefreshButtonEnabled()).toBeFalsy();
    });
  });
});
