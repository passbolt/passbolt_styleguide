export default class Plugin {
  static send(message, data) {
    port.emit(message, data);
  }

  static request(message, data) {
    port.request(message, data);
  }
}
