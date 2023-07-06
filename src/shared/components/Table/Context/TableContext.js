/**
 * Passbolt ~ Open source TableHeader manager for teams
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


export const TableContext = React.createContext({
  columns: [], // The columns to display
  tableWidth: null, // The table width
  tableviewWidth: null, // The tableview width
  isDraggingColumn: false, // Is the column dragging
  isSelectAllChecked: () => {}, // Is the select all checked
  isRowSelected: () => {}, // Is the row selected
  isSortedColumn: () => {}, // Is the column sorted
  isSortedAsc: () => {}, // Is the column sorted ascending
  canMoveColumn: () => {}, // Can move the column
  onSortChange: () => {}, // Whenever the sort change
  onResizeColumn: () => {}, // Whenever the size of a column change
  onReorderColumns: () => {}, // Whenever the column is reordered
  onStartDraggingColumn: () => {}, // Whenever a column start to be dragged
  onEndDraggingColumn: () => {}, // Whenever a column end to be dragged
});

/**
 * This component represents a  table
 */
export default class TableContextProvider extends Component {
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
      columns: this.props.columns, // The columns to display
      tableWidth: null, // The table width
      tableviewWidth: null, // The tableview width
      isDraggingColumn: false, // Is the column dragging
      isSelectAllChecked: this.isSelectAllChecked.bind(this), // Is the select all checked
      isRowSelected: this.isRowSelected.bind(this), // Is the row selected
      isSortedColumn: this.isSortedColumn.bind(this), // Is the column sorted
      isSortedAsc: this.isSortedAsc.bind(this), // Is the column sorted ascending
      canMoveColumn: this.canMoveColumn.bind(this), // Can move the column
      onSortChange: this.handleSortByColumnClick.bind(this), // Whenever the sort change
      onResizeColumn: this.handleResizeColumn.bind(this), // Whenever the size of a column change
      onReorderColumns: this.handleReorderColumns.bind(this), // Whenever the column is reordered
      onStartDraggingColumn: this.handleStartDraggingColumns.bind(this), // Whenever a column start to be dragged
      onEndDraggingColumn: this.handleEndDraggingColumns.bind(this), // Whenever a column end to be dragged
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleWindowResizeEvent = this.handleWindowResizeEvent.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tableviewRef = React.createRef();
  }

  componentDidMount() {
    // Set the column
    this.setColumnsWidthFromActualWidth(this.getTableWidth(this.state.columns));
    window.addEventListener('resize', this.handleWindowResizeEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResizeEvent);
  }

  /**
   * Handle window resize event
   */
  handleWindowResizeEvent() {
    this.setColumnsWidthFromActualWidth(this.state.tableviewWidth);
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param propertyName The name of the property to sort on
   */
  async handleSortByColumnClick(propertyName) {
    this.props.onSortChange?.(propertyName);
  }

  handleReorderColumns(fromIndex, toIndex) {
    const columns = [...this.state.columns];
    const column = columns.splice(fromIndex, 1)[0];
    columns.splice(toIndex, 0, column);
    this.setState({columns});
  }

  /**
   * Handle Mouse down event to prepare the resize
   * @param {number} index The index of the column to resize
   * @param {number} width The width to apply
   * @return {Promise<void>}
   */
  async handleResizeColumn(index, width) {
    const columns = [...this.state.columns];
    // Update the width
    columns[index] = {...columns[index], width};
    // Get table width
    const tableWidth = this.getTableWidth(columns);
    this.setState({columns, tableWidth});
  }

  /**
   * Get the total width for the table in order to have only one column resizing
   * @return {number}
   */
  getTableWidth(columns) {
    // Starting from 20 to have checkbox column width and add padding for each column displayed
    return columns.reduce((sum, col) => sum + col.width, 0) + this.columnsPaddingWidth;
  }

  /**
   * Get the sum of columns widths no resizable from default
   * @return {number}
   */
  get columnWidthNoResizable() {
    return this.state.columns.reduce((sum, col) => sum + (col.resizable ? 0 : parseFloat(col.width)), 0);
  }

  /**
   * Get the columns padding widths
   * @return {number}
   */
  get columnsPaddingWidth() {
    // Get the columns padding widths from the displayed columns
    return 6 * this.state.columns.length;
  }

  /**
   * Set the columns width based on actual width of the tableview width to maintain the same proportionality
   * @param actualWidth
   */
  setColumnsWidthFromActualWidth(actualWidth) {
    const tableviewWidth = this.tableviewRef.current.clientWidth;
    // Subtract all constant widths that do not change with screen width
    const columnsResizableWidth = actualWidth - this.columnWidthNoResizable - this.columnsPaddingWidth;
    // Calculate the ratio between two widths
    const ratio = (tableviewWidth - this.columnWidthNoResizable - this.columnsPaddingWidth) / columnsResizableWidth;
    // Scale the widths with the ratio
    const columns = this.state.columns.map(column => {
      const width = column.resizable ? column.width * ratio : column.width;
      return {...column, width};
    });
    // Get the table width from all columns
    const tableWidth = this.getTableWidth(columns);
    this.setState({columns, tableWidth, tableviewWidth});
  }

  /**
   * Returns true if the given item is selected
   * @param rowId A row id
   */
  isRowSelected(rowId) {
    return this.props.selectedRowsIds?.some(selectedRow => rowId === selectedRow);
  }

  /**
   * Is select all checked
   */
  isSelectAllChecked() {
    return this.props.rows.length === this.props.selectedRowsIds?.length;
  }

  /**
   * Check if the grid is sorted for a given column
   * @param columnName The column name
   */
  isSortedColumn(columnName) {
    return this.props.sorter.propertyName === columnName;
  }

  /**
   * Check if the sort is ascendant.
   * @returns {boolean}
   */
  isSortedAsc() {
    return this.props.sorter.asc;
  }

  /**
   * If column can be moved
   * @param columnIndex
   * @param moveX
   * @return {boolean}
   */
  canMoveColumn(columnIndex, moveX) {
    const columnMovable = column => column.draggable;
    const findLastIndex = (lastColumnIndex, column, index) => columnMovable(column) ? index : lastColumnIndex;
    const canBeMovedBefore = columnIndex > this.state.columns.findIndex(columnMovable) && moveX < 0;
    const canBeMovedAfter = columnIndex < this.state.columns.reduce(findLastIndex, -1) && moveX > 0;
    return canBeMovedBefore || canBeMovedAfter;
  }

  /**
   * On start dragging column
   */
  handleStartDraggingColumns() {
    this.setState({isDraggingColumn: true});
  }

  /**
   * On end dragging column
   */
  handleEndDraggingColumns() {
    this.setState({isDraggingColumn: false});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <TableContext.Provider value={this.state}>
        <div ref={this.tableviewRef} className="tableview">
          {this.props.children}
        </div>
      </TableContext.Provider>
    );
  }
}

TableContextProvider.displayName = 'TableContextProvider';

TableContextProvider.propTypes = {
  columns: PropTypes.array.isRequired, // The columns to display
  rows: PropTypes.array.isRequired, // The rows to display
  sorter: PropTypes.object, // The sorter object containing the property name and the direction
  selectedRowsIds: PropTypes.array, // The selected row ids
  onSortChange: PropTypes.func, // The on sort property
  children: PropTypes.any // The children
};

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withTable(WrappedComponent) {
  return class withTable extends React.Component {
    render() {
      return (
        <TableContext.Consumer>
          {
            tableContext => <WrappedComponent tableContext={tableContext} {...this.props} />
          }
        </TableContext.Consumer>
      );
    }
  };
}
