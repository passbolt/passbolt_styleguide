/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultProps, suggestedResourcesProps, denyUiActionProps} from "./HomePage.test.data";
import HomePagePage from "./HomePage.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("HomePage", () => {
  describe('As LU I can see the quickaccess homepage', () => {
    it('As LU I can see the quickaccess tag section if enabled by API flags', () => {
      expect.assertions(3);
      const props = suggestedResourcesProps(); // The props to pass
      const page = new HomePagePage(props);

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeTruthy();
      expect(page.tagFilterEntryTitle).toStrictEqual('Tags');
    });

    it('As LU I cannot see the quickaccess tag section if disabled by API flags', () => {
      expect.assertions(2);
      const data = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultAppContext(data);
      const props = defaultProps({context}); // The props to pass
      const page = new HomePagePage(props);

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeFalsy();
    });

    it('As LU I cannot see the quickaccess tag section if I am not allowed to', () => {
      expect.assertions(2);
      const props = denyUiActionProps(); // The props to pass
      const page = new HomePagePage(props);

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeFalsy();
    });
  });
});
