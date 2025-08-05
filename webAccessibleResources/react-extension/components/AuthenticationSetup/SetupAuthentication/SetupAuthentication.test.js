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
 * @since         5.4.0
 */
import {AuthenticationSetupWorkflowStates} from "../../../contexts/Authentication/AuthenticationSetupContext";
import {defaultProps} from "./SetupAuthentication.test.data";
import SetupAuthenticationPage from "./SetupAuthentication.test.page";


describe("SetupAuthentication", () => {
  describe("::render", () => {
    it("should display the state: INTRODUCE_EXTENSION", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.INTRODUCE_EXTENSION;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isIntroduceExtenstionState).toStrictEqual(true);
    });

    it("should display the state: GENERATE_GPG_KEY", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY;
      const props = defaultProps({
        authenticationSetupContext: {
          state: state,
          userPassphrasePolicies: {entropy_minimum: 0},
        },
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isGenerateGpgKeyState).toStrictEqual(true);
    });

    it("should display the state: DOWNLOAD_RECOVERY_KIT", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.DOWNLOAD_RECOVERY_KIT;
      const props = defaultProps({
        authenticationSetupContext: {
          state: state,
          downloadRecoveryKit: jest.fn()
        },
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isDownloadRecoveryKitState).toStrictEqual(true);
    });

    it("should display the state: IMPORT_GPG_KEY", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.IMPORT_GPG_KEY;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isImportGpgKeyState).toStrictEqual(true);
    });

    it("should display the state: VALIDATE_PASSPHRASE", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isValidatePassphraseState).toStrictEqual(true);
    });

    it("should display the state: CHOOSE_ACCOUNT_RECOVERY_PREFERENCE", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isChooseAccountRecoveryPreferenceState).toStrictEqual(true);
    });

    it("should display the state: CHOOSE_SECURITY_TOKEN", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isChooseSecurityTokenState).toStrictEqual(true);
    });

    it("should display the state: CONFIGURING_SSO", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.CONFIGURING_SSO;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isConfiguringSsoState).toStrictEqual(true);
    });

    it("should display the state: COMPLETING_SETUP", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.COMPLETING_SETUP;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isCompletingSetupState).toStrictEqual(true);
    });

    it("should display the state: SIGNING_IN", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.SIGNING_IN;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isSigningInState).toStrictEqual(true);
    });

    it("should display the state: UNEXPECTED_ERROR", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isUnexpectedErrorState).toStrictEqual(true);
    });

    it("should display the state: CHECKING_POST_SETUP_METADATA_TASKS", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.CHECKING_POST_SETUP_METADATA_TASKS;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isCheckingPostSetupMetadataTasksState).toStrictEqual(true);
    });

    it("should display the state: ENABLING_METADATA_ENCRYPTION", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.ENABLING_METADATA_ENCRYPTION;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isEnablingMetadataEncryptionState).toStrictEqual(true);
    });

    it("should display the state: LOADING", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.LOADING;
      const props = defaultProps({
        authenticationSetupContext: {state},
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isLoadingState).toStrictEqual(true);
    });

    it("should display the state: UNEXPECTED_METADATA_ENCRYPTION_ENABLEMENT_ERROR", () => {
      expect.assertions(1);

      const state = AuthenticationSetupWorkflowStates.UNEXPECTED_METADATA_ENCRYPTION_ENABLEMENT_ERROR;
      const props = defaultProps({
        authenticationSetupContext: {
          state: state,
          error: new Error("Something went while enabling metadata encryption"),
        },
      });

      const page = new SetupAuthenticationPage(props);

      expect(page.isUnexpectedMetadataEncryptionEnablementErrorState).toStrictEqual(true);
    });
  });
});
