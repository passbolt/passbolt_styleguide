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
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";

class TagItemViewer extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleOnClickTag = this.handleOnClickTag.bind(this);
  }

  /**
   * Handle on click event
   * @param tag
   */
  handleOnClickTag(tag) {
    // filter by the resources by tag
    const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: tag}};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  isLoading() {
    return !this.props.tags;
  }

  getTags() {
    if (!this.isLoading()) {
      return this.props.tags.sort((tagA, tagB) => tagA.slug.localeCompare(tagB.slug));
    }
    return null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isLoading = this.isLoading();

    return (
      <div>
        {isLoading &&
        <div className="processing-wrapper">
          <span className="processing-text">Retrieving tags</span>
        </div>
        }
        {!isLoading && this.props.tags.length === 0 &&
        <em className="empty-content"
          onClick={this.props.toggleInputTagEditor}>There is no tag, click here to add one</em>
        }
        {!isLoading && this.props.tags.length > 0 &&
        <ul className="tags tags-list">
          {this.getTags().map(tag =>
            <li key={tag.id} className="tag-list-item" onClick={() => this.handleOnClickTag(tag)}>
              <a className="tag ellipsis">{tag.slug}</a>
            </li>)
          }
        </ul>
        }
      </div>
    );
  }
}

TagItemViewer.propTypes = {
  tags: PropTypes.array,
  toggleInputTagEditor: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any,
  history: PropTypes.any
};

export default withRouter(withResourceWorkspace(TagItemViewer));
