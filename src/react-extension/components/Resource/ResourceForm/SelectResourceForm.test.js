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
 * @since         5.0.0
 */

/**
 * Unit tests on SelectResourceForm in regard of specifications
 */

import SelectResourceFormPage from "./SelectResourceForm.test.page";
import {defaultProps} from "./SelectResourceForm.test.data";
import {waitFor} from "@testing-library/dom";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("SelectResourceForm", () => {
  let page; // The page to test against

  describe('As LU I can see the select resource form.', () => {
    it('As LU I can close the resource sections.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.getSectionItem(1)).toBeDefined();

      await page.click(page.sidebarSectionsSecret);
      await page.click(page.sidebarSectionMetadata);

      expect(page.getSectionItem(1)).toBeUndefined();
    });

    it('As LU the resource secret section password should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
    });

    it('As LU the resource secret section totp should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
    });

    it('As LU the resource secret section note should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE, resource: defaultResourceFormDto({secret: {description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Note");
    });

    it('As LU the resource secret section description should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
    });
  });
});
