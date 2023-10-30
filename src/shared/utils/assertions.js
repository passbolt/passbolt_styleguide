import XRegExp from "xregexp";

const EMAIL_HOSTNAME_REGEXP = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
const EMAIL_REGEXP = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${EMAIL_HOSTNAME_REGEXP}$`;
const UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
const BASE32_REGEXP = /^[A-Z2-7]+=*$/;

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
 * Returns true if the data is a valid base32.
 * @param {string} data the string to check as base32
 * @returns {boolean}
 */
export const isValidBase32 = data => new XRegExp(BASE32_REGEXP).test(data);
