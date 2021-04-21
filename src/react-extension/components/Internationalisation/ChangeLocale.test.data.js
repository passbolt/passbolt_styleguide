import SiteSettings from "../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../test/fixture/Settings/siteSettings";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    context: {
      locale: "en-US",
      siteSettings: new SiteSettings(siteSettingsFixture),
      onUpdateLocaleRequested: jest.fn()
    }
  };

  return props;
}
