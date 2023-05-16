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
 * @since        3.6.0
 */
import {waitFor} from "@testing-library/dom";
import {v4 as uuidv4} from "uuid";
import HandleReviewAccountRecoveryRequestRouteTestPage from "./HandleReviewAccountRecoveryRequestRoute.test.page";
import {defaultProps, pendingAccountRecoveryRequest} from "./HandleReviewAccountRecoveryRequestRoute.test.data";

describe("HandleReviewAccountRecoveryRequestRoute", () => {
  it('As AD following a review account recovery request route I should see the creator of the request selected', async() => {
    const user = {id: uuidv4()}; // @todo mock-dto The mock of the dto could reuse later the BP code.
    const props = defaultProps({context: {users: [user]}});
    const accountRecoveryRequest = pendingAccountRecoveryRequest({user_id: user.id}); // It should have user_id existing in the appContext.users store.
    props.context.port.request = jest.fn(() => accountRecoveryRequest);

    expect.assertions(1);
    new HandleReviewAccountRecoveryRequestRouteTestPage(props);
    await waitFor(() => {});
    expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(user);
  });

  it('As AD following a review account recovery request route I should be notified if the account recovery request does not exist', async() => {
    const user = {id: uuidv4()}; // @todo mock-dto The mock of the dto could reuse later the BP code.
    const props = defaultProps({context: {users: [user]}});
    props.context.port.request = jest.fn(() => Promise.reject());

    expect.assertions(1);
    new HandleReviewAccountRecoveryRequestRouteTestPage(props);
    await waitFor(() => {});
    expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith("The account recovery request does not exist.");
  });

  it('As AD following a review account recovery request route I should be notified if the creator of the account recovery request does not exist', async() => {
    const user = {id: uuidv4()}; // @todo mock-dto The mock of the dto could reuse later the BP code.
    const props = defaultProps();
    const accountRecoveryRequest = pendingAccountRecoveryRequest({user_id: user.id}); // It should have user_id existing in the appContext.users store.
    props.context.port.request = jest.fn(() => accountRecoveryRequest);

    expect.assertions(1);
    new HandleReviewAccountRecoveryRequestRouteTestPage(props);
    await waitFor(() => {});
    expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith("The user who requested an account recovery does not exist.");
  });
});
