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

import React from "react";
import PropTypes from "prop-types";

/**
 * The drag and drop context
 */
export const DragContext = React.createContext({
  dragAndDrops: null, // The current component displayed for drag and drop
  dragging: false, // The user dragging or not items
  draggedItems: null, // the dragged items
  onDragStart: () => {}, // on drag start
  onDragEnd: () => {}, // on drag end
});

/**
 * The related context provider
 */
export default class dragContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.elementRef = React.createRef();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      displayDraggedItemsComponent: [],
      dragging: false,
      draggedItems: null,
      onDragStart: this.handleDragStart.bind(this),
      onDragEnd: this.handleDragEnd.bind(this),
    };
  }

  /**
   * Handle drag start
   * @param event
   * @param draggedItemComponent
   * @param draggedItems
   */
  async handleDragStart(event, draggedItemComponent, draggedItems) {
    await this.setState({displayDraggedItemsComponent: [{draggedItemComponent}], dragging: true, draggedItems});
    event.dataTransfer.setDragImage(this.elementRef.current, 10, 10);
  }

  /**
   * Handle drag end
   */
  async handleDragEnd() {
    await this.setState({displayDraggedItemsComponent: [], dragging: false, draggedItems: null});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DragContext.Provider value={this.state}>
        <div className="drag-and-drop-wrapper" ref={this.elementRef}>
          {this.state.displayDraggedItemsComponent.map((displayDraggedItemComponent, index) =>
            <displayDraggedItemComponent.draggedItemComponent
              key={index}/>
          )
          }
        </div>
        {this.props.children}
      </DragContext.Provider>
    );
  }
}

dragContextProvider.displayName = 'dragContextProvider';
dragContextProvider.propTypes = {
  children: PropTypes.any
};

/**
 * Contextual Menu Context Consumer HOC
 * @param WrappedComponent
 */
export function withDrag(WrappedComponent) {
  return class withDrag extends React.Component {
    render() {
      return (
        <DragContext.Consumer>
          {
            dragContext => <WrappedComponent dragContext={dragContext} {...this.props} />
          }
        </DragContext.Consumer>
      );
    }
  };
}
