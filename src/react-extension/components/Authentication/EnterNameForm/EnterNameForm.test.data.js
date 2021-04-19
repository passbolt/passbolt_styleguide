import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  return {
    context: {
      setContext: jest.fn(),
      siteSettings: new SiteSettings(siteSettingsFixture),
      trustedDomain: "http://127.0.0.1:3001"
    },
    apiTriageContext: {
      username: "user@passbolt.com",
      onRegistrationRequested: () => {},
    }
  };
}
