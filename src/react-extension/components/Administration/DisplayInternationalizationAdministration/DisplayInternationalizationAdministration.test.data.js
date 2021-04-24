/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";


export function defaultProps() {
  return {
    context: {
      siteSettings: new SiteSettings(siteSettingsFixture)
    },
    administrationWorkspaceContext: {
      must: {
        save: false
      },
      onResetActionsSettings: jest.fn(),
      can: {
        save: false
      },
      onSaveEnabled: jest.fn(),
    }
  };
}
