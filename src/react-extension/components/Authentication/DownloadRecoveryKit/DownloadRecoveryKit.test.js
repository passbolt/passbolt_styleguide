/**
 * Unit tests on DownloadRecoveryKit in regard of specifications
 */
import {defaultProps} from "./DownloadRecoveryKit.test.data";
import DownloadRecoveryKitPage from "./DownloadRecoveryKit.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("Download Recovery Kit", () => {
  let page, // The page to test against
    props; // The props to pass

  beforeEach(() => {
    props = defaultProps();
    page = new DownloadRecoveryKitPage(props);
  });

  it('As AN on the download recovery kit page I should see the download of my recovery kit starting automatically', async() => {
    expect.assertions(1);
    expect(props.onDownload).toHaveBeenCalled();
  });

  it('As AN I should be able to start the download of the recovery kit manually', async() => {
    expect.assertions(1);
    await page.download();
    expect(props.onDownload).toHaveBeenCalledTimes(2);
  });

  it('As AN I should be able to go to the next step “choose a security token', async() => {
    expect.assertions(3);
    expect(page.nextButton.hasAttribute('disabled')).toBeTruthy();
    await page.checkStoredRecoveryKit();
    await page.next();
    expect(page.nextButton.hasAttribute('disabled')).toBeFalsy();
    expect(props.onComplete).toHaveBeenCalled();
  });
});
