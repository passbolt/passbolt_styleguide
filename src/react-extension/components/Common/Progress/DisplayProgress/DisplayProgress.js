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
 * @since         2.12.0
 */
import React, {Component} from "react";
import {withAppContext} from "../../../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class DisplayProgress extends Component {
  calculateProgress() {
    if (!this.props.context.progressDialogProps.goals) {
      return 100; // displays a spinning 100% progress bar by default.
    }

    const completed = this.props.context.progressDialogProps.completed || 0;
    let progress = Math.round((100 * completed) / this.props.context.progressDialogProps.goals);
    if (progress > 100) {
      progress = 100;
    }
    return progress;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    const displayDetailsSection = this.props.context.progressDialogProps.goals || false;
    const progress = this.calculateProgress();
    const progressBarStyle = {width: `${progress}%`};
    const progressLabelStyle = {float: "right"};

    return (
      <div className="dialog-wrapper progress-dialog">
        <div className="dialog">
          <div className="dialog-header">
            <h2>{this.props.context.progressDialogProps.title || this.translate("Please wait...") }</h2>
          </div>
          <div className="dialog-content">
            <div className="form-content">
              <label><Trans>Take a deep breath and enjoy being in the present moment...</Trans></label>
              <div className="progress-bar-wrapper">
                <span className="progress-bar big infinite" style={progressBarStyle}>
                  <span className="progress"></span>
                </span>
              </div>
              {displayDetailsSection &&
              <div className="progress-details">
                <span className="progress-step-label">&nbsp; {this.props.context.progressDialogProps.message ||  this.translate("Please wait...") }</span>
                <span style={progressLabelStyle} className="progress-percent">{progress}%</span>
              </div>
              }
            </div>
            <div className="submit-wrapper clearfix">
              <a className="button primary processing">&nbsp;</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayProgress.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayProgress));
