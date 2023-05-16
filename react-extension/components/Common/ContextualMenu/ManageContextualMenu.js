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
 * @since         3.0.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";

/**
 * This component acts as an anchor for the different project contextual menus.
 */
class ManageContextualMenu extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.createRefs();
    this.bindCallback();
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleHide = this.handleHide.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.elementRef = React.createRef();
  }

  /**
   * Hide the contextual menu
   * @param {int} index The contextual menu to close
   */
  handleHide(index) {
    this.props.contextualMenuContext.hide(index);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div ref={this.elementRef}>
        {
          this.props.contextualMenuContext.contextualMenus.map((contextualMenu, index) =>
            <contextualMenu.ContextualMenuComponent
              key={index}
              hide={() => this.handleHide(index)}
              {...contextualMenu.componentProps} />
          )
        }
      </div>
    );
  }
}

ManageContextualMenu.propTypes = {
  contextualMenuContext: PropTypes.any // The contextual menu context
};

export default withContextualMenu(ManageContextualMenu);
