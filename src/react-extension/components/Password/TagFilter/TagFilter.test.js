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
import {render} from "@testing-library/react";
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import TagFilter from "./TagFilter";

beforeEach(() => {
  jest.resetModules();
});

const getDummyTags = function() {
  return [
    {
      id: "1",
      slug: "test",
    },
    {
      id: "2",
      slug: "slug",
    },
    {
      id: "3",
      slug: "git",
    },
    {
      id: "4",
      slug: "gpg",
    },
    {
      id: "5",
      slug: "there’s always something to look at if you open your eyes!",
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
      <TagFilter debug tags={props.tags} />
    </AppContext.Provider>
  );
};

describe("TagFilter", () => {
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
    const emptyTag = container.querySelector(".empty-content");
    expect(emptyTag).not.toBeNull();
    expect(emptyTag.textContent).toBe("loading...");

  });

  it("Cut long tags", () => {
    // TODO Cut long tags so they fit on one line
  });
});
