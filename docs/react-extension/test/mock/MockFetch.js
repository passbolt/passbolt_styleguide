import fetchMock from "fetch-mock";

class MockFetch {
  constructor() {
    this.requestListeners = {};
  }

  async addGetFetchRequest(name, callback) {
    await fetchMock.get(name, callback);
  }

  async addPostFetchRequest(name, callback) {
    await fetchMock.post(name, callback);
  }

  async addPutFetchRequest(name, callback) {
    await fetchMock.put(name, callback);
  }

  async addDeleteFetchRequest(name, callback) {
    await fetchMock.delete(name, callback);
  }
}

export default MockFetch;
