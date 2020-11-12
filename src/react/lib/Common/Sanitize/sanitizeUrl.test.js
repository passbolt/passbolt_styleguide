import sanitizeUrl from "./sanitizeUrl";

describe("Sanitize URL checks", () => {
  it("Baseline checks", () => {
    expect(sanitizeUrl()).toBe(false);
    expect(sanitizeUrl('')).toBe(false);
    expect(sanitizeUrl(null)).toBe(false);
    expect(sanitizeUrl(undefined)).toBe(false);
    expect(sanitizeUrl({})).toBe(false);
    expect(sanitizeUrl(1)).toBe(false);
    expect(sanitizeUrl('/home')).toBe(false);
    expect(sanitizeUrl('./home')).toBe(false);
    expect(sanitizeUrl('../home')).toBe(false);
    expect(sanitizeUrl('~/home')).toBe(false);
    expect(sanitizeUrl('\home')).toBe(false);
    expect(sanitizeUrl('\\home')).toBe(false);
    expect(sanitizeUrl('localhost/test')).toBe(false);

    expect(sanitizeUrl('javascript:alert(1)')).toBe(false);
    expect(sanitizeUrl('ssh://localhost')).toBe(false);
    expect(sanitizeUrl('ftp://localhost')).toBe(false);

    expect(sanitizeUrl('http://localhost')).not.toBe(false);
    expect(sanitizeUrl('https://localhost')).not.toBe(false);
    expect(sanitizeUrl('https://1.1.1.1')).not.toBe(false);
    expect(sanitizeUrl('https://passbolt.com')).not.toBe(false);
    expect(sanitizeUrl('https://www.passbolt.com')).not.toBe(false);
    expect(sanitizeUrl('https://www.passbolt.com/test')).not.toBe(false);
  });


  it("Options checks", () => {
    const allowedOptions = ['ssh:', 'ftp:', 'javascript:'];

    expect(sanitizeUrl('javascript:alert(1)', allowedOptions)).toBe(false);

    expect(sanitizeUrl('ssh://localhost', allowedOptions)).not.toBe(false);
    expect(sanitizeUrl('ftp://localhost', allowedOptions)).not.toBe(false);

    expect(sanitizeUrl('http://passbolt.com', allowedOptions)).toBe(false);
    expect(sanitizeUrl('https://passbolt.com', allowedOptions)).toBe(false);
  });
});
