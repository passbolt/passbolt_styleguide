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
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans} from "react-i18next";

export default {
  title: 'Foundations/Button',
  component: "Button"
};


const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Primary button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary">Save</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary" disabled={true}>Save</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button type="submit" className="button primary processing">
        Save
        <Icon name="spinner"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button type="submit" className="button primary processing" disabled={true}>
        Save
        <Icon name="spinner"/>
      </button>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Danger button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning">Delete</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning" disabled={true}>Delete</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning processing">
        Delete
        <Icon name="spinner"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning processing" disabled={true}>
        Delete
        <Icon name="spinner"/>
      </button>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Secondary button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button" type="button">Learn more</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button" disabled={true} type="button">Learn more</button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button processing" type="button">
        Learn more
        <Icon name="spinner"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button processing disabled" type="button">
        Learn more
        <Icon name="spinner"/>
      </button>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Action button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button">
          <Icon name="copy-to-clipboard"/>
          <span><Trans>Copy</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button disabled">
          <Icon name="copy-to-clipboard"/>
          <span><Trans>Copy</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button">
          <Icon name="edit"/>
          <span><Trans>Edit</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button disabled">
          <Icon name="edit"/>
          <span><Trans>Edit</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button">
          <Icon name="share"/>
          <span><Trans>Share</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button disabled">
          <Icon name="share"/>
          <span><Trans>Share</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button">
          <Icon name="download"/>
          <span><Trans>Export</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <a className="button disabled">
          <Icon name="download"/>
          <span><Trans>Export</Trans></span>
        </a>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-action-icon">
        <Icon name="upload"/>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-action-icon disabled">
        <Icon name="upload"/>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-action-icon">
        <Icon name="info-circle"/>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-action-icon disabled">
        <Icon name="info-circle"/>
      </a>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Form button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-icon">
        <Icon name='settings'/>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-icon disabled">
        <Icon name='settings'/>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="button button-icon">
        <Icon name='dice'/>
      </a>
    </div>
    <div style={{width: "25%, marginTop: \".5rem\""}}>
      <a className="button button-icon disabled">
        <Icon name='dice'/>
      </a>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Eye button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="password-view button button-icon">
        <Icon name='eye-open'/>
        <span className="visually-hidden">view</span>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="password-view button button-icon disabled">
        <Icon name='eye-open'/>
        <span className="visually-hidden">view</span>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="password-view button button-icon">
        <Icon name='eye-close'/>
        <span className="visually-hidden">view</span>
      </a>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <a className="password-view button button-icon disabled">
        <Icon name='eye-close'/>
        <span className="visually-hidden">view</span>
      </a>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Close button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="dialog-close button button-transparent" role="button">
          <Icon name='close'/>
          <span className="visually-hidden">Close</span>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="dialog-close button button-transparent disabled" role="button">
          <Icon name='close'/>
          <span className="visually-hidden">Close</span>
        </button>
      </div>
    </div>
  </div>
  ;

export const Default = Template.bind({});
