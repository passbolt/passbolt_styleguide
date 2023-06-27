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
 * @since         3.10.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import ApiError from "./ApiError/ApiError";
import ApiSuccess from "./ApiSuccess/ApiSuccess";

const ApiFeedbackOrchestratorStates = {
  LOADING: "loading",
  ERROR: "Error",
  SUCCESS: "Success"
};

class ApiFeedbackOrchestrator extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  get defaultState() {
    return {
      state: ApiFeedbackOrchestratorStates.LOADING,
      message: null,
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    const errorNode = document.getElementById("api-error-details");
    const successNode = document.getElementById("api-success");

    if (errorNode) {
      this.setState({
        state: ApiFeedbackOrchestratorStates.ERROR,
        message: errorNode?.textContent
      });
    } else {
      this.setState({
        state: ApiFeedbackOrchestratorStates.SUCCESS,
        message: successNode?.textContent
      });
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    switch (this.state.state) {
      case ApiFeedbackOrchestratorStates.LOADING:
        return <></>;
      case ApiFeedbackOrchestratorStates.ERROR:
        return <ApiError
          message={this.state.message}
        />;
      case ApiFeedbackOrchestratorStates.SUCCESS:
        return <ApiSuccess
          message={this.state.message}
        />;
    }
  }
}

ApiFeedbackOrchestrator.propTypes = {
  t: PropTypes.func // the translation function
};

export default withTranslation("common")(ApiFeedbackOrchestrator);
