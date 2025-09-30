/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.6.0
 */

import {fireEvent, waitFor} from "@testing-library/react";
import ResizableSidebarPage from "./ResizableSidebar.test.page";

describe("ResizableSidebar", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", async() => {
    props = {
      resizable: true,
      gutterLeft: false,
      minWidth: "20%",
      maxWidth: "30%",
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {});
    expect(page.container).toBeTruthy();
  });

  it("sets initial sidebar width on mount", async() => {
    props = {
      resizable: true,
      gutterLeft: true,
      minWidth: "20%",
      maxWidth: "30%",
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {
      const receivedPx = page.getWidthOf(page.container);
      expect(receivedPx).toBe(20);
    });
  });

  it("resizes sidebar on mouse move (right sidebar)", async() => {
    props = {
      resizable: true,
      gutterLeft: true, // right sidebar
      minWidth: "20%",
      maxWidth: "30%"
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {
      expect(page.gutter).toBeTruthy();
      expect(page.getWidthOf(page.container)).toBe(20);
    });

    fireEvent.mouseDown(page.gutter, {clientX: 290});
    fireEvent.mouseMove(document, {clientX: 270});
    fireEvent.mouseUp(document);
    await waitFor(() => {
      const widthPx = page.getWidthOf(page.container);
      expect(widthPx).toBeCloseTo(22); // 220px of 1000px container
    });
  });

  it("resizes sidebar on mouse move (left sidebar)", async() => {
    props = {
      resizable: true,
      gutterLeft: false, // left sidebar
      minWidth: "20%",
      maxWidth: "30%"
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {
      expect(page.gutter).toBeTruthy();
      expect(page.getWidthOf(page.container)).toBe(20);
    });

    fireEvent.mouseDown(page.gutter, {clientX: 270});
    fireEvent.mouseMove(document, {clientX: 290});
    fireEvent.mouseUp(document);
    await waitFor(() => {
      const widthPx = page.getWidthOf(page.container);
      expect(widthPx).toBeCloseTo(22); // 220px of 1000px container, startWidth 200
    });
  });

  it("clamps width between min and max bounds", async() => {
    props = {
      resizable: true,
      gutterLeft: false, // left sidebar
      minWidth: "20%",
      maxWidth: "30%"
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {
      expect(page.gutter).toBeTruthy();
    });

    fireEvent.mouseDown(page.gutter, {clientX: 250});
    fireEvent.mouseMove(document, {clientX: 700});
    fireEvent.mouseUp(document);
    await waitFor(() => {
      const widthPx = page.getWidthOf(page.container);
      expect(widthPx).toBeCloseTo(30); //max is 30%
    });

    fireEvent.mouseDown(page.gutter, {clientX: 300});
    fireEvent.mouseMove(document, {clientX: 150});
    fireEvent.mouseUp(document);
    await waitFor(() => {
      const widthPx = page.getWidthOf(page.container);
      expect(widthPx).toBeCloseTo(20); //min is 20%
    });
  });

  it("resets width on double-click", async() => {
    props = {
      resizable: true,
      gutterLeft: false,
      minWidth: "20%",
      maxWidth: "30%"
    };
    const page = new ResizableSidebarPage(props);
    await waitFor(() => {
      expect(page.gutter).toBeTruthy();
    });

    fireEvent.mouseDown(page.gutter, {clientX: 250});
    fireEvent.mouseMove(document, {clientX: 700});
    fireEvent.mouseUp(document);

    fireEvent.doubleClick(page.gutter);

    await waitFor(() => {
      const widthPx = page.getWidthOf(page.container);
      expect(widthPx).toBeCloseTo(20); //initial set to 20% (200) in test page
    });
  });
});
