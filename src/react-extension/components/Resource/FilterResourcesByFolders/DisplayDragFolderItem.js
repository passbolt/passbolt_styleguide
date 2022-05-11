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
 * @since         3.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import AppContext, {withAppContext} from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withDrag} from "../../../contexts/DragContext";

class DisplayDragFolderItem extends React.Component {
  /**
   * Check if the user is currently dragging content.
   * @returns {number}
   */
  isDragging() {
    return this.props.dragContext.dragging;
  }

  /**
   * return dragged items
   * @returns {*}
   */
  get draggedItems() {
    return this.props.dragContext.draggedItems;
  }

  /**
   * Check if the user can drag all the items they are currently dragging.
   * @param {array} draggedItems The list of dragged items.
   * @returns {boolean}
   */
  canDragItems(draggedItems) {
    const draggedFolders = draggedItems.folders;
    let canDragItems = draggedFolders.reduce((accumulator, folder) => accumulator && this.canDragItem(folder), true);

    const draggedResources = draggedItems.resources;
    canDragItems = canDragItems && draggedResources.reduce((accumulator, folder) => accumulator && this.canDragItem(folder), true);

    return canDragItems;
  }

  /**
   * Check if the user can drag an item.
   * @param {object} item The target item
   */
  canDragItem(item) {
    // The user can always drag an element located at their root.
    if (item.folder_parent_id === null) {
      return true;
    }

    const folderParent = this.props.context.folders.find(folder => folder.id === item.folder_parent_id);

    // The user can always drag content from a personal folder.
    if (folderParent.personal) {
      return true;
    }

    // The user cannot drag an element if the parent folder is in READ.
    if (folderParent.permission.type < 7) {
      return false;
    }

    // The user cannot move folder in READ ONLY from a shared folder.
    if (item.permission.type < 7) {
      return false;
    }

    return true;
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const canDrag = this.canDragItems(this.draggedItems);
    const dragFeedbackText = canDrag ? this.draggedItems.folders[0].name : "You are not allowed to move this content";
    return (
      <div className="drag-and-drop item-1">
        {!canDrag &&
        <Icon name="ban"/>
        }
        <span className={`message ${!canDrag ? "not-allowed" : ""}`}>{dragFeedbackText}</span>
        <span className="count">1</span>
      </div>
    );
  }
}

DisplayDragFolderItem.contextType = AppContext;

DisplayDragFolderItem.propTypes = {
  context: PropTypes.any, // The app context
  resourceWorkspaceContext: PropTypes.any,
  dragContext: PropTypes.any,
};

export default withAppContext(withResourceWorkspace(withDrag(DisplayDragFolderItem)));
