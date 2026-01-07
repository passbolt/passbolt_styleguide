/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */

import React from "react";
import AnnouncementWrapper from "./AnnouncementWrapper";
import DisplayExpiredSubscriptionAnnouncement from "../HandleSubscriptionAnnouncement/DisplayExpiredSubscriptionAnnouncement";
import DisplayInvalidSubscriptionAnnouncement from "../HandleSubscriptionAnnouncement/DisplayInvalidSubscriptionAnnouncement";
import DisplayGoingToExpireSubscriptionAnnouncement from "../HandleSubscriptionAnnouncement/DisplayGoingToExpireSubscriptionAnnouncement";
import { DateTime } from "luxon";

const defaultArgs = (data) => ({
  canClose: true,
  ...data,
});

const customCss = { position: "relative", height: "12rem" };

export default {
  title: "Foundations/AnnouncementWrapper",
  component: AnnouncementWrapper,
};

export const DefaultAnnouncementBar = {
  args: defaultArgs(),
};

export const AnnouncementBarInApp = {
  args: defaultArgs(),
  render: (args) => (
    <>
      <div style={customCss}>
        <DisplayExpiredSubscriptionAnnouncement {...args} />
      </div>
      <div style={customCss}>
        <DisplayInvalidSubscriptionAnnouncement {...args} />
      </div>
      <div style={customCss}>
        <DisplayGoingToExpireSubscriptionAnnouncement {...args} expiry={DateTime.now().plus({ days: 4 })} />
      </div>
    </>
  ),
};
