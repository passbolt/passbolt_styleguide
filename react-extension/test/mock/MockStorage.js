class LocalStorage {
  constructor(changeCallbacks) {
    this.storage = {};
    this.changeCallbacks = changeCallbacks;
  }

  get(keys) {
    return keys.reduce((accumulator, key) => {
      if (this.storage[key]) {
        accumulator[key] = this.storage[key];
      }
      return accumulator;
    }, {});
  }

  set(data) {
    const storageChangeEventValue = {};
    Object.keys(data).forEach(key => {
      this.storage[key] = data[key];
      storageChangeEventValue[key] = {};
      storageChangeEventValue[key].newValue = data[key];
    });
    this.changeCallbacks.forEach(callback => callback(storageChangeEventValue));
  }
}

class MockStorage {
  constructor() {
    this.changeCallbacks = [];
    this.local = new LocalStorage(this.changeCallbacks);
    this.onChanged = {
      addListener: listener => {
        this.changeCallbacks.push(listener);
      },
      removeListener: listener => {
        const listenerIndex = this.changeCallbacks.indexOf(listener);
        if (listenerIndex > -1) {
          this.changeCallbacks.splice(listenerIndex, 1);
        }
      }
    };
  }
}

export default MockStorage;
