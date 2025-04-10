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
import {withTranslation} from "react-i18next";
import UserAvatarSVG from "../../../../img/avatar/user_default.svg";
import AttentionSVG from "../../../../img/svg/attention.svg";

const DEFAULT_AVATAR_URL_REGEXP = /img\/avatar\/user(_medium)?\.png$/;

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
      error: false,
      isLoading: true,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleError = this.handleError.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
  }

  /**
   * Returns the current avatar URL from the props
   * @returns {string}
   */
  get avatarUrl() {
    return this.props?.user?.profile?.avatar?.url?.medium;
  }

  /**
   * Return true if the user from props contains a valid profile with avatar url properties
   * @returns {boolean}
   */
  propsHasUrl() {
    return Boolean(this.avatarUrl);
  }

  /**
   * Check if the url has a protocol like http or https?
   * @todo only check https for now
   * @returns {boolean}
   */
  propsUrlHasProtocol() {
    return this.avatarUrl.startsWith('https://')
      || this.avatarUrl.startsWith('http://');
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
   * Returns true if the given URL matches a default avatar from the API
   * @returns {boolean}
   */
  isDefaultAvatarUrlFromApi() {
    return DEFAULT_AVATAR_URL_REGEXP.test(this.avatarUrl);
  }

  /**
   * Get the user avatar url. If the user has no avatar defined, return the default one.
   * @returns {string}
   */
  getAvatarSrc() {
    if (!this.propsHasUrl()) {
      return null;
    }

    return this.propsUrlHasProtocol()
      ? this.avatarUrl
      : this.formatUrl(this.avatarUrl);
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
   * Handle loaded image event.
   * @return {void}
   */
  handleLoaded() {
    this.setState({isLoading: false});
  }

  /**
   * Get the user avatar image alternative text.
   * @returns {string}
   */
  getAltText() {
    const user = this.props?.user;
    if (!user?.first_name || !user?.last_name) {
      return '...';
    }
    return this.props.t('Avatar of user {{first_name}} {{last_name}}.', {firstname: user.first_name, lastname: user.last_name});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const srcAvatar = this.getAvatarSrc();
    const shouldDisplayDefaultAvatar = this.state.error || this.isDefaultAvatarUrlFromApi() || !srcAvatar;

    return (
      <div className={`${this.props.className}`}>
        <div className="default-avatar">
          {(shouldDisplayDefaultAvatar || this.state.isLoading) && <UserAvatarSVG/>}
          {!shouldDisplayDefaultAvatar && <img src={srcAvatar} className={this.state.isLoading ? "is-loading" : ""} onError={this.handleError} onLoad={this.handleLoaded} alt={this.getAltText()} />}
        </div>
        {this.props.attentionRequired &&
          <AttentionSVG className="attention-required"/>
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
  className: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation('common')(UserAvatar);
