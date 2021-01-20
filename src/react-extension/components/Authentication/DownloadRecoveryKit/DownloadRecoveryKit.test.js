/**
 * Unit tests on DownloadRecoveryKit in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./DownloadRecoveryKit.test.data";
import DownloadRecoveryKitPage from "./DownloadRecoveryKit.test.page";


beforeEach(() => {
  jest.resetModules();
});

describe("Download Recovery Kit", () => {
  let page, // The page to test against
    context; // The context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    context = defaultAppContext();
    page = new DownloadRecoveryKitPage(context, props);
  });

  it('As AN on the download recovery kit page I should see the download of my recovery kit starting automatically', async() => {
    jest.spyOn(context, 'onDownloadRecoveryKitRequested').mockImplementationOnce(jest.fn());
    expect(context.onDownloadRecoveryKitRequested).toHaveBeenCalled();
  });

  it('As AN I should be able to start the download of the recovery kit manually', async() => {
    const requestMock = jest.spyOn(context, 'onDownloadRecoveryKitRequested').mockImplementationOnce(jest.fn());
    const expectedDownloadCallCount = 2;
    await page.download();
    expect(requestMock.mock.calls.length).toBe(expectedDownloadCallCount);
  });

  it('As AN I should be able to go to the next step “choose a security token', async() => {
    jest.spyOn(context, 'onRecoveryKitDownloaded').mockImplementationOnce(jest.fn());
    await page.next();
    expect(context.onRecoveryKitDownloaded).toHaveBeenCalled();
  });
});
