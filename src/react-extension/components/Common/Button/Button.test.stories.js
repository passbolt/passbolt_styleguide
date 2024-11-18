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
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import MoreVerticalSVG from "../../../../img/svg/more_vertical.svg";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";

export default {
  title: 'Foundations/Button',
  component: "Button"
};

export const PrimaryButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Primary Form button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary primary-form"><Trans>Save</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary primary-form" disabled={true}><Trans>Save</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button type="submit" className="button primary primary-form processing" disabled={true}>
        Save
        <Icon name="spinner"/>
      </button>
    </div>
    <span style={{width: "100%", marginTop: "3rem"}}>Primary Create button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary primary-create">
        <Icon name="add"/>
        <Trans>Create</Trans>
        <Icon name="caret-down"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button primary primary-create" disabled={true}>
        <Icon name="add"/>
        <Trans>Create</Trans>
        <Icon name="caret-down"/>
      </button>
    </div>
  </div>
};

export const WarningButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Danger button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning"><Trans>Delete</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning" disabled={true}><Trans>Delete</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button warning processing" disabled={true}>
        Delete
        <Icon name="spinner"/>
      </button>
    </div>
  </div>
};

export const AttentionButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Attention button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button attention"><Trans>Proceed</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button attention" disabled={true}><Trans>Proceed</Trans></button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button attention processing" disabled={true}>
        Proceed
        <Icon name="spinner"/>
      </button>
    </div>
  </div>
};

export const SecondaryButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Secondary button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button" type="button">
        <Icon name="info-circle" />
        <Trans>Read the documentation</Trans>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button" disabled={true} type="button">
        <Icon name="info-circle" />
        <Trans>Read the documentation</Trans>
      </button>
    </div>
  </div>
};

export const ActionButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Action button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual">
          <Icon name="copy-to-clipboard"/>
          <Trans>Copy</Trans>
          <Icon name="caret-down"/>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual" disabled={true}>
          <Icon name="copy-to-clipboard"/>
          <Trans>Copy</Trans>
          <Icon name="caret-down"/>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual">
          <Icon name="edit"/>
          <Trans>Edit</Trans>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual" disabled={true}>
          <Icon name="edit"/>
          <Trans>Edit</Trans>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual">
          <Icon name="share"/>
          <Trans>Share</Trans>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button button-action-contextual" disabled={true}>
          <Icon name="share"/>
          <Trans>Share</Trans>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button">
          <Icon name="add"/>
          <Trans>More</Trans>
          <Icon name="caret-down"/>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button" disabled={true}>
          <Icon name="add"/>
          <Trans>More</Trans>
          <Icon name="caret-down"/>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button type="button" className="button">
        <Icon name="columns"/>
        <Trans>Columns</Trans>
        <Icon name="caret-down"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button type="button" className="button" disabled={true}>
        <Icon name="columns"/>
        <Trans>Columns</Trans>
        <Icon name="caret-down"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-action button-action-icon info">
        <Icon name="info-circle"/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-action button-action-icon info active">
        <Icon name="info-circle"/>
      </button>
    </div>
  </div>
};

export const FormButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Form button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-icon">
        <Icon name='settings'/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-icon" disabled={true}>
        <Icon name='settings'/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-icon">
        <Icon name='dice'/>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="button button-icon" disabled={true}>
        <Icon name='dice'/>
      </button>
    </div>
    <span style={{width: "100%",  marginTop: "3rem"}}>Eye in field button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view infield button-transparent">
        <EyeOpenSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view infield button-transparent" disabled={true}>
        <EyeOpenSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view infield button-transparent">
        <EyeCloseSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view infield button-transparent" disabled={true}>
        <EyeCloseSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
  </div>
};

export const BoxLessButton = {
  render: () => <div style={{display: "flex", flexWrap: "wrap"}}>
    <span style={{width: "100%"}}>Eye inline button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view inline button-transparent">
        <EyeOpenSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view inline button-transparent" disabled={true}>
        <EyeOpenSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view inline button-transparent">
        <EyeCloseSVG/>
        <span className="visually-hidden">view</span>
      </button>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <button className="password-view inline button-transparent" disabled={true}>
        <EyeCloseSVG/>
        <span className="visually-hidden">view</span>
      </button>
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
    <span style={{width: "100%", marginTop: "3rem"}}>Menu button</span>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button-transparent inline-menu-vertical">
          <MoreVerticalSVG/>
          <span className="visually-hidden">More</span>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button-transparent inline-menu-vertical disabled">
          <MoreVerticalSVG/>
          <span className="visually-hidden">More</span>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button-transparent inline-menu-horizontal">
          <MoreHorizontalSVG/>
          <span className="visually-hidden">More</span>
        </button>
      </div>
    </div>
    <div style={{width: "25%", marginTop: ".5rem"}}>
      <div style={{display: "flex"}}>
        <button className="button-transparent inline-menu-horizontal disabled">
          <MoreHorizontalSVG/>
          <span className="visually-hidden">More</span>
        </button>
      </div>
    </div>
  </div>
};
