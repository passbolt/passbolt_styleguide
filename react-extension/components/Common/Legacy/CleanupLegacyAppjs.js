/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        3.0.0
 */
import React, {Component} from "react";

class CleanupLegacyAppjs extends Component {
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.removeLegacyComponent();
  }

  /**
   * Remove legacy content.
   */
  removeLegacyComponent() {
    // Remove the scripts
    const scriptElements = document.getElementsByTagName('script');
    if (scriptElements && scriptElements.length) {
      while (scriptElements.length > 0) {
        scriptElements[0].remove();
      }
    }
    // Remove the bus div
    const busElement = document.getElementById('bus');
    if (busElement) {
      busElement.remove();
    }
    // Remove the footer
    const footerElements = document.getElementsByTagName('footer');
    if (footerElements && footerElements.length) {
      footerElements[0].remove();
    }
    // We don't remove the #container div as it contains the splash screen.
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <></>
    );
  }
}

export default CleanupLegacyAppjs;
