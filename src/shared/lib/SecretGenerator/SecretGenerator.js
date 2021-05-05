import {PasswordGenerator} from "./PasswordGenerator";
import {PassphraseGenerator} from "./PassphraseGenerator";

export const SecretGenerator = {
  generate: configuration => {
    const {type} = configuration;
    if (type === 'password') {
      return PasswordGenerator.generate(configuration);
    } else if (type === 'passphrase') {
      return PassphraseGenerator.generate(configuration);
    }
  }
};