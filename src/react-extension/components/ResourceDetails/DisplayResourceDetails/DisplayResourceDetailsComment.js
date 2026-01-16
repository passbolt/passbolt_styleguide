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
 * @since         2.13.0
 */

import React from "react";
import AddResourceComment from "../../ResourceComment/AddResourceComment/AddResourceComment";
import PropTypes from "prop-types";
import DisplayResourceCommentList from "../../ResourceComment/DisplayResourceCommentList/DisplayResourceCommentList";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import ReplySVG from "../../../../img/svg/reply.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class DisplayResourceDetailsComment extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: false, // Flag to determine the expand / collapse of the section
      comments: [], // The resource comments
      canAdd: false, // Flag to determine the display of the "Add Comment" area,
      canAddByIcon: false, // Flag to determine the display of the "Add Icons"
      mustRefresh: false, // Flag to determine if the comment list must be refreshed
    };
  }

  /**
   * Whenever the component props or state change
   * @param prevProps Previous props value
   */
  componentDidUpdate(prevProps) {
    this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickedEvent = this.handleTitleClickedEvent.bind(this);
    this.handleAddedEvent = this.handleAddedEvent.bind(this);
    this.handleCancelledAddEvent = this.handleCancelledAddEvent.bind(this);
    this.handleRequestedAddEvent = this.handleRequestedAddEvent.bind(this);
    this.handleFetchedEvent = this.handleFetchedEvent.bind(this);
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  async handleResourceChange(previousResource) {
    // do nothing if the section is closed.
    if (!this.state.open) {
      return;
    }
    // do nothing if the resource doesn't change.
    if (this.resource.id === previousResource.id) {
      return;
    }

    await this.setState({ mustRefresh: true });
  }

  /**
   * Whenever the user clicks on the section title
   */
  async handleTitleClickedEvent() {
    const open = !this.state.open;
    this.setState({ open });
  }

  /**
   * Whenever the user added a new comment
   * @returns {Promise<void>}
   */
  async handleAddedEvent() {
    await this.setState({ mustRefresh: true, canAdd: false, canAddByIcon: true });
  }

  /**
   * Whenever the user cancelled the adding of new comment
   */
  async handleCancelledAddEvent() {
    await this.setState({ canAdd: false });
  }

  /**
   * Whenever the user requested to add a new comment ( call-to-action )
   */
  async handleRequestedAddEvent() {
    await this.setState({ canAdd: true });
  }

  /**
   * Whenever the comments to display has been fetched
   * @param comments The fetched comments
   */

  async handleFetchedEvent(comments) {
    const hasComments = comments && comments.length > 0;
    await this.setState({ mustRefresh: false, canAdd: !hasComments, canAddByIcon: hasComments });
  }

  /**
   * Get the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Must show add delete button
   * @returns {boolean}
   */
  get mustShowAddComment() {
    return this.state.canAddByIcon && !this.state.canAdd;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`detailed-comments accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickedEvent}>
              <span className="accordion-title">
                <Trans>Comments</Trans>
              </span>
              {this.state.open && <CaretDownSVG />}
              {!this.state.open && <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {this.state.open && (
          <div className="accordion-content">
            {this.mustShowAddComment && (
              <div className="add-comments">
                <button type="button" className="section-action" onClick={this.handleRequestedAddEvent}>
                  <ReplySVG />
                  <Trans>Add comment</Trans>
                </button>
              </div>
            )}
            {this.state.canAdd && (
              <AddResourceComment
                resource={this.resource}
                onAdd={this.handleAddedEvent}
                onCancel={this.handleCancelledAddEvent}
                cancellable={this.state.canAddByIcon}
              />
            )}
            <DisplayResourceCommentList
              resource={this.resource}
              onFetch={this.handleFetchedEvent}
              mustRefresh={this.state.mustRefresh}
            />
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsComment.propTypes = {
  resourceWorkspaceContext: PropTypes.any, // The resource context
};

export default withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsComment));
