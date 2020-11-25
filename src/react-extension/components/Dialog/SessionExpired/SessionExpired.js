/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.14.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withRouter} from "react-router-dom";

/**
 * This component allows user to delete a tag of the resources
 */
class SessionExpired extends Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    this.goToLogin();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
    this.goToLogin();
  }

  /**
   * Go to the login page.
   */
  goToLogin() {
    this.props.history.push("/auth/login");
  }

  render() {
    return (
      <DialogWrapper
        title="Session Expired"
        onClose={this.handleCloseClick}
        className="session-expired-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>Your session has expired, you need to login</p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton value="Login"/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

SessionExpired.contextType = AppContext;

SessionExpired.propTypes = {
  onClose: PropTypes.func,
  history: PropTypes.any
};

export default withRouter(SessionExpired);
