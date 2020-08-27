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
import {fireEvent, render} from "@testing-library/react";
import AppContext from "../../../../contexts/AppContext";
import PasswordSidebarTagSection from "./PasswordSidebarTagSection";

beforeEach(() => {
  jest.resetModules();
  // mockPort();
});

// const mockPort = function() {
//   const mockedOnCallbacks = {};
//   const port = {
//     emit: jest.fn(),
//     fireAddonMessage: function(message) {
//       const callback =mockedOnCallbacks[message];
//       if (callback) {
//         const callbackArgs = Array.prototype.slice.call(arguments, 1);
//         callback.apply(null, callbackArgs);
//       }
//     },
//     on: (message, callback) => {
//       mockedOnCallbacks[message] = callback;
//     },
//     request: jest.fn()
//   };
//   Port.set(port);
// };

const getDummyResource = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http://www.apache.org/",
    "description": "Apache is the world's most used web server software.",
    "deleted": false,
    "created": "2019-12-05T13:38:43+00:00",
    "modified": "2019-12-06T13:38:43+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "tags": [
    {
      "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
      "slug": "#gg",
      "is_shared": true
    },
    {
      "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
      "slug": "#test",
      "is_shared": true
    },
    {
      "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
      "slug": "dede",
      "is_shared": false
    },
    {
      "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
      "slug": "ok",
      "is_shared": false
    },
    {
      "id": "f3ad54ab-54c1-457c-8f18-7c40dc4a37d9",
      "slug": "test",
      "is_shared": false
    },
    {
      "id": "5c6bb083-a499-40ff-a639-6593c87a24bd",
      "slug": "There’s always something to look at if you open your eyes",
      "is_shared": false
    }
  ]
  };
};

const getDummyResourceEmptyTag = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http://www.apache.org/",
    "description": "Apache is the world's most used web server software.",
    "deleted": false,
    "created": "2019-12-05T13:38:43+00:00",
    "modified": "2019-12-06T13:38:43+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  };
};

describe("PasswordSidebarTag", () => {
  const getAppContext = function(appContext) {
    const defaultAppContext = {
      user: {
        // "user.settings.securityToken.code": "TST",
        // "user.settings.securityToken.textColor": "#FFFFFF",
        // "user.settings.securityToken.color": "#000000"
      }
    };

    return Object.assign(defaultAppContext, appContext || {});
  };

  const renderPasswordSidebarTagSection = function(resource, appContext) {
    appContext = getAppContext(appContext);
    return render(
      <AppContext.Provider value={appContext}>
        <PasswordSidebarTagSection debug resource={resource} />
      </AppContext.Provider>
    );
  };

  it("See the tags of a resource", () => {
    const resource = getDummyResource();
    const {container} = renderPasswordSidebarTagSection(resource);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const tagList = container.querySelector(".tags-list");
    expect(tagList).not.toBeNull();

    // number of tags and check all name displayed
    const tags= container.querySelectorAll(".tag");
    expect(tags).not.toBeNull();
    expect(tags.length).toBe(6);
    tags.forEach(function (value, index) {
      expect(value.textContent).toBe(resource.tags[index].slug);
    });

  });

  it("See an empty message if the resource has no tags", () => {
    const resource = getDummyResourceEmptyTag()
    const {container} = renderPasswordSidebarTagSection(resource);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no tag, click edit to add one");

  });

});
