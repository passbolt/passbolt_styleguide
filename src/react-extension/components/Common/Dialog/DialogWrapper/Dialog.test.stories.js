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
import DialogWrapper from "./DialogWrapper";
import FormSubmitButton from "../../Inputs/FormSubmitButton/FormSubmitButton";
import { Trans } from "react-i18next";

const Dialog = (args) => (
  <DialogWrapper {...args}>
    <div className="form-content">
      <label>
        <Trans>Take a deep breath and enjoy being in the present moment...</Trans>
      </label>
      <div className="progress-bar-wrapper">
        <span className="progress-bar">
          <span className="progress completed" />
        </span>
      </div>
    </div>
    <div className="dialog-footer">
      <button className="button button-left" disabled={args.disabled} type="button">
        <Trans>Learn more</Trans>
      </button>
      <button disabled={args.disabled} className="link cancel">
        <Trans>Cancel</Trans>
      </button>
      <FormSubmitButton disabled={args.disabled} processing={args.processing} warning={args.warning} />
    </div>
  </DialogWrapper>
);

export default {
  title: "Components/Common/Dialog",
  component: Dialog,
};

export const Default = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    onClose: () => {},
  },
};

export const Tooltip = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    tooltip: "Tool tip placeholder",
    onClose: () => {},
  },
};
