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
import {withTranslation} from "react-i18next";

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
      <div className={`${this.props.className} ${this.props.attentionRequired ? 'attention-required' : ''}`}>
        {shouldDisplayDefaultAvatar &&
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" aria-labelledby="svg-title">
            <title id="svg-title">{this.getAltText()}</title>
            <circle fill="#939598" cx="21" cy="21" r="21"/>
            <path fill="#ffffff" d="m21,23.04c-4.14,0-7.51-3.37-7.51-7.51s3.37-7.51,7.51-7.51,7.51,3.37,7.51,7.51-3.37,7.51-7.51,7.51Z"/>
            <path fill="#ffffff" d="m27.17,26.53h-12.33c-2.01,0-3.89.78-5.31,2.2-1.42,1.42-2.2,3.3-2.2,5.31v1.15c3.55,3.42,8.36,5.53,13.67,5.53s10.13-2.11,13.67-5.53v-1.15c0-2.01-.78-3.89-2.2-5.31-1.42-1.42-3.3-2.2-5.31-2.2Z"/>
          </svg>
        }
        {!shouldDisplayDefaultAvatar &&
          <img src={srcAvatar} onError={this.handleError} alt={this.getAltText()}/>
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
  className: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation('common')(UserAvatar);
