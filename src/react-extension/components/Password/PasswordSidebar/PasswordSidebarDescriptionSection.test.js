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

/**
 * Unit tests on password sidebar description section in regard of specifications
 */

import React from "react";
import {fireEvent, render} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import PasswordSidebarDescriptionSection from "./PasswordSidebarDescriptionSection";

beforeEach(() => {
  jest.resetModules();
});

const getDummyDescription = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "description": "Apache is the world's most used web server software."
  };
};

const getDummyDescriptionEmpty = function() {
  return {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "description": ""
  };
};


const getAppContext = function(appContext) {
  const defaultAppContext = {
    port: new MockPort()
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderPasswordSidebarDescriptionSection = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <PasswordSidebarDescriptionSection debug description={props.resource.description} id={props.resource.id} />
    </AppContext.Provider>
  );
};

describe("PasswordSidebarTag", () => {
  it("See the description of a resource", () => {
    const props = {
      resource: getDummyDescription()
    };
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const description = container.querySelector(".description_content");
    expect(description).not.toBeNull();
    expect(description.textContent).toBe(props.resource.description);
  });

  it("See an empty message if the resource has no description", () => {
    const props = {
      resource: getDummyDescriptionEmpty()
    };
    const {container} = renderPasswordSidebarDescriptionSection(null, props);

    // Sidebar Tags title exists and correct
    const sidebarTitle = container.querySelector("h4 a");
    expect(sidebarTitle).not.toBeNull();
    expect(sidebarTitle.textContent).toBe("Description");

    // Click to expand tags
    const leftClick = {button: 0};
    const sidebar = container.querySelector(".sidebar-section");
    fireEvent.click(sidebar, leftClick);

    // Tags list exists
    const emptyContent = container.querySelector(".empty-content");
    expect(emptyContent).not.toBeNull();
    expect(emptyContent.textContent).toBe("There is no description yet, click here to add one");
  });

});
