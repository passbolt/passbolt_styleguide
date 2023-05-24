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
 * @since         3.8.0
 */

/**
 * Unit tests on Select in regard of specifications
 */

import each from "jest-each";
import {DirectionEnum} from "./Select";
import {defaultAllProps, defaultProps, defaultPropsWithSearch, items} from "./Select.test.data";
import SelectPage, {SelectorEnum} from "./Select.test.page";

const noResultMessage = "No result match";

describe("Select", () => {
  let page, // The page to test against.
    props; // The component props


  each([
    {scenario: "Should init with default properties", props: defaultProps(), expect: {
      search: true,
      className: true,
    }},
    {scenario: "Should not open select when disable", props: defaultAllProps(), expect: {
      search: false,
      className: false,
    }},
  ]).describe("Check select initialization", args => {
    it(args.scenario, () => {
      page = new SelectPage(args.props);

      expect(page.isOpen()).toBeFalsy();
      validateItems(page.selectItems, args.props);
      expect(page.searchInput === null).toBe(args.expect.search);
      expect(page.searchInput === null).toBe(args.expect.search);
      expect(page.hasId(args.props.id)).toBe(args.expect.className);
      expect(page.selectedValue.textContent).toBe(args.props.items[args.props.value].label);
      expect(page.hasDirection(args.props.direction ? args.props.direction : DirectionEnum.bottom)).toBeTruthy();
      expectStyle(page);
    });
  });

  each([
    {scenario: "Should open select and close it", props: {}, open: true},
    {scenario: "Should not open select when disable", props: {disabled: true}, open: false},
  ]).describe("Check click on select", args => {
    beforeEach(() => {
      props = defaultProps(args.props);
      page = new SelectPage(props);
    });

    it(args.scenario, async() => {
      expect.assertions(2);

      await page.clickOnSelect();
      expect(page.isOpen()).toBe(args.open);
      await page.clickOnSelect();
      expect(page.isOpen()).toBeFalsy();
    });

    it("Should display or not the items depending of state", async() => {
      await page.clickOnSelect();
      expectStyle(page);
      await page.clickOnSelect();
      //Expect item to be hidden after second Click
      expectToNotHaveStyle(page);
    });
  });

  each([
    {scenario: "Should display select to the bottom by default", props: {}, direction: DirectionEnum.bottom},
    {scenario: "Should display select to the top", direction: DirectionEnum.top},
    {scenario: "Should display select to the left", direction: DirectionEnum.left},
    {scenario: "Should display select to the right", direction: DirectionEnum.right},
  ]).describe("Check direction apply", args => {
    beforeEach(() => {
      props = defaultProps({direction: args.direction});
      page = new SelectPage(props);
    });

    it(args.scenario, async() => {
      expect(page.select.classList.contains(args.direction)).toBeTruthy();
    });

    it("Should have added style according to direction", async() => {
      await page.clickOnSelect();
      expectToHaveStyle(page);
    });
  });

  each([
    {scenario: "Should not filter items without search", search: "", size: 6, match: items().shift()},
    {scenario: "Should filter items and return 1 match", search: "#1", size: 1, match: [items()[1]]},
    {scenario: "Should filter items and return empty match", search: "@3", size: 1, match: [`${noResultMessage} @3`]},
    {scenario: "Should not display selected inside the list when searching", search: "#1", size: 1, match: [`${noResultMessage} #1`]}
  ]).describe("Check search action", args => {
    beforeEach(() => {
      props = defaultPropsWithSearch();
      page = new SelectPage(props);
    });

    it(args.scenario, async() => {
      await page.clickOnSelect();
      await page.fillInput(args.search);
      expect(page.selectItems.children.length).toEqual(args.size);
      for (let i = 0; i < args.match.length - 1; i++) {
        expect(page.selectItems.children[i].textContent).toEqual(args.match[i].label);
      }
    });
  });

  each([
    {scenario: "Should prevent close select when clicking on search input", item: SelectorEnum.searchInput, left: true, right: true},
    {scenario: "Should close select when clicking on select", item: SelectorEnum.select, left: false, right: false},
    {scenario: "Should close select when selecting item and prevent when right click", item: SelectorEnum.option, left: false, right: true},
    {scenario: "Should close when clicking outside", item: SelectorEnum.container, left: false, right: false},
    {scenario: "Should close when clicking on the current selected value", item: SelectorEnum.selectedValue, left: false, right: true}
  ]).describe("Check click on document event", args => {
    beforeEach(() => {
      props = defaultPropsWithSearch();
      page = new SelectPage(props);
    });

    it(`left click: ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.click(page.find(args.item));
      expect(page.isOpen()).toBe(args.left);
    });

    it(`right click: ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.rightClick(page.find(args.item));
      expect(page.isOpen()).toBe(args.right);
    });
  });

  each([
    {scenario: "Should close when scrolling outside", item: SelectorEnum.container, expect: false},
    {scenario: "Should not close when scrolling on select", item: SelectorEnum.items, expect: true}
  ]).describe("Check scroll event", args => {
    beforeEach(() => {
      props = defaultProps();
      page = new SelectPage(props);
    });
    it(args.scenario, async() => {
      await page.clickOnSelect();
      await page.scroll(page.find(args.item));
      expect(page.isOpen()).toBe(args.expect);
    });
  });

  describe("Handle document event", () => {
    beforeEach(() => {
      props = defaultProps();
      page = new SelectPage(props);
    });
    it("Should close select when drag event", async() => {
      await page.clickOnSelect();
      await page.dragStart(page.select);
      expect(page.isOpen()).toBeFalsy();
    });
  });

  each([
    {scenario: "Should select item on select event", item: SelectorEnum.select},
    {scenario: "Should select item on item event", item: SelectorEnum.option},
  ]).describe("Check key down events", args => {
    beforeEach(() => {
      props = defaultProps();
      page = new SelectPage(props);
    });
    it(`On enter event : ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.onEnter(page.find(args.item));
      expect(page.isOpen()).toBeFalsy();
      expect(page.selectedValue.textContent).toEqual(items()[0].label);
    });

    it(`On arrow down event : ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.onArrowDown(page.find(args.item));
      expect(page.isOpen()).toBeTruthy();
      expect(page.selectedValue.textContent).toEqual(items()[0].label);
    });

    it(`On arrow down event without opened select: ${args.scenario}`, async() => {
      await page.onArrowDown(page.find(args.item));
      expect(page.selectedValue.textContent).toEqual(items()[0].label);
    });

    it(`On arrow up event : ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.onArrowUp(page.find(args.item));
      expect(page.isOpen()).toBeTruthy();
    });

    it(`On arrow down up without opened select: ${args.scenario}`, async() => {
      await page.onArrowUp(page.find(args.item));
      expect(page.selectedValue.textContent).toEqual(items()[0].label);
    });

    it(`On escape event : ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.onEscape(page.find(args.item));
      expect(page.isOpen()).toBeFalsy();
    });
    it(`When event is not catched : ${args.scenario}`, async() => {
      await page.clickOnSelect();
      await page.onArrowright(page.find(args.item));
      expect(page.isOpen()).toBeTruthy();
    });
  });
});

/**
 * Common test to check style when select is open
 * @param {SelectPage} page
 */
const expectToHaveStyle = page => {
  const style = page.getContainerStyle();
  expect(style.width).toBe('0px');
  expect(style.height).toBe('0px');
  expect(style.display).toBe('block');
  expect(style.visibility).toBe('visible');
};

/**
 * Common test to check style when select is close
 * @param {SelectPage} page
 */
const expectToNotHaveStyle = page => {
  const style = page.getContainerStyle();
  expect(style.width).toBe("");
  expect(style.height).toBe("");
};

/**
 * Common test to check style of select
 * @param {SelectPage} page
 */
const expectStyle = page => page.isOpen() ? expectToHaveStyle(page) : expectToNotHaveStyle(page);
const validateItems = (list, props) => {
  expect(list.children.length).toEqual(props.items.length - 1);
  for (let i = 1; i < props.items.length - 1; i++) {
    expect(list.children[i - 1].textContent).toEqual(props.items[i].label);
  }
};
