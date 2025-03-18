/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import "../../../../test/mocks/mockClipboard";
import ResourceViewPagePage from "./ResourceViewPage.test.page";
import {
  defaultProps,
  deniedRbacProps,
  disabledApiFlagsProps,
  standaloneTotpResourceProps,
  totpResourceProps
} from "./ResourceViewPage.test.data";
import { waitFor } from "@testing-library/react";
import { defaultTotpViewModelDto } from "../../../shared/models/totp/TotpDto.test.data";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import { denyRbacContext } from "../../../shared/context/Rbac/RbacContext.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ResourceViewPage", () => {
  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementationOnce(implementation);

  describe('As LU, I should preview the secret.', () => {
    it('As LU, I should preview the secret password of a resource ', async () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });
      expect(page.previewPasswordButton).toBeNull();
    });

    it('As LU, I should see username, URI of a resource', async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.username.textContent).toStrictEqual("admin@passbolt.com");
      expect(page.uri.textContent).toStrictEqual("https://passbolt.com");
    });

    it('As LU, I shouldn\'t be able to preview secret password of a resource if disabled by API flag', async () => {
      expect.assertions(1);
      const props = disabledApiFlagsProps();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });
      expect(page.previewPasswordButton).toBeNull();
    });

    it('As LU, I shouldn\'t be able to preview secret password of a resource if denied by RBAC.', async () => {
      expect.assertions(1);
      const props = deniedRbacProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });
      expect(page.previewPasswordButton).toBeNull();
    });

    it('As LU, I should preview the secret totp of a resource ', async () => {
      expect.assertions(1);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description", totp: totp }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.previewTotpButton).toBeNull();
    });

    it('As LU, I should not see username and password of a resource from a standalone totp', async () => {
      expect.assertions(3);
      const props = standaloneTotpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({ totp: totp }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.username).not.toBeNull();
      expect(page.password).toBeNull();
      expect(page.totp).toBeNull();
    });

    it('As LU, I shouldn\'t be able to preview secret totp of a resource if disabled by API flag', async () => {
      expect.assertions(1);
      const props = disabledApiFlagsProps();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description", totp: defaultTotpViewModelDto() }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });
      expect(page.previewTotpButton).toBeNull();
    });

    it('As LU, I shouldn\'t be able to preview secret totp of a resource if denied by RBAC.', async () => {
      expect.assertions(1);
      const props = deniedRbacProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description", totp: defaultTotpViewModelDto() }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });
      expect(page.previewTotpButton).toBeNull();
    });
  });

  // パスワード・TOTPは非表示項目としたためスキップ
  describe.skip('As LU, I should copy the secret.', () => {
    it('As LU, I should be able to copy the secret password of resource by clicking on the password', async () => {
      expect.assertions(4);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.password);

      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.context.storage.local.get(["resources"]).resources[0].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-decrypted');
    });

    it('As LU, I should be able to copy the secret password of resource by clicking on the copy icon', async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      await page.click(page.copyPasswordButton);

      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.context.storage.local.get(["resources"]).resources[0].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-decrypted');
    });

    it('As LU, I should not be able to copy the secret password of resource  if denied by RBAC.', async () => {
      expect.assertions(3);
      const props = deniedRbacProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyPasswordButton).toBeNull();
    });

    it('As LU, I should be able to copy the secret totp of resource by clicking on the password', async () => {
      expect.assertions(4);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description", totp: totp }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.totpText).toStrictEqual("Copy TOTP to clipboard");
      expect(page.totp.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.totp);
      const code = TotpCodeGeneratorService.generate(totp);

      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.context.storage.local.get(["resources"]).resources[0].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    });

    it('As LU, I should be able to copy the secret totp of resource by clicking on the copy icon', async () => {
      expect.assertions(2);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description", totp: totp }));
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      await page.click(page.copyTotpButton);
      const code = TotpCodeGeneratorService.generate(totp);

      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.context.storage.local.get(["resources"]).resources[0].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    });

    it('As LU, I should not be able to copy the secret totp of resource  if denied by RBAC.', async () => {
      expect.assertions(3);
      const props = totpResourceProps({ rbacContext: denyRbacContext() }); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => { });

      expect(page.totpText).toStrictEqual("Copy TOTP to clipboard");
      expect(page.totp.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyTotpButton).toBeNull();
    });
  });
});
