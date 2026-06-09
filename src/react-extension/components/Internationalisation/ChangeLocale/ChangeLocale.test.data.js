import SiteSettingsEntity from "../../../../shared/models/entity/siteSettings/siteSettingsEntity";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    context: {
      locale: "en-UK",
      siteSettings: new SiteSettingsEntity(siteSettingsFixture),
      onUpdateLocaleRequested: jest.fn(),
    },
  };

  return props;
}
