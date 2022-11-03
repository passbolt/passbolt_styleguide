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
 * @since         3.8.0
 */

/**
 * Unit tests on SendTestMailDialogPage in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {defaultProps, propsWithMockSendTestEmail} from "./SendTestMailDialog.test.data";
import SendTestMailDialogPage from "./SendTestMailDialog.test.page";
import {enableFetchMocks} from "jest-fetch-mock";

beforeEach(() => {
  jest.resetModules();
  enableFetchMocks();
});

describe("SendTestMailDialog", () => {
  it('As a signed-in administrator on the “Send test email” dialog, I cannot edit the form when I click on the “Send” button', async() => {
    expect.assertions(1);
    const props = propsWithMockSendTestEmail();
    let promiseResolve = null;
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(() => new Promise(resolve => {
      promiseResolve = resolve;
    }));
    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.recipient.disabled).toBeTruthy();

    promiseResolve();
  });

  it('As a signed-in administrator on the “Send test email” dialog, I cannot send the test email when the form does not validate', async() => {
    expect.assertions(1);
    const page = new SendTestMailDialogPage(defaultProps());
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "invalid email input"
    });

    await page.clickOn(page.submitButton, () => true);

    expect(page.recipient_error.textContent).toBe("Recipient must be a valid email");
  });

  it('As a signed-in administrator on the “Send test email” dialog, I can see the “Email sent” dialog when the test email was successfully sent', async() => {
    expect.assertions(1);
    const props = propsWithMockSendTestEmail();
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => ({debug: [{message: "everything is fine"}]}));

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Email sent");
  });

  it('As a signed-in administrator on the “Email sent” dialog, I can see the logs', async() => {
    expect.assertions(3);
    const debugMessage = {debug: [{message: "everything is fine"}]};
    const props = propsWithMockSendTestEmail();
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => debugMessage);

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Email sent");
    expect(page.logs).toBeTruthy();

    await page.clickOnLogs();

    expect(page.logDetails.value).toBe(JSON.stringify(debugMessage.debug, null, 4));
  });

  it('As a signed-in administrator on the “Send test email” dialog, I can see the “Something went wrong!” dialog when the test email could not be sent ', async() => {
    expect.assertions(1);
    const props = propsWithMockSendTestEmail();
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => {
      const error = new Error("Something didn't happen very well!");
      error.body = {
        debug: [{
          message: "test"
        }]
      };
      throw error;
    });

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Something went wrong!");
  });

  it('As a signed-in administrator on the “Something went wrong!” dialog, I can see the FAQ help webpage when I click on the link in the message', async() => {
    expect.assertions(2);
    const props = propsWithMockSendTestEmail();
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => {
      const error = new Error("Something didn't happen very well!");
      error.body = {
        debug: [{
          message: "test"
        }]
      };
      throw error;
    });

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.faqButton).toBeTruthy();
    expect(page.faqButton.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it('As a signed-in administrator on the “Something went wrong!” dialog, I can see the logs', async() => {
    expect.assertions(3);
    const props = propsWithMockSendTestEmail();
    const debugMessage = "Something didn't happen very well!";
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => {
      throw new Error(debugMessage);
    });

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Something went wrong!");
    expect(page.logs).toBeTruthy();
    expect(page.logDetails.value).toBe(JSON.stringify(debugMessage, null, 4));
  });

  it('As a signed-in administrator on the “Something went wrong!” dialog, I can retry to send an test email', async() => {
    expect.assertions(2);
    const props = propsWithMockSendTestEmail();
    const debugMessage = "Something didn't happen very well!";
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => {
      throw new Error(debugMessage);
    });

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Something went wrong!");

    await page.retry();

    expect(page.title.textContent).toBe("Send test email");
  });

  it('As a signed-in administrator on the “Email sent” dialog, I can retry to send an test email', async() => {
    expect.assertions(2);
    const debugMessage = {debug: [{message: "everything is fine"}]};
    const props = propsWithMockSendTestEmail();
    props.adminSmtpSettingsContext.sendTestMailTo.mockImplementation(async() => debugMessage);

    const page = new SendTestMailDialogPage(props);
    await waitFor(() => {});

    await page.setFormWith({
      recipient: "test@passbolt.com"
    });

    await page.sendTestEmail();

    expect(page.title.textContent).toBe("Email sent");

    await page.retry();

    expect(page.title.textContent).toBe("Send test email");
  });
});
