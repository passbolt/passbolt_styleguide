import XRegExp from "xregexp";

const EMAIL_HOSTNAME_REGEXP = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
const EMAIL_REGEXP = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${EMAIL_HOSTNAME_REGEXP}$`;
const UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
const SECURITY_TOKEN__REGEXP = /^[a-zA-Z0-9-_]{3}$/;

/**
 * Returns true if the data is a valid email.
 * @param {string} data the string to check as email
 * @returns {boolean}
 */
export const isValidEmail = data => new XRegExp(EMAIL_REGEXP).test(data);

/**
 * Returns true if the data is a valid UUID.
 * @param {string} data the string to check as UUID
 * @returns {boolean}
 */
export const isValidUuid = data => new XRegExp(UUID_REGEXP).test(data);

/**
 * Returns true if the data is a valid security token.
 * @param {string} data the string to check as security token
 * @returns {boolean}
 */
export const isValidSecurityToken = data => new XRegExp(SECURITY_TOKEN__REGEXP).test(data);
