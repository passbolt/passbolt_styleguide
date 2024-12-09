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
 * @since         5.0.0
 */
import React from "react";
import DropdownButton from "./DropdownButton";
import DropdownItem from "./DropdownItem";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import TablePropertySVG from "../../../../img/svg/table_properties.svg";
import CircleEllipsisSVG from "../../../../img/svg/circle_ellipsis.svg";
import FolderSVG from "../../../../img/svg/folder.svg";
import UploadFileSVG from "../../../../img/svg/upload_file.svg";
import NotesSVG from "../../../../img/svg/notes.svg";
import FileSVG from "../../../../img/svg/file.svg";
import WalletSVG from "../../../../img/svg/wallet.svg";
import TerminalSVG from "../../../../img/svg/terminal.svg";
import PinSVG from "../../../../img/svg/pin.svg";
import KeySquareSVG from "../../../../img/svg/key_square.svg";
import ShieldCheckSVG from "../../../../img/svg/shield_check.svg";
import DownloadFileSVG from "../../../../img/svg/download_file.svg";
import ArrowBigUpDashSVG from "../../../../img/svg/arrow_big_up_dash.svg";
import ArrowBigDownDashSVG from "../../../../img/svg/arrow_big_down_dash.svg";
import CalendarCogSVG from "../../../../img/svg/calendar_cog.svg";
import AlarmClockSVG from "../../../../img/svg/alarm_clock.svg";
import ColumnsSVG from "../../../../img/svg/columns.svg";
import FilterSVG from "../../../../img/svg/filter.svg";
import FavoriteSVG from "../../../../img/svg/favorite.svg";
import ShareSVG from "../../../../img/svg/share.svg";
import VenetianMaskSVG from "../../../../img/svg/venetian_mask.svg";
import CalendarClockSVG from "../../../../img/svg/calendar_clock.svg";
import CopySVG from "../../../../img/svg/copy.svg";
import OwnedByMeSVG from "../../../../img/svg/owned_by_me.svg";
import GlobeSVG from "../../../../img/svg/globe.svg";
import LinkSVG from "../../../../img/svg/link.svg";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";
import RevertSVG from "../../../../img/svg/revert.svg";
import {Trans} from "react-i18next";

export default {
  title: 'Foundations/DropdownButton',
  component: "DropdownButton"
};

const createContent = <>
  <AddSVG/>
  <Trans>Create</Trans>
  <CaretDownSVG/>
</>;

export const DropdownCreate = {
  render: () =>
    <DropdownButton className="create primary" content={createContent}>
      <DropdownItem>
        <button type="button" className="no-border">
          <KeySVG/>
          <span><Trans>Password</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TotpSVG/>
          <span><Trans>TOTP</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TablePropertySVG/>
          <span><Trans>Key</Trans>/<Trans>Value</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem separator={true}>
        <button type="button" className="no-border">
          <CircleEllipsisSVG/>
          <span><Trans>Other</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem separator={true}>
        <button type="button" className="no-border">
          <FolderSVG/>
          <span><Trans>Folder</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <UploadFileSVG/>
          <span><Trans>Import resources</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};

const addSecretContent = <>
  <AddSVG/>
  <Trans>Add secret</Trans>
  <CaretDownSVG/>
</>;

export const DropdownAddSecret = {
  render: () =>
    <DropdownButton content={addSecretContent}>
      <DropdownItem>
        <button type="button" className="no-border">
          <KeySVG/>
          <span><Trans>Password</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TotpSVG/>
          <span><Trans>TOTP</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <NotesSVG/>
          <span><Trans>Note</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <FileSVG/>
          <span><Trans>Files</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <WalletSVG/>
          <span><Trans>Credit card</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TablePropertySVG/>
          <span><Trans>Key</Trans>/<Trans>Value</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TerminalSVG/>
          <span><Trans>SSH key</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <PinSVG/>
          <span><Trans>Pin code</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <KeySquareSVG/>
          <span><Trans>Passkey</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <ShieldCheckSVG/>
          <span><Trans>Certificate</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};

const moreContent = <MoreHorizontalSVG/>;

