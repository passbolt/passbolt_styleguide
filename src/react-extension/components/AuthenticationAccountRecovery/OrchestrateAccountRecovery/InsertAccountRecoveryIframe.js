/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";

class InsertAccountRecoveryIframe extends Component {
  constructor(props) {
    super(props);
    this.createRefs();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.loadIframe();
  }

  /**
   * Create the iframe reference
   */
  createRefs() {
    this.iframeRef = React.createRef();
  }

  /**
   * Load the react app iframe
   * @returns {void}
   */
  loadIframe() {
    const iframeUrl = `${this.props.browserExtensionUrl}data/passbolt-iframe-account-recovery.html?passbolt=passbolt-iframe-account-recovery`;
    this.iframeRef.current.contentWindow.location = iframeUrl;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <iframe id="passbolt-iframe-account-recovery" ref={this.iframeRef} className="full-screen"/>
    );
  }
}

InsertAccountRecoveryIframe.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
};

export default InsertAccountRecoveryIframe;
