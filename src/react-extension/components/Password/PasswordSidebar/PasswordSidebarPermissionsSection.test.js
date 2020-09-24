/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import PasswordSidebarPermissionsSection from "./PasswordSidebarPermissionsSection";
import UserSettings from "../../../lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";

beforeEach(() => {
  jest.resetModules();
});

const getDummyPermission = function() {
  return [{
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "user": {
      "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-05-11T09:32:49+00:00",
      "modified": "2020-05-12T09:32:49+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-05-13T09:32:49+00:00",
        "modified": "2020-05-13T09:32:49+00:00",
        "avatar": {
          "id": "0f769127-3053-45e4-bd8e-75e766bb4d52",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.png",
          "adapter": "Local",
          "created": "2020-05-13T09:32:51+00:00",
          "modified": "2020-05-13T09:32:51+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",
            "small": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"
          }
        }
      },
    },
  }];
};

const getAppContext = function(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    port: new MockPort()
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderPasswordSidebarPermissionSection = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <PasswordSidebarPermissionsSection debug {...props}/>
    </AppContext.Provider>
  );
};

describe("PasswordSidebarPermission", () => {
  it("See the permission of a resource", async() => {
    const context = getAppContext();
    const props = {
      resourceWorkspaceContext: {
        details: {
          resource: {
            id: "8e3874ae-4b40-590b-968a-418f704b9d9a"
          }
        }
      }
    };

    const {container} = renderPasswordSidebarPermissionSection(context, props);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Shared with");

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => getDummyPermission()));

    // Click to expand
    const leftClick = {button: 0};
    fireEvent.click(sidebarTitle, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {});

    // Permission list exists
    const permissionList = container.querySelectorAll(".usercard-col-2");
    expect(permissionList).not.toBeNull();
    expect(permissionList.length).toBe(1);
    permissionList.forEach(value => {
      expect(value.textContent).toBe("Carol Shaw (carol@passbolt.com)is owner");
    });

    expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.find-permissions", props.resourceWorkspaceContext.details.resource.id);
  });

  it("See the loading feedback permission of a resource", async() => {
    const context = getAppContext();
    const props = {
      resourceWorkspaceContext: {
        details: {
          resource: {
            id: "8e3874ae-4b40-590b-968a-418f704b9d9a"
          }
        }
      }
    };

    const {container} = renderPasswordSidebarPermissionSection(context, props);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Shared with");

    let updateResolve;

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn(() => new Promise(resolve => {
      updateResolve = resolve;
    })));

    // Click to expand
    const leftClick = {button: 0};
    fireEvent.click(sidebarTitle, leftClick);

    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      const loadingContent = container.querySelector(".processing-text");
      expect(loadingContent).not.toBeNull();
      expect(loadingContent.textContent).toBe("Retrieving permissions");
      updateResolve();
    });
  });
});
