/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2019 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";

class DefineResourceFolderMoveStrategy extends Component {
  /**
   * Constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props) {
    super(props);
    this.state = this.getStateBasedOnContext(props,  this.getDefaultState());
    this.moveOptionChangeRef = React.createRef();
    this.moveOptionKeepRef = React.createRef();
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.setState({loading: false, moveOption: 'change'});
    this.moveOptionChangeRef.current.focus();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,
      moveOption: 'change',

      // Cascade checkbox
      cascade: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Return default state based on context and props
   * For example if folder doesn't exist then we show an error message
   * Otherwise set the input name value
   *
   * @param props
   * @param defaultState
   * @returns {*}
   */
  getStateBasedOnContext(props, defaultState) {
    const folders = props.context.folders;
    const error = {
      message: this.translate("The folder could not be found. Maybe it was deleted or you lost access.")
    };

    if (!folders) {
      console.error(`No folders context defined.`);
      this.handleError(error);
    }

    const folder = props.context.folders.find(item => item.id === this.props.context.folderMoveStrategyProps.folders[0]) || false;
    if (!folder) {
      console.error(`Folder ${this.props.context.folderMoveStrategyProps.folders[0]} not found in context.`);
      this.handleError(error);
    } else {
      defaultState.name = folder.name;
    }
    return defaultState;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.processing) {
      return;
    }

    await this.toggleProcessing();

    try {
      await this.props.context.port.emit(this.props.context.folderMoveStrategyProps.requestId, "SUCCESS", {moveOption: this.state.moveOption});
      this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  handleSaveSuccess() {
    this.props.context.setContext({folderMoveStrategyProps: {}});
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    if (this.state.processing) {
      return;
    }
    const error = new UserAbortsOperationError(this.translate("The dialog has been closed."));
    this.props.context.port.emit(this.props.context.folderMoveStrategyProps.requestId, "ERROR", error);
    this.props.context.setContext({folderMoveStrategyProps: {}});
    this.props.onClose();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Return an intro message explaining the context of the move to the user
   * @returns {string}
   */
  getIntroMessage() {
    let message = '';
    if (this.isAboutItems()) {
      message = <Trans>You are about to move several items.</Trans>;
    } else if (this.isAboutAFolder()) {
      message = <Trans>You are about to move a folder.</Trans>;
    } else if (this.isAboutFolders()) {
      message = <Trans>You are about to move several folders.</Trans>;
    } else if (this.isAboutAResource()) {
      message = <Trans>You are about to move one resource.</Trans>;
    } else {
      message = <Trans>You are about to move several resources.</Trans>;
    }
    message = <span>{message} <Trans>The permissions do not match the destination folder permissions.</Trans></span>;
    return message;
  }

  /**
   * Is this share screen handling sharing of multiple Acos?
   * @returns {boolean}
   */
  isAboutItems() {
    return this.props.context.folderMoveStrategyProps.resources
      && this.props.context.folderMoveStrategyProps.folders
      && this.props.context.folderMoveStrategyProps.resources.length
      && this.props.context.folderMoveStrategyProps.folders.length;
  }

  /**
   * Is this share screen handling sharing of multiple resources?
   * @returns {boolean}
   */
  isAboutResources() {
    return this.props.context.folderMoveStrategyProps.resources && this.props.context.folderMoveStrategyProps.resources.length > 1;
  }

  /**
   * Is this share screen handling sharing of multiple folders?
   * @returns {boolean}
   */
  isAboutFolders() {
    return this.props.context.folderMoveStrategyProps.folders && this.props.context.folderMoveStrategyProps.folders.length > 1;
  }

  /**
   * Is this share screen handling sharing one folder?
   * @returns {boolean}
   */
  isAboutAFolder() {
    return this.props.context.folderMoveStrategyProps.folders && this.props.context.folderMoveStrategyProps.folders.length === 1;
  }

  /**
   * Is this share screen handling sharing one resource?
   * @returns {boolean}
   */
  isAboutAResource() {
    return this.props.context.folderMoveStrategyProps.resources && this.props.context.folderMoveStrategyProps.resources.length === 1;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper className='move-folder-strategy-dialog' title={this.translate("How do you want to proceed?")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="folder-create-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>{this.getIntroMessage()}</p>
            <div className="radiolist-alt">
              <div className={`input radio ${this.state.moveOption === "change" ? 'checked' : ''}`}>
                <input name="moveOption" value="change" id="moveOptionChange" type="radio"
                  onChange={this.handleInputChange} ref={this.moveOptionChangeRef} checked={this.state.moveOption === 'change'} />
                <label htmlFor="moveOptionChange">
                  <span className="name"><Trans>Change permissions</Trans></span>
                  <span className="info"><Trans>Remove old inherited permissions and apply the new destination folder permissions recursively.</Trans></span>
                </label>
              </div>
              <div className={`input radio last ${this.state.moveOption === "keep" ? 'checked' : ''}`}>
                <input name="moveOption" value="keep" id="moveOptionKeep" type="radio"
                  onChange={this.handleInputChange} ref={this.moveOptionKeepRef}  checked={this.state.moveOption === 'keep'}/>
                <label htmlFor="moveOptionKeep">
                  <span className="name"><Trans>Keep existing permissions</Trans></span>
                  <span className="info"><Trans>Keep the original permissions, do not apply the destination folder permissions.</Trans></span>
                </label>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Move")} />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DefineResourceFolderMoveStrategy.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withTranslation('common')(DefineResourceFolderMoveStrategy)));
