/**
 * Unit tests on EditSubscriptionKey in regard of specifications
 */
import {defaultProps} from "./EditSubscriptionKey.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import EditSubscriptionKeyPage from "./EditSubscriptionKey.test.page";


beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should edit the subscription key", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new EditSubscriptionKeyPage(props);
  });

  it('As AD I should be able to paste my subscription key', async() => {
    const expectedPrivateKey = 'Some subscription key';
    await page.fill(expectedPrivateKey);
    expect.assertions(1);
    expect(page.subscriptionKey).toBe(expectedPrivateKey);
  });


  it('As AD I cannot update the form fields while submitting the form', async() => {
    let verifyResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
    jest.spyOn(props.administrationWorkspaceContext, 'onUpdateSubscriptionKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      verifyResolve();
    };
    await page.fill("some subscription key");
    await page.updateKey(inProgressFn);
    expect.assertions(5);
    expect(props.administrationWorkspaceContext.onUpdateSubscriptionKeyRequested).toHaveBeenCalled();
    expect(verifyResolve).toBeDefined();
  });

  it('As AD I should see a processing feedback while submitting the form', async() => {
    let verifyResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
    jest.spyOn(props.administrationWorkspaceContext, 'onUpdateSubscriptionKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.saveButtonIsProcessing).toBeTruthy();
      verifyResolve();
    };
    expect.assertions(5);
    await page.fill("some subscription key");
    await page.updateKey(inProgressFn);
    expect(props.administrationWorkspaceContext.onUpdateSubscriptionKeyRequested).toHaveBeenCalled();
    expect(verifyResolve).toBeDefined();
  });


  it('As AD I should see an error if the private key is empty after submitting the form (first validation)', async() => {
    const emptyPrivateKey = ' ';
    await page.fill(emptyPrivateKey);
    await page.updateKey();
    expect.assertions(2);
    expect(page.hasSubscriptionKeyError).toBeTruthy();
    expect(page.subscriptionKeyErrorMessage).toBe("A subscription key is required.");
  });

  it('As AD I should see an error if the subscription key is invalid', async() => {
    const expectedError = {name: 'PassboltSubscriptionError', message: "The key is invalid."};
    jest.spyOn(props.administrationWorkspaceContext, 'onUpdateSubscriptionKeyRequested').mockImplementationOnce(() => Promise.reject(expectedError));
    await page.fill('Some subscription key');
    await page.updateKey();
    expect.assertions(2);
    expect(page.hasSubscriptionKeyError).toBeTruthy();
    expect(page.subscriptionKeyErrorMessage).toBe("The key is invalid.");
  });

  it('As AD I should see an error if the fields of the subscription key is invalid', async() => {
    const expectedError = {name: 'EntityValidationError', message: "Could not validate entity Subscription."};
    jest.spyOn(props.administrationWorkspaceContext, 'onUpdateSubscriptionKeyRequested').mockImplementationOnce(() => Promise.reject(expectedError));
    await page.fill('Some subscription key');
    await page.updateKey();
    expect.assertions(2);
    expect(page.hasSubscriptionKeyError).toBeTruthy();
    expect(page.subscriptionKeyErrorMessage).toBe("The subscription key is invalid.");
  });

  it('As AD I should see an error if the submission failed for an unexpected reason', async() => {
    const error = new Error('Some error');
    jest.spyOn(props.administrationWorkspaceContext, 'onUpdateSubscriptionKeyRequested').mockImplementationOnce(() => Promise.reject(error));
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
    await page.fill('Some subscription key');
    await page.updateKey();
    expect.assertions(1);
    expect(props.dialogContext.open).toBeCalledWith(NotifyError, {error: error});
  });
});
