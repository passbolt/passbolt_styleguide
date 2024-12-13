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
import {Trans} from "react-i18next";
import ContextualMenuWrapper from "./ContextualMenuWrapper";
import DeleteIcon from "../../../../img/svg/delete.svg";
import ShareIcon from "../../../../img/svg/share.svg";
import EditIcon from "../../../../img/svg/edit.svg";
import ClockIcon from "../../../../img/svg/clock.svg";
import CalendarIcon from "../../../../img/svg/calendar.svg";
import KeyIcon from "../../../../img/svg/key.svg";
import OwnedByMeIcon from "../../../../img/svg/owned_by_me.svg";

export default {
  title: 'Components/Common/ContextualMenu',
  component: "ContextualMenu"
};


const Template = () =>
  <ContextualMenuWrapper hide={() => {}}>
    <li key="option-username-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="username"><OwnedByMeIcon/><span><Trans>Copy username</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-copy-password-resource" className="ready separator-after">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="password"><KeyIcon/><span><Trans>Copy password</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-set-expiry-date">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="username"><CalendarIcon/><span><Trans>Set expiry date</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-mark-as-expired" className="ready separator-after">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="permalink"><ClockIcon/><span><Trans>Mark as expired</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-edit-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="permalink"><EditIcon/><span><Trans>Edit</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-share-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="permalink"><ShareIcon/><span><Trans>Share</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
    <li key="option-delete0-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <button type="button" className="link no-border" id="permalink"><DeleteIcon /><span><Trans>Delete</Trans></span></button>
          </div>
        </div>
      </div>
    </li>
  </ContextualMenuWrapper>;

export const Default = Template.bind({});
