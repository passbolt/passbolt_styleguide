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
 * @since         5.10.0
 */
import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import DisplayResourceTagsBadge from "../../../react-extension/components/Resource/DisplayResourceTags/DisplayResourceTagsBadge";
import TagItem from "../../../react-extension/components/Resource/DisplayResourceTags/TagItem";

const MAX_VISIBLE_TAGS = 3;
const TAG_GAP = 4;
const BADGE_WIDTH = 32;
const RESIZE_DEBOUNCE_MS = 20;

/**
 * This component represents a table cell for displaying tags with dynamic ellipsis
 */
class CellTag extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = {
      visibleCount: 0,
      measured: false,
    };
    this.containerRef = React.createRef();
    this.tagRefs = [];
    this.resizeObserver = null;
    this.resizeDebounceTimeout = null;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.calculateVisibleTags();
    this.setupResizeObserver();
  }

  /**
   * Component did update
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.tagRefs = new Array(this.tags.length);
      this.setState({ measured: false }, () => this.calculateVisibleTags());
    }
  }

  /**
   * Component will unmount
   */
  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.resizeDebounceTimeout) {
      clearTimeout(this.resizeDebounceTimeout);
    }
  }

  /**
   * Setup resize observer to recalculate on container resize
   */
  setupResizeObserver() {
    if (typeof ResizeObserver !== "undefined" && this.containerRef.current) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeDebounceTimeout) {
          clearTimeout(this.resizeDebounceTimeout);
        }
        this.resizeDebounceTimeout = setTimeout(() => {
          this.calculateVisibleTags();
        }, RESIZE_DEBOUNCE_MS);
      });
      this.resizeObserver.observe(this.containerRef.current);
    }
  }

  /**
   * Check if component is ready for measurement
   * @returns {boolean}
   */
  canMeasure() {
    return this.containerRef.current && this.tags?.length > 0;
  }

  /**
   * Check if tag refs are available for measurement
   * @returns {boolean}
   */
  hasTagRefs() {
    return this.tagRefs.length > 0;
  }

  /**
   * Calculate the required width for a tag at given index
   * @param {number} tagIndex - The index of the tag
   * @returns {number} - Total width needed (tag + gap)
   */
  getTagRequiredWidth(tagIndex) {
    const tagElement = this.tagRefs[tagIndex];
    if (!tagElement) {
      return 0;
    }
    const tagWidth = tagElement.offsetWidth;
    const gapWidth = tagIndex > 0 ? TAG_GAP : 0;
    return tagWidth + gapWidth;
  }

  /**
   * Calculate badge space if there are hidden tags after current index
   * @param {number} currentIndex - Current tag index
   * @returns {number} - Space needed for badge (0 if no badge needed)
   */
  getBadgeSpaceIfNeeded(currentIndex) {
    const remainingTags = this.tags.length - (currentIndex + 1);
    return remainingTags > 0 ? BADGE_WIDTH + TAG_GAP : 0;
  }

  /**
   * Check if a tag fits within available width
   * @param {number} usedWidth - Already used width
   * @param {number} tagWidth - Width of current tag
   * @param {number} badgeSpace - Space needed for badge
   * @param {number} containerWidth - Total available width
   * @returns {boolean}
   */
  tagFitsInContainer(usedWidth, tagWidth, badgeSpace, containerWidth) {
    return usedWidth + tagWidth + badgeSpace <= containerWidth;
  }

  /**
   * Count how many tags fit in the available width
   * @param {number} containerWidth - Available width
   * @param {number} maxTags - Maximum tags to consider
   * @returns {number} - Number of tags that fit
   */
  countTagsThatFit(containerWidth, maxTags) {
    let usedWidth = 0;

    for (let tagIndex = 0; tagIndex < maxTags; tagIndex++) {
      const tagWidth = this.getTagRequiredWidth(tagIndex);
      if (tagWidth === 0) {
        continue;
      }

      const badgeSpace = this.getBadgeSpaceIfNeeded(tagIndex);
      const tagFits = this.tagFitsInContainer(usedWidth, tagWidth, badgeSpace, containerWidth);

      if (tagFits) {
        usedWidth += tagWidth;
      } else {
        // First tag is always visible (CSS handles ellipsis)
        return tagIndex === 0 ? 1 : tagIndex;
      }
    }

    return maxTags;
  }

  /**
   * Calculate how many tags can be visible based on container width.
   *
   * Rules:
   * - First tag is always visible (with ellipsis if needed)
   * - Tags 2 and 3 must fit completely or they go into the badge
   * - Maximum 3 tags visible
   */
  calculateVisibleTags() {
    // Early exit: nothing to measure
    if (!this.canMeasure()) {
      if (this.state.visibleCount !== 0 || !this.state.measured) {
        this.setState({ visibleCount: 0, measured: true });
      }
      return;
    }

    const containerWidth = this.containerRef.current.offsetWidth;

    // Guard against zero-width container (element not yet laid out)
    if (containerWidth === 0) {
      return;
    }

    const maxTagsToShow = Math.min(this.tags.length, MAX_VISIBLE_TAGS);

    // Refs not ready yet: show all tags until measurement is possible
    if (!this.hasTagRefs()) {
      if (this.state.visibleCount !== maxTagsToShow || !this.state.measured) {
        this.setState({ visibleCount: maxTagsToShow, measured: true });
      }
      return;
    }

    const visibleCount = this.countTagsThatFit(containerWidth, maxTagsToShow);

    if (visibleCount !== this.state.visibleCount || !this.state.measured) {
      this.setState({ visibleCount, measured: true });
    }
  }

  /**
   * Get the tags
   * @return {Array}
   */
  get tags() {
    return this.props.value || [];
  }

  /**
   * Get visible tags
   * @return {Array}
   */
  get visibleTags() {
    return this.tags.slice(0, Math.min(MAX_VISIBLE_TAGS, this.state.visibleCount || MAX_VISIBLE_TAGS));
  }

  /**
   * Get hidden tags for the badge tooltip
   * @return {Array}
   */
  get hiddenTags() {
    const visibleCount = this.state.visibleCount || 0;
    return this.tags.slice(visibleCount);
  }

  /**
   * Store tag ref
   * @param {number} index
   * @param {HTMLElement} element
   */
  setTagRef(index, element) {
    this.tagRefs[index] = element;
  }

  /**
   * Check if a tag at given index should be visible
   * @param {number} index - Tag index
   * @returns {boolean}
   */
  isTagVisible(index) {
    const { measured, visibleCount } = this.state;
    return !measured || index < visibleCount;
  }

  /**
   * Check if tag needs ellipsis (only first tag when it's the only visible one)
   * @param {number} index - Tag index
   * @returns {boolean}
   */
  needsEllipsis(index) {
    return index === 0 && this.state.visibleCount === 1;
  }

  /**
   * Get class name for a tag item
   * @param {number} index - Tag index
   * @returns {string}
   */
  getTagClassName(index) {
    return this.needsEllipsis(index) ? "tag-list-item ellipsis-tag" : "tag-list-item";
  }

  /**
   * Get style for a tag item based on visibility
   * @param {number} index - Tag index
   * @returns {object}
   */
  getTagStyle(index) {
    const isVisible = this.isTagVisible(index);
    return {
      visibility: isVisible ? "visible" : "hidden",
      position: isVisible ? "relative" : "absolute",
    };
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    if (!this.tags.length) {
      return <div className="tags-list cell-tag" ref={this.containerRef}></div>;
    }

    const { measured } = this.state;
    const tagsToRender = this.tags.slice(0, MAX_VISIBLE_TAGS);

    return (
      <div className="tags-list cell-tag" ref={this.containerRef}>
        {tagsToRender.map((tag, index) => (
          <TagItem
            key={tag.id}
            tag={tag}
            tagRef={(element) => this.setTagRef(index, element)}
            className={this.getTagClassName(index)}
            style={this.getTagStyle(index)}
            onClick={this.props.onTagClick}
          />
        ))}
        {measured && <DisplayResourceTagsBadge hiddenTags={this.hiddenTags} onTagClick={this.props.onTagClick} />}
      </div>
    );
  }
}

CellTag.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      is_shared: PropTypes.bool,
    }),
  ),
  onTagClick: PropTypes.func,
};

export default memo(CellTag);
