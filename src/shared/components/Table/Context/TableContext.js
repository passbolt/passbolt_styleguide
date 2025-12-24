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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ROW_SETTING_HEIGHT_COMPACT } from "../../../models/entity/rowsSetting/rowsSettingEntity";

const PADDING_SIZE = 8;
const PADDING_FIRST_COLUMN_ADDED = 20;

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
      onChangeColumns: this.handleChangeColumns.bind(this), // Whenever columns change
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tableviewRef = React.createRef();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.prepareTableColumns(this.state.columns);
  }

  /**
   * Returns true if there is at least 1 column width that is not set with the default width.
   * @param {array} columns
   * @returns {boolean}
   */
  isNotDefaultColumn(columns) {
    const isNotDefaultWidth = (column) => column.width !== column.defaultWidth;
    return columns.some(isNotDefaultWidth);
  }

  /**
   * Sanitize columns from props to prevent negative width due to wrong calculation
   * If one column width is negative, fallback to default width for all columns
   * @returns {*[]}
   */
  get sanitizeColumnsFromProps() {
    const columns = [...this.props.columns];
    const isNegativeWidth = (column) => column.width < 0;
    if (columns.some(isNegativeWidth)) {
      // Set default widths for all columns
      columns.forEach((column) => (column.width = column.defaultWidth));
    }
    return columns;
  }

  /**
   * Prepare table columns
   */
  prepareTableColumns() {
    const tableWidth = this.getTableWidth(this.state.columns);
    if (this.isNotDefaultColumn(this.state.columns)) {
      const tableviewWidth = this.tableviewRef.current.clientWidth;
      this.setState({ tableWidth, tableviewWidth });
    } else {
      // Set the column
      this.setColumnsWidthFromActualWidth(this.state.columns);
    }
  }

  /**
   * Whenever the component has updated in terms of props
   */
  componentDidUpdate(prevProps) {
    if (prevProps.columns.length > this.props.columns.length) {
      this.removeColumn();
    } else if (prevProps.columns.length < this.props.columns.length) {
      this.addColumns();
    } else if (prevProps.columns !== this.props.columns && !this.isNotDefaultColumn(this.state.columns)) {
      this.setColumnsWidthFromActualWidth(this.state.columns);
    } else if (prevProps.columns !== this.props.columns) {
      const columns = this.props.columns;
      this.setState({ columns }, () => this.recomputeTableWidth(columns));
    }
  }

  /**
   * Remove a column
   */
  removeColumn() {
    const filterByIdPresent = (column) => this.props.columns.some((defaultColumn) => defaultColumn.id === column.id);
    const columns = this.state.columns.filter(filterByIdPresent);
    this.setState({ columns }, () => this.recomputeTableWidth(columns));
  }

  /**
   * Recompute the table width and set the state with the computed values.
   * @param {*} columns
   */
  recomputeTableWidth(columns) {
    this.setState({
      tableviewWidth: this.tableviewRef.current.clientWidth,
      tableWidth: this.getTableWidth(columns),
    });
  }

  /**
   * Add columns
   */
  addColumns() {
    const columns = [...this.state.columns];
    const columnIndexToAdd = [];
    this.props.columns.forEach((column, index) => {
      const isColumnNonExisting = this.state.columns.every((item) => column.id !== item.id);
      if (isColumnNonExisting) {
        columnIndexToAdd.push(index);
      }
    });

    columnIndexToAdd.forEach((index) => {
      columns.splice(index, 0, this.props.columns[index]);
    });
    // Add the column to its default position and width
    this.setState({ columns }, () => this.recomputeTableWidth(columns));
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
    this.setState({ columns });
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
    this.setState({ columns, tableWidth });
  }

  /**
   * Handle change columns
   */
  handleChangeColumns() {
    // Get the columns settings properties
    const columns = this.state.columns.map((column, index) => ({
      id: column.id,
      label: column.label,
      width: column.width,
      position: index,
    }));
    this.props.onChange(columns);
  }

  /**
   * Get the total width for the table in order to have only one column resizing
   * @param {array} columns
   * @return {number}
   */
  getTableWidth(columns) {
    // Starting from 20 to have checkbox column width and add padding for each column displayed
    return (
      columns.filter((c) => !c.excludeFromWidthComputation).reduce((sum, col) => sum + col.width, 0) +
      this.getColumnsPaddingWidth(columns)
    );
  }

  /**
   * Get the sum of columns widths no resizable from default
   * @param {array} columns
   * @return {number}
   */
  getColumnWidthNoResizable(columns) {
    return columns
      .filter((c) => !c.excludeFromWidthComputation && !c.resizable)
      .reduce((sum, col) => sum + parseFloat(col.width), 0);
  }

  /**
   * Get the columns padding widths
   * @param {array} columns
   * @return {number}
   */
  getColumnsPaddingWidth(columns) {
    // Get the columns padding widths from the displayed columns
    return PADDING_SIZE * columns.filter((c) => !c.excludeFromWidthComputation).length + PADDING_FIRST_COLUMN_ADDED;
  }

  /**
   * Set the columns width based on actual width of the tableview width to maintain the same proportionality
   * @param columns
   */
  setColumnsWidthFromActualWidth(columns) {
    const actualWidth = this.getTableWidth(columns);
    const tableviewWidth = this.tableviewRef.current.clientWidth;
    // Fixed width not to be taken into account
    const fixedWidth = this.getColumnWidthNoResizable(columns) + this.getColumnsPaddingWidth(columns);
    // Prevent wrong calculation if actual width or tableview width are null or negative
    if (actualWidth > fixedWidth && tableviewWidth > fixedWidth) {
      // Subtract all constant widths that do not change with screen width
      const columnsResizableWidth = actualWidth - fixedWidth;
      // Calculate the ratio between two widths
      const ratio = (tableviewWidth - fixedWidth) / columnsResizableWidth;
      // Scale the widths with the ratio
      columns.forEach((column) => {
        if (column.resizable) {
          // rounding down avoids a slight shift on the left of the grid that happens sometimes and a scrolling
          column.width = Math.floor(column.width * ratio);
        }
      });
      // Get the table width from all columns
      const tableWidth = this.getTableWidth(columns);
      this.setState({ columns, tableWidth, tableviewWidth });
    }
  }

  /**
   * Returns true if the given item is selected
   * @param rowId A row id
   */
  isRowSelected(rowId) {
    return this.props.selectedRowsIds?.some((selectedRow) => rowId === selectedRow);
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
    const columnMovable = (column) => column.draggable;
    const findLastIndex = (lastColumnIndex, column, index) => (columnMovable(column) ? index : lastColumnIndex);
    const canBeMovedBefore = columnIndex > this.state.columns.findIndex(columnMovable) && moveX < 0;
    const canBeMovedAfter = columnIndex < this.state.columns.reduce(findLastIndex, -1) && moveX > 0;
    return canBeMovedBefore || canBeMovedAfter;
  }

  /**
   * On start dragging column
   */
  handleStartDraggingColumns() {
    this.setState({ isDraggingColumn: true });
  }

  /**
   * On end dragging column
   */
  handleEndDraggingColumns() {
    this.setState({ isDraggingColumn: false });
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <TableContext.Provider value={this.state}>
        <div
          ref={this.tableviewRef}
          className={`tableview ${this.props.rowsSetting?.height ? this.props.rowsSetting.height : ROW_SETTING_HEIGHT_COMPACT}`}
        >
          {this.props.children}
        </div>
      </TableContext.Provider>
    );
  }
}

TableContextProvider.propTypes = {
  columns: PropTypes.array.isRequired, // The columns to display
  rows: PropTypes.array.isRequired, // The rows to display
  rowsSetting: PropTypes.object, // The rows setting to adapt display
  sorter: PropTypes.object, // The sorter object containing the property name and the direction
  selectedRowsIds: PropTypes.array, // The selected row ids
  onSortChange: PropTypes.func, // The on sort property
  onChange: PropTypes.func, // The on change property
  children: PropTypes.any, // The children
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
          {(tableContext) => <WrappedComponent tableContext={tableContext} {...this.props} />}
        </TableContext.Consumer>
      );
    }
  };
}
