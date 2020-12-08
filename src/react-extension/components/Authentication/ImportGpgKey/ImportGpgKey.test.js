/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./ImportGpgKey.test.data";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import ImportGpgKeyPage from "./ImportGpgKey.test.page";


beforeEach(() => {
  jest.resetModules();
});

describe("Create GPG key", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new ImportGpgKeyPage(context, props);
  });

  it('As AN I should be able to paste my secret key', async() => {
    const expectedPrivateKey = 'Some private key';
    await page.fill(expectedPrivateKey);
    expect(page.privateKey).toBe(expectedPrivateKey);
  });


  it('As AN I cannot update the form fields while submitting the form', async() => {
    let verifyResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
    jest.spyOn(context, 'onImportGpgKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      verifyResolve();
    };
    await page.fill("some private key");
    await page.verifyKey(inProgressFn);
    expect(context.onImportGpgKeyRequested).toHaveBeenCalled();
    expect(verifyResolve).toBeDefined();
  });

  it('As AN I should see a processing feedback while submitting the form', async() => {
    let verifyResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
    jest.spyOn(context, 'onImportGpgKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.isProcessing).toBeTruthy();
      verifyResolve();
    };
    await page.fill("some private key");
    await page.verifyKey(inProgressFn);
    expect(context.onImportGpgKeyRequested).toHaveBeenCalled();
    expect(verifyResolve).toBeDefined();
  });


  it('As AN I should see an error if the private keu is empty after submitting the form (first validation)', async() => {
    const emptyPrivateKey = ' ';
    await page.fill(emptyPrivateKey);
    await page.verifyKey();
    expect(page.hasEmptyPrivateKeyError).toBeTruthy();
  });


  it('As AN I should see an error if the submission failed for an unexpected reason', async() => {
    const expectedError = {message: 'Some error'};
    jest.spyOn(context, 'onImportGpgKeyRequested').mockImplementationOnce(() => Promise.reject(expectedError));
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
    await page.fill('Some private key');
    await page.verifyKey();
    expect(props.dialogContext.open).toBeCalledWith(ErrorDialog, expectedError);
  });
});
