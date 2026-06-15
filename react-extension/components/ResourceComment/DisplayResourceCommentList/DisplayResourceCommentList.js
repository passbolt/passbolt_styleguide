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
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import DeleteComment from "../DeleteResourceComment/DeleteComment";
import { Trans, withTranslation } from "react-i18next";
import { DateTime } from "luxon";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import { formatDateTimeAgo } from "../../../../shared/utils/dateUtils";
import { isUserSuspended } from "../../../../shared/utils/userUtils";
import CommentsServiceWorkerService from "../CommentsServiceWorkerService";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";

class DisplayResourceCommentList extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.commentsServiceWorkerService = new CommentsServiceWorkerService(props.context.port);
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      comments: [], // The list of comments to display
      actions: {
        // The ongoing action
        loading: false, // A loading action
      },
    };
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    await this.fetch();
  }

  /**
   * Whenever the component props or state change
   * @param prevProps Previous props value
   */
  componentDidUpdate(prevProps) {
    this.checkRefresh(prevProps.mustRefresh);
  }

  /**
   * Fetch the comments of the resource
   */
  async fetch() {
    try {
      this.setState({ actions: { loading: true } });

      const resourceId = this.props.resource.id;
      const comments = await this.commentsServiceWorkerService.findAllByResource(resourceId);

      const commentsSorter = (comment1, comment2) =>
        DateTime.fromISO(comment2.created) < DateTime.fromISO(comment1.created) ? -1 : 1;
      this.setState({ comments: comments.sort(commentsSorter) });

      this.props.onFetch(comments);

      this.setState({ actions: { loading: false } });
    } catch (error) {
      console.error(error);
      await this.props.actionFeedbackContext.displayError(error.message);
      this.setState({ actions: { loading: false } });
    }
  }

  /**
   * Check if the comment list must be refreshed
   * @param previousValue The previous props value of the mustRefresh flag
   */
  checkRefresh(previousValue) {
    // Either refresh comes from parent or from the application context
    const mustRefresh = (this.props.mustRefresh && !previousValue) || this.props.context.mustRefreshComments;
    if (mustRefresh) {
      this.fetch();
    }

    if (this.props.context.mustRefreshComments) {
      this.props.context.setContext({ mustRefreshComments: false });
    }
  }

  /**
   * Returns true if the givne comment can be deleted
   * @param comment A comment
   */
  canDeleteComment(comment) {
    return this.isOwner(comment);
  }

  /**
   * Returns true if the the comment owner is the current logged in user
   * @param comment A comment
   */
  isOwner(comment) {
    const isOwner = this.props.context.loggedInUser.id === comment.created_by;
    return isOwner;
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @param {object} user
   * @returns {boolean}
   */
  isUserSuspended(user) {
    return this.props.context.siteSettings.canIUse("disableUser") && isUserSuspended(user);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {!this.state.actions.loading && (
          <>
            {this.state.comments.map((comment, index) => (
              <div
                key={index}
                className={`comment ${this.isUserSuspended(comment.creator) ? "from-suspended-user" : ""}`}
              >
                <div className="left-column">
                  <UserAvatar
                    user={comment.creator}
                    baseUrl={this.props.context.siteSettings.settings.app.url}
                    className="author profile picture avatar"
                  />
                </div>
                <div className="right-column">
                  <p> {comment.content} </p>
                  <div className="metadata">
                    {this.isOwner(comment) && (
                      <span className="author username">
                        <Trans>You</Trans>
                      </span>
                    )}
                    {!this.isOwner(comment) && (
                      <span className="author username">
                        {comment.creator.profile.first_name} {comment.creator.profile.last_name}
                        {this.isUserSuspended(comment.creator) && (
                          <span className="suspended">
                            {" "}
                            <Trans>(suspended)</Trans>
                          </span>
                        )}
                      </span>
                    )}
                    <span className="modified" title={comment.created}>
                      {formatDateTimeAgo(comment.created, this.props.t, this.props.context.locale)}
                    </span>
                    {this.canDeleteComment(comment) && (
                      <div className="actions">
                        <DeleteComment commentId={comment.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {this.state.actions.loading && (
          <div className="processing-wrapper">
            <SpinnerSVG />
            <span className="processing-text">
              <Trans>Retrieving comments</Trans>
            </span>
          </div>
        )}
      </>
    );
  }
}

export default withAppContext(withActionFeedback(withTranslation("common")(DisplayResourceCommentList)));

DisplayResourceCommentList.propTypes = {
  context: PropTypes.any, // The application context
  resource: PropTypes.object, // The resource from which the comments will be provided
  onFetch: PropTypes.func, // Callback when the comments are fetched
  mustRefresh: PropTypes.bool, // Flag to force the refresh of the list
  t: PropTypes.func, // The translation function
  actionFeedbackContext: PropTypes.object,
};
