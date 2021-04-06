/**
 * Unit tests on ChangeUserSecurityToken in regard of specifications
 */
import {defaultProps} from "./ChangeUserSecurityToken.test.data";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import ChangeUserSecurityTokenPage from "./ChangeUserSecurityToken.test.page";
import "../../../test/lib/crypto/cryptoGetRandomvalues";


beforeEach(() => {
  jest.resetModules();
});

describe("Display change user security token", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new ChangeUserSecurityTokenPage(props);
  });

  it('As LU I should be able to choose the color of my security token', async() => {
    const colorToPick = '#009688';
    const expectedSelectedColor = 'rgb(0, 150, 136)';
    await page.selectColor(colorToPick);
    expect(page.color).toBe(expectedSelectedColor);
  });

  it('As LU I should be able to choose the code of my security token', async() => {
    const expectedSelectedCode = '';
    await page.fillCode(expectedSelectedCode);
    expect(page.code).toBe(expectedSelectedCode);
  });

  it('As LU I should be able to randomize the code of my security token', async() => {
    await page.randomize();
    expect(page.code.length).toBe(3);
  });

  it('As LU I cannot update the form fields while submitting the form', async() => {
    let saveResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => saveResolve = resolve));
    jest.spyOn(props.userSettingsContext, 'onUpdateSecurityTokenRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.canChange).toBeFalsy();
      saveResolve();
    };
    await page.fillCode('ABC');
    await page.save(inProgressFn);
    expect(props.userSettingsContext.onUpdateSecurityTokenRequested).toHaveBeenCalled();
  });

  it('As LU I should see a processing feedback while submitting the form', async() => {
    let saveResolve = null;
    const requestMockImpl = jest.fn(() => new Promise(resolve => saveResolve = resolve));
    jest.spyOn(props.userSettingsContext, 'onUpdateSecurityTokenRequested').mockImplementationOnce(requestMockImpl);
    const inProgressFn = () => {
      expect(page.isProcessing).toBeTruthy();
      saveResolve();
    };
    await page.fillCode('ABC');
    await page.save(inProgressFn);
    expect(props.userSettingsContext.onUpdateSecurityTokenRequested).toHaveBeenCalled();
    expect(saveResolve).toBeDefined();
  });

  it('As LU I should see an error if the security token is empty after submitting the form (first validation)', async() => {
    const emptyCode = ' ';
    await page.fillCode(emptyCode);
    await page.save();
    expect(page.hasEmptyCodeError).toBeTruthy();
  });

  it('As LU I should see an error if the security token is not 3 length after submitting the form (first validation)', async() => {
    const notGoodLengthCode = 'AB';
    await page.fillCode(notGoodLengthCode);
    await page.save();
    expect(page.hasNotGoodLengthCode).toBeTruthy();
  });

  it('As LU I should see an error if the submission failed for an unexpected reason', async() => {
    const expectedError = {message: 'Some error'};
    jest.spyOn(props.userSettingsContext, 'onUpdateSecurityTokenRequested').mockImplementationOnce(() => Promise.reject(expectedError));
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
    await page.fillCode('ABC');
    await page.save();
    expect(props.dialogContext.open).toBeCalledWith(ErrorDialog, expectedError);
  });
});

