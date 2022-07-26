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
import Icon from "../../../../shared/components/Icons/Icon";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

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
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              <Trans>Tags</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          <a className="section-action button button-transparent" onClick={this.toggleInputTagEditor}>
            <Icon name="edit"/>
            <span className="visuallyhidden"><Trans>Edit</Trans></span>
          </a>

          {!this.state.showTagEditor &&
          <EditResourceTagsItemViewer
            tags={tags}
            toggleInputTagEditor={this.toggleInputTagEditor}/>
          }

          {this.state.showTagEditor &&
          <EditResourceTags
            tags={tags}
            isOwner={isOwner}
            toggleInputTagEditor={this.toggleInputTagEditor}
            resourceId={this.resource.id}/>
          }

        </div>
      </div>
    );
  }
}

DisplayResourceDetailsTag.propTypes = {
  history: PropTypes.any,
  resourceWorkspaceContext: PropTypes.any,
};

export default withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsTag));
