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
import {withResizableSidebar} from "../../contexts/ResizeSidebar/ResizeSidebarContext";

const SIDEBARS = {
  LEFT: 'left',
  RIGHT: 'right'
};
class ResizableSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarRef = React.createRef();
    this.bindCallbacks();
    this.state = this.setDefaultState();
  }

  /**
   * Set the default state
   * @returns state
   */
  setDefaultState() {
    return {
      resizing: false,
      startX: 0,
      startWidth: 0,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  /**
   * Set the width of the sidebars on load
   */
  componentDidMount() {
    const {minWidth, gutterLeft, sidebarContext} = this.props;
    const side = gutterLeft ? SIDEBARS.RIGHT : SIDEBARS.LEFT;
    setTimeout(() => {
      // Run this right after DOM is painted to access the correct offsetWidth of container and set initial width properly
      const containerWidth = sidebarContext.containerRef?.current?.offsetWidth || 1;
      const initialWidth = this.percentToPx(minWidth, containerWidth);
      sidebarContext.setSidebarWidth(side, initialWidth);
    }, 0);
  }

  /**
   * Remove event listeners when component is un-mounted
   */
  componentWillUnmount() {
    this.removeEventListeners();
  }

  /**
   * Convert pixel value to percentage
   * @param {number} px
   * @param {number} containerWidth
   * @returns
   */
  pxToPercent(px, containerWidth) {
    return `${(px / containerWidth) * 100}%`;
  }

  /**
   * Convert percentage value to pixel
   * @param {string} percentStr
   * @param {number} containerWidth
   * @returns
   */
  percentToPx(percentStr, containerWidth) {
    const percent = parseFloat(percentStr);
    if (isNaN(percent)) { return 0; }
    return (percent / 100) * containerWidth;
  }

  /**
   * Handle mouse down event
   * @param {*} e
   */
  handleMouseDown(e) {
    e.preventDefault();

    const {gutterLeft, sidebarContext} = this.props;
    const startWidth = gutterLeft
      ? sidebarContext.right.width || 0
      : sidebarContext.left.width || 0;

    this.setState({
      resizing: true,
      startX: e.clientX,
      startWidth,
    });

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  /**
   * Handle the mouse move event - calculate the size change
   * @param {Event} e
   */
  handleMouseMove(e) {
    if (!this.state.resizing) { return; }

    const {startX, startWidth} = this.state;
    const {gutterLeft, minWidth, maxWidth, sidebarContext} = this.props;

    const containerWidth = sidebarContext?.containerRef?.current?.offsetWidth || 1;
    const dx = e.clientX - startX;
    const delta = gutterLeft ? -dx : dx;
    const side = gutterLeft ? SIDEBARS.RIGHT : SIDEBARS.LEFT;

    const minPx = this.percentToPx(minWidth, containerWidth);
    const maxPx = this.percentToPx(maxWidth, containerWidth);
    const newWidth = Math.max(minPx, Math.min(maxPx, startWidth + delta)); // Clamp to max width if resizing exceeds max width

    sidebarContext.setSidebarWidth(side, newWidth);
  }

  /**
   * Handle mouse up event - remove event listeners
   */
  handleMouseUp() {
    this.setState({resizing: false});
    this.removeEventListeners();
  }

  /**
   * Handle double click event - default the sidebars to original widths
   */
  handleDoubleClick() {
    const {gutterLeft, minWidth, sidebarContext} = this.props;
    const containerWidth = sidebarContext?.containerRef?.current?.offsetWidth || 1;
    const minPx = this.percentToPx(minWidth, containerWidth);
    const side = gutterLeft ? SIDEBARS.RIGHT : SIDEBARS.LEFT;
    sidebarContext.setSidebarWidth(side, minPx);
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const {
      gutterLeft,
      resizable,
      classNames,
      children,
      sidebarContext,
    } = this.props;

    const {containerRef, left, right} = sidebarContext;

    const widthPx = gutterLeft ? right.width : left.width;
    const containerWidth = containerRef?.current?.offsetWidth || 1;
    const widthPercent = this.pxToPercent(widthPx, containerWidth);

    /** use 'resource-workspace leftSideBar' and 'resource-workspace rightSideBar' for Resource Workspace sidebars */
    /** use 'users-workspace leftSideBar' and 'users-workspace rightSideBar' for Users Workspace sidebars */
    const classes = `resizable-sidebar${classNames ? ` ${classNames}` : ""}`;

    return (
      <div className={classes} ref={this.sidebarRef} style={{width: widthPercent}}>
        {gutterLeft && resizable && (
          <div
            className="gutter"
            onMouseDown={this.handleMouseDown}
            onDoubleClick={this.handleDoubleClick}
          />
        )}

        {children}

        {!gutterLeft && resizable && (
          <div
            className="gutter"
            onMouseDown={this.handleMouseDown}
            onDoubleClick={this.handleDoubleClick}
          />
        )}
      </div>
    );
  }
}

ResizableSidebar.propTypes = {
  resizable: PropTypes.bool, // if the sidebar is resizable or not
  gutterLeft: PropTypes.bool, // if resizable from left or right
  classNames: PropTypes.string, // classes to add
  children: PropTypes.any, // children to display
  sidebarContext: PropTypes.object.isRequired,
  minWidth: PropTypes.string, // min width of the sidebar
  maxWidth: PropTypes.string, // max width of the sidebar
};

ResizableSidebar.defaultProps = {
  resizable: true,
  gutterLeft: false,
  classNames: "",
  minWidth: "20%",
  maxWidth: "35%"
};

export default withResizableSidebar(ResizableSidebar);
