/**
 * A wrapper for PwnedPasswords API by Troy Hunt (haveibeenpwned.com).
 *
 */
import jsSHA from "jssha";
import ExternalServiceUnavailableError from "../Error/ExternalServiceUnavailableError";
import ExternalServiceError from "../Error/ExternalServiceError";

// Number of characters from the hash that API expects
const PREFIX_LENGTH = 5;
const API_URL = 'https://api.pwnedpasswords.com/range/';

export default class PwnedPasswords {
  static async pwnedPasswords(password) {
    if (typeof password !== 'string') {
      const err = new Error('Input password must be a string.');
      return Promise.reject(err);
    }

    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(password);
    const hashedPassword = shaObj.getHash('HEX');
    const hashedPasswordPrefix = hashedPassword.substr(0, PREFIX_LENGTH);
    const hashedPasswordSuffix = hashedPassword.substr(PREFIX_LENGTH);
    const url = API_URL + hashedPasswordPrefix;

    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      throw new ExternalServiceUnavailableError("pwnedpasswords API service is not available");
    }

    if (response.status !== 200) {
      throw new ExternalServiceError(`Failed to request pwnedpasswords API: ${response.status}`);
    }
    const data = await response.text();
    return data
      .split('\n')
      .map(line => line.split(':'))
      .filter(filtered => filtered[0].toLowerCase() === hashedPasswordSuffix)
      .map(mapped => Number(mapped[1]))
      .shift() || 0;
  }
}
