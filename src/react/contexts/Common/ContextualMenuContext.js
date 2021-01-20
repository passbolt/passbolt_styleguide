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

/**
 * The contextual menu context
 */
export const ContextualMenuContext = React.createContext({
  ContextualMenu: null, // The current displayed contextual menu
  show: () => {}, // Show a contextual menu
  hide: () => {} // Hide the contextual menu
});

/**
 * The related context provider
 */
export default class ContextualMenuContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      contextualMenus: [],
      show: (ContextualMenuComponent, componentProps) => this.setState({contextualMenus: [...this.state.contextualMenus, {ContextualMenuComponent, componentProps}]}),
      hide: index => this.setState({contextualMenus: this.state.contextualMenus.filter((_, contextualMenuIndex) => contextualMenuIndex !== index)})
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuContext.Provider value={this.state}>
        {this.props.children}
      </ContextualMenuContext.Provider>
    );
  }
}
ContextualMenuContextProvider.displayName = 'ContextualMenuContextProvider';
ContextualMenuContextProvider.propTypes = {
  children: PropTypes.any
};

/**
 * Contextual Menu Context Consumer HOC
 * @param WrappedComponent
 */
export function withContextualMenu(WrappedComponent) {
  return class WithContextualMenu extends React.Component {
    render() {
      return (
        <ContextualMenuContext.Consumer>
          {
            contextualMenuContext => <WrappedComponent contextualMenuContext={contextualMenuContext} {...this.props} />
          }
        </ContextualMenuContext.Consumer>
      );
    }
  };
}
