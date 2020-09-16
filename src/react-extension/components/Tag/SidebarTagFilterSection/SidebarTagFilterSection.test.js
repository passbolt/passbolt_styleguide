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
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import SidebarTagFilterSection from "./SidebarTagFilterSection";

beforeEach(() => {
  jest.resetModules();
});

const getDummyTags = function() {
  return [
    {
      id: "1",
      slug: "test",
      is_shared: false
    },
    {
      id: "2",
      slug: "slug",
      is_shared: false
    },
    {
      id: "3",
      slug: "#git",
      is_shared: true
    },
    {
      id: "4",
      slug: "gpg",
      is_shared: false
    },
    {
      id: "5",
      slug: "there’s always something to look at if you open your eyes!",
      is_shared: false
    }
  ]
}

const getAppContext = function (appContext) {
  const defaultAppContext = {
    port: new MockPort()
  };

  return Object.assign(defaultAppContext, appContext || {});
};

const renderTagFilter = function(appContext, props) {
  appContext = getAppContext(appContext);
  props = props || {};
  return render(
    <AppContext.Provider value={appContext}>
      <SidebarTagFilterSection debug tags={props.tags} />
    </AppContext.Provider>
  );
};

describe("SidebarTagFilterSection", () => {
  it("View resources' tags", () => {
    const props = {
      tags: getDummyTags()
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // slug list exists
    const slugList = container.querySelectorAll(".ellipsis");
    expect(slugList).not.toBeNull();
    expect(slugList.length).toBe(5);
    slugList.forEach(function (value, index) {
      expect(value.textContent).toBe(props.tags[index].slug);
    });

  });

  it("View resources' empty tag", () => {
    const props = {
      tags: []
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // empty tag exists
    const emptyTag = container.querySelector(".empty-content");
    expect(emptyTag).not.toBeNull();
    expect(emptyTag.textContent).toBe("empty");

  });

  it("View resources' loading tag", () => {
    const props = {
      tags: null
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // loading tag exists
    const emptyTag = container.querySelector(".processing-text");
    expect(emptyTag).not.toBeNull();
    expect(emptyTag.textContent).toBe("Retrieving tags");

  });

  it("Cut long tags", () => {
    // TODO Cut long tags so they fit on one line
  });

  it("Filter my resources’ tags by personal tags", () => {
    const props = {
      tags: getDummyTags()
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const filterTagByType = container.querySelector(".filter");
    expect(filterTagByType).not.toBeNull();
    fireEvent.click(filterTagByType, leftClick);

    const personalTagMenu = container.querySelector("#personal-tag");
    expect(personalTagMenu).not.toBeNull();
    fireEvent.click(personalTagMenu, leftClick);

    const tagFilterTitleUpdated = container.querySelector("h3");
    expect(tagFilterTitleUpdated).not.toBeNull();
    expect(tagFilterTitleUpdated.textContent).toBe("My tags");

    const personalTags = props.tags.filter( tag => !tag.is_shared);

    // slug list exists
    const slugList = container.querySelectorAll(".ellipsis");
    expect(slugList).not.toBeNull();
    expect(slugList.length).toBe(4);
    slugList.forEach(function (value, index) {
      expect(value.textContent).toBe(personalTags[index].slug);
    });

  });

  it("Filter my resources’ tags by shared tags", () => {
    const props = {
      tags: getDummyTags()
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const filterTagByType = container.querySelector(".filter");
    expect(filterTagByType).not.toBeNull();
    fireEvent.click(filterTagByType, leftClick);

    const personalTagMenu = container.querySelector("#shared-tag");
    expect(personalTagMenu).not.toBeNull();
    fireEvent.click(personalTagMenu, leftClick);

    const tagFilterTitleUpdated = container.querySelector("h3");
    expect(tagFilterTitleUpdated).not.toBeNull();
    expect(tagFilterTitleUpdated.textContent).toBe("Shared tags");

    const sharedTags = props.tags.filter( tag => tag.is_shared);

    // slug list exists
    const slugList = container.querySelectorAll(".ellipsis");
    expect(slugList).not.toBeNull();
    expect(slugList.length).toBe(1);
    slugList.forEach(function (value, index) {
      expect(value.textContent).toBe(sharedTags[index].slug);
    });

  });

  it("Filter my resources’ tags by all tags", () => {
    const props = {
      tags: getDummyTags()
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const filterTagByType = container.querySelector(".filter");
    expect(filterTagByType).not.toBeNull();
    fireEvent.click(filterTagByType, leftClick);

    const allTagMenu = container.querySelector("#all-tag");
    expect(allTagMenu).not.toBeNull();
    fireEvent.click(allTagMenu, leftClick);

    const tagFilterTitleUpdated = container.querySelector("h3");
    expect(tagFilterTitleUpdated).not.toBeNull();
    expect(tagFilterTitleUpdated.textContent).toBe("Filter by tags");

    // slug list exists
    const slugList = container.querySelectorAll(".ellipsis");
    expect(slugList).not.toBeNull();
    expect(slugList.length).toBe(5);
    slugList.forEach(function (value, index) {
      expect(value.textContent).toBe(props.tags[index].slug);
    });

  });

  it("As LU I cannot edit a shared tag", () => {
    const props = {
      tags: getDummyTags()
    };
    const {container} = renderTagFilter(null, props);

    // Sidebar Tags title exists and correct
    const tagFilterTitle = container.querySelector("h3");
    expect(tagFilterTitle).not.toBeNull();
    expect(tagFilterTitle.textContent).toBe("Filter by tags");

    // Click to expand tags
    const leftClick = {button: 0};
    const filterTagByType = container.querySelector(".filter");
    expect(filterTagByType).not.toBeNull();
    fireEvent.click(filterTagByType, leftClick);

    const personalTagMenu = container.querySelector("#shared-tag");
    expect(personalTagMenu).not.toBeNull();
    fireEvent.click(personalTagMenu, leftClick);

    const moreTagItemMenu = container.querySelector(".more");
    expect(moreTagItemMenu).toBeNull();

  });

});
