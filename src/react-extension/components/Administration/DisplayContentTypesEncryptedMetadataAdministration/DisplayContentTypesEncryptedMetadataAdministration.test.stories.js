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
import {within} from '@storybook/test';
import {
  allowedVersionErrorProps,
  defaultProps,
  resourceTypesDeletedProps
} from "./DisplayContentTypesEncryptedMetadataAdministration.test.data";
import DisplayContentTypesEncryptedEncryptedMetadataAdministration from "./DisplayContentTypesEncryptedMetadataAdministration";

export default {
  title: 'Components/Administration/DisplayContentTypesEncryptedMetadataAdministration',
  component: DisplayContentTypesEncryptedEncryptedMetadataAdministration
};

const Template = args =>
  <div className="panel middle">
    <div className="grid grid-responsive-12">
      <DisplayContentTypesEncryptedEncryptedMetadataAdministration {...args}/>
    </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();

export const WithValidationError = Template.bind({});
WithValidationError.args = allowedVersionErrorProps();
// Trigger the form validation.
WithValidationError.play = async({canvasElement}) => {
  const canvas = within(canvasElement);
  const form = canvas.getByTestId("submit-form");
  form.requestSubmit();
};

export const WithWarnings = Template.bind({});
WithWarnings.args = resourceTypesDeletedProps();
