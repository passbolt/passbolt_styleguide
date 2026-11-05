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

import {
  mockMfaSettings,
  mockModel,
  mockDefaultMfaModel,
} from "../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import MfaModel from "./MfaModel";

describe("MFAModel", () => {
  describe("MFAModel::constructor", () => {
    it("should init model with default value", () => {
      const model = new MfaModel();
      expect.assertions(1);
      expect(model).toEqual(mockDefaultMfaModel);
    });

    it("should init model with dto value", () => {
      const model = new MfaModel(mockMfaSettings);
      expect.assertions(1);
      expect(model).toEqual(mockModel);
    });

    describe("duoVerifySubscriber", () => {
      it("should be true when the verifySubscriber policy is true", () => {
        expect.assertions(1);
        const model = new MfaModel({ ...mockMfaSettings, duo: { ...mockMfaSettings.duo, verifySubscriber: true } });
        expect(model.duoVerifySubscriber).toStrictEqual(true);
      });

      it("should be false when the verifySubscriber policy is false", () => {
        expect.assertions(1);
        const model = new MfaModel({ ...mockMfaSettings, duo: { ...mockMfaSettings.duo, verifySubscriber: false } });
        expect(model.duoVerifySubscriber).toStrictEqual(false);
      });

      it("should be false when the verifySubscriber policy is missing", () => {
        expect.assertions(1);
        const duo = { ...mockMfaSettings.duo };
        delete duo.verifySubscriber;
        const model = new MfaModel({ ...mockMfaSettings, duo });
        expect(model.duoVerifySubscriber).toStrictEqual(false);
      });

      it("should be false when the duo settings are missing", () => {
        expect.assertions(1);
        const settings = { ...mockMfaSettings };
        delete settings.duo;
        const model = new MfaModel(settings);
        expect(model.duoVerifySubscriber).toStrictEqual(false);
      });

      it.each([null, undefined, "true", 1, {}])(
        "should be false when the verifySubscriber policy is not exactly true: %p",
        (value) => {
          expect.assertions(1);
          const model = new MfaModel({ ...mockMfaSettings, duo: { ...mockMfaSettings.duo, verifySubscriber: value } });
          expect(model.duoVerifySubscriber).toStrictEqual(false);
        },
      );
    });
  });
});
