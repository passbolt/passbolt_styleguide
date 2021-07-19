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
 * @since         3.4.0
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";

/**
 * This component allows the user to log in with his account
 */
class Iframe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mountNode: null
    }
    this.setContentRef = (contentRef) => {
      this.setState({
        mountNode: contentRef?.contentWindow?.document?.body
      })
    }
  }

  render() {
    const { children, ...props } = this.props
    const { mountNode } = this.state
    return (
      <iframe
        {...props}
        ref={this.setContentRef}
      >
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    )
  }
}

export default Iframe;
