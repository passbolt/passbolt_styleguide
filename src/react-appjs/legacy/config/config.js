import getObject from 'can-util/js/get/get';

export default class Config {
  static read(name) {
    return getObject(_config, name);
  }

  static write(name, value) {

  }
};

const _config = {

};
