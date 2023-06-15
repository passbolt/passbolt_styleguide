
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
 * @since         2.13.0
 */

import React from 'react';
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withLoading} from "../../../contexts/LoadingContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withTranslation} from "react-i18next";


/**
 * This component displays the user profile theme
 */
class DisplayUserTheme extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      themes: [], // The list of available theme
      selectedTheme: null // The current user selected theme
    };
  }

  /**
   * Whenever the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.populate();
  }


  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleThemeSelected = this.handleThemeSelected.bind(this);
    this.onSelectSuccess = this.onSelectSuccess.bind(this);
    this.onSelectFailure = this.onSelectFailure.bind(this);
  }

  /**
   * Whenever the user select a theme
   * @param theme A theme
   */
  handleThemeSelected(theme) {
    this.select(theme);
  }

  /**
   * Populates the component with data
   * @returns {Promise<void>}
   */
  async populate() {
    this.props.loadingContext.add();
    const themes = await this.props.context.port.request('passbolt.themes.find-all');
    const selectedTheme = this.props.context.userSettings.getTheme();
    this.setState({themes, selectedTheme});
    this.props.loadingContext.remove();
  }

  /**
   * Selects a new theme
   * @param {string} theme the name of the selected theme
   */
  select(theme) {
    if (this.state.selectedTheme === theme.name) {
      return;
    }
    this.setState({selectedTheme: theme.name});
    this.props.context.port.request("passbolt.themes.change", theme.name)
      .then(this.onSelectSuccess)
      .catch(this.onSelectFailure);
  }

  /**
   * Whenever the a new theme has been selected with success
   * @returns {Promise<void>}
   */
  async onSelectSuccess() {
    await this.props.loadingContext.remove();
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The theme has been updated successfully"));
  }

  /**
   * Whenever the a new theme has been selected with failure
   * @param {object} error the error to display
   */
  async onSelectFailure(error) {
    await this.props.loadingContext.remove();
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Converts the given image theme preview URL to pick it from the browser extension.
   * @param {string} url
   * @returns {string}
   */
  convertUrlToWebAccessibleResources(url) {
    const regExp = /\/([a-zA-Z-_]*\.png)$/;
    const fileName = regExp.exec(url);
    return `/webAccessibleResources/img/themes/${fileName[1]}`;
  }

  /**
   * Render the component
   */
  render() {
    const selectedClass = theme => this.state.selectedTheme === theme.name ? 'selected' : '';
    return (
      <div className="grid grid-responsive-12">
        <div className="row">
          <div className="main-column">
            <h3>Theme</h3>
            <div className="themes">
              <div className="col12">
                <ul>
                  {
                    this.state.themes.map(theme => (
                      <li key={theme.id}>
                        <div className={`main-cell theme ${selectedClass(theme)}`}>
                          <button type="button" onClick={() => this.handleThemeSelected(theme)}>
                            <img src={this.convertUrlToWebAccessibleResources(theme.preview)}/>
                            <div className="theme-desc">
                              {theme.name}
                            </div>
                          </button>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserTheme.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  loadingContext: PropTypes.object, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withLoading(withTranslation('common')(DisplayUserTheme)))));



