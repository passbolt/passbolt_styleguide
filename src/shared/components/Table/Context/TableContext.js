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
import debounce from "debounce-promise";


const PADDING_SIZE = 6;

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
  onChangeColumns: () => {}, // Whenever columns change
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
      columns: this.sanitizeColumnsFromProps, // The columns to display
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
      onChangeColumns: this.handleChangeColumns.bind(this) // Whenever columns change
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleWindowResizeEvent = this.handleWindowResizeEvent.bind(this);
    this.handleChangeColumnsDebounced = debounce(this.handleChangeColumns, 2000);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tableviewRef = React.createRef();
  }

  componentDidMount() {
    this.prepareTableColumns();
    window.addEventListener('resize', this.handleWindowResizeEvent);
  }

  /**
   * Sanitize columns from props to prevent negative width due to wrong calculation
   * If one column width is negative, fallback to default width for all columns
   * @returns {*[]}
   */
  get sanitizeColumnsFromProps() {
    const columns = [...this.props.columns];
    const isNegativeWidth = column => column.width < 0;
    if (columns.some(isNegativeWidth)) {
      // Set default widths for all columns
      columns.forEach(column => column.width = column.defaultWidth);
    }
    return columns;
  }

  /**
   * Prepare table columns
   */
  prepareTableColumns() {
    const tableWidth = this.getTableWidth(this.state.columns);
    const isNotDefaultWidth = column => column.width !== column.defaultWidth;
    if (this.state.columns.some(isNotDefaultWidth)) {
      const tableviewWidth = this.tableviewRef.current.clientWidth;
      this.setState({tableWidth, tableviewWidth});
    } else {
      // Set the column
      this.setColumnsWidthFromActualWidth(tableWidth);
    }
  }

  /**
   * Whenever the component has updated in terms of props
   */
  componentDidUpdate(prevProps) {
    if (prevProps.columns.length > this.props.columns.length) {
      this.removeColumn();
    } else if (prevProps.columns.length < this.props.columns.length) {
      this.addColumn();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResizeEvent);
  }

  /**
   * Remove a column
   */
  removeColumn() {
    const filterByIdPresent = column => this.props.columns.some(defaultColumn => defaultColumn.id === column.id);
    const columns = this.state.columns.filter(filterByIdPresent);
    // Get table width
    const tableWidth = this.getTableWidth(columns) - PADDING_SIZE; // Remove the padding of the column to removed
    this.setState({columns, tableWidth});
  }

  /**
   * Add a column
   */
  addColumn() {
    const columns = [...this.state.columns];
    const indexColumnToAdd = this.props.columns.findIndex(column => this.state.columns.every(item => column.id !== item.id));
    // Add the column to its default position and width
    columns.splice(indexColumnToAdd, 0, this.props.columns[indexColumnToAdd]);
    // Get table width
    const tableWidth = this.getTableWidth(columns) + PADDING_SIZE; // Add the padding of the new column
    this.setState({columns, tableWidth});
  }

  /**
   * Handle window resize event
   */
  handleWindowResizeEvent() {
    // Prevent wrong calculation if the tableviewWidth is not set (null > 0 or undefined > 0 return false)
    if (this.state.tableviewWidth > 0) {
      this.setColumnsWidthFromActualWidth(this.state.tableviewWidth);
      // Debounce the function to store the new columns width
      this.handleChangeColumnsDebounced();
    }
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param propertyName The name of the property to sort on
   */
  async handleSortByColumnClick(propertyName) {
    this.props.onSortChange?.(propertyName);
  }

  /**
   * Handle reorder columns
   * @param fromIndex
   * @param toIndex
   */
  handleReorderColumns(fromIndex, toIndex) {
    const columns = [...this.state.columns];
    const column = columns.splice(fromIndex, 1)[0];
    columns.splice(toIndex, 0, column);
    this.setState({columns});
  }

  /**
   * Handle resize column
   * @param {number} index The index of the column to resize
   * @param {number} width The width to apply
   * @return {Promise<void>}
   */
  handleResizeColumn(index, width) {
    const columns = [...this.state.columns];
    // Update the width
    columns[index].width = width;
    // Get table width
    const tableWidth = this.getTableWidth(columns);
    this.setState({columns, tableWidth});
  }

  /**
   * Handle change columns
   */
  handleChangeColumns() {
    // Get the columns settings properties
    const columns = this.state.columns.map((column, index) => ({id: column.id, label: column.label, width: column.width, position: index}));
    this.props.onChange(columns);
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
    return PADDING_SIZE * this.state.columns.length;
  }

  /**
   * Set the columns width based on actual width of the tableview width to maintain the same proportionality
   * @param actualWidth
   */
  setColumnsWidthFromActualWidth(actualWidth) {
    const tableviewWidth = this.tableviewRef.current.clientWidth;
    // Fixed width not to be taken into account
    const fixedWidth = this.columnWidthNoResizable + this.columnsPaddingWidth;
    // Prevent wrong calculation if actual width or tableview width are null or negative
    if (actualWidth > fixedWidth && tableviewWidth > fixedWidth) {
      // Subtract all constant widths that do not change with screen width
      const columnsResizableWidth = actualWidth - fixedWidth;
      // Calculate the ratio between two widths
      const ratio = (tableviewWidth - fixedWidth) / columnsResizableWidth;
      const columns = [...this.state.columns];
      // Scale the widths with the ratio
      columns.forEach(column => {
        if (column.resizable) {
          column.width = column.width * ratio;
        }
      });
      // Get the table width from all columns
      const tableWidth = this.getTableWidth(columns);
      this.setState({columns, tableWidth, tableviewWidth});
    }
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

TableContextProvider.propTypes = {
  columns: PropTypes.array.isRequired, // The columns to display
  rows: PropTypes.array.isRequired, // The rows to display
  sorter: PropTypes.object, // The sorter object containing the property name and the direction
  selectedRowsIds: PropTypes.array, // The selected row ids
  onSortChange: PropTypes.func, // The on sort property
  onChange: PropTypes.func, // The on change property
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
