/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

/**
 * Unit tests on DisplayCreatorSecretRevision in regard of specifications
 */

import DisplayCreatorSecretRevisionPage from "./DisplayCreatorSecretRevision.test.page";
import {defaultProps} from "./DisplayCreatorSecretRevision.test.data";
import {waitFor} from "@testing-library/dom";
import SecretRevisionEntity from "../../../shared/models/entity/secretRevision/secretRevisionEntity";
import {defaultSecretRevisionDto} from "../../../shared/models/entity/secretRevision/secretRevisionEntity.test.data";
import {defaultUserDto} from "../../../shared/models/entity/user/userEntity.test.data";
import {defaultProfileDto} from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import {formatDateTimeAgo} from "../../../shared/utils/dateUtils";
import {defaultGpgkeyDto} from "../../../shared/models/entity/gpgkey/gpgkeyEntity.test.data";
import "../../../../test/mocks/mockPortal.js";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayCreatorSecretRevision", () => {
  let page; // The page to test against

  describe('As LU I can see a creator of a secret revision.', () => {
    it('As LU I can select a revision.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      await page.click(page.creatorSecretHistory);

      expect(props.onSelectSecretRevision).toHaveBeenCalledWith(props.secretRevision.id);
    });

    it('As LU I can see all details of a secret revision.', async() => {
      expect.assertions(4);
      const props = defaultProps();
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      expect(page.name.textContent).toStrictEqual("Ada Lovelace");
      expect(page.username.textContent).toStrictEqual("ada@passbolt.com");
      expect(page.editedDate.textContent).toStrictEqual(`Edited: ${formatDateTimeAgo(props.secretRevision.modified)}`);
    });

    it('As LU I can see the creator disabled.', async() => {
      const props = defaultProps({disabled: true});
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      expect(page.creatorSecretHistory.getAttribute("disabled")).not.toBeNull();
    });

    it('As LU I can see the status of a suspended creator.', async() => {
      const creator = defaultUserDto({
        username: "betty@passbolt.com",
        profile: defaultProfileDto({
          first_name: "Betty",
          last_name: "Holberton"
        }),
        disabled: "2025-10-10T18:59:11+00:00"
      });
      const props = defaultProps({secretRevision: new SecretRevisionEntity(defaultSecretRevisionDto({creator}))});
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      expect(page.status.textContent).toStrictEqual("Suspended");
    });

    it('As LU I can see the status of a deleted creator.', async() => {
      const creator = defaultUserDto({
        username: "betty@passbolt.com",
        profile: defaultProfileDto({
          first_name: "Betty",
          last_name: "Holberton"
        }),
        deleted: true
      });
      const props = defaultProps({secretRevision: new SecretRevisionEntity(defaultSecretRevisionDto({creator}))});
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      expect(page.status.textContent).toStrictEqual("Deleted");
    });

    it('As LU I can see the fingerprint of a creator.', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const gpgKey = defaultGpgkeyDto();
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => gpgKey);
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      await page.mouseOverOnFingerprint();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", props.secretRevision.creator.id);
      expect(page.tooltipText).toStrictEqual(gpgKey.fingerprint.replace(/.{4}/g, '$& '));
    });

    it('As LU I cannot see the fingerprint of a creator deleted.', async() => {
      expect.assertions(3);
      const creator = defaultUserDto({
        username: "betty@passbolt.com",
        profile: defaultProfileDto({
          first_name: "Betty",
          last_name: "Holberton"
        }),
        deleted: true
      });
      const props = defaultProps({secretRevision: new SecretRevisionEntity(defaultSecretRevisionDto({creator}))});
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => { throw new Error("User key not found"); });
      page = new DisplayCreatorSecretRevisionPage(props);
      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();

      await page.mouseOverOnFingerprint();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", props.secretRevision.creator.id);
      expect(page.tooltipText).toStrictEqual("User key not found");
    });
  });
});
