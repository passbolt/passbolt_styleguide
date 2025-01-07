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
import {Trans, withTranslation} from "react-i18next";
import SpinnerSVG from "../../../../img/svg/spinner.svg";

class EditResourceTagsItemViewer extends React.Component {
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
   * @param event
   * @param tag
   */
  handleOnClickTag(event, tag) {
    event.stopPropagation();
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
      <div className="tags-list">
        {isLoading &&
        <div className="processing-wrapper">
          <SpinnerSVG/>
          <span className="processing-text"><Trans>Retrieving tags</Trans></span>
        </div>
        }
        {!isLoading && this.props.tags.length === 0 &&
        <span className="empty-content"><Trans>There is no tag.</Trans></span>
        }
        {!isLoading && this.props.tags.length > 0 &&
          this.getTags().map(tag =>
            <div key={tag.id} className="tag-list-item">
              <button type="button" onClick={event => this.handleOnClickTag(event, tag)} className="tag">
                <span className="tag-content ellipsis">
                  {tag.slug}
                </span>
              </button>
            </div>)
        }
      </div>
    );
  }
}

EditResourceTagsItemViewer.propTypes = {
  tags: PropTypes.array,
  resourceWorkspaceContext: PropTypes.any,
  history: PropTypes.any,
};

export default withRouter(withResourceWorkspace(withTranslation("common")(EditResourceTagsItemViewer)));
