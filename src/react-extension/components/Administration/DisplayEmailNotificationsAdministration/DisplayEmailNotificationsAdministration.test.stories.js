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
 * @since         3.6.0
 */

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DisplayEmailNotificationsAdministration from "./DisplayEmailNotificationsAdministration";

export default {
  title: 'Components/Administration/DisplayEmailNotificationsAdministration',
  component: DisplayEmailNotificationsAdministration
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel middle">
        <div className="grid grid-responsive-12">
          <Route component={routerProps => <DisplayEmailNotificationsAdministration {...args} {...routerProps}/>}></Route>
        </div>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const administrationWorkspaceContext = {
  onGetEmailNotificationsRequested: () => ({
    body: {
      sources_database: true,
      sources_file: true,
      send_password_create: true,
      send_password_share: true,
      send_password_update: true,
      send_password_delete: true,
      send_folder_create: true,
      send_folder_update: true,
      send_folder_delete: true,
      send_folder_share: true,
      send_comment_add: true,
      send_group_delete: true,
      send_group_user_add: true,
      send_group_user_delete: true,
      send_group_user_update: true,
      send_group_manager_update: true,
      send_user_create: true,
      send_user_recover: true,
      send_admin_user_recover_complete: true,
      send_admin_user_setup_completed: true,
      show_description: true,
      show_secret: true,
      show_uri: true,
      show_username: true,
      show_comment: true,
      send_account_recovery_impossible_admin: true,
      send_account_recovery_initiated: true,
      send_account_recovery_processed: true,
      send_account_recovery_policy_changed: true,
      send_account_recovery_impossible_user: true,
      send_account_recovery_approved: true,
      send_account_recovery_rejected: true,
    }
  }),
  must: {
    save: true
  },
  can: {
    save: true
  }
};

export const AllNotifications = Template.bind({});
AllNotifications.args = {
  context: {
    siteSettings: {
      canIUse: () => true
    }
  },
  administrationWorkspaceContext: administrationWorkspaceContext
};

export const AllNotificationsForCE = Template.bind({});
AllNotificationsForCE.args = {
  context: {
    siteSettings: {
      canIUse: () => false
    }
  },
  administrationWorkspaceContext: administrationWorkspaceContext
};
