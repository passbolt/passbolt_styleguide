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
import React from "react";
import PropTypes from "prop-types";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import TagItem from "./TagItem";

class DisplayResourceTagsBadge extends React.Component {
  /**
   * Get the tooltip content with the list of hidden tags
   * @returns {JSX.Element}
   */
  get tagsListTooltip() {
    return (
      <div className="tags-list">
        {this.props.hiddenTags.map((tag) => (
          <TagItem onClick={this.props.onTagClick} key={tag.id} tag={tag} className="tag-list-item" />
        ))}
      </div>
    );
  }

  /**
   * Get the badge count to display
   * @returns {string}
   */
  get badgeCount() {
    const count = this.props.hiddenTags.length;
    if (count > 99) {
      return "99+";
    }
    return `+${count}`;
  }

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    if (!this.props.hiddenTags?.length) {
      return null;
    }

    return (
      <span className="badge">
        <TooltipPortal direction="bottom" message={this.tagsListTooltip} className="additional-tags">
          <span className="count">{this.badgeCount}</span>
        </TooltipPortal>
      </span>
    );
  }
}

DisplayResourceTagsBadge.propTypes = {
  hiddenTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ),
  onTagClick: PropTypes.func,
};

export default DisplayResourceTagsBadge;
