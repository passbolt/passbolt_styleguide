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
            <a id="username"><span><Trans>Copy username</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-copy-password-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="password"><span><Trans>Copy password</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-copy-uri-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="username"><span><Trans>Copy URI</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-permalink-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="permalink"><span><Trans>Copy permalink</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-open-uri-resource" className="ready separator-after">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="permalink"><span><Trans>Open URI in a new Tab</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-edit-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="edit"><span><Trans>Edit</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-share-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="share" className="disabled"><span><Trans>Share</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
    <li key="option-delete-resource">
      <div className="row">
        <div className="main-cell-wrapper">
          <div className="main-cell">
            <a id="delete"><span><Trans>Delete</Trans></span></a>
          </div>
        </div>
      </div>
    </li>
  </ContextualMenuWrapper>;

export const Default = Template.bind({});
