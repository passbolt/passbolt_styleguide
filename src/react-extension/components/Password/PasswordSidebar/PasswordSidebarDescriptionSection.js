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
import Icon from "../../../../react/components/Common/Icons/Icon";
import DescriptionEditor from "./DescriptionEditor";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

/**
 * This component display the description section of a resource
 */
class PasswordSidebarDescriptionSection extends React.Component {
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
      showDescriptionEditor: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.toggleInputDescriptionEditor = this.toggleInputDescriptionEditor.bind(this);
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Returns the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Display or not the input tag editor
   */
  toggleInputDescriptionEditor() {
    if (this.canEdit()) {
      const showDescriptionEditor = !this.state.showDescriptionEditor;
      this.setState({showDescriptionEditor});
    }
  }

  /**
   * check if there is a no description
   * @returns {boolean}
   */
  hasNoDescription() {
    return !this.resource.description;
  }

  /**
   * check if the user edit the description
   * @returns {boolean}
   */
  canEdit() {
    return this.resource.permission && this.resource.permission.type >= 7;
  }

  mustShowDescriptionEditor() {
    return this.canEdit() && this.state.showDescriptionEditor;
  }

  mustShowEmptyDescriptionView() {
    return this.hasNoDescription() && !this.state.showDescriptionEditor;
  }

  mustShowDescriptionView() {
    return !this.hasNoDescription() && !this.state.showDescriptionEditor;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              Description
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
          {this.canEdit() &&
          <a className="section-action" onClick={this.toggleInputDescriptionEditor}>
            <Icon name="edit"></Icon>
            <span className="visuallyhidden">edit</span>
          </a>
          }

          {this.mustShowEmptyDescriptionView() && !this.canEdit() &&
          <em className="empty-content">There is no description</em>
          }
          {this.mustShowEmptyDescriptionView() && this.canEdit() &&
          <em className="empty-content" onClick={this.toggleInputDescriptionEditor}>There is no description yet, click
            here to add one</em>
          }
          {this.mustShowDescriptionView() &&
          <p className="description_content" onClick={this.toggleInputDescriptionEditor}>{this.resource.description}</p>
          }
          {this.mustShowDescriptionEditor() &&
          <DescriptionEditor
            description={this.resource.description}
            resource={this.resource}
            toggleInputDescriptionEditor={this.toggleInputDescriptionEditor}/>
          }
        </div>
      </div>
    );
  }
}

PasswordSidebarDescriptionSection.propTypes = {
  resourceWorkspaceContext: PropTypes.any, // The resource context
};

export default withResourceWorkspace(PasswordSidebarDescriptionSection);
