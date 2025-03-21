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
 * @since         5.0.0
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * This component represents a Card item
 */
class CardItem extends React.PureComponent {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <button type="button" className="button-transparent card" onClick={this.props.onClick}>
        {this.props.icon}
        <div className="card-information">
          <span className="title">{this.props.title}</span>
          {this.props.description &&
            <span className="info">{this.props.description}</span>
          }
        </div>
      </button>
    );
  }
}

CardItem.propTypes = {
  icon: PropTypes.object.isRequired, // the icon to be displayed
  title: PropTypes.string.isRequired, // the main title of the card
  description: PropTypes.string, // the description or subtitle of the card
  onClick: PropTypes.func, // the callback to run when clicking the card
};

export default CardItem;
