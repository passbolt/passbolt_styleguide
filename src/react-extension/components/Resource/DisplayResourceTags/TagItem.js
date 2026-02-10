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
 * @since         5.10.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * This component represents a single tag item
 */
class TagItem extends Component {
  /**
   * Handle tag click
   * @param {Event} event
   */
  handleClick = (event) => {
    event.stopPropagation();
    this.props.onClick?.(this.props.tag);
  };

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const { tag, tagRef, className, style } = this.props;
    return (
      <span ref={tagRef} className={className} style={style}>
        <button type="button" className="tag" title={tag.slug} onClick={this.handleClick}>
          <span className="tag-content">{tag.slug}</span>
        </button>
      </span>
    );
  }
}

TagItem.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  tagRef: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default TagItem;
