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
 * @since         4.9.0
 */
import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import FolderSVG from "../../../img/svg/folder.svg";
import ShareFolderSVG from "../../../img/svg/share_folder.svg";
import TooltipPortal from "../../../react-extension/components/Common/Tooltip/TooltipPortal";
import CabinetSVG from "../../../img/svg/cabinet.svg";

/**
 * This component represents a table cell location
 */
class CellLocation extends Component {
  /**
   * Handle click
   * @param event
   * @param {string | null} id The folder id
   */
  handleClick(event, id) {
    event.stopPropagation();
    this.props.onClick(id);
  }

  /**
   * Get the value
   * @return {Object}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Get the last folder
   * @returns {*}
   */
  get lastFolder() {
    return this.value[this.value.length - 1];
  }

  /**
   * Get the tooltip hierarchy folder message
   */
  get tooltipHierarchyFolder() {
    return this.value.map((folder, index) =>
      <div key={folder.id} className="folder-level" style={{marginLeft: `${5 * index}px`}}>
        {folder.folder_parent_id !== null &&
          <span className="caret">›</span>
        }
        <span>{folder.name}</span>
      </div>
    );
  }

  /**
   * Render the component
   * @return {React.JSX.Element|null}
   */
  render() {
    if (this.value === null) {
      return null;
    }
    // return empty array if a resource have no folder parent
    if (this.value.length === 0) {
      return (
        <TooltipPortal message={<span>{this.props.t("My workspace")}</span>} direction="auto">
          <button className="no-border" type="button" onClick={event => this.handleClick(event, null)}>
            <CabinetSVG />
            <span>{this.props.t("My workspace")}</span>
          </button>
        </TooltipPortal>
      );
    }
    return (
      <TooltipPortal message={this.tooltipHierarchyFolder} direction="auto">
        <button className="no-border" type="button" onClick={event => this.handleClick(event, this.lastFolder.id)}>
          {!this.lastFolder.personal &&
            <ShareFolderSVG/>
          }
          {this.lastFolder.personal &&
            <FolderSVG/>
          }
          {this.value.map(folder =>
            <Fragment key={folder.id}>
              {folder.folder_parent_id !== null &&
                <span className="caret">›</span>
              }
              <span>{folder.name}</span>
            </Fragment>
          )}
        </button>
      </TooltipPortal>
    );
  }
}

CellLocation.propTypes = {
  value: PropTypes.array, // The value to display
  onClick: PropTypes.func, // The onClick event function
  t: PropTypes.func, // the translation function
};

export default CellLocation;
