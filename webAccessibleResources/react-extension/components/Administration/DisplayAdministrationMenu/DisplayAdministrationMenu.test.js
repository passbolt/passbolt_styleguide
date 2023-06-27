/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on DisplayAdministrationMenu in regard of specifications
 */


import DisplayAdministrationMenuPage from "./DisplayAdministrationMenu.test.page";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAppContext, defaultProps} from "./DisplayAdministrationMenu.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the administration menu", () => {
  /**
   * As AD I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As AD I should be able to go to mfa', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToMfa();
    expect(page.menuSelected).toBe('Multi Factor Authentication');
    expect(props.navigationContext.onGoToAdministrationMfaRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to user directory', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToUserDirectory();
    expect(page.menuSelected).toBe('Users Directory');
    expect(props.navigationContext.onGoToAdministrationUsersDirectoryRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to email notifications', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToEmailNotifications();
    expect(page.menuSelected).toBe('Email Notifications');
    expect(props.navigationContext.onGoToAdministrationEmailNotificationsRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to subscription', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.SUBSCRIPTION}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToSubscription();
    expect(page.menuSelected).toBe('Subscription');
    expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to internationalisation', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToInternationalization();
    expect(page.menuSelected).toBe('Internationalisation');
    expect(props.navigationContext.onGoToAdministrationInternationalizationRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to account recovery', async() => {
    expect.assertions(3);
    const props = defaultProps({
      administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY}
    }); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToAccountRecovery();
    expect(page.menuSelected).toBe('Account Recovery');
    expect(props.navigationContext.onGoToAdministrationAccountRecoveryRequested).toHaveBeenCalled();
  });

  describe("As a signed-in administrator on the administration workspace, I can see the Email server setting option in the left-side bar", () => {
    it('If the feature flag is true, the menu should be visible', async() => {
      expect.assertions(4);
      const props = defaultProps({
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.SMTP_SETTINGS}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      await page.goToSmtpSettings();
      expect(page.smtpSettings).toBeTruthy();
      expect(page.menuSelected).toBe('Email server');
      expect(props.navigationContext.onGoToAdministrationSmtpSettingsRequested).toHaveBeenCalled();
    });

    it('If the feature flag is false, the menu should not be visible', async() => {
      expect.assertions(2);
      const props = defaultProps({
        context: {
          siteSettings: {
            canIUse: feature => feature !== "smtpSettings"
          }
        },
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.smtpSettings).toBeNull();
    });
  });

  describe("As a logged in administrator in the administrator workspace, I can see the User self registration settings option in the left-side bar", () => {
    it('If the feature flag is true, the menu should be visible', async() => {
      expect.assertions(4);
      const props = defaultProps({
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.SELF_REGISTRATION}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      await page.goToSelfRegistration();
      expect(page.selfRegistration).toBeTruthy();
      expect(page.menuSelected).toBe('Self Registration');
      expect(props.navigationContext.onGoToAdministrationSelfRegistrationRequested).toHaveBeenCalled();
    });

    it('If the feature flag is false, the menu should not be visible', async() => {
      expect.assertions(2);
      const props = defaultProps({
        context: {
          siteSettings: {
            canIUse: feature => feature !== "selfRegistration"
          }
        },
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.selfRegistration).toBeNull();
    });
  });

  describe("As a signed-in administrator on the administration workspace, I can see the SSO setting option in the left-side bar", () => {
    it('If the feature flag is true, the menu should be visible', async() => {
      expect.assertions(4);
      const props = defaultProps({
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.SSO}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      await page.goToSsoSettings();
      expect(page.ssoSettings).toBeTruthy();
      expect(page.menuSelected).toBe('Single Sign-On');
      expect(props.navigationContext.onGoToAdministrationSsoRequested).toHaveBeenCalled();
    });

    it('If the feature flag is false, the menu should not be visible', async() => {
      expect.assertions(2);
      const props = defaultProps({
        context: {
          siteSettings: {
            canIUse: feature => feature !== "sso"
          }
        },
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.ssoSettings).toBeNull();
    });
  });
  describe("As a logged in administrator in the administrator workspace, I can see the Mfa Policy settings option in the left-side bar", () => {
    it('If the feature flag is true, the menu should be visible', async() => {
      expect.assertions(4);
      const props = defaultProps({
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA_POLICY}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      await page.gotoMfaPolicy();
      expect(page.mfaPolicy).toBeTruthy();
      expect(page.menuSelected).toBe('MFA Policy');
      expect(props.navigationContext.onGoToAdministrationMfaPolicyRequested).toHaveBeenCalled();
    });

    it('If the feature flag is false, the menu should not be visible', async() => {
      expect.assertions(2);
      const props = defaultProps({
        context: {
          siteSettings: {
            canIUse: feature => feature !== "mfaPolicies"
          }
        },
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.mfaPolicy).toBeNull();
    });
  });

  describe("As a logged in administrator in the administrator workspace, I can see the Rbac settings option in the left-side bar", () => {
    it('If the feature flag is true, the menu should be visible', async() => {
      expect.assertions(4);
      const props = defaultProps({
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.RBAC}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      await page.gotoRbacs();
      expect(page.rbacs).toBeTruthy();
      expect(page.menuSelected).toBe('Role-Based Access Control');
      expect(props.navigationContext.onGoToAdministrationRbacsRequested).toHaveBeenCalled();
    });

    it('If the feature flag is false, the menu should not be visible', async() => {
      expect.assertions(2);
      const props = defaultProps({
        context: {
          siteSettings: {
            canIUse: feature => feature !== "rbacs"
          }
        },
        administrationWorkspaceContext: {selectedAdministration: AdministrationWorkspaceMenuTypes.MFA}
      }); // The props to pass
      page = new DisplayAdministrationMenuPage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.rbacs).toBeNull();
    });
  });
});
