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

import {defaultProps} from "./HandleReviewAccountRecoveryRequestWorkflow.test.data";
import {HandleReviewAccountRecoveryRequestWorkflow} from "./HandleReviewAccountRecoveryRequestWorkflow";
import ReviewAccountRecovery from "../ReviewAccountRecoveryRequest/ReviewAccountRecoveryRequest";
import ProvideAccountRecoveryOrganizationKey from "../../Administration/ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("UserSettings Context", () => {
  let handleReviewAccountRecoveryWorkflow; // The handleReviewAccountRecoveryWorkflow to text

  describe('As AD I should complete an authentication setup', () => {
    beforeEach(() => {
      handleReviewAccountRecoveryWorkflow = new HandleReviewAccountRecoveryRequestWorkflow(defaultProps());
      const setStateMock = state => handleReviewAccountRecoveryWorkflow.state = Object.assign(handleReviewAccountRecoveryWorkflow.state, state);
      jest.spyOn(handleReviewAccountRecoveryWorkflow, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(handleReviewAccountRecoveryWorkflow.props.context.port, 'request').mockImplementation(requestMock);
    });

    it('As AD I should start with the review account recovery dialog', async() => {
      await handleReviewAccountRecoveryWorkflow.componentDidMount();
      expect(handleReviewAccountRecoveryWorkflow.state.accountRecoveryResponse).toBe(null);
      expect(handleReviewAccountRecoveryWorkflow.props.accountRecoveryContext.findAccountRecoveryPolicy).toHaveBeenCalled();
      const accountRecoveryReviewProps = {
        user: handleReviewAccountRecoveryWorkflow.props.user,
        onCancel: handleReviewAccountRecoveryWorkflow.handleCancelDialog,
        onSubmit: handleReviewAccountRecoveryWorkflow.reviewAccountRecoveryRequest,
        onError: handleReviewAccountRecoveryWorkflow.handleError
      };
      expect(handleReviewAccountRecoveryWorkflow.props.dialogContext.open).toHaveBeenCalledWith(ReviewAccountRecovery, accountRecoveryReviewProps);
    });

    it('As AD I can approved the review account recovery', async() => {
      const status = 'approved';
      await handleReviewAccountRecoveryWorkflow.reviewAccountRecoveryRequest(status);
      expect(handleReviewAccountRecoveryWorkflow.state.accountRecoveryResponse.status).toBe(status);
      expect(handleReviewAccountRecoveryWorkflow.props.accountRecoveryContext.getOrganizationPolicy).toHaveBeenCalled();
      const provideOrganizationKeyProps = {
        accountRecoveryPolicy: {
          currentPolicy: undefined
        },
        onCancel: handleReviewAccountRecoveryWorkflow.handleCancelDialog,
        onSubmit: handleReviewAccountRecoveryWorkflow.handleSave,
        onError: handleReviewAccountRecoveryWorkflow.handleError
      };
      expect(handleReviewAccountRecoveryWorkflow.props.dialogContext.open).toHaveBeenCalledWith(ProvideAccountRecoveryOrganizationKey, provideOrganizationKeyProps);
    });

    it('As AD I can reject the review account recovery', async() => {
      const status = 'rejected';
      await handleReviewAccountRecoveryWorkflow.reviewAccountRecoveryRequest(status);
      expect(handleReviewAccountRecoveryWorkflow.state.accountRecoveryResponse.status).toBe(status);
      expect(handleReviewAccountRecoveryWorkflow.props.context.port.request).toHaveBeenCalledWith('passbolt.account-recovery.organization-review', handleReviewAccountRecoveryWorkflow.state.accountRecoveryResponse, undefined);
      await waitFor(() => {});
      expect(handleReviewAccountRecoveryWorkflow.props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith('The account recovery review has been saved successfully');
      expect(handleReviewAccountRecoveryWorkflow.props.onStop).toHaveBeenCalled();
    });

    it('As AD I can provide the ORK', async() => {
      const privateGpgKeyDto = {
        armored_key: 'private gpg key',
        passphrase: 'passphrase'
      };
      await handleReviewAccountRecoveryWorkflow.handleSave(privateGpgKeyDto);
      expect(handleReviewAccountRecoveryWorkflow.props.context.port.request).toHaveBeenCalledWith('passbolt.account-recovery.organization-review', null, privateGpgKeyDto);
      await waitFor(() => {});
      expect(handleReviewAccountRecoveryWorkflow.props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith('The account recovery review has been saved successfully');
      expect(handleReviewAccountRecoveryWorkflow.props.onStop).toHaveBeenCalled();
    });

    it('As AD I can cancel the review account recovery workflow', async() => {
      await handleReviewAccountRecoveryWorkflow.handleCancelDialog();
      expect(handleReviewAccountRecoveryWorkflow.props.onStop).toHaveBeenCalled();
    });
  });
});
