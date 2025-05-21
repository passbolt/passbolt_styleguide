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
 * @since         5.2.0
 */
import {resourceWithAppearance} from './AddResourceAppearance.test.data';
import AddResourceAppearancePage from './AddResourceAppearance.test.page';
import {defaultProps} from './AddResourceDescription.test.data';

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceAppearance", () => {
  describe('As LU I can see the appearance form.', () => {
    it('As LU I can see the appearancxe password form.', () => {
      expect.assertions(4);

      const page = new AddResourceAppearancePage(defaultProps());

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Appearance");
      expect(page.colorTitle.textContent).toEqual("Color");
      expect(page.iconsTitle.textContent).toEqual("Icons");
    });
  });

  describe('Fill form appearance', () => {
    it('can choose a color.', async() => {
      expect.assertions(3);

      const props = defaultProps();
      const page = new AddResourceAppearancePage(props);

      const colorItem = page.colorPickerItem(4);
      expect(page.isColorPickerItemSelected(colorItem)).toBeFalsy();

      await page.click(colorItem);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.background_color",
          value: "#E64626",
        },
      });
    });

    it('can switch back to the default color', async() => {
      expect.assertions(3);

      const props = resourceWithAppearance();
      const page = new AddResourceAppearancePage(props);

      const colorItem = page.colorPickerItem(4);
      expect(page.isColorPickerItemSelected(colorItem)).toBeTruthy();

      await page.click(page.defaultColorToggle);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.background_color",
          value: null,
        },
      });
    });

    it('can choose an icon.', async() => {
      expect.assertions(4);

      const props = defaultProps();
      const page = new AddResourceAppearancePage(props);

      const iconItem = page.iconPickerItem(42);
      expect(page.isIconPickerItemSelected(iconItem)).toBeFalsy();

      await page.click(iconItem);

      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.value",
          value: 42,
        },
      });
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.type",
          value: "keepass-icon-set",
        },
      });
    });

    it('can switch back to the default icon', async() => {
      expect.assertions(4);

      const props = resourceWithAppearance();
      const page = new AddResourceAppearancePage(props);

      const iconItem = page.iconPickerItem(42);
      expect(page.isIconPickerItemSelected(iconItem)).toBeTruthy();

      await page.click(page.defaultIconToggle);

      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.value",
          value: null,
        },
      });
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: "metadata.icon.type",
          value: "keepass-icon-set",
        },
      });
    });
  });
});
