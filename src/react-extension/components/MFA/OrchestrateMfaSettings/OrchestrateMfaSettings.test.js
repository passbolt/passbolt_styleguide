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
 * @since         5.18.0
 */

/**
 * Unit tests on OrchestrateMfaSettings in regard of specifications
 */
import React from "react";
import { DuoSetupErrors, MfaSettingsWorkflowStates, Providers } from "../../../contexts/MFAContext";
import { allProviders, noMfaDefined } from "../../../contexts/MFAContext.test.data";
import { waitForTrue } from "../../../../../test/utils/waitFor";
import { defaultProps } from "./OrchestrateMfaSettings.test.data";
import OrchestrateMfaSettingsPage from "./OrchestrateMfaSettings.test.page";
import DuoSetupError from "../DuoSetup/DuoSetupError";

jest.mock("../DisplayProviderList/DisplayProviderList", () => () => <span className="display-provider-list"></span>);
jest.mock("../TotpSetup/TotpGetStarted/TotpGetStarted", () => () => <span className="totp-get-started"></span>);
jest.mock("../TotpSetup/ScanTotpCode/ScanTotpCode", () => () => <span className="scan-totp-code"></span>);
jest.mock("../YubikeySetup/YubikeySetup", () => () => <span className="yubikey-setup"></span>);
jest.mock("../DuoSetup/DuoGetStarted", () => () => <span className="duo-get-started"></span>);
jest.mock("../DuoSetup/DuoSetupError", () =>
  jest.fn((props) => <span className="duo-setup-error">{props.errorCode}</span>),
);
jest.mock("../DisplayMfaProviderConfiguration/DisplayMfaProviderConfiguration", () => () => (
  <span className="display-mfa-provider-configuration"></span>
));
jest.mock("../PasskeysSetup/DisplayPasskeys", () => () => <span className="display-passkeys"></span>);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("OrchestrateMfaSettings", () => {
  const isInitialViewReady = (props) =>
    props.mfaContext.navigate.mock.calls.length > 0 || props.mfaContext.goToProviderList.mock.calls.length > 0;

  describe("As a logged user I should land on the right MFA view", () => {
    it("should load the MFA settings when the component is mounted", async () => {
      expect.assertions(1);

      const props = defaultProps();
      new OrchestrateMfaSettingsPage(props, "/app/settings/mfa");
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.findMfaSettings).toHaveBeenCalledTimes(1);
    });

    it("should go to the providers list when no provider is in the url", async () => {
      expect.assertions(3);

      const props = defaultProps();
      new OrchestrateMfaSettingsPage(props, "/app/settings/mfa");
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.goToProviderList).toHaveBeenCalledTimes(1);
      expect(props.mfaContext.setProvider).not.toHaveBeenCalled();
      expect(props.mfaContext.navigate).not.toHaveBeenCalled();
    });

    it.each([
      { provider: Providers.TOTP, expectedState: MfaSettingsWorkflowStates.VIEWCONFIGURATION },
      { provider: Providers.YUBIKEY, expectedState: MfaSettingsWorkflowStates.VIEWCONFIGURATION },
      { provider: Providers.DUO, expectedState: MfaSettingsWorkflowStates.VIEWCONFIGURATION },
      { provider: Providers.WEBAUTHN, expectedState: MfaSettingsWorkflowStates.PASSKEYS },
    ])("should navigate to $expectedState when $provider is enabled", async (testCase) => {
      expect.assertions(3);

      const props = defaultProps();
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/${testCase.provider}`);
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.setProvider).toHaveBeenCalledWith(testCase.provider);
      expect(props.mfaContext.navigate).toHaveBeenCalledWith(testCase.expectedState);
      expect(props.mfaContext.goToProviderList).not.toHaveBeenCalled();
    });

    it.each([
      { mfaUserSettings: noMfaDefined, mfaOrganisationSettings: allProviders },
      { mfaUserSettings: allProviders, mfaOrganisationSettings: noMfaDefined },
    ])(
      "should go to the providers list when the provider is not enabled for both the user and the organisation",
      async (testCase) => {
        expect.assertions(3);

        const props = defaultProps({ mfaContext: testCase });
        new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/${Providers.TOTP}`);
        await waitForTrue(() => isInitialViewReady(props));

        expect(props.mfaContext.setProvider).toHaveBeenCalledWith(Providers.TOTP);
        expect(props.mfaContext.goToProviderList).toHaveBeenCalledTimes(1);
        expect(props.mfaContext.navigate).not.toHaveBeenCalled();
      },
    );

    it("should navigate to the Duo setup error when Duo is not enabled and an error is in the url", async () => {
      expect.assertions(2);

      const props = defaultProps({ mfaContext: { mfaUserSettings: noMfaDefined } });
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/duo?error=${DuoSetupErrors.SETUP_FAILED}`);
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.SETUPDUOERROR);
      expect(props.mfaContext.goToProviderList).not.toHaveBeenCalled();
    });

    it("should navigate to the Duo configuration when Duo is enabled even if an error is in the url", async () => {
      expect.assertions(1);

      const props = defaultProps();
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/duo?error=${DuoSetupErrors.SETUP_FAILED}`);
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
    });

    it("should go to the providers list when a provider other than Duo is not enabled and an error is in the url", async () => {
      expect.assertions(2);

      const props = defaultProps({ mfaContext: { mfaUserSettings: noMfaDefined } });
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/totp?error=${DuoSetupErrors.SETUP_FAILED}`);
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.goToProviderList).toHaveBeenCalledTimes(1);
      expect(props.mfaContext.navigate).not.toHaveBeenCalled();
    });

    it("should go to the providers list when Duo is not enabled and no error is in the url", async () => {
      expect.assertions(2);

      const props = defaultProps({ mfaContext: { mfaUserSettings: noMfaDefined } });
      new OrchestrateMfaSettingsPage(props, "/app/settings/mfa/duo");
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.goToProviderList).toHaveBeenCalledTimes(1);
      expect(props.mfaContext.navigate).not.toHaveBeenCalled();
    });
  });

  describe("As a logged user I should land on the providers list when the MFA settings are not loaded", () => {
    it.each([
      { mfaUserSettings: undefined, mfaOrganisationSettings: allProviders },
      { mfaUserSettings: allProviders, mfaOrganisationSettings: undefined },
    ])("should go to the providers list when a settings object is missing", async (testCase) => {
      expect.assertions(2);

      const props = defaultProps({ mfaContext: testCase });
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/${Providers.TOTP}`);
      await waitForTrue(() => isInitialViewReady(props));

      expect(props.mfaContext.goToProviderList).toHaveBeenCalledTimes(1);
      expect(props.mfaContext.navigate).not.toHaveBeenCalled();
    });
  });

  describe("As a logged user I should see the view matching the MFA workflow state", () => {
    it.each([
      { state: MfaSettingsWorkflowStates.OVERVIEW, expectedView: "display-provider-list" },
      { state: MfaSettingsWorkflowStates.TOTPOVERVIEW, expectedView: "totp-get-started" },
      { state: MfaSettingsWorkflowStates.SCANTOTPCODE, expectedView: "scan-totp-code" },
      { state: MfaSettingsWorkflowStates.SETUPYUBIKEY, expectedView: "yubikey-setup" },
      { state: MfaSettingsWorkflowStates.SETUPDUO, expectedView: "duo-get-started" },
      { state: MfaSettingsWorkflowStates.SETUPDUOERROR, expectedView: "duo-setup-error" },
      { state: MfaSettingsWorkflowStates.VIEWCONFIGURATION, expectedView: "display-mfa-provider-configuration" },
      { state: MfaSettingsWorkflowStates.PASSKEYS, expectedView: "display-passkeys" },
    ])("should display $expectedView for the state $state", async (testCase) => {
      expect.assertions(1);

      const props = defaultProps({ mfaContext: { state: testCase.state } });
      const page = new OrchestrateMfaSettingsPage(props, "/app/settings/mfa");
      await waitForTrue(() => isInitialViewReady(props));

      expect(page.displayedView).toBe(testCase.expectedView);
    });

    it("should give the error code from the url to the Duo setup error view", async () => {
      expect.assertions(1);

      const props = defaultProps({
        mfaContext: { state: MfaSettingsWorkflowStates.SETUPDUOERROR, mfaUserSettings: noMfaDefined },
      });
      const page = new OrchestrateMfaSettingsPage(
        props,
        `/app/settings/mfa/duo?error=${DuoSetupErrors.SUBSCRIBER_MISMATCH}`,
      );
      await waitForTrue(() => isInitialViewReady(props));

      expect(page.duoSetupErrorCode).toBe(DuoSetupErrors.SUBSCRIBER_MISMATCH);
    });
  });

  describe("As a logged user I should be able to leave the Duo setup error view", () => {
    const renderDuoSetupError = async () => {
      const props = defaultProps({
        mfaContext: { state: MfaSettingsWorkflowStates.SETUPDUOERROR, mfaUserSettings: noMfaDefined },
      });
      new OrchestrateMfaSettingsPage(props, `/app/settings/mfa/duo?error=${DuoSetupErrors.SETUP_FAILED}`);
      await waitForTrue(() => isInitialViewReady(props));
      return props;
    };

    it("should go back to the Duo get started view when the user retries", async () => {
      expect.assertions(2);

      const props = await renderDuoSetupError();
      DuoSetupError.mock.lastCall[0].onTryAgain();

      expect(props.mfaContext.navigate).toHaveBeenCalledTimes(2);
      expect(props.mfaContext.navigate).toHaveBeenLastCalledWith(MfaSettingsWorkflowStates.SETUPDUO);
    });

    it("should go to the providers list when the user cancels", async () => {
      expect.assertions(1);

      const props = await renderDuoSetupError();

      expect(DuoSetupError.mock.lastCall[0].onCancel).toBe(props.mfaContext.goToProviderList);
    });
  });
});
