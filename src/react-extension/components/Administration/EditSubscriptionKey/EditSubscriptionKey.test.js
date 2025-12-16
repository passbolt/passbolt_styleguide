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
 * @since         3.2.0
 */

import {defaultProps} from "./EditSubscriptionKey.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import EditSubscriptionKeyPage from "./EditSubscriptionKey.test.page";
import {UPDATE_SUBSCRIPTION_KEY} from '../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService';

/**
 * Unit tests on EditSubscriptionKey in regard of specifications
 */
describe("As AD I should edit the subscription key", () => {
  let page, // The page to test against
    props; // The props to pass

  beforeEach(() => {
    props = defaultProps();
    page = new EditSubscriptionKeyPage(props);
  });

  it('As AD I should be able to paste my subscription key', async() => {
    expect.assertions(1);

    const expectedPrivateKey = 'Some subscription key';

    await page.fill(expectedPrivateKey);
    expect(page.subscriptionKey).toEqual(expectedPrivateKey);
  });

  it('As AD I cannot update the form fields while submitting the form', async() => {
    expect.assertions(2);

    const requestMockImpl = jest.fn();
    props.context.port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, requestMockImpl);

    await page.fill('some subscription key');
    await page.updateKey(() => expect(page.canChange).toEqual(false));
    expect(requestMockImpl).toHaveBeenCalled();
  });

  it('As AD I should see a processing feedback while submitting the form', async() => {
    expect.assertions(2);

    const requestMockImpl = jest.fn();
    props.context.port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, requestMockImpl);

    await page.fill('some subscription key');
    await page.updateKey(() => expect(page.saveButtonIsProcessing).toBeDefined());
    expect(requestMockImpl).toHaveBeenCalled();
  });

  it('As AD I should see an error if the private key is empty after submitting the form (first validation)', async() => {
    expect.assertions(2);

    const emptyPrivateKey = ' ';

    await page.fill(emptyPrivateKey);
    await page.updateKey();

    expect(page.hasSubscriptionKeyError).toBeTruthy();
    expect(page.subscriptionKeyErrorMessage).toBe("A subscription key is required.");
  });

  it('As AD I should see an error if the subscription key is invalid', async() => {
    expect.assertions(2);

    const expectedError = {name: 'PassboltSubscriptionError', message: 'The key is invalid.'};
    const requestMockImpl = jest.fn().mockRejectedValue(expectedError);
    props.context.port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, requestMockImpl);

    await page.fill('Some subscription key');
    await page.updateKey();

    expect(page.hasSubscriptionKeyError).toEqual(true);
    expect(page.subscriptionKeyErrorMessage).toBe('The key is invalid.');
  });

  it('As AD I should see an error if the fields of the subscription key is invalid', async() => {
    expect.assertions(2);

    const expectedError = {name: 'EntityValidationError', message: 'Could not validate entity Subscription.'};
    const requestMockImpl = jest.fn().mockRejectedValue(expectedError);
    props.context.port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, requestMockImpl);

    await page.fill('Some subscription key');
    await page.updateKey();

    expect(page.hasSubscriptionKeyError).toEqual(true);
    expect(page.subscriptionKeyErrorMessage).toBe('The subscription key is invalid.');
  });

  it('As AD I should see an error if the submission failed for an unexpected reason', async() => {
    expect.assertions(1);

    const expectedError = new Error('Some error');
    const requestMockImpl = jest.fn().mockRejectedValue(expectedError);
    props.context.port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, requestMockImpl);

    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());

    await page.fill('Some subscription key');
    await page.updateKey();

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: expectedError});
  });
});
