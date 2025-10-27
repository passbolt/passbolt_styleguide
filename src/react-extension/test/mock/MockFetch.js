import fetchMock from "fetch-mock";

class MockFetch {
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

/**
 * In components served by the API, native fetch is given preference and not fetchMock.
 * As a result we do not see the expected component output in storybook.
 * (ex: DisplaySelfRegistrationAdministration - with professional domains,
 * UserDirectory - synchronize and simulate synchronize dialogs)
 * This line ensures that the network requests made by fetch are intercepted and
 * mock responses are returned, instead of making actual network requests.
 */
window.fetch = fetchMock.fetchHandler;

export default MockFetch;
