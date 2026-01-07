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
 * @since         4.9.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { createSafePortal } from "../../../../shared/utils/portals";

const MARGIN = 10;

class TooltipPortal extends Component {
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
      hasToDisplayTooltip: false, // boolean to display or not the tooltip (better for performance)
      direction: "", // boolean to display or not the tooltip
      top: 0,
      left: 0,
    };
  }

  /**
   * Initialize the bindCallback
   */
  bindCallbacks() {
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.findBestPosition = this.findBestPosition.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.tooltipRef = React.createRef();
    this.tooltipTextRef = React.createRef();
  }

  /**
   * Handle mouse over event
   */
  handleMouseEnter() {
    this.props.onMouseHover?.();
    this.setState({ hasToDisplayTooltip: true }, this.findBestPosition);
  }

  /**
   * Handle mouse out event
   */
  handleMouseLeave() {
    this.setState({ hasToDisplayTooltip: false, direction: "" });
  }

  /**
   * Find the best position to display the tooltip
   */
  findBestPosition() {
    const tooltipContainer = this.tooltipRef.current.getBoundingClientRect();
    const tooltipText = this.tooltipTextRef.current.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    // Tooltip top position center with tooltip container
    const topTooltipText = tooltipContainer.top + tooltipContainer.height / 2 - tooltipText.height / 2;
    // Tooltip left position center with tooltip container
    const leftTooltipText = tooltipContainer.left + tooltipContainer.width / 2 - tooltipText.width / 2;

    // Check if the tooltip is contained in the inner height of the window
    if (topTooltipText + tooltipText.height <= innerHeight && topTooltipText >= 0) {
      if (tooltipContainer.right + tooltipText.width <= innerWidth) {
        // If tooltip is visible on the right of the container
        this.setState({ direction: "right", left: tooltipContainer.right + MARGIN, top: topTooltipText });
      } else if (tooltipContainer.left - tooltipText.width > 0) {
        // If tooltip is visible on the left of the container
        this.setState({
          direction: "left",
          left: tooltipContainer.left - tooltipText.width - MARGIN,
          top: topTooltipText,
        });
      }
    } else if (leftTooltipText >= 0 && leftTooltipText + tooltipText.width <= innerWidth) {
      // If tooltip is not visible side of the container but visible on top or at the bottom
      if (tooltipContainer.top - tooltipText.height <= 0) {
        // If tooltip is visible on the bottom of the container
        this.setState({ direction: "bottom", left: leftTooltipText, top: tooltipContainer.bottom + MARGIN });
      } else if (tooltipContainer.top - tooltipText.height <= innerHeight) {
        // If tooltip is visible on the top of the container
        this.setState({
          direction: "top",
          left: leftTooltipText,
          top: tooltipContainer.top - tooltipText.height - MARGIN,
        });
      }
    } else {
      // If tooltip cannot be visible entirely side of the container
      this.findPositionWithMoreSpace(tooltipContainer, tooltipText, topTooltipText, leftTooltipText);
    }
  }

  /**
   * Check which side have more space around the container and display the tooltip
   * @param tooltipContainer
   * @param tooltipText
   * @param topTooltipText
   * @param leftTooltipText
   */
  findPositionWithMoreSpace(tooltipContainer, tooltipText, topTooltipText, leftTooltipText) {
    const { innerHeight, innerWidth } = window;
    const topSpace = innerHeight - tooltipContainer.top + innerWidth - leftTooltipText;
    const bottomSpace = innerHeight - tooltipContainer.bottom + innerWidth - leftTooltipText;
    const rightSpace = innerWidth - tooltipContainer.right + innerHeight - topTooltipText;
    const leftSpace = innerWidth - tooltipContainer.left + innerHeight - topTooltipText;

    // Try to display the tooltip entirely
    if (rightSpace > leftSpace && rightSpace > topSpace && rightSpace > bottomSpace) {
      this.setState({
        direction: "right",
        left: tooltipContainer.right - tooltipContainer.width / 2,
        top: topTooltipText,
      });
    } else if (leftSpace > topSpace && leftSpace > bottomSpace) {
      this.setState({
        direction: "left",
        left: tooltipContainer.left + tooltipContainer.width / 2,
        top: topTooltipText,
      });
    } else if (topSpace > bottomSpace) {
      this.setState({ direction: "top", left: leftTooltipText, top: tooltipContainer.top - tooltipText.height });
    } else {
      this.setState({ direction: "bottom", left: leftTooltipText, top: tooltipContainer.bottom });
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div
        className="tooltip-portal"
        tabIndex="0"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span ref={this.tooltipRef}>{this.props.children}</span>
        {this.state.hasToDisplayTooltip &&
          createSafePortal(
            <span
              ref={this.tooltipTextRef}
              className={`tooltip-portal-text ${this.state.direction} ${this.props.className}`}
              style={{ top: `${this.state.top}px`, left: `${this.state.left}px` }}
            >
              {this.props.message}
            </span>,
            document.body,
          )}
      </div>
    );
  }
}

TooltipPortal.propTypes = {
  children: PropTypes.any,
  message: PropTypes.any.isRequired,
  onMouseHover: PropTypes.func,
  className: PropTypes.string,
};

export default TooltipPortal;
