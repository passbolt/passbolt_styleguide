/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import {
  withAdministrationHealthcheck
} from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import DisplayAdministrationHealthcheckActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationHealthcheckActions/DisplayAdministrationHealthcheckActions";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

class DisplayHealthcheckAdministration extends Component {
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
      data: null,
    };
  }

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationHealthcheckActions);
    await this.props.adminHealthcheckContext.loadHealthcheckData();
  }

  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminHealthcheckContext.clearContext();
  }

  get healthCheckData() {
    return this.props.adminHealthcheckContext.healthcheckData;
  }

  /**
   * Returns true if the given feature flag exists and is enabled
   * @param {string} featureFlag
   * @returns {boolean}
   */
  canIUse(featureFlag) {
    return Boolean(this.props.context.siteSettings?.canIUse(featureFlag));
  }

  /**
   * Returns true if the user has the user directory capability
   * @returns {boolean}
   */
  get isUserDirectoryEnabled() {
    return this.canIUse('directorySync');
  }


  /**
   * Can I use the sso plugin
   * @returns {boolean}
   */
  get canIUseSso() {
    return this.canIUse('sso');
  }



  render() {
    const healthcheckData = this.healthCheckData;

    /*
     * SSL VALIDATION
     */
    const peerIsValid = () => {
      if (healthcheckData.ssl.peerValid === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            SSL peer certificate validates
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            SSL peer certificate does not validate
            <Tooltip message={<span>Check <a href="https://help.passbolt.com/faq/hosting/troubleshoot-ssl" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const hostIsValid = () => {
      if (healthcheckData.ssl.hostValid === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Hostname is matching SSL certificate
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            Hostname does not match when validating certificates
            <Tooltip message={<span>Check <a href="https://help.passbolt.com/faq/hosting/troubleshoot-ssl" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isNotASelfSignedCertificate = () => {
      if (healthcheckData.ssl.notSelfSigned === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Not using a self-signed certificate
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            Using a self-signed certificate
          </span>
        );
      }
    };

    /*
     * DATABASE VALIDATION
     */
    const canConnectToDabase = () => {
      if (healthcheckData.database.connect === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The application is able to connect to the database
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The application is not able to connect to the database
            <Tooltip message={`Double check the host, database name, username and password in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const numberOfTables = () => {
      if (healthcheckData.database.connect === true && healthcheckData.database.tablesCount) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            {healthcheckData.database.info.tablesCount.toString()} tables found
          </span>
        );
      }
    };

    const isDefaultContentPresent = () => {
      if (healthcheckData.database.connect === true && healthcheckData.database.defaultContent === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Some default content is present
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            No default content found
            <Tooltip message={`Run the install script to set the dafault content such as roles and permission types`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    /*
     * CORE VALIDATION
     */
    const isDebugDisabled = () => {
      if (healthcheckData.core.debugDisabled === false) {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            Debug mode is on
            <Tooltip message={`Set debug = false; in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isCacheWorking = () => {
      if (healthcheckData.core.cache === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Cache is working
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            Cache is not working
            <Tooltip message={`Check the settings in config/app.php`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSaltUnique = () => {
      if (healthcheckData.core.salt === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Unique value set for security.salt
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            Default value found for security.salt
            <Tooltip message={`Edit the security.salt in config/app.php`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const fullBaseUrl = () => {
      if (healthcheckData.core.fullBaseUrl === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Full base url is set to {healthcheckData.core.info.fullBaseUrl.toString()}
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            Full base url is not set
            <Tooltip message={`Edit App.fullBaseUrl in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isValidFullBaseUrl = () => {
      if (healthcheckData.core.validFullBaseUrl === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            App.fullBaseUrl validation OK
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            App.fullBaseUrl does not validate
            <Tooltip message={`Edit App.fullBaseUrl in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isFullBaseUrlReachable = () => {
      if (healthcheckData.core.fullBaseUrlReachable === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            /healthcheck/status is reachable
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            Could not reach the /healthcheck/status with the url specified in App.fullBaseUrl
            <Tooltip message={`Check that the domain name is correct in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    /*
     * CONFIG FILE VALIDATION
     */
    const isAppConfigFilePresent = () => {
      if (healthcheckData.configFile.app === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            The application config file is present
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning" />
            The application config file is missing
            <Tooltip message={`Copy config/app.default.php to config/app.php`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isApiConfigFilePresent = () => {
      if (healthcheckData.configFile.passbolt === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            The passbolt config file is present
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning" />
            The passbolt config file is missing
            <Tooltip message={`Copy config/passbolt.default.php to config/passbolt.php`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    /*
     * ENVIRONMENT FILE VALIDATION
     */
    const whichPhpVersionIsInstalled = () => {
      if (healthcheckData.environment.info.phpVersion && healthcheckData.environment.phpVersion === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            PHP version {healthcheckData.environment.info.phpVersion.toString()}
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            PHP version is too low, passbolt need PHP 7.4 or higher
          </span>
        );
      }
    };

    const isPCREcompiled = () => {
      if (healthcheckData.environment.pcre === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            PCRE compiled with unicode support
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            PCRE has not been compiled with Unicode support
            <Tooltip message={`Recompile PCRE with Unicode support by adding --enable-unicode-properties when configuring.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isTmpWrittable = () => {
      if (healthcheckData.environment.tmpWritable === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The temporary directory and its content are writable and not executable
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The temporary directory and its content are not writable, or are executable
            <Tooltip message={`Ensure the temporary directory and its content are writable by the webserver user.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isLogWrittable = () => {
      if (healthcheckData.environment.logWritable === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            The logs directory and its content are writable
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The logs directory and its content are not writable
            <Tooltip message={`Ensure the temporary directory and its content are writable by the webserver user.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isImagickInstalled = () => {
      if (healthcheckData.environment.image === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            GD or Imagick extension is installed
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            You must enable the gd or imagick extensions to use Passbolt
            <Tooltip message={<span>See <a href="https://secure.php.net/manual/en/book.image.php" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isIntlInstalled = () => {
      if (healthcheckData.environment.intl === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
          Intl extension is installed
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close" />
            You must enable the intl extension to use Passbolt
            <Tooltip message={<span>See <a href="https://secure.php.net/manual/en/book.intl.php" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isMbStringInstalled = () => {
      if (healthcheckData.environment.mbstring === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            Mbstring extension is installed
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            You must enable the mbstring extension to use Passbolt
            <Tooltip message={<span>See <a href="https://secure.php.net/manual/en/book.mbstring.php" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    /*
     * GPG VALIDATION
     */
    const isGpgModuleInstalled = () => {
      if (healthcheckData.gpg.lib === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check" />
            PHP GPG Module is installed and loaded
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            PHP GPG Module is not installed or loaded
            <Tooltip message={<span>Install php-gnupg, see <a href="http://php.net/manual/en/gnupg.installation.php" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isGpgEnvSet = () => {
      if (healthcheckData.gpg.gpgHome === true && healthcheckData.gpg.info.gpgHome) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The environment variable GNUPGHOME is set to {healthcheckData.gpg.info.gpgHome.toString()}
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The environment variable GNUPGHOME is set to {healthcheckData.gpg.info.gpgHome.toString()}, but the directory does not exist
            <Tooltip message={`Ensure the keyring location exists and is accessible by the webserver user.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isKeyringWrittableByWebServer = () => {
      if (healthcheckData.gpg.gpgHomeWritable === true && healthcheckData.gpg.info.gpgHome) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The directory {healthcheckData.gpg.info.gpgHome.toString()} containing the keyring is writable by the webserver user
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The directory {healthcheckData.gpg.info.gpgHome.toString()} containing the keyring is not writable by the webserver user
            <Tooltip message={`Ensure the keyring location exists and is accessible by the webserver user.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isPublicKeyDefined = () => {
      if (healthcheckData.gpg.gpgKeyPublic === true && healthcheckData.gpg.gpgKeyPublicReadable === true && healthcheckData.gpg.gpgKeyPublicBlock) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The public key file is defined in {healthcheckData.application.configPath.toString()} and readable.
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The public key file is not defined in {healthcheckData.application.configPath.toString()} or not readable.
            <Tooltip message={`Ensure the public key file is defined by the variable passbolt.gpg.serverKey.public in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isPrivateKeyDefined = () => {
      if (healthcheckData.gpg.gpgKeyPrivate === true && healthcheckData.gpg.gpgKeyPrivateReadable === true && healthcheckData.gpg.gpgKeyPrivateBlock) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The private key file is defined in {healthcheckData.application.configPath.toString()} and readable.
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The private key file is not defined in {healthcheckData.application.configPath.toString()} or not readable.
            <Tooltip message={`Ensure the private key file is defined by the variable passbolt.gpg.serverKey.private in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isServerFingerprintMatchingConfigFile = () => {
      if (healthcheckData.gpg.gpgKeyPrivateFingerprint === true && healthcheckData.gpg.gpgKeyPublicFingerprint === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The server key fingerprint matches the one defined in {healthcheckData.application.configPath.toString()}
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The server key fingerprint doesn&#39;t matches the one defined in {healthcheckData.application.configPath.toString()}
            <Tooltip message={`Double check the key fingerprint`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isServerPublicKeyDefined = () => {
      if (healthcheckData.gpg.gpgKeyPublicInKeyring === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The server public key defined in the {healthcheckData.application.configPath.toString()} (or environment variables) is in the keyring
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The server public key defined in the {healthcheckData.application.configPath.toString()} (or environment variables) is not in the keyring
            <Tooltip message={`Import the private server key in the keyring of the webserver user.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const doesServerKeyHasValidEmail = () => {
      if (healthcheckData.gpg.gpgKeyPublicEmail === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            There is a valid email id defined for the server key
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The server key does not have a valid email id
            <Tooltip message={`Edit or generate another key with a valid email id.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const canGpgEncrypt = () => {
      if (healthcheckData.gpg.canEncrypt === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The public key can be used to encrypt a message
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The public key cannot be used to encrypt a message
          </span>
        );
      }
    };

    const canGpgSign = () => {
      if (healthcheckData.gpg.canSign === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The public key can be used to sign a message
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The public key cannot be used to sign a message
          </span>
        );
      }
    };

    const canPublicAndPrivateGpgKeysEncryptAndSign = () => {
      if (healthcheckData.gpg.canEncryptSign === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The public and private keys can be used to encrypt and sign a message
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The public and private keys cannot be used to encrypt and sign a message
          </span>
        );
      }
    };

    const canPrivateGpgKeysDecryptAndVerify = () => {
      if (healthcheckData.gpg.canDecryptVerify === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The private key can be used to decrypt and verify a message
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The private key cannot be used to decrypt and verify a message
          </span>
        );
      }
    };

    const canPublicKeyBeUsedToVerify = () => {
      if (healthcheckData.gpg.canVerify === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The public key can be used to verify a signature
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The public key cannot be used to verify a signature
          </span>
        );
      }
    };

    const isServerPublicKeyInGopenGpg = () => {
      if (healthcheckData.gpg.isPublicServerKeyGopengpgCompatible === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The server public key format is Gopengpg compatible
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The server public key format is not Gopengpg compatible
          </span>
        );
      }
    };

    const isServerPrivateKeyInGopenGpg = () => {
      if (healthcheckData.gpg.isPrivateServerKeyGopengpgCompatible === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The server private key format is Gopengpg compatible
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The server private key format is not Gopengpg compatible
          </span>
        );
      }
    };

    /*
     * APP VALIDATION
     */

    const isUsingLatestVersion = () => {
      if (healthcheckData.application.latestVersion === true && healthcheckData.application.info.remoteVersion) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Using latest passbolt version ({healthcheckData.application.info.remoteVersion.toString()})
          </span>
        );
      } else if (healthcheckData.application.latestVersion === false && healthcheckData.application.info.remoteVersion) {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            The installation is not up to date. Currently using {healthcheckData.application.info.currentVersion.toString()} and it should be {healthcheckData.application.info.remoteVersion.toString()}
            <Tooltip message={<span>See <a href="https://help.passbolt.com/hosting/update" target="_blank" rel="noopener noreferrer">this guide</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      } else if (healthcheckData.application.latestVersion === null && healthcheckData.application.info.remoteVersion === "undefined") {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            It seems that the server is not able to reach internet.
            <Tooltip message={<span>To confirm that you are running the latest version, check <a href="https://help.passbolt.com/releases/" target="_blank" rel="noopener noreferrer">all the releases notes</a></span>}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isForceSSLEnabled = () => {
      if (healthcheckData.application.sslForce === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Passbolt is configured to force SSL use
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            Passbolt is not configured to force SSL use
            <Tooltip message={`Set passbolt.ssl.force to true in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isFullBaseUrlSetToHTTPS = () => {
      if (healthcheckData.application.sslFullBaseUrl === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            App.fullBaseUrl is set to HTTPS
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            App.fullBaseUrl is not set to HTTPS
            <Tooltip message={`Check App.fullBaseUrl url scheme in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const areSeleniumEndpointsDisabled = () => {
      if (healthcheckData.application.seleniumDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Selenium API endpoints are disabled
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            Selenium API endpoints are active. This setting should be used for testing only
            <Tooltip message={`Set passbolt.selenium.active to false in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSearchEngineNotIndexingContent = () => {
      if (healthcheckData.application.robotsIndexDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Search engine robots are told not to index content
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            Search engine robots are not told not to index content
            <Tooltip message={`Set passbolt.meta.robots to false in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSelfRegistrationPluginEnabled = () => {
      if (healthcheckData.application.registrationClosed.isSelfRegistrationPluginEnabled === true) {
        return (
          <span className='healthcheck-info'>
            <Icon name="question-circle"/>
            The Self Registration plugin is enabled
          </span>
        );
      } else {
        return (
          <span className='healthcheck-info'>
            <Icon name="question-circle"/>
            The Self Registration plugin is disabled
            <Tooltip message={`Enable the plugin in order to define self registration settings.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isRegistrationClosed = () => {
      if (healthcheckData.application.registrationClosed.selfRegistrationProvider === null) {
        return (
          <span className='healthcheck-info'>
            <Icon name="question-circle"/>
            Registration is closed, only administrators can add users
          </span>
        );
      } else {
        return (
          <span className='healthcheck-info'>
            <Icon name="question-circle"/>
            The Self Registration provider is: {healthcheckData.application.registrationClosed.selfRegistrationProvider.toString()}
          </span>
        );
      }
    };

    const isRegistrationPublicRemovedFromPassbolt = () => {
      if (healthcheckData.application.registrationClosed.isRegistrationPublicRemovedFromPassbolt === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The deprecated self registration public settings was not found in {healthcheckData.application.configPath.toString()}
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            The deprecated self registration public settings was found in {healthcheckData.application.configPath.toString()}
            <Tooltip message={`You may remove the passbolt.registration.public setting`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isHostAvailabilityCheckEnabled = () => {
      if (healthcheckData.application.hostAvailabilityCheckEnabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Host availability will be checked
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            Host availability checking is disabled
            <Tooltip message={`Make sure the instance is not publicly available on the internet.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isJsAppServed = () => {
      if (healthcheckData.application.jsProd === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            Serving the compiled version of the javascript app
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            Using non-compiled Javascript. Passbolt will be slower
            <Tooltip message={`Set passbolt.js.build in ${healthcheckData.application.configPath.toString()}`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isEmailNotificationEnabled = () => {
      if (healthcheckData.application.emailNotificationEnabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            All email notifications will be sent
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            Some email notifications are disabled by the administrators
          </span>
        );
      }
    };

    /*
     * SMTP VALIDATION
     */

    const isSmtpPluginEnabled = () => {
      if (healthcheckData.smtpSettings.isEnabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The SMTP Settings plugin is enabled
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            The SMTP Settings plugin is disabled
          </span>
        );
      }
    };

    const isSmtpSettingsCoherent = () => {
      if (healthcheckData.smtpSettings.errorMessage === false) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            SMTP Settings coherent. You may send a test email to validate them
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <Icon name="close"/>
            SMTP Settings errors: {healthcheckData.smtpSettings.errorMessage.toString()}
          </span>
        );
      }
    };

    const whatIsSmtpSettingsSource = () => {
      if (healthcheckData.smtpSettings.source) {
        if (healthcheckData.smtpSettings.isInDb === true) {
          return (
            <span className='healthcheck-success'>
              <Icon name="check"/>
              The SMTP Settings source is: {healthcheckData.smtpSettings.source.toString()}
            </span>
          );
        } else {
          return (
            <span className='healthcheck-fail'>
              <Icon name="close"/>
            The SMTP Settings source is: {healthcheckData.smtpSettings.source.toString()}
              <Tooltip message={`It is recommended to set the SMTP Settings in the database through the administration section.`}>
                <Icon name='info-circle'/>
              </Tooltip>
            </span>
          );
        }
      }
    };


    const isSmtpEndpointsDisabled = () => {
      if (healthcheckData.smtpSettings.areEndpointsDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The SMTP Settings plugin endpoints are disabled
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            The SMTP Settings plugin endpoints are enabled
            <Tooltip message={`It is recommended to disable the plugin endpoints.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isDirectorySyncEndpointsDisabled = () => {
      if (healthcheckData.directorySync.endpointsDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            The endpoints for updating the users directory configurations are disabled.
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            The endpoints for updating the users directory configurations are enabled.
            <Tooltip message={`It is recommended to disable endpoints for updating the users directory configurations.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSSlCertificationValidationEnabled = () => {
      if (healthcheckData.sso.sslHostVerification === true) {
        return (
          <span className='healthcheck-success'>
            <Icon name="check"/>
            SSL certification validation for SSO instance is enabled.
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <Icon name="warning"/>
            SSL certification validation for SSO instance is disabled.
            <Tooltip message={`'Disabling the ssl verify check can lead to security attacks.`}>
              <Icon name='info-circle'/>
            </Tooltip>
          </span>
        );
      }
    };

    const renderHealthcheck = () => {
      if (!healthcheckData || this.props.adminHealthcheckContext.isProcessing())  {
        return (<Icon name="spinner" />);
      } else {
        return (
          <>
            <h4 className="no-border">Environment</h4>
            <div className="healthcheck-environment-section">
              <div>{whichPhpVersionIsInstalled()}</div>
              <div>{isPCREcompiled()}</div>
              <div>{isTmpWrittable()}</div>
              <div>{isLogWrittable()}</div>
              <div>{isImagickInstalled()}</div>
              <div>{isIntlInstalled()}</div>
              <div>{isMbStringInstalled()}</div>
            </div>

            <h4>Config files</h4>
            <div className="healthcheck-configFiles-section">
              <div>{isAppConfigFilePresent()}</div>
              <div>{isApiConfigFilePresent()}</div>
            </div>

            <h4>Core config</h4>
            <div className="healthcheck-core-section">
              {isDebugDisabled()}
              <div>{isCacheWorking()}</div>
              <div>{isSaltUnique()}</div>
              <div>{fullBaseUrl()}</div>
              <div>{isValidFullBaseUrl()}</div>
              <div>{isFullBaseUrlReachable()}</div>
            </div>

            <h4>SSL Certificate</h4>
            <div className="healthcheck-ssl-section">
              <div>{peerIsValid()}</div>
              <div>{hostIsValid()}</div>
              <div>{isNotASelfSignedCertificate()}</div>
            </div>

            <h4>Database</h4>
            <div className="healthcheck-database-section">
              <div>{canConnectToDabase()}</div>
              <div>{numberOfTables()}</div>
              <div>{isDefaultContentPresent()}</div>
            </div>

            <h4>GPG Configuration</h4>
            <div className="healthcheck-gpg-section">
              <div>{isGpgModuleInstalled()}</div>
              <div>{isGpgEnvSet()}</div>
              <div>{isKeyringWrittableByWebServer()}</div>
              <div>{isPublicKeyDefined()}</div>
              <div>{isPrivateKeyDefined()}</div>
              <div>{isServerFingerprintMatchingConfigFile()}</div>
              <div>{isServerPublicKeyDefined()}</div>
              <div>{doesServerKeyHasValidEmail()}</div>
              <div>{canGpgEncrypt()}</div>
              <div>{canGpgSign()}</div>
              <div>{canPublicAndPrivateGpgKeysEncryptAndSign()}</div>
              <div>{canPrivateGpgKeysDecryptAndVerify()}</div>
              <div>{canPublicKeyBeUsedToVerify()}</div>
              <div>{isServerPublicKeyInGopenGpg()}</div>
              <div>{isServerPrivateKeyInGopenGpg()}</div>
            </div>

            <h4>Application configuration</h4>
            <div className="healthcheck-app-section">
              <div>{isUsingLatestVersion()}</div>
              <div>{isForceSSLEnabled()}</div>
              <div>{isFullBaseUrlSetToHTTPS()}</div>
              <div>{areSeleniumEndpointsDisabled()}</div>
              <div>{isSearchEngineNotIndexingContent()}</div>
              <div>{isSelfRegistrationPluginEnabled()}</div>
              <div>{isRegistrationClosed()}</div>
              <div>{isRegistrationPublicRemovedFromPassbolt()}</div>
              <div>{isHostAvailabilityCheckEnabled()}</div>
              <div>{isJsAppServed()}</div>
              <div>{isEmailNotificationEnabled()}</div>
            </div>

            <h4>SMTP Settings</h4>
            <div className="healthcheck-smtp-section">
              <div>{isSmtpPluginEnabled()}</div>
              <div>{isSmtpSettingsCoherent()}</div>
              <div>{whatIsSmtpSettingsSource()}</div>
              <div>{isSmtpEndpointsDisabled()}</div>
            </div>

            {this.isUserDirectoryEnabled &&
              <>
                <h4>Directory Sync</h4>
                <div className="healthcheck-directorySync-section">
                  <div>{isDirectorySyncEndpointsDisabled()}</div>
                </div>
              </>
            }

            {this.canIUseSso &&
              <>
                <h4>SSO</h4>
                <div className="healthcheck-sso-section">
                  <div>{isSSlCertificationValidationEnabled()}</div>
                </div>
              </>
            }

          </>
        );
      }
    };

    const isEndpointEnabled = this.props.adminHealthcheckContext.isHealthcheckEndpointEnabled();
    return (
      <div className="row">
        <div className="healthcheck-settings col8 main-column">
          <h3>Passbolt API Status</h3>
          {isEndpointEnabled
            ? renderHealthcheck()
            : <div>
              <Trans>The health check API endpoint has been disabled in the server configuration.</Trans>
            </div>
          }
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>What is this page?</Trans></h3>
            <p><Trans>This page is available to help administrators diagnose if something is wrong with a passbolt installation and help keeping it secure.</Trans></p>
            <p><Trans>The color is really important here so it&apos;s easier for you to spot what&apos;s not running as expected</Trans></p>
            <div className="healthcheck-color-legends">
              <div className="healthcheck-success">
                <Icon name="check" width={18} height={18}/> Everything is running as expected.
              </div>
              <div className="healthcheck-warning">
                <Icon name="warning" width={18} height={18}/> Something inside your configuration is not what we recommend, but you can skip it if it has been done on purpose.
              </div>
              <div className="healthcheck-fail">
                <Icon name="close" width={18} height={18}/> There is an error with the current configuration, you might want to resolve it.
              </div>
              <div className="healthcheck-info">
                <Icon name="question-circle" width={18} height={18}/> This is just an information shared, no action is required.
              </div>
            </div>
          </div>
          <div className="sidebar-help">
            <h3><Trans>Something wrong?</Trans></h3>
            <p><Trans>Hang in there! Depending your installation, you might need to check the documentation in order to run the healthcheck from the CLI</Trans></p>
            <a className="button" href="https://www.passbolt.com/docs/admin/server-maintenance/passbolt-api-status/" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>

    );
  }
}


DisplayHealthcheckAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  adminHealthcheckContext: PropTypes.any, // The healthcheck context
  children: PropTypes.any, // The children components
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context,
  t: PropTypes.func, // translation function
};

export default withAppContext(withAdministrationWorkspace(withAdministrationHealthcheck(withTranslation('common')(DisplayHealthcheckAdministration))));
