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
 * @since         4.4.0
 */

import { DateTime } from "luxon";
import { formatDateForApi, formatDateTimeAgo, formatExpirationDateTimeAgo } from "./dateUtils";
import each from "jest-each";

describe("dateUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("::formatDateTimeAgo", () => {
    const translation = jest.fn((t) => t);
    const language = "en-GB";

    const now = new Date();

    jest.useFakeTimers().setSystemTime(now);

    it("should return n/a if the given date is null", () => {
      expect.assertions(2);
      const date = null;
      expect(formatDateTimeAgo(date, translation, language)).toStrictEqual("n/a");
      expect(translation).not.toHaveBeenCalled();
    });

    it("should return 'Never' translated if the date is 'Infinity'", () => {
      expect.assertions(3);
      const date = "Infinity";
      expect(formatDateTimeAgo(date, translation, language)).toStrictEqual("Never");
      expect(translation).toHaveBeenCalledWith("Never");
      expect(translation).toHaveBeenCalledTimes(1);
    });

    it("should return 'Just now' translated if the date is less that 'now + 1 second'", () => {
      expect.assertions(3);
      const date = new Date(now.getTime() - 500).toISOString();
      expect(formatDateTimeAgo(date, translation, language)).toStrictEqual("Just now");
      expect(translation).toHaveBeenCalledWith("Just now");
      expect(translation).toHaveBeenCalledTimes(1);
    });

    it("should return the relative time with a date in the past", () => {
      expect.assertions(4);
      //a day is not 25 hours but it stabilized this test
      const _2days = 1000 * 60 * 60 * 25 * 2;
      const date = new Date(now.getTime() - _2days);
      const spyOnDateTimeToRelative = jest.spyOn(DateTime.prototype, "toRelative");

      expect(formatDateTimeAgo(date.toISOString(), translation, language)).toStrictEqual("2 days ago");
      expect(translation).not.toHaveBeenCalled();

      expect(spyOnDateTimeToRelative).toHaveBeenCalledWith({ locale: language });
      expect(spyOnDateTimeToRelative).toHaveBeenCalledTimes(1);
    });

    it("should return the relative time with a date in the future", () => {
      expect.assertions(4);
      //a day is not 25 hours but it stabilized this test
      const _2days = 1000 * 60 * 60 * 25 * 2;
      const date = new Date(now.getTime() + _2days);
      const spyOnDateTimeToRelative = jest.spyOn(DateTime.prototype, "toRelative");
      expect(formatDateTimeAgo(date.toISOString(), translation, language)).toStrictEqual("in 2 days");
      expect(translation).not.toHaveBeenCalled();

      expect(spyOnDateTimeToRelative).toHaveBeenCalledWith({ locale: language });
      expect(spyOnDateTimeToRelative).toHaveBeenCalledTimes(1);
    });
  });

  describe("::formatExpirationDateTimeAgo", () => {
    const translation = jest.fn((t) => t);
    const language = "en-GB";

    const now = new Date();

    jest.useFakeTimers().setSystemTime(now);

    each([0, false, null, undefined, []]).describe("should return 'Never' if the given date is falsy", (scenario) => {
      it(`with: ${scenario}`, () => {
        expect.assertions(3);
        const date = null;
        expect(formatExpirationDateTimeAgo(date, translation, language)).toStrictEqual("Never");
        expect(translation).toHaveBeenCalledWith("Never");
        expect(translation).toHaveBeenCalledTimes(1);
      });
    });

    it("should return 'Never' translated if the date is 'Infinity'", () => {
      expect.assertions(3);
      const date = "Infinity";
      expect(formatExpirationDateTimeAgo(date, translation, language)).toStrictEqual("Never");
      expect(translation).toHaveBeenCalledWith("Never");
      expect(translation).toHaveBeenCalledTimes(1);
    });

    it("should return 'Just now' translated if the date is less that 'now + 1 second'", () => {
      expect.assertions(3);
      const date = new Date(now.getTime() - 500).toISOString();
      expect(formatExpirationDateTimeAgo(date, translation, language)).toStrictEqual("Just now");
      expect(translation).toHaveBeenCalledWith("Just now");
      expect(translation).toHaveBeenCalledTimes(1);
    });

    it("should return the relative time with a date in the past", () => {
      expect.assertions(4);
      //a day is not 25 hours but it stabilized this test
      const _2days = 1000 * 60 * 60 * 25 * 2;
      const date = new Date(now.getTime() - _2days);
      const spyOnDateTimeToRelative = jest.spyOn(DateTime.prototype, "toRelative");

      expect(formatExpirationDateTimeAgo(date.toISOString(), translation, language)).toStrictEqual("2 days ago");
      expect(translation).not.toHaveBeenCalled();

      expect(spyOnDateTimeToRelative).toHaveBeenCalledWith({ locale: language });
      expect(spyOnDateTimeToRelative).toHaveBeenCalledTimes(1);
    });

    it("should return the relative time with a date in the future", () => {
      expect.assertions(4);
      //a day is not 25 hours but it stabilized this test
      const _2days = 1000 * 60 * 60 * 25 * 2;
      const date = new Date(now.getTime() + _2days);
      const spyOnDateTimeToRelative = jest.spyOn(DateTime.prototype, "toRelative");
      expect(formatExpirationDateTimeAgo(date.toISOString(), translation, language)).toStrictEqual("in 2 days");
      expect(translation).not.toHaveBeenCalled();

      expect(spyOnDateTimeToRelative).toHaveBeenCalledWith({ locale: language });
      expect(spyOnDateTimeToRelative).toHaveBeenCalledTimes(1);
    });
  });

  describe("::formatDateForApi", () => {
    it("should return a string compatible with the API format", () => {
      expect.assertions(1);
      const date = DateTime.fromISO("2023-05-07T09:45:23.190Z");

      expect(formatDateForApi(date)).toStrictEqual("2023-05-07T09:45:23.190Z");
    });

    it("should return null if the given parameter is null", () => {
      expect.assertions(1);
      expect(formatDateForApi(null)).toBeNull();
    });
  });
});
