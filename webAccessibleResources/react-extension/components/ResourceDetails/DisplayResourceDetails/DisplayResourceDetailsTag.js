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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import EditResourceTagsItemViewer from "../../ResourceTag/EditResourceTags/EditResourceTagsItemViewer";
import EditResourceTags from "../../ResourceTag/EditResourceTags/EditResourceTags";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EditSVG from "../../../../img/svg/edit.svg";

class DisplayResourceDetailsTag extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: false,
      showTagEditor: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.toggleInputTagEditor = this.toggleInputTagEditor.bind(this);
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Get the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Display or not the input tag editor
   */
  toggleInputTagEditor() {
    const showTagEditor = !this.state.showTagEditor;
    this.setState({showTagEditor});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const hasResource = this.resource;
    const isOwner =  hasResource && this.resource.permission.type === 15;
    const tags = hasResource && this.resource.tags;

    return (
      <div className={`detailed-tags accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>Tags</Trans>
              </span>
              {this.state.open &&
                <CaretDownSVG/>
              }
              {!this.state.open &&
                <CaretRightSVG/>
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className="accordion-content">
            {!this.state.showTagEditor &&
              <>
                <EditResourceTagsItemViewer
                  tags={tags}/>
                <div className="edit-tags">
                  <button type="button" className="section-action" onClick={this.toggleInputTagEditor}>
                    <EditSVG/>
                    <Trans>Edit tags</Trans>
                  </button>
                </div>
              </>
            }
            {this.state.showTagEditor &&
              <EditResourceTags
                tags={tags}
                isOwner={isOwner}
                toggleInputTagEditor={this.toggleInputTagEditor}
                resourceId={this.resource.id}/>
            }
          </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsTag.propTypes = {
  history: PropTypes.any,
  resourceWorkspaceContext: PropTypes.any,
};

export default withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsTag));
