import Plugin from './plugin';

class Clipboard {
  static copy(value, name) {
    name = name || null;
    const eventData = {
      name: name,
      data: value
    };
    Plugin.send('passbolt.clipboard', eventData);
  }
}

export default Clipboard;