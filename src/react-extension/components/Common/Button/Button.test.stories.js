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
import { Trans } from "react-i18next";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import MoreVerticalSVG from "../../../../img/svg/more_vertical.svg";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import AddSVG from "../../../../img/svg/add.svg";
import SettingSVG from "../../../../img/svg/settings.svg";
import DiceSVG from "../../../../img/svg/dice.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import InfoSVG from "../../../../img/svg/info.svg";
import CopySVG from "../../../../img/svg/copy.svg";
import EditSVG from "../../../../img/svg/edit.svg";
import ShareSVG from "../../../../img/svg/share.svg";
import ColumnsSVG from "../../../../img/svg/columns.svg";
import ArrowLeftSVG from "../../../../img/svg/arrow_left.svg";

export default {
  title: "Foundations/Button",
  component: "Button",
};

export const PrimaryButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Primary Form button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button primary form">
          <Trans>Save</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button primary form" disabled={true}>
          <Trans>Save</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button type="submit" className="button primary form processing" disabled={true}>
          Save
          <SpinnerSVG />
        </button>
      </div>
      <span style={{ width: "100%", marginTop: "3rem" }}>Primary Create button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button primary create">
          <AddSVG />
          <Trans>Create</Trans>
          <CaretDownSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button primary create" disabled={true}>
          <AddSVG />
          <Trans>Create</Trans>
          <CaretDownSVG />
        </button>
      </div>
    </div>
  ),
};

export const WarningButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Danger button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button warning">
          <Trans>Delete</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button warning" disabled={true}>
          <Trans>Delete</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button warning processing" disabled={true}>
          Delete
          <SpinnerSVG />
        </button>
      </div>
    </div>
  ),
};

export const AttentionButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Attention button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button attention">
          <Trans>Proceed</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button attention" disabled={true}>
          <Trans>Proceed</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button attention processing" disabled={true}>
          Proceed
          <SpinnerSVG />
        </button>
      </div>
    </div>
  ),
};

export const SecondaryButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Secondary button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button" type="button">
          <InfoSVG />
          <Trans>Read the documentation</Trans>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button" disabled={true} type="button">
          <InfoSVG />
          <Trans>Read the documentation</Trans>
        </button>
      </div>
    </div>
  ),
};

export const ActionButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Action button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual">
            <CopySVG />
            <Trans>Copy</Trans>
            <CaretDownSVG />
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual" disabled={true}>
            <CopySVG />
            <Trans>Copy</Trans>
            <CaretDownSVG />
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual">
            <EditSVG />
            <Trans>Edit</Trans>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual" disabled={true}>
            <EditSVG />
            <Trans>Edit</Trans>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual">
            <ShareSVG />
            <Trans>Share</Trans>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual" disabled={true}>
            <ShareSVG />
            <Trans>Share</Trans>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual button-action-icon">
            <MoreHorizontalSVG />
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button button-action-contextual button-action-icon" disabled={true}>
            <MoreHorizontalSVG />
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button type="button" className="button">
          <ColumnsSVG />
          <Trans>Columns</Trans>
          <CaretDownSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button type="button" className="button" disabled={true}>
          <ColumnsSVG />
          <Trans>Columns</Trans>
          <CaretDownSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-action button-action-icon info">
          <InfoSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-action button-action-icon info active">
          <InfoSVG />
        </button>
      </div>
    </div>
  ),
};

export const FormButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Form button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-icon">
          <SettingSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-icon" disabled={true}>
          <SettingSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-icon">
          <DiceSVG />
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="button button-icon" disabled={true}>
          <DiceSVG />
        </button>
      </div>
      <span style={{ width: "100%", marginTop: "3rem" }}>Eye in field button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view infield button-transparent">
          <EyeOpenSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view infield button-transparent" disabled={true}>
          <EyeOpenSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view infield button-transparent">
          <EyeCloseSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view infield button-transparent" disabled={true}>
          <EyeCloseSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
    </div>
  ),
};

export const BoxLessButton = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <span style={{ width: "100%" }}>Eye inline button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view inline button-transparent">
          <EyeOpenSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view inline button-transparent" disabled={true}>
          <EyeOpenSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view inline button-transparent">
          <EyeCloseSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <button className="password-view inline button-transparent" disabled={true}>
          <EyeCloseSVG />
          <span className="visually-hidden">view</span>
        </button>
      </div>
      <span style={{ width: "100%", marginTop: "3rem" }}>Close button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="dialog-close button button-transparent" role="button">
            <CloseSVG className="svg-icon close" />
            <span className="visually-hidden">Close</span>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="dialog-close button button-transparent disabled" role="button">
            <CloseSVG className="svg-icon close" />
            <span className="visually-hidden">Close</span>
          </button>
        </div>
      </div>
      <span style={{ width: "100%", marginTop: "3rem" }}>Menu button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button-transparent inline-menu-vertical">
            <MoreVerticalSVG />
            <span className="visually-hidden">More</span>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button-transparent inline-menu-vertical disabled">
            <MoreVerticalSVG />
            <span className="visually-hidden">More</span>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button-transparent inline-menu-horizontal">
            <MoreHorizontalSVG />
            <span className="visually-hidden">More</span>
          </button>
        </div>
      </div>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button-transparent inline-menu-horizontal disabled">
            <MoreHorizontalSVG />
            <span className="visually-hidden">More</span>
          </button>
        </div>
      </div>
      <span style={{ width: "100%", marginTop: "3rem" }}>Back button</span>
      <div style={{ width: "25%", marginTop: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <button className="button-transparent back">
            <ArrowLeftSVG />
          </button>
        </div>
      </div>
    </div>
  ),
};

export const SpinnerButton = {
  render: () => (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button primary form processing" type="button">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button warning processing" type="button">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button attention processing" type="button">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button processing" type="button">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button button-action-contextual processing" type="button">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button disabled className="processing" type="button">
            Submit
            <SpinnerSVG />
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button className="button processing large-spinner" type="submit">
            <SpinnerSVG />
          </button>
        </div>
        <div style={{ width: "25%", marginTop: ".5rem" }}>
          <button disabled className="processing large-spinner" type="submit">
            Submit
            <SpinnerSVG />
          </button>
        </div>
      </div>
    </>
  ),
};
