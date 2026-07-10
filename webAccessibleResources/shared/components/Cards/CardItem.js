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
import FrameSVG from "../../../img/svg/Frame.svg";

/**
 * This component represents a Card item
 */
class CardItem extends React.PureComponent {
  /**
   * Returns the pill to display on the card if any
   * @returns {JSX}
   */
  get pill() {
    if (this.props.isBeta) {
      return <span className="chips beta">beta</span>;
    }
    if (this.props.isNew) {
      return <span className="chips new">new</span>;
    }
    return <></>;
  }

  /**
   * Returns true if the card must display a pill
   * @returns {boolean}
   */
  get hasAPill() {
    return Boolean(this.props.isBeta || this.props.isNew);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <button type="button" className="button-transparent card" onClick={this.props.onClick}>
        {this.props.icon}
        <div className="card-information">
          <span className={`title-wrapper ${this.hasAPill && "with-pill"}`}>
            <span className="title" title={this.props.title}>
              {this.props.title}
              {this.pill}
            </span>
            {this.props.proTeasing && <FrameSVG />}
          </span>
          {this.props.description && (
            <span className="info" title={this.props.description}>
              {this.props.description}
            </span>
          )}
        </div>
      </button>
    );
  }
}

CardItem.defaultProps = {
  isBeta: false,
  proTeasing: false,
};

CardItem.propTypes = {
  icon: PropTypes.object.isRequired, // the icon to be displayed
  title: PropTypes.string.isRequired, // the main title of the card
  description: PropTypes.string, // the description or subtitle of the card
  isBeta: PropTypes.bool.isRequired, // should the card display a "beta" pill
  isNew: PropTypes.bool, /// should the card display a "new" pill
  onClick: PropTypes.func, // the callback to run when clicking the card
  proTeasing: PropTypes.bool.isRequired,
};

export default CardItem;
