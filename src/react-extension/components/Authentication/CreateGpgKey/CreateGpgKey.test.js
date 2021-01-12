/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./CreateGpgKey.test.data";
import CreateGpgKeyPage from "./CreateGpgKey.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});

describe("Create GPG key", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new CreateGpgKeyPage(context, props);
  });

  it('As AN I should be able to enter a passphrase', async() => {
    const expectedPassphrase = 'La belle vie';
    await page.fill(expectedPassphrase);
    expect(page.passphrase).toBe(expectedPassphrase);
  });

  it('As AN I should initially see the passphrase I typed as obfuscated', async() => {
    const passphrase = 'La belle vie';
    await page.fill(passphrase);
    expect(page.isObfuscated).toBeTruthy();
  });

  it('As AN I should be able to see the non-obfuscate passphrase I typed', async() => {
    const passphrase = 'La belle vie';
    await page.fill(passphrase);
    await page.toggleObfuscate();
    expect(page.isObfuscated).toBeFalsy();
  });

  it('As AN I should see the passphrase very weak strength updated on change', async() => {
    const veryWeakPassphrase = 'blabla';
    await page.fill(veryWeakPassphrase);
    await waitFor(() => expect(page.isVeryWeakPassphrase).toBeTruthy());
  });

  it('As AN I should see the passphrase weak strength updated on change', async() => {
    const weakPassphrase = 'blablablablab';
    await page.fill(weakPassphrase);
    await waitFor(() => expect(page.isWeakPassphrase).toBeTruthy());
  });

  it('As AN I should see the passphrase fair strength updated on change', async() => {
    const fairPassphrase = 'abcdefgh1234=5';
    await page.fill(fairPassphrase);
    await waitFor(() => expect(page.isFairPassphrase).toBeTruthy());
  });

  it('As AN I should see the passphrase strong strength updated on change', async() => {
    const strongPassphrase = 'abcdefgh1234=5ABCD';
    await page.fill(strongPassphrase);
    await waitFor(() => expect(page.isStrongPassphrase).toBeTruthy());
  });

  it('As AN I should see the passphrase very strong strength updated on change', async() => {
    const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
    await page.fill(veryStrongPassphrase);
    await waitFor(() => expect(page.isVeryStrongPassphrase).toBeTruthy());
  });

  it('As AN I should not go to the next step if the passphrase is not strong enough', async() => {
    const veryWeakPassphrase = 'blabla';
    await page.fill(veryWeakPassphrase);
    expect(page.canGoToNextStep).toBeFalsy();
  });

  it('As AN I should not go to the next step if the passphrase is empty', async() => {
    const veryWeakPassphrase = '';
    await page.fill(veryWeakPassphrase);
    expect(page.canGoToNextStep).toBeFalsy();
  });

  it('As AN I should go to the next step if the passphrase is strong enough', async() => {
    const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
    await page.fill(veryStrongPassphrase);
    expect(page.canGoToNextStep).toBeTruthy();
  });


  it('As AN I cannot update the form fields while submitting the form', async() => {
    const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
    await page.fill(veryStrongPassphrase);

    let generateResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => generateResolve = resolve));
    jest.spyOn(context, 'onGenerateGpgKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      generateResolve();
    };
    await page.generateKey(inProgressFn);
    expect(context.onGenerateGpgKeyRequested).toHaveBeenCalled();
    expect(generateResolve).toBeDefined();
  });

  it('As AN I should see a processing feedback while submitting the form', async() => {
    const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
    await page.fill(veryStrongPassphrase);

    let generateResolve;
    const requestMockImpl = jest.fn(() => new Promise(resolve => generateResolve = resolve));
    jest.spyOn(context, 'onGenerateGpgKeyRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.isProcessing).toBeTruthy();
    };
    await page.generateKey(inProgressFn);
    expect(generateResolve).toBeDefined();
  });


  it('As AN I should be able to access the import secret key step with a link on this step', () => {
    expect(page.canAccesToImport).toBeTruthy();
  });
});
