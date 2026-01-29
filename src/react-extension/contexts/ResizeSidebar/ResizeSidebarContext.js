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
 * @since         5.6.0
 */

import React from "react";
import PropTypes from "prop-types";

export const ResizableSidebarContext = React.createContext({
  containerRef: null,
  left: { width: 0 },
  right: { width: 0 },
  setSidebarWidth: () => {},
});

export class ResizableSidebarContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.createRef();
    this.setSidebarWidth = this.setSidebarWidth.bind(this);
    this.state = this.defaultState();
  }

  /**
   * Create DOM node or React element reference in order to be able to access them programmatically.
   */
  createRef() {
    this.containerRef = React.createRef();
  }

  /**
   * Returns the default component state
   */
  defaultState() {
    return {
      left: { width: 0 },
      right: { width: 0 },
    };
  }

  /**
   * Set the respective sidebar width
   * @param {string} side The 'left' or 'right' sidebar
   * @param {number} width The width of the sidebar.
   */
  setSidebarWidth(side, width) {
    this.setState(() => ({
      [side]: { width },
    }));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const contextValue = {
      containerRef: this.containerRef,
      left: this.state.left,
      right: this.state.right,
      setSidebarWidth: this.setSidebarWidth,
    };

    return (
      <ResizableSidebarContext.Provider value={contextValue}>
        <div ref={this.containerRef} className="resizable-sidebar-container">
          {this.props.children}
        </div>
      </ResizableSidebarContext.Provider>
    );
  }
}

ResizableSidebarContextProvider.propTypes = {
  children: PropTypes.any, // The children component
};

ResizableSidebarContextProvider.displayName = "ResizableSidebarContextProvider";
/**
 * Resizebar Context Consumer HOC
 * @param WrappedComponent
 */
export function withResizableSidebar(WrappedComponent) {
  return class WithResizableSidebar extends React.Component {
    render() {
      return (
        <ResizableSidebarContext.Consumer>
          {(context) => <WrappedComponent {...this.props} sidebarContext={context} />}
        </ResizableSidebarContext.Consumer>
      );
    }
  };
}
