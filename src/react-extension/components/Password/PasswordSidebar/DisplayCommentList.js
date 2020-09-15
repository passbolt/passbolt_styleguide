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
import AppContext from "../../../contexts/AppContext";
import UserAvatar from "../../../../react/components/Common/Avatar/UserAvatar";
import moment from "moment";


class DisplayCommentList extends React.Component {

    /**
     * Constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    /**
     * Get default state
     * @returns {*}
     */
    getDefaultState() {
        return {
            comments: [], // The list of comments to display
            actions: { // The ongoing action
                loading: false, // A loading action
            }
        }
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
        await this.setState({actions: {loading: true }});

        const resourceId = this.props.resource.id;
        const comments = await this.context.port.request('passbolt.comments.find-all-by-resource', resourceId);

        const commentsSorter = (comment1, comment2) => moment(comment2.created).diff(moment(comment1.created));
        await this.setState({comments: comments.sort(commentsSorter)});

        this.props.onFetch(comments);

        await this.setState({actions: {loading: false }});
    }

    /**
     * Check if the comment list must be refreshed
     * @param previousValue The previous value of the mustRefresh flag
     */
    checkRefresh(previousValue) {
        const mustRefresh = this.props.mustRefresh && !previousValue;
        if (mustRefresh) {
            this.fetch();
        }
    }

    /**
     * Render the component
     * @returns {JSX}
     */
    render() {
        return (
            <>
                { ! this.state.actions.loading &&
                    <ul>
                        {
                            this.state.comments.map((comment, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="comment">

                                        <div className="wrap-right-column">
                                            <div className="right-column">
                                                <p> {comment.content} </p>
                                                <div className="metadata">
                                                    <span className="author username"><a
                                                        href="#">{comment.profile.first_name} {comment.profile.last_name}</a></span>
                                                    <span
                                                        className="modified">{moment(comment.created).fromNow()}</span>
                                                </div>
                                                <div className="actions">
                                                    <ul>
                                                        <li>
                                                            <a className="js_delete_comment" href="#">
                                                      <span className="svg-icon">
                                                          <svg viewBox="0 0 1792 1792"
                                                               xmlns="http://www.w3.org/2000/svg">
                                                              <path
                                                                  d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"/>
                                                          </svg>
                                                      </span>
                                                                <span className="visuallyhidden">delete</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="left-column">
                                            <UserAvatar
                                                user={comment.profile}
                                                baseUrl={this.context.siteSettings.settings.app.url}
                                                className="author profile picture"/>
                                        </div>

                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                { this.state.actions.loading &&
                    <div className="processing-wrapper">
                        <span className="processing-text">Retrieving comments</span>
                    </div>
                }
            </>
        );
    }
}

export default DisplayCommentList;

DisplayCommentList.contextType = AppContext;

DisplayCommentList.propTypes = {
    resource: PropTypes.object, // The resource from which the comments will be provided
    onFetch: PropTypes.func, // Callback when the comments are fetched
    mustRefresh: PropTypes.bool // Flag to force the refresh of the list
}
