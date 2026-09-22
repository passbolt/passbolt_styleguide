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
 * @since         5.13.0
 */

/**
 * Mock class to be used in replacement of WritableFileStream
 */
class MockWritableFileStream {
  handle;
  buffer;
  position = 0;

  constructor(handle) {
    this.handle = handle;
    this.buffer = new Uint8Array(handle._data);
  }

  async write(chunk) {
    // Support string | ArrayBuffer | TypedArray | Blob | objet {type, ...}
    if (chunk && typeof chunk === 'object' && 'type' in chunk && !(chunk instanceof Blob)) {
      if (chunk.type === 'seek') { this.position = chunk.position; return; }
      if (chunk.type === 'truncate') { this.buffer = this.buffer.slice(0, chunk.size); return; }
      chunk = chunk.data;
    }

    let data;
    if (typeof chunk === 'string') {
      data = new TextEncoder().encode(chunk);
    } else if (chunk instanceof Blob) {
      data = new Uint8Array(await chunk.arrayBuffer());
    } else {
      data = new Uint8Array(chunk);
    }

    const next = new Uint8Array(Math.max(this.buffer.length, this.position + data.length));
    next.set(this.buffer);
    next.set(data, this.position);
    this.buffer = next;
    this.position += data.length;
  }

  async seek(position) { this.position = position; }

  async truncate(size) {
    this.buffer = this.buffer.slice(0, size);
    if (this.position > size) this.position = size;
  }

  async close() { this.handle._data = this.buffer; }
}

/**
 * Mock class to be used in replacement of FileHandle
 */
class MockFileHandle {
  kind = 'file';

  constructor(name, data = new Uint8Array()) {
    this.name = name;
    this._data = data;
  }

  async getFile() {
    const file = new File([this._data], this.name);

    if (typeof file.text !== 'function') {
      file.text = async () => new TextDecoder().decode(this._data);
      file.arrayBuffer = async () => this._data.buffer.slice(
        this._data.byteOffset, this._data.byteOffset + this._data.byteLength
      );
    }
    return file;
  }

  async createWritable({ keepExistingData = false } = {}) {
    if (!keepExistingData) this._data = new Uint8Array();
    return new MockWritableFileStream(this);
  }
}

/**
 * Mock class to be used in replacement of navigator.storage.getDirectory
 */
class MockDirectoryHandle {
  kind = 'directory';

  constructor(name = '') {
    this.name = name;
    this._files = new Map();
    this._dirs = new Map();
  }

  async getFileHandle(name, { create = false } = {}) {
    if (!this._files.has(name)) {
      if (!create) throw new DOMException(`${name} not found`, 'NotFoundError');
      this._files.set(name, new MockFileHandle(name));
    }
    return this._files.get(name);
  }

  async getDirectoryHandle(name, { create = false } = {}) {
    if (!this._dirs.has(name)) {
      if (!create) throw new DOMException(`${name} not found`, 'NotFoundError');
      this._dirs.set(name, new MockDirectoryHandle(name));
    }
    return this._dirs.get(name);
  }

  async removeEntry(name, { recursive = false } = {}) {
    if (this._files.delete(name)) return;
    const dir = this._dirs.get(name);
    if (!dir) throw new DOMException(`${name} not found`, 'NotFoundError');
    if (!recursive && (dir._files.size || dir._dirs.size)) {
      throw new DOMException('Directory not empty', 'InvalidModificationError');
    }
    this._dirs.delete(name);
  }

  async *entries() {
    for (const [k, v] of this._files) yield [k, v];
    for (const [k, v] of this._dirs) yield [k, v];
  }

  async *keys() {
    yield* this._files.keys();
    yield* this._dirs.keys();
  }

  async *values() {
    yield* this._files.values();
    yield* this._dirs.values();
  }
}

export default MockDirectoryHandle;
