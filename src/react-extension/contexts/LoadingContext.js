
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
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * The loading context
 */
export const LoadingContext = React.createContext({
  counter: [], // The number of loading processes
  add: () => {}, // Add a loading process
  remove: () => {} // Remove a loading process
});

/**
 * The related context provider
 */
export default class LoadingContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * The component default state
   */
  get defaultState() {
    return {
      counter: 0, // The number of loading processes
      add: () => { this.setState({counter: this.state.counter + 1}); }, // Add a loading process
      remove: () => { this.setState({counter: Math.min(this.state.counter - 1, 0)}); } // Remove a loading process
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <LoadingContext.Provider value={this.state}>
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}

LoadingContextProvider.propTypes = {
  children: PropTypes.any
};


/**
 * Laoding Context Consumer HOC
 * @param WrappedComponent
 */
export function withLoading(WrappedComponent) {
  return class WithLoading extends React.Component {
    render() {
      return (
        <LoadingContext.Consumer>
          {
            loadingContext => <WrappedComponent loadingContext={loadingContext} {...this.props} />
          }
        </LoadingContext.Consumer>
      );
    }
  };
}
