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

export default {
  title: "Foundations/RadioButton",
  component: "RadioButton",
};

export const DefaultRadioButton = {
  render: () => (
    <div className="radiolist" style={{ display: "flex", flexWrap: "wrap", gap: "1.6rem" }}>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" checked={false} disabled={false} readOnly={true} />
        <label />
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" checked={false} disabled={true} readOnly={true} />
        <label />
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" checked={true} disabled={false} readOnly={true} />
        <label />
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" checked={true} disabled={true} readOnly={true} />
        <label />
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" id="label1" checked={false} disabled={false} readOnly={true} />
        <label htmlFor="label1">Label</label>
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" id="label2" checked={false} disabled={true} readOnly={true} />
        <label htmlFor="label2">Label</label>
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" id="label3" checked={true} disabled={false} readOnly={true} />
        <label htmlFor="label3">Label</label>
      </div>
      <div className="input radio" style={{ width: "25%" }}>
        <input type="radio" id="label4" checked={true} disabled={true} readOnly={true} />
        <label htmlFor="label4">Label</label>
      </div>
    </div>
  ),
};

export const PremiumRadioButton = {
  render: () => (
    <>
      <div className="radiolist radiolist-alt" style={{ display: "flex", flexWrap: "wrap", gap: "1.6rem" }}>
        <div className="input radio" style={{ width: "25%" }}>
          <input type="radio" id="label1" checked={false} disabled={false} readOnly={true} />
          <label htmlFor="label1">Unchecked, enabled, read-only</label>
        </div>
        <div className="input radio disabled" style={{ width: "25%" }}>
          <input type="radio" id="label2" checked={false} disabled={true} readOnly={true} />
          <label htmlFor="label2">Unchecked, disabled, read-only</label>
        </div>
        <div className="input radio checked" style={{ width: "25%" }}>
          <input type="radio" id="label3" checked={true} disabled={false} readOnly={true} />
          <label htmlFor="label3">Checked, enabled, read-only</label>
        </div>
        <div className="input radio checked disabled" style={{ width: "25%" }}>
          <input type="radio" id="label4" checked={true} disabled={true} readOnly={true} />
          <label htmlFor="label4">Checked, disabled, read-only</label>
        </div>
      </div>
      <div className="radiolist radiolist-alt" style={{ display: "flex", flexWrap: "wrap", gap: "1.6rem" }}>
        <div className="input radio" style={{ width: "25%" }}>
          <input type="radio" id="label5" checked={false} disabled={false} readOnly={true} />
          <label htmlFor="label5">
            <span className="name">Unchecked</span>
            <span className="info">Enabled and read-only</span>
          </label>
        </div>
        <div className="input radio disabled" style={{ width: "25%" }}>
          <input type="radio" id="label6" checked={false} disabled={true} readOnly={true} />
          <label htmlFor="label6">
            <span className="name">Unchecked</span>
            <span className="info">Disabled and read-only</span>
          </label>
        </div>
        <div className="input radio checked" style={{ width: "25%" }}>
          <input type="radio" id="label7" checked={true} disabled={false} readOnly={true} />
          <label htmlFor="label7">
            <span className="name">Checked</span>
            <span className="info">Enabled and read-only</span>
          </label>
        </div>
        <div className="input radio checked disabled" style={{ width: "25%" }}>
          <input type="radio" id="label8" checked={true} disabled={true} readOnly={true} />
          <label htmlFor="label8">
            <span className="name">Checked</span>
            <span className="info">Disabled and read-only</span>
          </label>
        </div>
      </div>
    </>
  ),
};
