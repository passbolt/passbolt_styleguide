/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import {defaultAppContext, defaultProps, propsWithCannotRememberMe} from "./CheckPassphrase.test.data";
import ErrorDialog from "../../Common/Dialog/ErrorDialog/ErrorDialog";
import CheckPassphrasePage from "./CheckPassphrase.test.page";


beforeEach(() => {
  jest.resetModules();
});

describe("Check passphrase", () => {
  let page, // The page to test against
    context; // The context
  const props = defaultProps(); // The props to pass

  describe('Check passphrase with Can Remember Me option', () => {
    beforeEach(() => {
      context = defaultAppContext(); // The context
      page = new CheckPassphrasePage(context, props);
    });

    it('As AN I should be able to enter my secret key passphrase', async() => {
      const expectedPassphrase = "some passphrase";
      await page.fillPassphrase(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it('As AN I should be able to ask to remember my passphrase', async() => {
      expect(page.rememberMe).toBe("false");
      await page.toggleRememberMe();
      expect(page.rememberMe).toBe("true");
    });


    it('As AN I cannot update the form fields while submitting the form', async() => {
      let checkResolve = null;
      const requestMockImpl = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      jest.spyOn(context, 'onCheckImportedGpgKeyPassphraseRequested').mockImplementationOnce(requestMockImpl);
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.verify(inProgressFn);
      expect(context.onCheckImportedGpgKeyPassphraseRequested).toHaveBeenCalledWith("some passphrase", false);
      expect(checkResolve).toBeDefined();
    });

    it('As AN I should see a processing feedback while submitting the form', async() => {
      let checkResolve = null;
      const requestMockImpl = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      jest.spyOn(context, 'onCheckImportedGpgKeyPassphraseRequested').mockImplementationOnce(requestMockImpl);
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.toggleRememberMe();
      await page.verify(inProgressFn);
      expect(context.onCheckImportedGpgKeyPassphraseRequested).toHaveBeenCalledWith("some passphrase", true);
      expect(checkResolve).toBeDefined();
    });

    it('As AN I should see an error if the passphrase is empty after submitting the form (first validation)', async() => {
      const emptyPassphrase = ' ';
      await page.fillPassphrase(emptyPassphrase);
      await page.verify();
      expect(page.hasEmptyPassphraseError).toBeTruthy();
    });

    it('As AN I should see an error if f the passphrase cannot decrypt the secret key', async() => {
      const expectedError = {name: 'InvalidMasterPasswordError'};
      jest.spyOn(context, 'onCheckImportedGpgKeyPassphraseRequested').mockImplementationOnce(() => Promise.reject(expectedError));
      await page.fillPassphrase('some passphrase');
      await page.verify();
      expect(page.hasInvalidPassphraseError);
    });

    it('As AN I should see an error if the submission failed for an unexpected reason', async() => {
      const expectedError = {message: 'Some error'};
      jest.spyOn(context, 'onCheckImportedGpgKeyPassphraseRequested').mockImplementationOnce(() => Promise.reject(expectedError));
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.fillPassphrase('some passphrase');
      await page.verify();
      expect(props.dialogContext.open).toBeCalledWith(ErrorDialog, expectedError);
    });
  });


  describe('Check passphrase without Remember Me option', () => {
    beforeEach(() => {
      context = defaultAppContext(); // The context
      page = new CheckPassphrasePage(context, propsWithCannotRememberMe());
    });

    it('As AN I should not see the remember me option if flagged as false from site settings', () => {
      expect(page.canRememberMe).toBeFalsy();
    });
  });
});

