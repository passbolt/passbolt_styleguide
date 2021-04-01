/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./ChooseSecurityToken.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import ChooseSecurityTokenPage from "./ChooseSecurityToken.test.page";
import "../../../test/lib/crypto/cryptoGetRandomvalues";


beforeEach(() => {
  jest.resetModules();
});

describe("Choose security token", () => {
  let page, // The page to test against
    context; // The context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    context = defaultAppContext(); // The context
    page = new ChooseSecurityTokenPage(context, props);
  });

  it('As AN I should be able to choose the color of my security token', async() => {
    const colorToPick = '#009688';
    const expectedSelectedColor = 'rgb(0, 150, 136)';
    await page.selectColor(colorToPick);
    expect(page.color).toBe(expectedSelectedColor);
  });

  it('As AN I should be able to choose the code of my security token', async() => {
    const expectedSelectedCode = '';
    await page.fillCode(expectedSelectedCode);
    expect(page.code).toBe(expectedSelectedCode);
  });

  it('As AN I should be able to randomize the code of my security token', async() => {
    const colorToPick = '#009688';
    await page.selectColor(colorToPick);
    await page.randomize();
    expect(page.code.length).toBe(3);
  });

  it('As AN I cannot update the form fields while submitting the form', async() => {
    let saveResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => saveResolve = resolve));
    jest.spyOn(context, 'onSaveSecurityTokenRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      saveResolve();
    };
    await page.fillCode('ABC');
    await page.save(inProgressFn);
    expect(context.onSaveSecurityTokenRequested).toHaveBeenCalled();
    expect(saveResolve).toBeDefined();
  });

  it('As AN I should see a processing feedback while submitting the form', async() => {
    let saveResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => saveResolve = resolve));
    jest.spyOn(context, 'onSaveSecurityTokenRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.isProcessing).toBeTruthy();
      saveResolve();
    };
    await page.fillCode('ABC');
    await page.save(inProgressFn);
    expect(context.onSaveSecurityTokenRequested).toHaveBeenCalled();
    expect(saveResolve).toBeDefined();
  });

  it('As AN I should see an error if the security token is empty after submitting the form (first validation)', async() => {
    const emptyCode = ' ';
    await page.fillCode(emptyCode);
    await page.save();
    expect(page.hasEmptyCodeError).toBeTruthy();
  });

  it('As AN I should see an error if the security token is not 3 length after submitting the form (first validation)', async() => {
    const notGoodLengthCode = 'AB';
    await page.fillCode(notGoodLengthCode);
    await page.save();
    expect(page.hasNotGoodLengthCode).toBeTruthy();
  });

  it('As AN I should see an error if the submission failed for an unexpected reason', async() => {
    const expectedError = {message: 'Some error'};
    jest.spyOn(context, 'onSaveSecurityTokenRequested').mockImplementationOnce(() => Promise.reject(expectedError));
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
    await page.fillCode('ABC');
    await page.save();
    expect(props.dialogContext.open).toBeCalledWith(NotifyError, expectedError);
  });
});

