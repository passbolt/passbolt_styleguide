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
    this.emitListener = {};
  }

  async emit(name, eventObject) {
    console.debug(`PORT EMIT: ${name}`);
    console.debug('Arguments', eventObject);
    let result;

    if (this.emitListener[name]) {
      result = await this.emitListener[name](eventObject);
      console.debug(`response: `, result);
    } else {
      console.debug(`The emit ${name} has not been mocked`);
    }

    return delay(0, result);
  }

  on(name, callback) {
    console.debug(`PORT ON: ${name}`);
    console.debug('PORT ON PARAMETERS:', callback);
    this.addOnListener(name, callback);
  }

  async request(name) {
    console.debug(`PORT REQUEST: ${name}`);
    console.debug('PORT REQUEST PARAMETERS:', Array.prototype.slice.call(arguments));
    let result;

    if (this.requestListeners[name]) {
      const listenerArguments = Array.prototype.slice.call(arguments, 1, arguments.length);
      console.debug('listenerArguments', listenerArguments);
      listenerArguments.push(this.storage);
      console.debug('listenerArguments', listenerArguments);
      result = await this.requestListeners[name](...listenerArguments);
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
    this.emitListener[name] = callback;
  }

  addRequestListener(name, callback) {
    this.requestListeners[name] = callback;
  }
}

export default MockPort;
