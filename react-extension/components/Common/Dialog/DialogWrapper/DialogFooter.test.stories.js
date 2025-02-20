/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import React from "react";
import FormSubmitButton from "../../Inputs/FormSubmitButton/FormSubmitButton";
import {Trans} from "react-i18next";

export default {
  title: 'Components/Common/DialogFooter',
  component: "DialogFooter"
};


const Template = args =>
  <div className="dialog-wrapper">
    <div className="dialog">
      <div className="dialog-content">
        <div className="dialog-footer">
          <button className="button button-left" disabled={args.disabled} type="button"><Trans>Learn more</Trans></button>
          <button disabled={args.disabled} className="link cancel">
            <Trans>Cancel</Trans>
          </button>
          <FormSubmitButton
            disabled={args.disabled}
            processing={args.processing}/>
        </div>
      </div>
    </div>
  </div>;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  processing: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  processing: true
};
