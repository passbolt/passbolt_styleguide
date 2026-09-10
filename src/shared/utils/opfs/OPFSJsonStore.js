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

/**
 * OPFS JSON Object Store for Browser Extensions (MV3 service-worker safe)
 *
 * - No in-memory cache: safe across service worker terminations.
 * - Per-instance promise queue: serializes mutations within one context.
 * - Web Locks: serializes mutations across contexts (SW + popup + offscreen…)
 *   so two contexts writing the same file can't clobber each other.
 *
 * Works wherever `navigator.storage.getDirectory()` and `navigator.locks` are
 * available — service workers, offscreen documents, popups, options pages.
 */
class OPFSJSONStore {
  /**
   * Constructor
   * @param {string} filename
   */
  constructor(filename = "store.json") {
    this.filename = filename;
    this._lockName = `opfs-json-store:${filename}`;
    this._writeQueue = Promise.resolve();
  }

  /**
   * Get the file handler
   * @param {boolean} create
   * @return {Promise<FileSystemFileHandle>}
   * @private
   */
  async _getFileHandle(create = true) {
    const root = await navigator.storage.getDirectory();
    return root.getFileHandle(this.filename, { create });
  }

  /**
   * Read all the data in te file
   * @return {Promise<{}|any|{}>}
   * @private
   */
  async _readAll() {
    try {
      const handle = await this._getFileHandle(false);
      const file = await handle.getFile();
      const text = await file.text();
      return text ? JSON.parse(text) : {};
    } catch (err) {
      if (err.name === "NotFoundError") {
        return {};
      }
      throw err;
    }
  }

  /**
   * Write all data as json object in the file
   * @param {any} data
   * @return {Promise<void>}
   * @private
   */
  async _writeAll(data) {
    const handle = await this._getFileHandle(true);
    const writable = await handle.createWritable();
    try {
      await writable.write(JSON.stringify(data, null, 2));
    } finally {
      await writable.close();
    }
  }

  /**
   * Run `fn` under an exclusive Web Lock scoped to this file. Any other
   * context (popup, offscreen doc, another SW wake-up) calling this for the
   * same filename will wait its turn.
   * @private
   */
  _withLock(fn) {
    return navigator.locks.request(this._lockName, { mode: "exclusive" }, fn);
  }

  /**
   * Read-modify-write cycle: queued locally, then run under a cross-context
   * lock. The read happens inside the lock so we always see the latest state.
   * @param {function} mutator
   * @return {Promise<void>}
   * @private
   */
  _mutate(mutator) {
    this._writeQueue = this._writeQueue.then(() =>
      this._withLock(async () => {
        const data = await this._readAll();
        const next = await mutator(data);
        await this._writeAll(next ?? data);
      }),
    );
    return this._writeQueue;
  }

  /**
   * Get a value from a key property of the json object
   * @param {string} [key]
   * @return {Promise<Promise<any|{}|{}>>}
   */
  async get(key) {
    // Shared lock: multiple readers across contexts can proceed in parallel,
    // but they'll wait for any in-flight exclusive writer to finish.
    return navigator.locks.request(this._lockName, { mode: "shared" }, async () => {
      const data = await this._readAll();
      return key === undefined ? data : data[key];
    });
  }

  /**
   * Set the key with the value
   * @param {string} key
   * @param {any} value
   * @return {Promise<*>}
   */
  async set(key, value) {
    return this._mutate((data) => {
      if (typeof key === "object" && key !== null) {
        Object.assign(data, key);
      } else {
        data[key] = value;
      }
    });
  }

  /**
   * Delete a key in the json object
   * @param {string} key
   * @return {Promise<*>}
   */
  async delete(key) {
    return this._mutate((data) => {
      delete data[key];
    });
  }

  /**
   * Clear all data in the file
   * @return {Promise<*>}
   */
  async clear() {
    return this._mutate(() => ({}));
  }

  /**
   * Remove the file
   * @return {Promise<void>}
   */
  async destroy() {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(this.filename);
  }

  /**
   * Get the all keys of the json object
   * @return {Promise<string[]>}
   */
  async keys() {
    const data = await this.get();
    return Object.keys(data);
  }

  /**
   * Atomic read-modify-write for callers. Example:
   *   await store.update('counter', (n = 0) => n + 1);
   * The updater runs under the exclusive lock, so no one can slip a write
   * in between the read and the write.
   * @param {string} key
   * @param {function} updater
   */
  async update(key, updater) {
    return this._mutate((data) => {
      data[key] = updater(data[key]);
    });
  }
}

export default OPFSJSONStore;
