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

import {waitFor} from "@testing-library/react";
import {v4 as uuidv4} from "uuid";
import {defaultProps} from "./HandleReviewAccountRecoveryRequestWorkflow.test.data";
import HandleReviewAccountRecoveryRequestWorkflowTestPage from "./HandleReviewAccountRecoveryRequestWorkflow.test.page";
import ReviewAccountRecovery from "../ReviewAccountRecoveryRequest/ReviewAccountRecoveryRequest";
import ProvideAccountRecoveryOrganizationKey from "../../Administration/ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";

describe("HandleReviewAccountRecoveryRequestWorkflow", () => {
  let page, props, accountRecoveryRequest;

  beforeEach(async() => {
    props = defaultProps();
    accountRecoveryRequest = {id: uuidv4()};
    props.context.port.request = jest.fn(() => accountRecoveryRequest);
    page = new HandleReviewAccountRecoveryRequestWorkflowTestPage(props);
    await waitFor(() => {});
  });

  describe('As AD I should complete an authentication setup', () => {
    it('As AD I should start with the review account recovery process with an account recovery request id', async() => {
      expect.assertions(1);
      const accountRecoveryReviewProps = {
        accountRecoveryRequest: accountRecoveryRequest,
        onCancel: page._instance.handleCancelDialog,
        onSubmit: page._instance.reviewAccountRecoveryRequest,
      };
      expect(props.dialogContext.open).toHaveBeenCalledWith(ReviewAccountRecovery, accountRecoveryReviewProps);
    });

    it('As AD I should start with the review account recovery process with an account recovery request (when an admin follow an email link, the route handler load the request and pass it to the workflow)', async() => {
      accountRecoveryRequest = {id: uuidv4()};
      props = defaultProps({accountRecoveryRequest});
      page = new HandleReviewAccountRecoveryRequestWorkflowTestPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      const accountRecoveryReviewProps = {
        accountRecoveryRequest: accountRecoveryRequest,
        onCancel: page._instance.handleCancelDialog,
        onSubmit: page._instance.reviewAccountRecoveryRequest,
      };
      expect(props.dialogContext.open).toHaveBeenCalledWith(ReviewAccountRecovery, accountRecoveryReviewProps);
    });

    it('As AD I can approved the review account recovery', async() => {
      expect.assertions(1);
      const status = "approved";
      page._instance.reviewAccountRecoveryRequest(status);
      const provideOrganizationKeyProps = {
        onCancel: page._instance.handleCancelDialog,
        onSubmit: page._instance.handleSave,
      };
      expect(props.dialogContext.open).toHaveBeenNthCalledWith(2, ProvideAccountRecoveryOrganizationKey, provideOrganizationKeyProps);
    });

    it('As AD I can reject the review account recovery', async() => {
      expect.assertions(2);
      const status = "rejected";
      page._instance.reviewAccountRecoveryRequest(status);
      await waitFor(() => {});
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith('The account recovery review has been saved successfully');
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As AD I can provide the ORK', async() => {
      expect.assertions(3);
      const privateGpgKeyDto = {
        armored_key: 'private gpg key',
        passphrase: 'passphrase'
      };
      await page._instance.handleSave(privateGpgKeyDto);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.review-request", accountRecoveryRequest.id, null, {"armored_key": "private gpg key", "passphrase": "passphrase"});
      await waitFor(() => {});
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith('The account recovery review has been saved successfully');
      expect(props.onStop).toHaveBeenCalled();
    });

    it('As AD I can cancel the review account recovery workflow', async() => {
      expect.assertions(1);
      await page._instance.handleCancelDialog();
      expect(props.onStop).toHaveBeenCalled();
    });
  });
});
