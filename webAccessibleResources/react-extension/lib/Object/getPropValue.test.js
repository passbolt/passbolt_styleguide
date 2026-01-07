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
 * @since         4.10.0
 */

import getPropValue from "./getPropValue";

describe("getPropValue", () => {
  const testObject = {
    directPropKey: "directPropValue",
    nestedObjectKey: {
      nestedPropKey: {},
    },
    undefinedPropKey: undefined,
    arrayPropKey: [
      "element 0 value",
      "element 1 value",
      {
        nestedFromArrayKey: "nestedFromArrayValue",
      },
    ],
  };

  it("should return the expected value from the object and the path", () => {
    expect.assertions(6);
    expect(getPropValue(testObject, "directPropKey")).toStrictEqual(testObject.directPropKey);
    expect(getPropValue(testObject, "nestedObjectKey.nestedPropKey")).toStrictEqual(
      testObject.nestedObjectKey.nestedPropKey,
    );
    expect(getPropValue(testObject, "undefinedPropKey")).toBeUndefined();
    expect(getPropValue(testObject, "arrayPropKey.0")).toStrictEqual(testObject.arrayPropKey[0]);
    expect(getPropValue(testObject, "arrayPropKey.1")).toStrictEqual(testObject.arrayPropKey[1]);
    expect(getPropValue(testObject, "arrayPropKey.2.nestedFromArrayKey")).toStrictEqual(
      testObject.arrayPropKey[2].nestedFromArrayKey,
    );
  });

  it("should return undefined if there is no matching path", () => {
    expect.assertions(5);
    expect(getPropValue(testObject, "directProp")).toBeUndefined();
    expect(getPropValue(testObject, "nestedObjectKey.wrongNestedPropKey")).toBeUndefined();
    expect(getPropValue(testObject, "arrayPropKey.3")).toBeUndefined();
    expect(getPropValue(testObject, "arrayPropKey.-1")).toBeUndefined();
    expect(getPropValue(testObject, "arrayPropKey.2.nestedFromArrayKey.nothing")).toBeUndefined();
  });
});
