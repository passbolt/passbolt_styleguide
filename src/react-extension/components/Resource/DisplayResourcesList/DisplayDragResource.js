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
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class DisplayDragResource extends React.Component {
  /**
   * the resource selected
   * @returns {*}
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * is multiple resources selected
   * @returns {boolean}
   */
  isMultipleSelected() {
    return this.props.resourceWorkspaceContext.selectedResources.length > 1;
  }

  /**
   * has more than three resources selected
   * @returns {boolean}
   */
  hasMoreThanThreeResourcesSelected() {
    return this.props.resourceWorkspaceContext.selectedResources.length > 3;
  }

  /**
   * Get the number of resources
   * @returns {string|*}
   */
  get numberOfResources() {
    return this.props.resourceWorkspaceContext.selectedResources.length > 99 ? '99+' : this.props.resourceWorkspaceContext.selectedResources.length;
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`drag-and-drop ${this.hasMoreThanThreeResourcesSelected() ? "item-n" : `item-${this.numberOfResources}`}`}>
        <span className="message">{this.selectedResources[0].name}</span>
        {this.isMultipleSelected() &&
          <span className="count">
            {this.numberOfResources}
          </span>
        }
      </div>
    );
  }
}

DisplayDragResource.contextType = AppContext;

DisplayDragResource.propTypes = {
  resourceWorkspaceContext: PropTypes.any
};

export default withResourceWorkspace(DisplayDragResource);
