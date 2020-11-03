import fetchMock from "fetch-mock";

function delay(t, v) {
  return new Promise(resolve => {
    setTimeout(() => resolve(v), t);
  });
}


class MockFetch {
  constructor() {
    this.requestListeners = {};
  }

  async addGetFetchRequest(name, callback) {
    await fetchMock.get(name, callback);
  }
}

export default MockFetch;
