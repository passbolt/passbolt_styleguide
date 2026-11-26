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
 * @since         5.13.0
 */

import OPFSJSONStore from "./OPFSJsonStore";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("OPFSJSONStore", () => {
  describe("::readAll", () => {
    it("Store data and read all.", async () => {
      expect.assertions(2);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const dummyData = {
        test: "This is a test",
      };

      await opfsJsonStore.set("opfs-json-test", dummyData);

      const result = await opfsJsonStore.get("opfs-json-test");

      expect(result).toStrictEqual(dummyData);

      await opfsJsonStore.destroy();

      const emptyResult = await opfsJsonStore.get("opfs-json-test");
      expect(emptyResult).toStrictEqual(undefined);
    });

    it("Store data with a key as an object should overwrite data.", async () => {
      expect.assertions(2);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const dummyData = {
        test: "This is a test",
      };

      await opfsJsonStore.set({ test: "should be updated" }, dummyData);

      const result = await opfsJsonStore.get();

      expect(result).toStrictEqual({ test: "should be updated" });

      await opfsJsonStore.clear();

      const emptyResult = await opfsJsonStore.get();
      expect(emptyResult).toStrictEqual({});
    });
  });

  describe("::deleteKey", () => {
    it("Store and delete data.", async () => {
      expect.assertions(2);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const dummyData = {
        test: "This is a test",
      };

      await opfsJsonStore.set("opfs-json-test", dummyData);

      const result = await opfsJsonStore.get("opfs-json-test");

      expect(result).toStrictEqual(dummyData);

      await opfsJsonStore.delete("opfs-json-test");

      const emptyResult = await opfsJsonStore.get("opfs-json-test");
      expect(emptyResult).toStrictEqual(undefined);
    });
  });

  describe("::keys", () => {
    it("Get all keys.", async () => {
      expect.assertions(3);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const dummyData1 = {
        data: {},
      };
      const dummyData2 = {
        data: {},
      };

      await opfsJsonStore.set("key1", dummyData1);
      await opfsJsonStore.set("key2", dummyData2);

      const result = await opfsJsonStore.keys();

      expect(result.length).toBe(2);
      expect(result).toStrictEqual(["key1", "key2"]);

      await opfsJsonStore.destroy();

      const emptyResult = await opfsJsonStore.get();
      expect(emptyResult).toStrictEqual({});
    });
  });

  describe("::keys", () => {
    it("Get all keys.", async () => {
      expect.assertions(3);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const dummyData1 = {
        data: {},
      };
      const dummyData2 = {
        data: {},
      };

      await opfsJsonStore.set("key1", dummyData1);
      await opfsJsonStore.set("key2", dummyData2);

      const result = await opfsJsonStore.keys();

      expect(result.length).toBe(2);
      expect(result).toStrictEqual(["key1", "key2"]);

      await opfsJsonStore.destroy();

      const emptyResult = await opfsJsonStore.get();
      expect(emptyResult).toStrictEqual({});
    });
  });

  describe("::update", () => {
    it("Update according to the previous value with concurrency.", async () => {
      expect.assertions(3);
      const opfsJsonStore = new OPFSJSONStore("test.json");
      const counter = 1;

      await opfsJsonStore.set("key", counter);
      opfsJsonStore.update("key", (counter) => counter + 1);
      opfsJsonStore.update("key", (counter) => counter + 1);
      const promise3 = opfsJsonStore.update("key", (counter) => counter + 1);

      let result = await opfsJsonStore.get("key");

      expect(result).toBe(1);
      await promise3;
      result = await opfsJsonStore.get("key");
      expect(result).toBe(4);

      await opfsJsonStore.destroy();

      const emptyResult = await opfsJsonStore.get();
      expect(emptyResult).toStrictEqual({});
    });
  });
});
