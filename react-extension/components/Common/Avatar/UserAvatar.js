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
import React, {Component} from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";

class UserAvatar extends Component {
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
      error: false
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Return true if the user from props contains a valid profile with avatar url properties
   * @returns {boolean}
   */
  propsHasUrl() {
    return this.props.user &&
      this.props.user.profile &&
      this.props.user.profile.avatar &&
      this.props.user.profile.avatar.url &&
      this.props.user.profile.avatar.url.medium;
  }

  /**
   * Check if the url has a protocol like http or https?
   * @todo only check https for now
   * @returns {boolean}
   */
  propsUrlHasProtocol() {
    return this.props.user.profile.avatar.url.medium.startsWith('https://')
      || this.props.user.profile.avatar.url.medium.startsWith('http://');
  }

  /**
   * Format the avatar url to point on the site url.
   * @param {string} url The relative url
   * @returns {string}
   */
  formatUrl(url) {
    return `${this.props.baseUrl}/${url}`;
  }

  /**
   * Get the default avatar url
   * @returns {string}
   */
  getDefaultAvatarUrl() {
    return `${this.props.baseUrl}/img/avatar/user.png`;
  }

  /**
   * Get the user avatar url. If the user has no avatar defined, return the default one.
   * @returns {string}
   */
  getAvatarSrc() {
    if (!this.state.error && this.propsHasUrl()) {
      if (this.propsUrlHasProtocol()) {
        return this.props.user.profile.avatar.url.medium;
      } else {
        return this.formatUrl(this.props.user.profile.avatar.url.medium);
      }
    }
    return this.getDefaultAvatarUrl();
  }

  /**
   * Handle error while loading the user avatar image.
   * By instance when the image is not present on the server.
   * @return {void}
   */
  handleError() {
    console.error(`Could not load avatar image url: ${this.getAvatarSrc()}`);
    this.setState({error: true});
  }

  /**
   * Get the user avatar image alternative text.
   * @returns {string}
   */
  getAltText() {
    if (!this.props.user || !this.props.user.first_name || !this.props.user.last_name) {
      return '...';
    }
    return `Avatar of user ${this.props.user.first_name} ${this.props.user.last_name}.`;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className={`${this.props.className} ${this.props.attentionRequired ? 'attention-required' : ''}`}>
        {!this.state.error &&
        <img src={this.getAvatarSrc()} onError={this.handleError} alt={this.getAltText()}/>
        }
        {this.state.error &&
        <img src={this.getDefaultAvatarUrl()} alt={this.getAltText()}/>
        }
        {this.props.attentionRequired &&
        <Icon name="exclamation"/>
        }
      </div>
    );
  }
}

UserAvatar.defaultProps = {
  className: "avatar user-avatar"
};

UserAvatar.propTypes = {
  baseUrl: PropTypes.string,
  user: PropTypes.object,
  attentionRequired: PropTypes.bool,
  className: PropTypes.string
};

export default UserAvatar;
