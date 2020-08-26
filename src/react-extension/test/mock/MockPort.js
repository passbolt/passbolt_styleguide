function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(v), t)
  });
}

class MockPort {

  constructor(storage) {
    this.storage = storage;
    this.emitListeners = {};
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

  async request(name, eventObject, delayTime) {
    console.debug(`PORT REQUEST: ${name}`);
    console.debug('parameters:',  Array.prototype.slice.call(arguments));
    let result;
    delayTime = delayTime || 0;

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

    return delay(delayTime, result);
  }

  addEmitListener(name, callback) {
  }

  addOnListener(name, callback) {
  }

  addRequestListener(name, callback) {
    this.requestListeners[name] = callback;
  }
}

export default MockPort;
