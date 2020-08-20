let _port;

class Port {
  static get() {
    return _port;
  }

  static set(port) {
    _port = port;
  }
}

export default Port;
