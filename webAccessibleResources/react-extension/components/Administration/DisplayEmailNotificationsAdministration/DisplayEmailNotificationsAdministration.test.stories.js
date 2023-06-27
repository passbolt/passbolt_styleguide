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
 * @since         3.8.0
 */

import React from "react";
import DisplayEmailNotificationsAdministration from "./DisplayEmailNotificationsAdministration";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import MockFetch from "../../../test/mock/MockFetch";
import {defaultEmailNotificationSettings, defaultProps, defaultPropsCE, withFileSourceSettings, withoutDatabaseSourceSettings} from "./DisplayEmailNotificationsAdministration.test.data";
import {AdminEmailNotificationContextProvider} from "../../../contexts/Administration/AdministrationEmailNotification/AdministrationEmailNotificationContext";

export default {
  title: 'Components/Administration/DisplayEmailNotificationsAdministration',
  component: DisplayEmailNotificationsAdministration
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/settings\/emails\/notifications\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displayemailnotificationsadministration--all-notifications':
    case 'components-administration-displayemailnotificationsadministration--all-notifications-for-ce': {
      return mockApiResponse(defaultEmailNotificationSettings());
    }
    case 'components-administration-displayemailnotificationsadministration--both-sources-exist': {
      return mockApiResponse(withFileSourceSettings());
    }
    case 'components-administration-displayemailnotificationsadministration--only-file-setting-exist': {
      return mockApiResponse(withoutDatabaseSourceSettings());
    }
  }
  throw new Error("Unsupported story");
});

const decorators = [
  (Story, context) => {
    currentStory = context.id;
    return <>
      <Story/>
    </>;
  }
];

const Template = args =>
  <AdminEmailNotificationContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayEmailNotificationsAdministration {...args}/>
      </div>
    </div>
  </AdminEmailNotificationContextProvider>;


export const AllNotifications = Template.bind({});
AllNotifications.args = defaultProps();
AllNotifications.decorators = decorators;

export const BothSourcesExist = Template.bind({});
BothSourcesExist.args = defaultProps();
BothSourcesExist.decorators = decorators;

export const OnlyFileSettingExist = Template.bind({});
OnlyFileSettingExist.args = defaultProps();
OnlyFileSettingExist.decorators = decorators;

export const AllNotificationsForCE = Template.bind({});
AllNotificationsForCE.args = defaultPropsCE();
AllNotificationsForCE.decorators = decorators;
