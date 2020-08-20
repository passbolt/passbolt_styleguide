let _storage;

class Storage {
  static get() {
    return _storage;
  }

  static set(storage) {
    _storage = storage;
  }
}

export default Storage;
