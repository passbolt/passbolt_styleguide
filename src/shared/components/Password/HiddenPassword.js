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
 * @since         4.1.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

class HiddenPassword extends Component {
  /**
   * Handle click on the previewed password component.
   * @param ev
   */
  handleClick(ev) {
    // Avoid the grid to select the resource while copying a resource secret.
    ev.stopPropagation();
    this.props.onClick();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <button type="button" className="link no-border" onClick={this.handleClick.bind(this)} disabled={!this.props.canClick}>
        <span>
          {this.props.preview &&
            Array.from(this.props.preview).map((char, index) => {
              if (/\p{L}/u.test(char)) {
                return <span key={index}>{char}</span>;
              } else if (/\p{N}/u.test(char)) {
                return <span key={index} className="digit">{char}</span>;
              } else {
                return <span key={index} className="special-char">{char}</span>;
              }
            })
          }
          {!this.props.preview && "Copy password to clipboard"}
        </span>
      </button>
    );
  }
}

HiddenPassword.defaultProps = {
  preview: null,
  canClick: true,
};

HiddenPassword.propTypes = {
  preview: PropTypes.string, // Is the secret previewed.
  canClick: PropTypes.bool, // Can the password be clicked on.
  onClick: PropTypes.func, // On click handler.
};

export default withTranslation("common")(HiddenPassword);
