/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import Icon from "../Icons/Icon";
import CellHeaderDefault from "./CellHeaderDefault";
import {withTable} from "./Context/TableContext";
import ColumnModel from "../../models/column/ColumnModel";

/**
 * This component represents a table cell header wrapper
 */
class CellHeaderWrapper extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      mouseXPosition: 0,
      move: 0,
      columnToResizeWidth: 0,
      resizing: false
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
    this.handleReorderColumnMouseMoveEvent = this.handleReorderColumnMouseMoveEvent.bind(this);
    this.handleReorderColumnMouseUpEvent = this.handleReorderColumnMouseUpEvent.bind(this);
    this.handleResizeColumnMouseDown = this.handleResizeColumnMouseDown.bind(this);
    this.handleResizeColumnMouseMoveEvent = this.handleResizeColumnMouseMoveEvent.bind(this);
    this.handleResizeColumnMouseUpEvent = this.handleResizeColumnMouseUpEvent.bind(this);
    this.handleResizeDefaultByColumnDoubleClick = this.handleResizeDefaultByColumnDoubleClick.bind(this);
    this.startDragging = this.startDragging.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.columnRef = React.createRef();
  }

  /**
   * Handle the drag start on the column
   * @param event The DOM event
   * @returns {Promise<void>}
   */
  handleReorderColumnMouseDownEvent(event) {
    // Get the current mouse position
    const mouseXPosition = event.clientX;
    this.setState({mouseXPosition});
    // Get width of the previous and next column
    this.updatePreviousAndNextColumnWidth(this.columnRef.current.previousSibling?.offsetWidth, this.columnRef.current.nextSibling?.offsetWidth);
    // Add listener to handle the first move
    this.columnRef.current.addEventListener('mousemove', this.startDragging, {once: true});
    // Add listener to handle mouse move event on document
    document.addEventListener('mousemove', this.handleReorderColumnMouseMoveEvent, {capture: true});
    document.addEventListener('mouseup', this.handleReorderColumnMouseUpEvent, {capture: true, once: true});
  }

  /**
   * Start dragging
   */
  startDragging() {
    // Call props to inform the column is dragging
    this.props.tableContext.onStartDraggingColumn();
  }

  /**
   * Handle the reorder column mouse move event
   * @param event The DOM event
   */
  handleReorderColumnMouseMoveEvent(event) {
    // Determine how far the mouse has been moved and the move from the beginning
    const dx = event.clientX - this.state.mouseXPosition - this.state.move;
    // Check if the column can move
    const canMoveColumn = this.props.tableContext.canMoveColumn(this.props.index, dx);
    if (canMoveColumn) {
      this.columnRef.current.style.translate = `${dx}px`;
      if (this.previousColumnWidth && dx < - this.previousColumnWidth / 2) {
        // Move the column to the previous position
        this.props.tableContext.onReorderColumns(this.props.index, this.props.index - 1);
        this.updateColumnPosition(-this.previousColumnWidth, dx);
        this.updatePreviousAndNextColumnWidth(this.columnRef.current.previousSibling?.offsetWidth, this.previousColumnWidth);
      } else if (this.nextColumnWidth && dx > this.nextColumnWidth / 2) {
        // Move the column to the next position
        this.props.tableContext.onReorderColumns(this.props.index, this.props.index + 1);
        this.updateColumnPosition(this.nextColumnWidth, dx);
        this.updatePreviousAndNextColumnWidth(this.nextColumnWidth, this.columnRef.current.nextSibling?.offsetWidth);
      }
    } else {
      // The column can not be moved
      this.columnRef.current.style.translate = "0px";
    }
  }

  /**
   * Handle the reorder column mouse up event
   */
  handleReorderColumnMouseUpEvent() {
    // Reset all value to null
    this.columnRef.current.style.translate = null;
    this.updatePreviousAndNextColumnWidth(null, null);
    // Remove listener on mouse move
    this.columnRef.current.removeEventListener('mousemove', this.startDragging);
    document.removeEventListener('mousemove', this.handleReorderColumnMouseMoveEvent, {capture: true});
    // Call props to inform of the column is not dragging anymore
    this.props.tableContext.onEndDraggingColumn();
    this.setState({mouseXPosition: 0, move: 0});
    this.handleChangeColumn();
  }

  /**
   * Handle change column
   */
  handleChangeColumn() {
    this.props.tableContext.onChangeColumns();
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param event
   */
  handleSortByColumnClick(event) {
    event.stopPropagation();
    this.props.tableContext.onSortChange(this.column.field);
  }

  /**
   * Update the column position
   * @param columnPermutedWidth
   * @param dx
   */
  updateColumnPosition(columnPermutedWidth, dx) {
    const move = this.state.move + columnPermutedWidth;
    this.columnRef.current.style.translate = `${dx - columnPermutedWidth}px`;
    this.setState({move});
  }

  /**
   * Update the width of the previous and next column
   * @param previousColumnWidth
   * @param nextColumnWidth
   */
  updatePreviousAndNextColumnWidth(previousColumnWidth, nextColumnWidth) {
    this.previousColumnWidth = previousColumnWidth;
    this.nextColumnWidth = nextColumnWidth;
  }

  /**
   * Handle Mouse down event to prepare the resize
   * @param event
   */
  async handleResizeColumnMouseDown(event) {
    // Stop propagation to not fire parents events
    event.stopPropagation();
    // Get the actual width of the column to resize
    const columnToResizeWidth = this.column.width;
    // Get the current mouse position
    const mouseXPosition = event.clientX;
    this.setState({resizing: true, mouseXPosition, columnToResizeWidth});
    // Add listener to handle mouse move event on document
    document.addEventListener('mousemove', this.handleResizeColumnMouseMoveEvent, {capture: true});
    // Add once listener to handle mouse up event on document
    document.addEventListener('mouseup', this.handleResizeColumnMouseUpEvent, {capture: true, once: true});
  }

  /**
   * Handle Mouse move on document to resize a column
   * @param event
   */
  handleResizeColumnMouseMoveEvent(event) {
    // Determine how far the mouse has been moved
    const dx = event.clientX - this.state.mouseXPosition;
    // Update the width of column
    const width = this.state.columnToResizeWidth + dx > 50 ? this.state.columnToResizeWidth + dx : 50;
    // Update the width
    this.props.tableContext.onResizeColumn(this.props.index, width);
  }

  /**
   * Handle Mouse up on document to end the resize
   */
  handleResizeColumnMouseUpEvent() {
    // Remove listener on mouse move
    document.removeEventListener('mousemove', this.handleResizeColumnMouseMoveEvent, {capture: true});
    this.setState({resizing: null, mouseXPosition: 0, columnToResizeWidth: 0});
    this.handleChangeColumn();
  }

  /**
   * Handle resize default by column double click
   */
  handleResizeDefaultByColumnDoubleClick() {
    this.props.tableContext.onResizeColumn(this.props.index, this.column.defaultWidth);
    this.handleChangeColumn();
  }

  /**
   * Check if the grid is sorted for a given column
   * @param columnName The column name
   */
  isSortedColumn(columnName) {
    return this.props.tableContext.isSortedColumn(columnName);
  }

  /**
   * Check if the sort is ascendant.
   * @returns {boolean}
   */
  isSortedAsc() {
    return this.props.tableContext.isSortedAsc();
  }

  /**
   * Get column
   * @return {Object}
   */
  get column() {
    return this.props.column;
  }

  /**
   * Get props for custom cell
   * @return {object}
   */
  get propsCellHeader() {
    const props = this.column.headerCellRenderer?.props || {};
    // For column checkbox add a checked props value else use the one already defined or add the label
    if (this.column.id === "checkbox") {
      props.checked = this.props.tableContext.isSelectAllChecked();
    } else {
      props.label = props.label || this.column.label;
    }
    return props;
  }

  /**
   * Get the column width style by column name
   * @return {{width: string} | null}
   */
  get columnWidthStyle() {
    // Get the column width
    return this.column?.width ? {width: `${this.column.width}px`} : null;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const CellHeader = this.column.headerCellRenderer?.component || CellHeaderDefault;
    return (
      <th
        key={this.column.id}
        className={`cell-${this.column.id} selections ${this.column.draggable ? "draggable" : ""} ${this.column.sortable ? "sortable" : ""}`}
        style={this.columnWidthStyle}
        ref={this.columnRef}
        onMouseDown={event => this.column.draggable ? this.handleReorderColumnMouseDownEvent(event) : undefined}>
        {!this.column.sortable &&
          <div className="cell-header">
            <CellHeader {...this.propsCellHeader}/>
          </div>
        }
        {this.column.sortable &&
          <button className="link no-border" type="button" onClick={this.handleSortByColumnClick}>
            <div className="cell-header">
              <CellHeader {...this.propsCellHeader}/>
              <span className="cell-header-icon-sort">
                {this.isSortedColumn(this.column.field) && this.isSortedAsc() &&
                  <Icon name="ascending"/>
                }
                {this.isSortedColumn(this.column.field) && !this.isSortedAsc() &&
                  <Icon name="descending"/>
                }
              </span>
            </div>
          </button>
        }
        {this.column.resizable &&
          <div className={`resizer ${this.state.resizing ? "resizing" : ""}`}
            onMouseDown={this.handleResizeColumnMouseDown}
            onDoubleClick={this.handleResizeDefaultByColumnDoubleClick}>
          </div>
        }
      </th>
    );
  }
}

CellHeaderWrapper.propTypes = {
  tableContext: PropTypes.any, // The table context
  column: PropTypes.instanceOf(ColumnModel).isRequired, // The columns to display
  index: PropTypes.number.isRequired // The index of the column
};

export default withTable(CellHeaderWrapper);
