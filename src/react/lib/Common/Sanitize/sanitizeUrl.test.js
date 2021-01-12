import sanitizeUrl, {urlProtocols} from "./sanitizeUrl";

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
    expect(sanitizeUrl('passbolt.com')).toBe(false);
    expect(sanitizeUrl('127.0.0.1')).toBe(false);
    expect(sanitizeUrl('[::1]')).toBe(false);

    expect(sanitizeUrl('javascript:alert(1)')).toBe(false);
    expect(sanitizeUrl('ssh://localhost')).toBe(false);
    expect(sanitizeUrl('ftp://localhost')).toBe(false);

    expect(sanitizeUrl('http://localhost')).not.toBe(false);
    expect(sanitizeUrl('https://localhost')).not.toBe(false);
    expect(sanitizeUrl('https://1.1.1.1')).not.toBe(false);
    expect(sanitizeUrl('https://[::1]')).not.toBe(false);
    expect(sanitizeUrl('https://passbolt.com')).not.toBe(false);
    expect(sanitizeUrl('https://www.passbolt.com')).not.toBe(false);
    expect(sanitizeUrl('https://www.passbolt.com/test')).not.toBe(false);
  });


  it("White listed protocols option", () => {
    const whitelistedProtocols = ['ssh:', 'ftp:', 'javascript:'];

    expect(sanitizeUrl('javascript:alert(1)', {whitelistedProtocols})).toBe(false);

    expect(sanitizeUrl('ssh://localhost', {whitelistedProtocols})).not.toBe(false);
    expect(sanitizeUrl('ftp://localhost', {whitelistedProtocols})).not.toBe(false);

    expect(sanitizeUrl('http://passbolt.com', {whitelistedProtocols})).toBe(false);
    expect(sanitizeUrl('https://passbolt.com', {whitelistedProtocols})).toBe(false);
  });

  it("Default protocol option", () => {
    const defaultProtocol = urlProtocols.HTTPS;

    expect(sanitizeUrl('/home', {defaultProtocol})).toBe('https://home/');
    expect(sanitizeUrl('./home', {defaultProtocol})).toBe('https://./home');
    expect(sanitizeUrl('../home', {defaultProtocol})).toBe('https://../home');
    expect(sanitizeUrl('~/home', {defaultProtocol})).toBe('https://~/home');
    expect(sanitizeUrl('\home', {defaultProtocol})).toBe('https://home/');
    expect(sanitizeUrl('\\home', {defaultProtocol})).toBe('https://home/');
    expect(sanitizeUrl('localhost/test', {defaultProtocol})).toBe('https://localhost/test');
    expect(sanitizeUrl('127.0.0.1', {defaultProtocol})).toBe('https://127.0.0.1/');
    expect(sanitizeUrl('[::1]', {defaultProtocol})).toBe('https://[::1]/');
    expect(sanitizeUrl('http://127.0.0.1', {defaultProtocol})).toBe('http://127.0.0.1/');
  });
});
