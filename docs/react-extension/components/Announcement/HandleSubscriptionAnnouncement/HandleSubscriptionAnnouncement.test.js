/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */

import {defaultProps, mockSubscriptionGoingToExpired} from "./HandleSubscriptionAnnouncement.test.data";
import HandleSubscriptionAnnouncementPage from "./HandleSubscriptionAnnouncement.test.page";
import {waitFor} from "@testing-library/react";
import PassboltSubscriptionError from "../../../lib/Error/PassboltSubscriptionError";
import DisplayGoingToExpireSubscriptionAnnouncement from "./DisplayGoingToExpireSubscriptionAnnouncement";
import DisplayExpiredSubscriptionAnnouncement from "./DisplayExpiredSubscriptionAnnouncement";
import DisplayInvalidSubscriptionAnnouncement from "./DisplayInvalidSubscriptionAnnouncement";

/**
 * Unit tests on HandleSubscriptionAnnouncement in regard of specifications
 */
beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should show the subscription announcement", () => {
  const props = defaultProps(); // The props to pass

  describe('As LU I can see the subscription announcement', () => {
    /**
     * Given a subscription key invalid, expired or going to expire
     * Then I should see the subscription announcement
     */
    it('As LU I should show the subscription announcement if the subscription is going to expire', async() => {
      const goingToExpireSubscriptionGetRequestMock = jest.fn(() => mockSubscriptionGoingToExpired);
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(goingToExpireSubscriptionGetRequestMock);
      new HandleSubscriptionAnnouncementPage(props);
      await waitFor(() => {});
      expect(props.announcementContext.show).toHaveBeenCalledWith(DisplayGoingToExpireSubscriptionAnnouncement, {expiry: mockSubscriptionGoingToExpired.expiry});
    });

    it('As LU I should see the subscription announcement if the subscription is expired', async() => {
      const expiredSubscriptionGetRequestMock = jest.fn(() => { throw new PassboltSubscriptionError(); });
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(expiredSubscriptionGetRequestMock);
      new HandleSubscriptionAnnouncementPage(props);
      await waitFor(() => {});
      expect(props.announcementContext.show).toHaveBeenCalledWith(DisplayExpiredSubscriptionAnnouncement);
    });

    it('As LU I should see the subscription announcement if the subscription is invalid', async() => {
      const expiredSubscriptionGetRequestMock = jest.fn(() => { throw new Error(); });
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(expiredSubscriptionGetRequestMock);
      new HandleSubscriptionAnnouncementPage(props);
      await waitFor(() => {});
      expect(props.announcementContext.show).toHaveBeenCalledWith(DisplayInvalidSubscriptionAnnouncement);
    });
  });
});
