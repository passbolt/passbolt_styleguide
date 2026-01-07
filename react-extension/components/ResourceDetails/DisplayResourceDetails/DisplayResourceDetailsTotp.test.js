/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license Totp, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

/**
 * Unit tests on DisplayResourceDetailsTotp in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import { defaultProps, propsWithDenyUiAction, standaloneTotpProps } from "./DisplayResourceDetailsTotp.test.data";
import DisplayResourceDetailsTotpPage from "./DisplayResourceDetailsTotp.test.page";
import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import { waitFor } from "@testing-library/dom";
import { defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import { TotpCodeGeneratorService } from "../../../../shared/services/otp/TotpCodeGeneratorService";
import { defaultTotpViewModelDto } from "../../../../shared/models/entity/totp/totpDto.test.data";

describe("DisplayResourceDetailsTotp", () => {
  let page;
  const copyClipboardMockImpl = jest.fn((message, data) => data);

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  /**
   * Given a selected resource having Totp
   * When I open the “Totp” section of the secondary sidebar
   * Then I should see the Totp made on the resource
   * And I should be able to identify each Totp name
   * And I should be able to see each Totp value
   */
  describe(" As LU I can see Totp of a resource", () => {
    it("I should see the Totp of a resource", async () => {
      const props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});
      expect.assertions(2);
      expect(page.title.textContent).toBe("TOTP");
      expect(page.exists()).toBeTruthy();
    });

    it("I should close the Totp of a resource", async () => {
      const props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});
      await page.click(page.title);
      expect.assertions(1);
      expect(page.exists()).toBeFalsy();
    });

    it("I should be able to identify each property of totp for a password description and totp resource", async () => {
      const props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});
      expect.assertions(4);
      expect(page.totpLabel).toBe("TOTP");
      expect(page.totp.textContent).toBe("Copy TOTP to clipboard");
      expect(page.uriLabel).toBeUndefined();
      expect(page.uri).toBeNull();
    });

    it("I should be able to identify each property of totp for a standalone totp resource", async () => {
      const props = standaloneTotpProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});
      expect.assertions(4);
      expect(page.totpLabel).toBe("TOTP");
      expect(page.totp.textContent).toBe("Copy TOTP to clipboard");
      expect(page.uriLabel).toBe("URI");
      expect(page.uri.textContent).toBe(props.resourceWorkspaceContext.details.resource.metadata.uris[0]);
    });
  });

  describe(" As LU I can copy a TOTP of a resource to clipboard", () => {
    it("AS LU, I should be able to copy the TOTP of a resource to clipboard", async () => {
      expect.assertions(2);

      const props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      const totp = defaultTotpViewModelDto();
      await waitFor(() => {});
      jest.spyOn(props.context.port, "request").mockImplementation(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});
      jest
        .spyOn(props.context.port, "request")
        .mockImplementationOnce(() => ({ password: "secret-password", description: "", totp: totp }));

      await page.click(page.totp);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.resourceWorkspaceContext.details.resource.id,
      );
      const code = TotpCodeGeneratorService.generate(totp);
      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledWith(
        code,
        "The TOTP has been copied to clipboard.",
      );
    });

    it("AS LU, I should be able to copy the TOTP of a standalone totp resource to clipboard", async () => {
      expect.assertions(2);

      const props = standaloneTotpProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      const totp = defaultTotpViewModelDto();
      await waitFor(() => {});
      jest.spyOn(props.context.port, "request").mockImplementation(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});
      jest
        .spyOn(props.context.port, "request")
        .mockImplementationOnce(() => ({ password: "secret-password", description: "", totp: totp }));

      await page.click(page.totp);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.resourceWorkspaceContext.details.resource.id,
      );
      const code = TotpCodeGeneratorService.generate(totp);
      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledWith(
        code,
        "The TOTP has been copied to clipboard.",
      );
    });

    it("AS LU, I cannot copy secret of resource if denied by RBAC", async () => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.totpLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe(" As LU I can preview secret of a resource", () => {
    it("AS LU, I should be able to preview secret of a resource", async () => {
      const props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});
      const totp = defaultTotpViewModelDto();
      jest
        .spyOn(props.context.port, "request")
        .mockImplementationOnce(() => ({ password: "secret-password", description: "", totp: totp }));
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementationOnce(() => {});

      expect.assertions(4);
      await page.click(page.viewTotp);
      const code = TotpCodeGeneratorService.generate(totp);
      expect(page.totp.textContent.replaceAll(/\s+/g, "")).toBe(code);
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.resourceWorkspaceContext.details.resource.id,
      );
      await page.click(page.viewTotp);
      expect(page.totp.textContent).toBe("Copy TOTP to clipboard");
    });

    it("AS LU, I cannot preview secret of resource if disabled by API flag", async () => {
      const context = defaultUserAppContext({
        siteSettings: {
          getServerTimezone: () => "",
          canIUse: () => false,
        },
      });
      const props = defaultProps({ context });
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.isViewTotpExist).toBeFalsy();
    });

    it("AS LU, I cannot preview secret of resource if denied by RBAC", async () => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsTotpPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.isViewTotpExist).toBeFalsy();
    });
  });
});