export const DropdownMore = {
  render: () =>
    <DropdownButton direction="right" className="button-action-contextual button-action-icon" content={moreContent}>
      <DropdownItem separator={true}>
        <button type="button" className="no-border">
          <DownloadFileSVG/>
          <span><Trans>Export</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <ArrowBigUpDashSVG/>
          <span><Trans>Upgrade resources</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem separator={true}>
        <button type="button" className="no-border">
          <ArrowBigDownDashSVG/>
          <span><Trans>Downgrade resources</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <CalendarCogSVG/>
          <span><Trans>Set expiry date</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <AlarmClockSVG/>
          <span><Trans>Mark as expired</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};

const columnsContent = <>
  <ColumnsSVG/>
  <Trans>Columns</Trans>
  <CaretDownSVG/>
</>;

export const DropdownColumns = {
  decorators: [
    Story => (
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Story/>
      </div>
    ),
  ],
  render: () =>
    <DropdownButton direction="left" content={columnsContent}>
      <DropdownItem keepOpenOnClick={true}>
        <div className="radiolist">
          <div className="input radio">
            <input type="radio" defaultChecked={true} id="radio-1" name="visual"/>
            <label htmlFor="radio-1"><Trans>Compact</Trans></label>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true} separator={true}>
        <div className="radiolist">
          <div className="input radio">
            <input type="radio" defaultChecked={false} id="radio-2" name="visual"/>
            <label htmlFor="radio-2" ><Trans>Comfortable</Trans></label>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-1" name="checkbox"/>
          <label htmlFor="checkbox-1"><Trans>Select box</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={false} id="checkbox-2" name="checkbox"/>
          <label htmlFor="checkbox-2"><Trans>Favourite</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-3" name="checkbox"/>
          <label htmlFor="checkbox-3"><Trans>Username</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-4" name="checkbox"/>
          <label htmlFor="checkbox-4"><Trans>Password</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={false} id="checkbox-5" name="checkbox"/>
          <label htmlFor="checkbox-5"><Trans>TOTP</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-6" name="checkbox"/>
          <label htmlFor="checkbox-6"><Trans>URI</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true} separator={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-7" name="checkbox"/>
          <label htmlFor="checkbox-7"><Trans>Expiry</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={true} id="checkbox-8" name="checkbox"/>
          <label htmlFor="checkbox-8"><Trans>Modified</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem keepOpenOnClick={true} separator={true}>
        <div className="input checkbox">
          <input type="checkbox" defaultChecked={false} id="checkbox-9" name="checkbox"/>
          <label htmlFor="checkbox-9"><Trans>Location</Trans></label>
        </div>
      </DropdownItem>
      <DropdownItem>
        <button type="button" style={{margin: ".8rem 1.6rem .4rem 1.6rem"}}>
          <RevertSVG/>
          <span><Trans>Reset columns</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};


const FilterContent = <>
  <FilterSVG/>
  <Trans>All items</Trans>
  <CaretDownSVG/>
</>;

export const DropdownFilter = {
  render: () =>
    <DropdownButton direction="right" content={FilterContent}>
      <DropdownItem>
        <button type="button" className="no-border">
          <FavoriteSVG/>
          <span><Trans>Starred</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <ShareSVG/>
          <span><Trans>Shared with me</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <VenetianMaskSVG/>
          <span><Trans>Private</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <CalendarClockSVG/>
          <span><Trans>Expired</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};

const CopyContent = <>
  <CopySVG/>
  <Trans>Copy</Trans>
  <CaretDownSVG/>
</>;

export const DropdownCopy = {
  render: () =>
    <DropdownButton direction="right" className="button-action-contextual" content={CopyContent}>
      <DropdownItem>
        <button type="button" className="no-border">
          <OwnedByMeSVG/>
          <span><Trans>Copy username</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <KeySVG/>
          <span><Trans>Copy password</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <TotpSVG/>
          <span><Trans>Copy TOTP</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <NotesSVG/>
          <span><Trans>Copy note</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <WalletSVG/>
          <span><Trans>Copy card number</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <WalletSVG/>
          <span><Trans>Copy card name</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <WalletSVG/>
          <span><Trans>Copy card expiration</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <WalletSVG/>
          <span><Trans>Copy CVC code</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <GlobeSVG/>
          <span><Trans>Copy URI</Trans></span>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" className="no-border">
          <LinkSVG/>
          <span><Trans>Copy permalink</Trans></span>
        </button>
      </DropdownItem>
    </DropdownButton>
};