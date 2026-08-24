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
 * @since         5.15.0
 */

import SegmentedOtpResolutionService from "./SegmentedOtpResolutionService";
import { FieldRole } from "./Taxonomy";
import { defaultBox, defaultScope } from "./SegmentedOtpResolutionService.test.data";

describe("SegmentedOtpResolutionService", () => {
  describe("SegmentedOtpResolutionService::resolve", () => {
    describe("positive grouping and corroboration", () => {
      it("should group 6 homogeneous plain boxes when a single box corroborates via autocomplete one-time-code", () => {
        expect.assertions(9);

        const fields = [
          defaultBox("otp-0"),
          defaultBox("otp-1"),
          defaultBox("otp-2", { autoComplete: "one-time-code" }),
          defaultBox("otp-3"),
          defaultBox("otp-4"),
          defaultBox("otp-5"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["otp-0", "otp-1", "otp-2", "otp-3", "otp-4", "otp-5"]]);
        expect(testScope.roles.get("otp-0")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("otp-1")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("otp-2")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("otp-3")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("otp-4")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("otp-5")).toBe(FieldRole.TOTP);
        expect(testScope.roles.size).toBe(6);
        expect(groups).toHaveLength(1);
      });

      it("should group a run when a single box corroborates via inputMode numeric", () => {
        expect.assertions(3);

        const fields = [
          defaultBox("box-0"),
          defaultBox("box-1", { inputMode: "numeric" }),
          defaultBox("box-2"),
          defaultBox("box-3"),
          defaultBox("box-4"),
          defaultBox("box-5"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["box-0", "box-1", "box-2", "box-3", "box-4", "box-5"]]);
        expect(groups).toHaveLength(1);
        expect(testScope.roles.get("box-1")).toBe(FieldRole.TOTP);
      });

      it("should group a run when a single box corroborates via a digit-constrained pattern", () => {
        expect.assertions(2);

        const fields = [
          defaultBox("box-0"),
          defaultBox("box-1", { pattern: "\\d" }),
          defaultBox("box-2"),
          defaultBox("box-3"),
          defaultBox("box-4"),
          defaultBox("box-5"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["box-0", "box-1", "box-2", "box-3", "box-4", "box-5"]]);
        expect(testScope.roles.get("box-1")).toBe(FieldRole.TOTP);
      });

      it.each([["tel"], ["number"], ["password"], [""]])(
        "should group a homogeneous run of type %j boxes under an OTP heading",
        (type) => {
          expect.assertions(1);

          const fields = Array.from({ length: 6 }, (unused, index) => defaultBox(`b${index}`, { type }));
          const testScope = defaultScope(fields, ["One-time code"]);

          expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([
            ["b0", "b1", "b2", "b3", "b4", "b5"],
          ]);
        },
      );

      it("should group a run when a single box name is the exact-segment TOTP token otp", () => {
        expect.assertions(2);

        const fields = [
          defaultBox("b0"),
          defaultBox("b1"),
          defaultBox("b2", { name: "otp" }),
          defaultBox("b3"),
          defaultBox("b4"),
          defaultBox("b5"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["b0", "b1", "b2", "b3", "b4", "b5"]]);
        expect(testScope.roles.get("b2")).toBe(FieldRole.TOTP);
      });

      it.each([["placeholder"], ["ariaLabel"], ["labelText"]])(
        "should corroborate a run via a TOTP keyword carried by the box %s",
        (source) => {
          expect.assertions(1);

          const fields = Array.from({ length: 6 }, (unused, index) =>
            defaultBox(`b${index}`, index === 2 ? { [source]: "authenticator code" } : {}),
          );
          const testScope = defaultScope(fields);

          expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([
            ["b0", "b1", "b2", "b3", "b4", "b5"],
          ]);
        },
      );

      it.each([["tel"], ["decimal"], ["NUMERIC"], ["  numeric  "]])(
        "should corroborate a run via inputMode %j",
        (inputMode) => {
          expect.assertions(1);

          const fields = Array.from({ length: 6 }, (unused, index) =>
            defaultBox(`b${index}`, index === 0 ? { inputMode } : {}),
          );
          const testScope = defaultScope(fields);

          expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([
            ["b0", "b1", "b2", "b3", "b4", "b5"],
          ]);
        },
      );

      it("should corroborate a run via a [0-9] character-class pattern", () => {
        expect.assertions(1);

        const fields = Array.from({ length: 6 }, (unused, index) =>
          defaultBox(`b${index}`, index === 0 ? { pattern: "[0-9]" } : {}),
        );
        const testScope = defaultScope(fields);

        expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([["b0", "b1", "b2", "b3", "b4", "b5"]]);
      });

      it.each([["Use your authenticator app"], ["Enter your 2FA code"], ["MFA required"]])(
        "should corroborate a plain run via the OTP heading %j",
        (heading) => {
          expect.assertions(1);

          const fields = Array.from({ length: 6 }, (unused, index) => defaultBox(`b${index}`));
          const testScope = defaultScope(fields, [heading]);

          expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([
            ["b0", "b1", "b2", "b3", "b4", "b5"],
          ]);
        },
      );

      it("should form two groups when each run is corroborated by its own box (no heading)", () => {
        expect.assertions(1);

        const fields = [
          defaultBox("a0", { autoComplete: "one-time-code" }),
          defaultBox("a1"),
          defaultBox("a2"),
          defaultBox("a3"),
          defaultBox("sep", { maxLength: 20 }),
          defaultBox("b0"),
          defaultBox("b1"),
          defaultBox("b2", { name: "verificationcode" }),
          defaultBox("b3"),
        ];
        const testScope = defaultScope(fields);

        expect(SegmentedOtpResolutionService.resolve(testScope)).toStrictEqual([
          ["a0", "a1", "a2", "a3"],
          ["b0", "b1", "b2", "b3"],
        ]);
      });

      it("should group a run when a single box name is a TOTP keyword", () => {
        expect.assertions(3);

        const fields = [
          defaultBox("kw-0"),
          defaultBox("kw-1"),
          defaultBox("kw-2"),
          defaultBox("kw-3", { name: "verificationcode" }),
          defaultBox("kw-4"),
          defaultBox("kw-5"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["kw-0", "kw-1", "kw-2", "kw-3", "kw-4", "kw-5"]]);
        expect(groups).toHaveLength(1);
        expect(testScope.roles.get("kw-3")).toBe(FieldRole.TOTP);
      });

      it("should group a run corroborated by the scope heading alone when no box carries a signal", () => {
        expect.assertions(8);

        const fields = [
          defaultBox("head-0"),
          defaultBox("head-1"),
          defaultBox("head-2"),
          defaultBox("head-3"),
          defaultBox("head-4"),
          defaultBox("head-5"),
        ];
        const testScope = defaultScope(fields, ["Enter your verification code"]);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["head-0", "head-1", "head-2", "head-3", "head-4", "head-5"]]);
        expect(groups).toHaveLength(1);
        expect(testScope.roles.get("head-0")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("head-1")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("head-2")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("head-3")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("head-4")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("head-5")).toBe(FieldRole.TOTP);
      });

      it("should group a run at the MIN boundary of exactly 4 corroborated boxes", () => {
        expect.assertions(6);

        const fields = [
          defaultBox("min-0", { autoComplete: "one-time-code" }),
          defaultBox("min-1"),
          defaultBox("min-2"),
          defaultBox("min-3"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["min-0", "min-1", "min-2", "min-3"]]);
        expect(groups).toHaveLength(1);
        expect(testScope.roles.get("min-0")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("min-1")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("min-2")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("min-3")).toBe(FieldRole.TOTP);
      });

      it("should group a run at the MAX boundary of exactly 8 corroborated boxes", () => {
        expect.assertions(3);

        const fields = [
          defaultBox("max-0", { autoComplete: "one-time-code" }),
          defaultBox("max-1"),
          defaultBox("max-2"),
          defaultBox("max-3"),
          defaultBox("max-4"),
          defaultBox("max-5"),
          defaultBox("max-6"),
          defaultBox("max-7"),
        ];
        const testScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(testScope);

        expect(groups).toStrictEqual([["max-0", "max-1", "max-2", "max-3", "max-4", "max-5", "max-6", "max-7"]]);
        expect(groups).toHaveLength(1);
        expect(testScope.roles.size).toBe(8);
      });
    });

    describe("negative cases (no group formed)", () => {
      it("should not form a group for a corroborated run that is too short (3 boxes, below MIN)", () => {
        expect.assertions(4);

        const fields = [defaultBox("otp1", { autoComplete: "one-time-code" }), defaultBox("otp2"), defaultBox("otp3")];
        const currentScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.has("otp1")).toBe(false);
        expect(currentScope.roles.has("otp2")).toBe(false);
        expect(currentScope.roles.has("otp3")).toBe(false);
      });

      it("should not form a group for a corroborated run that is too long (9 boxes, above MAX)", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 9 }, (unused, index) =>
          defaultBox(`otp${index}`, { autoComplete: "one-time-code" }),
        );
        const currentScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not form a group for a homogeneous run of 6 boxes with no corroboration anywhere", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) => defaultBox(`otp${index}`));
        const currentScope = defaultScope(fields, []);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not corroborate on a pattern whose only digit is inside a quantifier", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) =>
          defaultBox(`box${index}`, { pattern: "[A-Za-z]{3}" }),
        );
        const currentScope = defaultScope(fields, []);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not treat fields with a null maxLength (no limit) as boxes", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) =>
          defaultBox(`box${index}`, { maxLength: null, autoComplete: "one-time-code" }),
        );
        const currentScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not corroborate on the ambiguous code/pin tokens alone", () => {
        expect.assertions(2);

        const fields = [
          defaultBox("b0", { name: "code" }),
          defaultBox("b1", { name: "pin" }),
          defaultBox("b2", { name: "code" }),
          defaultBox("b3", { name: "pin" }),
          defaultBox("b4", { name: "code" }),
          defaultBox("b5", { name: "pin" }),
        ];
        const currentScope = defaultScope(fields, []);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not corroborate on a short token buried inside a larger word (otp not in notpassword)", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) => defaultBox(`b${index}`, { name: "notpassword" }));
        const currentScope = defaultScope(fields, []);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not form a group when a field is not a box (maxLength !== 1)", () => {
        expect.assertions(2);

        const fields = [defaultBox("otp", { maxLength: 6, autoComplete: "one-time-code" })];
        const currentScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not form a group for a non-enterable type (checkbox boxes with maxLength 1)", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) =>
          defaultBox(`chk${index}`, { type: "checkbox", autoComplete: "one-time-code" }),
        );
        const currentScope = defaultScope(fields);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not form a group when every box is a recovery field, despite an OTP heading", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 6 }, (unused, index) => defaultBox(`rec${index}`, { name: "backup" }));
        const currentScope = defaultScope(fields, ["Enter your one-time-code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not form a group when a recovery box in the middle splits the run below MIN", () => {
        expect.assertions(2);

        const fields = [
          defaultBox("a0"),
          defaultBox("a1"),
          defaultBox("a2"),
          defaultBox("recovery", { name: "backup" }),
          defaultBox("b0"),
          defaultBox("b1"),
        ];
        const currentScope = defaultScope(fields, ["Enter your one-time-code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });
    });

    describe("structure", () => {
      it("should overwrite a pre-existing role on a grouped box but leave a non-grouped box untouched", () => {
        expect.assertions(2);

        const fields = [
          defaultBox("g0", { autoComplete: "one-time-code" }),
          defaultBox("g1"),
          defaultBox("g2"),
          defaultBox("g3"),
          defaultBox("sep", { maxLength: 20 }),
          defaultBox("lonely"),
        ];
        const testScope = defaultScope(fields);
        testScope.roles.set("g0", FieldRole.USERNAME);
        testScope.roles.set("lonely", FieldRole.USERNAME);

        SegmentedOtpResolutionService.resolve(testScope);

        expect(testScope.roles.get("g0")).toBe(FieldRole.TOTP);
        expect(testScope.roles.get("lonely")).toBe(FieldRole.USERNAME);
      });

      it("should break a run at a type change so two below-MIN same-type runs form no group", () => {
        expect.assertions(4);

        const fields = [
          defaultBox("t0", { type: "text" }),
          defaultBox("t1", { type: "text" }),
          defaultBox("t2", { type: "text" }),
          defaultBox("n0", { type: "number" }),
          defaultBox("n1", { type: "number" }),
          defaultBox("n2", { type: "number" }),
        ];
        const currentScope = defaultScope(fields, ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
        expect(currentScope.roles.has("t0")).toBe(false);
        expect(currentScope.roles.has("n0")).toBe(false);
      });

      it("should split into two groups when a non-box field separates two contiguous box runs", () => {
        expect.assertions(3);

        const fields = [
          defaultBox("a0"),
          defaultBox("a1"),
          defaultBox("a2"),
          defaultBox("a3"),
          defaultBox("a4"),
          defaultBox("a5"),
          defaultBox("sep", { maxLength: 20 }),
          defaultBox("b0"),
          defaultBox("b1"),
          defaultBox("b2"),
          defaultBox("b3"),
          defaultBox("b4"),
          defaultBox("b5"),
        ];
        const currentScope = defaultScope(fields, ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([
          ["a0", "a1", "a2", "a3", "a4", "a5"],
          ["b0", "b1", "b2", "b3", "b4", "b5"],
        ]);
        expect(currentScope.roles.get("a0")).toBe(FieldRole.TOTP);
        expect(currentScope.roles.get("b5")).toBe(FieldRole.TOTP);
      });

      it("should merge adjacent same-type boxes into one group of 8 rather than two of 4", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 8 }, (unused, index) => defaultBox(`b${index}`));
        const currentScope = defaultScope(fields, ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"]]);
        expect(currentScope.roles.size).toBe(8);
      });

      it("should not assign TOTP to a non-box separator between two groups", () => {
        expect.assertions(4);

        const fields = [
          defaultBox("a0"),
          defaultBox("a1"),
          defaultBox("a2"),
          defaultBox("a3"),
          defaultBox("sep", { maxLength: 20 }),
          defaultBox("b0"),
          defaultBox("b1"),
          defaultBox("b2"),
          defaultBox("b3"),
        ];
        const currentScope = defaultScope(fields, ["One-time code"]);

        SegmentedOtpResolutionService.resolve(currentScope);

        expect(currentScope.roles.get("a0")).toBe(FieldRole.TOTP);
        expect(currentScope.roles.get("b3")).toBe(FieldRole.TOTP);
        expect(currentScope.roles.has("sep")).toBe(false);
        expect(currentScope.roles.size).toBe(8);
      });
    });

    describe("edge", () => {
      it("should return an empty array and not throw on an empty fields array", () => {
        expect.assertions(2);

        const currentScope = defaultScope([], ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should return an empty array when no field is a box", () => {
        expect.assertions(2);

        const fields = Array.from({ length: 4 }, (unused, index) => defaultBox(`f${index}`, { maxLength: 20 }));
        const currentScope = defaultScope(fields, ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should not group a single corroborated box because it is below MIN", () => {
        expect.assertions(2);

        const currentScope = defaultScope([defaultBox("only", { autoComplete: "one-time-code" })], ["One-time code"]);

        const groups = SegmentedOtpResolutionService.resolve(currentScope);

        expect(groups).toStrictEqual([]);
        expect(currentScope.roles.size).toBe(0);
      });

      it("should group a run of exactly MIN (4) boxes but not MIN-1 (3)", () => {
        expect.assertions(2);

        const threeBoxes = defaultScope([defaultBox("b0"), defaultBox("b1"), defaultBox("b2")], ["One-time code"]);
        const fourBoxes = defaultScope(
          [defaultBox("c0"), defaultBox("c1"), defaultBox("c2"), defaultBox("c3")],
          ["One-time code"],
        );

        expect(SegmentedOtpResolutionService.resolve(threeBoxes)).toStrictEqual([]);
        expect(SegmentedOtpResolutionService.resolve(fourBoxes)).toStrictEqual([["c0", "c1", "c2", "c3"]]);
      });
    });
  });
});
