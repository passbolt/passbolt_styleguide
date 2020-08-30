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

class TagItemViewer extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const hasTags = this.props.tags && this.props.tags.length > 0;

    return (
      <div>
        {!hasTags &&
        <em className="empty-content"
          onClick={this.props.toggleInputTagEditor}>There is no tag, click here to add one</em>
        }
        {hasTags &&
        <ul className="tags tags-list">
          {this.props.tags.map(tag =>
            <li key={tag.id}>
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
  toggleInputTagEditor: PropTypes.func
};

export default TagItemViewer;
