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
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {

    return (
        <div>
          {!this.props.tags &&
          <em className="empty-content"
              onClick={this.props.displayInputTagEditor}>There is no tag, click edit to add one</em>
          }
          {this.props.tags &&
          <ul className="tags tags-list">
            {this.props.tags.map((tag, index) =>
              <li key={index}>
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
  tags: PropTypes.array
};

export default TagItemViewer;