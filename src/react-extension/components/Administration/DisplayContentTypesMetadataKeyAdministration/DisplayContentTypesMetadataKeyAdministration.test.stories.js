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
 * @since         4.11.0
 */

import React from "react";
import PropTypes from "prop-types";
import DisplayContentTypesMetadataKeyAdministration from "./DisplayContentTypesMetadataKeyAdministration";
import {
  defaultProps,
  defaultSettingsAndMultipleActiveKeysProps, defaultSettingsAndMultipleKeysProps,
  defaultSettingsAndSingleActiveKeyProps
} from "./DisplayContentTypesMetadataKeyAdministration.test.data";
import {within} from "@testing-library/dom";

export default {
  title: 'Components/Administration/DisplayContentTypesMetadataKeyAdministration',
  component: DisplayContentTypesMetadataKeyAdministration
};

const Template = args =>
  <div className="panel middle">
    <div className="grid grid-responsive-12">
      <DisplayContentTypesMetadataKeyAdministration {...args}/>
    </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();

export const WithValidationError = Template.bind({});
WithValidationError.args = defaultProps();
// Trigger the form validation.
WithValidationError.play = async({canvasElement}) => {
  const canvas = within(canvasElement);
  const form = canvas.getByTestId("submit-form");
  form.requestSubmit();
};

export const GeneratedMetadataKey = Template.bind({});
GeneratedMetadataKey.args = defaultProps();
// Trigger a key generation.
GeneratedMetadataKey.play = async({canvasElement}) => {
  const canvas = within(canvasElement);
  const form = canvas.getByTestId("generate-key-buton");
  form.click();
};

export const SingleActiveMetadataKey = Template.bind({});
SingleActiveMetadataKey.args = defaultSettingsAndSingleActiveKeyProps();

export const MultipleActiveKeys = Template.bind({});
MultipleActiveKeys.args = defaultSettingsAndMultipleActiveKeysProps();

export const MultipleKeys = Template.bind({});
MultipleKeys.args = defaultSettingsAndMultipleKeysProps();
