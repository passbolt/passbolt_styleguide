function delay(t, v) {
  return new Promise(resolve => {
    setTimeout(() => resolve(v), t);
  });
}

class MockPort {
  constructor(storage) {
    this.storage = storage;
    this.onListeners = {};
    this.requestListeners = {};
  }

  emit(name, eventObject) {
    console.debug(`PORT EMIT: ${name}`);
    console.debug(eventObject);
  }

  on(name) {
    console.debug(`PORT ON: ${name}`);
  }

  async request(name) {
    console.debug(`PORT REQUEST: ${name}`);
    console.debug('PORT REQUEST PARAMETERS:', Array.prototype.slice.call(arguments));
    let result;

    if (this.requestListeners[name]) {
      const listenerArguments = Array.prototype.slice.call(arguments, 1);
      console.debug('listenerArguments', listenerArguments);
      listenerArguments.push(this.storage);
      console.debug('listenerArguments', listenerArguments);
      result = await this.requestListeners[name].apply(null, listenerArguments);
      console.debug(`response: `, result);
    } else {
      console.debug(`The request ${name} has not been mocked`);
    }

    return delay(0, result);
  }

  addEmitListener(name) {
    console.debug(`PORT EMIT: ${name}`);
    console.debug('PORT EMIT PARAMETERS:', Array.prototype.slice.call(arguments));
  }

  addOnListener(name, callback) {
    // todo Implement a function to launch this on callbacks.
    console.debug(`PORT ON: ${name}`);
    console.debug('PORT ON PARAMETERS:', callback);
  }

  addRequestListener(name, callback) {
    this.requestListeners[name] = callback;
  }
}

export default MockPort;
