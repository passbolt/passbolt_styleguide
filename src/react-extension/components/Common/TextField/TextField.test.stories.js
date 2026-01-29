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
import LockSVG from "../../../../img/svg/lock.svg";

export default {
  title: "Foundations/TextField",
  component: "TextField",
};

export const DefaultTextFields = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%", marginBottom: ".5rem" }}>TextField</span>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text required">
          <label htmlFor="input1">Label</label>
          <input id="input1" type="text" placeholder="Placeholder" required="required" disabled={false} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text required error">
          <label htmlFor="input4">Label</label>
          <input id="input4" type="text" placeholder="Placeholder" required="required" disabled={false} />
          <div className="error-message">Error message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text required disabled">
          <label htmlFor="input2">Label</label>
          <input id="input2" type="text" placeholder="Placeholder" value="Value" required="required" disabled={true} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text required disabled">
          <label htmlFor="input3">Label</label>
          <input id="input3" type="text" placeholder="Placeholder" required="required" disabled={true} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text">
          <label htmlFor="input5">Label</label>
          <input id="input5" type="text" placeholder="Placeholder" disabled={false} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text">
          <label htmlFor="input6">Label</label>
          <input id="input6" type="text" placeholder="Placeholder" disabled={false} />
          <div className="help-message">Help message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text disabled">
          <label htmlFor="input7">Label</label>
          <input id="input7" type="text" placeholder="Placeholder" value="Value" disabled={true} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input text disabled">
          <label htmlFor="input8">Label</label>
          <input id="input8" type="text" placeholder="Placeholder" disabled={true} />
          <div className="help-message">Help message</div>
        </div>
      </div>
      <span style={{ width: "100%", marginBottom: ".5rem" }}>In field number</span>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <input className="in-field" type="number" defaultValue={389} required="required" disabled={false} />
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <input className="in-field" type="number" defaultValue={389} required="required" disabled={true} />
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <input type="number" defaultValue={389} required="required" disabled={false} />
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <input type="number" defaultValue={389} required="required" disabled={true} />
      </div>
      <span style={{ width: "100%", marginBottom: ".5rem" }}>Import file field</span>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input file required">
          <input type="file" />
          <label>Select a File</label>
          <div className="input-file-inline">
            <input type="text" disabled={true} placeholder="Placeholder" />
            <button className="button primary">
              <span>Select a file</span>
            </button>
          </div>
          <div className="help-message">Help message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input file required error">
          <input type="file" />
          <label>Select a File</label>
          <div className="input-file-inline">
            <input type="text" disabled={true} placeholder="Placeholder" />
            <button className="button primary">
              <span>Select a file</span>
            </button>
          </div>
          <div className="error-message">Error message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input file required disabled">
          <input type="file" />
          <label>Select a File</label>
          <div className="input-file-inline">
            <input type="text" disabled={true} value="Value" placeholder="Placeholder" />
            <button className="button primary" disabled={true}>
              <span>Select a file</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input file required disabled">
          <input type="file" />
          <label>Select a File</label>
          <div className="input-file-inline">
            <input type="text" disabled={true} placeholder="Placeholder" />
            <button className="button primary" disabled={true}>
              <span>Select a file</span>
            </button>
          </div>
          <div className="help-message">Help message</div>
        </div>
      </div>
      <span style={{ width: "100%", marginBottom: ".5rem" }}>Textarea</span>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea">
          <label htmlFor="textarea1">
            Description
            <LockSVG />
          </label>
          <textarea id="textarea1" placeholder="Add a description" disabled={false} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea">
          <label htmlFor="textarea2">
            Description
            <LockSVG />
          </label>
          <textarea id="textarea2" placeholder="Add a description" disabled={false} />
          <div className="help-message">Help message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea disabled">
          <label htmlFor="textarea3">
            Description
            <LockSVG />
          </label>
          <textarea id="textarea3" placeholder="Add a description" defaultValue="Value" disabled={true} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea disabled">
          <label htmlFor="textarea4">
            Description
            <LockSVG />
          </label>
          <textarea id="textarea4" placeholder="Add a description" disabled={true} />
          <div className="help-message">Help message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea required">
          <label htmlFor="textarea5">Label</label>
          <textarea id="textarea5" placeholder="Placeholder" disabled={false} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea required error">
          <label htmlFor="textarea6">Label</label>
          <textarea id="textarea6" placeholder="Placeholder" disabled={false} />
          <div className="error-message">Error message</div>
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea required disabled">
          <label htmlFor="textarea7">Label</label>
          <textarea id="textarea7" placeholder="Placeholder" defaultValue="Value" disabled={true} />
        </div>
      </div>
      <div style={{ width: "24%", marginRight: "1%" }}>
        <div className="input textarea required disabled">
          <label htmlFor="textarea8">Label</label>
          <textarea id="textarea8" placeholder="Placeholder" disabled={true} />
        </div>
      </div>
    </div>
  ),
};
