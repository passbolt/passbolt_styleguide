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
 * Unit tests on OrchestrateResourceForm in regard of specifications
 */

import React from 'react';
import {defaultProps} from "./OrchestrateResourceForm.test.data";
import OrchestrateResourceFormPage from "./OrchestrateResourceForm.test.page";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";

jest.mock("./AddResourcePassword", () => () => <span className="password"></span>);
jest.mock("./AddResourceTotp", () => () => <span className="totp"></span>);
jest.mock("./AddResourceNote", () => () => <span className="note"></span>);
jest.mock("./AddResourceDescription", () => () => <span className="description"></span>);

beforeEach(() => {
  jest.resetModules();
});

describe("OrchestrateResourceForm", () => {
  let page; // The page to test against

  describe('As LU I can see the different form.', () => {
    it('As LU I can see the resource password form.', () => {
      const props = defaultProps();
      page = new OrchestrateResourceFormPage(props);
      expect(page.hasPasswordForm).toBeTruthy();
      expect(page.hasTotpForm).toBeFalsy();
      expect(page.hasNoteForm).toBeFalsy();
      expect(page.hasDescriptionForm).toBeFalsy();
    });

    it('As LU I can see the resource totp form.', () => {
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP});
      page = new OrchestrateResourceFormPage(props);
      expect(page.hasPasswordForm).toBeFalsy();
      expect(page.hasTotpForm).toBeTruthy();
      expect(page.hasNoteForm).toBeFalsy();
      expect(page.hasDescriptionForm).toBeFalsy();
    });

    it('As LU I can see the resource note form.', () => {
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE});
      page = new OrchestrateResourceFormPage(props);
      expect(page.hasPasswordForm).toBeFalsy();
      expect(page.hasTotpForm).toBeFalsy();
      expect(page.hasNoteForm).toBeTruthy();
      expect(page.hasDescriptionForm).toBeFalsy();
    });

    it('As LU I can see the resource description form.', () => {
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION});
      page = new OrchestrateResourceFormPage(props);
      expect(page.hasPasswordForm).toBeFalsy();
      expect(page.hasTotpForm).toBeFalsy();
      expect(page.hasNoteForm).toBeFalsy();
      expect(page.hasDescriptionForm).toBeTruthy();
    });

    it('As LU I can see the resource appearance form.', () => {
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.APPEARANCE});
      page = new OrchestrateResourceFormPage(props);
      expect(page.hasPasswordForm).toBeFalsy();
      expect(page.hasTotpForm).toBeFalsy();
      expect(page.hasNoteForm).toBeFalsy();
      expect(page.hasDescriptionForm).toBeFalsy();
      expect(page.hasAppearanceForm).toBeTruthy();
    });
  });
});
