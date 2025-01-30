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
import {Trans, withTranslation} from "react-i18next";
import DisplayAdministrationHealthcheckActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationHealthcheckActions/DisplayAdministrationHealthcheckActions";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import {createSafePortal} from "../../../../shared/utils/portals";
import HealthcheckSuccessSVG from "../../../../img/svg/healthcheck_success.svg";
import HealthcheckErrorSVG from "../../../../img/svg/healthcheck_error.svg";
import HealthcheckInfoSVG from "../../../../img/svg/healthcheck_info.svg";
import TriangleAlertSVG from "../../../../img/svg/triangle_alert.svg";
import FileTextSVG from "../../../../img/svg/file_text.svg";
import InfoSVG from "../../../../img/svg/info.svg";

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
            <HealthcheckSuccessSVG />
            <Trans>SSL peer certificate validates</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>SSL peer certificate does not validate</Trans>
            <Tooltip message={<span><Trans>Check <a href="https://help.passbolt.com/faq/hosting/troubleshoot-ssl" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const hostIsValid = () => {
      if (healthcheckData.ssl.hostValid === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Hostname is matching SSL certificate</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Hostname does not match when validating certificates</Trans>
            <Tooltip message={<span><Trans>Check <a href="https://help.passbolt.com/faq/hosting/troubleshoot-ssl" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isNotASelfSignedCertificate = () => {
      if (healthcheckData.ssl.notSelfSigned === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Not using a self-signed certificate</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>Using a self-signed certificate</Trans>
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
            <HealthcheckSuccessSVG />
            <Trans>The application is able to connect to the database</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The application is not able to connect to the database</Trans>
            <Tooltip message={<Trans>Double check the host, database name, username and password in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const numberOfTables = () => {
      if (healthcheckData.database.connect === true && healthcheckData.database.tablesCount) {
        const count = healthcheckData.database.info.tablesCount.toString();
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans count={count}>{{count}} tables found</Trans>
          </span>
        );
      }
    };

    const isDefaultContentPresent = () => {
      if (healthcheckData.database.connect === true && healthcheckData.database.defaultContent === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Some default content is present</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>No default content found</Trans>
            <Tooltip message={this.props.t("Run the install script to set the dafault content such as roles and permission types")}>
              <InfoSVG className="baseline svg-icon"/>
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
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Debug mode is on</Trans>
            <Tooltip message={<Trans>Set debug = false; in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isCacheWorking = () => {
      if (healthcheckData.core.cache === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Cache is working</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Cache is not working</Trans>
            <Tooltip message={this.props.t("Check the settings in config/app.php")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSaltUnique = () => {
      if (healthcheckData.core.salt === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Unique value set for security.salt</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Default value found for security.salt</Trans>
            <Tooltip message={this.props.t("Edit the security.salt in config/app.php")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const fullBaseUrl = () => {
      if (healthcheckData.core.fullBaseUrl === true) {
        const fullBaseUrl = healthcheckData.core.info.fullBaseUrl.toString();
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Full base url is set to {fullBaseUrl}</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Full base url is not set</Trans>
            <Tooltip message={<Trans>Edit App.fullBaseUrl in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isValidFullBaseUrl = () => {
      if (healthcheckData.core.validFullBaseUrl === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>App.fullBaseUrl validation OK</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>App.fullBaseUrl does not validate</Trans>
            <Tooltip message={<Trans>Edit App.fullBaseUrl in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isFullBaseUrlReachable = () => {
      if (healthcheckData.core.fullBaseUrlReachable === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>/healthcheck/status is reachable</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Could not reach the /healthcheck/status with the url specified in App.fullBaseUrl</Trans>
            <Tooltip message={<Trans>Check that the domain name is correct in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
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
            <HealthcheckSuccessSVG />
            <Trans>The application config file is present</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The application config file is missing</Trans>
            <Tooltip message={this.props.t("Copy config/app.default.php to config/app.php")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isApiConfigFilePresent = () => {
      if (healthcheckData.configFile.passbolt === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The passbolt config file is present</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The passbolt config file is missing</Trans>
            <Tooltip message={this.props.t("Copy config/passbolt.default.php to config/passbolt.php")}>
              <InfoSVG className="baseline svg-icon"/>
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
        const phpVersion = healthcheckData.environment.info.phpVersion.toString();
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>PHP version {{phpVersion}}</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>PHP version is too low, passbolt need PHP 7.4 or higher</Trans>
          </span>
        );
      }
    };

    const isPCREcompiled = () => {
      if (healthcheckData.environment.pcre === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>PCRE compiled with unicode support</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>PCRE has not been compiled with Unicode support</Trans>
            <Tooltip message={this.props.t("Recompile PCRE with Unicode support by adding --enable-unicode-properties when configuring.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isTmpWrittable = () => {
      if (healthcheckData.environment.tmpWritable === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The temporary directory and its content are writable and not executable</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The temporary directory and its content are not writable, or are executable</Trans>
            <Tooltip message={this.props.t("Ensure the temporary directory and its content are writable by the webserver user.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isLogWrittable = () => {
      if (healthcheckData.environment.logWritable === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The logs directory and its content are writable</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The logs directory and its content are not writable</Trans>
            <Tooltip message={this.props.t("Ensure the temporary directory and its content are writable by the webserver user.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isImagickInstalled = () => {
      if (healthcheckData.environment.image === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>GD or Imagick extension is installed</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>You must enable the gd or imagick extensions to use Passbolt</Trans>
            <Tooltip message={<span><Trans>See <a href="https://secure.php.net/manual/en/book.image.php" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isIntlInstalled = () => {
      if (healthcheckData.environment.intl === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Intl extension is installed</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>You must enable the intl extension to use Passbolt</Trans>
            <Tooltip message={<span><Trans>See <a href="https://secure.php.net/manual/en/book.intl.php" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isMbStringInstalled = () => {
      if (healthcheckData.environment.mbstring === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Mbstring extension is installed</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>You must enable the mbstring extension to use Passbolt</Trans>
            <Tooltip message={<span><Trans>See <a href="https://secure.php.net/manual/en/book.mbstring.php" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
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
            <HealthcheckSuccessSVG />
            <Trans>PHP GPG Module is installed and loaded</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>PHP GPG Module is not installed or loaded</Trans>
            <Tooltip message={<span><Trans>Install php-gnupg, see <a href="http://php.net/manual/en/gnupg.installation.php" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isGpgEnvSet = () => {
      const gpgHomeDirectory = healthcheckData.gpg.info.gpgHome.toString();
      if (healthcheckData.gpg.gpgHome === true && healthcheckData.gpg.info.gpgHome) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The environment variable GNUPGHOME is set to {gpgHomeDirectory}</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The environment variable GNUPGHOME is set to {gpgHomeDirectory} but the directory does not exist</Trans>
            <Tooltip message={this.props.t("Ensure the keyring location exists and is accessible by the webserver user.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isKeyringWrittableByWebServer = () => {
      const gpgHomeDirectory = healthcheckData.gpg.info.gpgHome.toString();
      if (healthcheckData.gpg.gpgHomeWritable === true && healthcheckData.gpg.info.gpgHome) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The directory {gpgHomeDirectory} containing the keyring is writable by the webserver user</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The directory {gpgHomeDirectory} containing the keyring is not writable by the webserver user</Trans>
            <Tooltip message={this.props.t("Ensure the keyring location exists and is accessible by the webserver user.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isPublicKeyDefined = () => {
      const configurationFilePath = healthcheckData.application.configPath.toString();
      if (healthcheckData.gpg.gpgKeyPublic === true && healthcheckData.gpg.gpgKeyPublicReadable === true && healthcheckData.gpg.gpgKeyPublicBlock) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The public key file is defined in {configurationFilePath} and readable.</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The public key file is not defined in {configurationFilePath} or not readable.</Trans>
            <Tooltip message={<Trans>Ensure the public key file is defined by the variable passbolt.gpg.serverKey.public in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isPrivateKeyDefined = () => {
      const configurationFilePath = healthcheckData.application.configPath.toString();
      if (healthcheckData.gpg.gpgKeyPrivate === true && healthcheckData.gpg.gpgKeyPrivateReadable === true && healthcheckData.gpg.gpgKeyPrivateBlock) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The private key file is defined in {configurationFilePath} and readable.</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The private key file is not defined in {configurationFilePath} or not readable.</Trans>
            <Tooltip message={<Trans>Ensure the private key file is defined by the variable passbolt.gpg.serverKey.private in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isServerFingerprintMatchingConfigFile = () => {
      const configurationFilePath = healthcheckData.application.configPath.toString();
      if (healthcheckData.gpg.gpgKeyPrivateFingerprint === true && healthcheckData.gpg.gpgKeyPublicFingerprint === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The server key fingerprint matches the one defined in {configurationFilePath}</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The server key fingerprint doesn&#39;t matches the one defined in {configurationFilePath}</Trans>
            <Tooltip message={this.props.t("Double check the key fingerprint")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isServerPublicKeyDefined = () => {
      const configurationFilePath = healthcheckData.application.configPath.toString();
      if (healthcheckData.gpg.gpgKeyPublicInKeyring === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The server public key defined in the {configurationFilePath} (or environment variables) is in the keyring</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The server public key defined in the {configurationFilePath} (or environment variables) is not in the keyring</Trans>
            <Tooltip message={this.props.t("Import the private server key in the keyring of the webserver user.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const doesServerKeyHasValidEmail = () => {
      if (healthcheckData.gpg.gpgKeyPublicEmail === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>There is a valid email id defined for the server key</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The server key does not have a valid email id</Trans>
            <Tooltip message={this.props.t("Edit or generate another key with a valid email id.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const canGpgEncrypt = () => {
      if (healthcheckData.gpg.canEncrypt === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The public key can be used to encrypt a message</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The public key cannot be used to encrypt a message</Trans>
          </span>
        );
      }
    };

    const canGpgSign = () => {
      if (healthcheckData.gpg.canSign === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The public key can be used to sign a message</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The public key cannot be used to sign a message</Trans>
          </span>
        );
      }
    };

    const canPublicAndPrivateGpgKeysEncryptAndSign = () => {
      if (healthcheckData.gpg.canEncryptSign === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The public and private keys can be used to encrypt and sign a message</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The public and private keys cannot be used to encrypt and sign a message</Trans>
          </span>
        );
      }
    };

    const canPrivateGpgKeysDecryptAndVerify = () => {
      if (healthcheckData.gpg.canDecryptVerify === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The private key can be used to decrypt and verify a message</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The private key cannot be used to decrypt and verify a message</Trans>
          </span>
        );
      }
    };

    const canPublicKeyBeUsedToVerify = () => {
      if (healthcheckData.gpg.canVerify === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The public key can be used to verify a signature</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The public key cannot be used to verify a signature</Trans>
          </span>
        );
      }
    };

    const isServerPublicKeyInGopenGpg = () => {
      if (healthcheckData.gpg.isPublicServerKeyGopengpgCompatible === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The server public key format is Gopengpg compatible</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The server public key format is not Gopengpg compatible</Trans>
          </span>
        );
      }
    };

    const isServerPrivateKeyInGopenGpg = () => {
      if (healthcheckData.gpg.isPrivateServerKeyGopengpgCompatible === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The server private key format is Gopengpg compatible</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The server private key format is not Gopengpg compatible</Trans>
          </span>
        );
      }
    };

    /*
     * APP VALIDATION
     */

    const isUsingLatestVersion = () => {
      if (healthcheckData.application.latestVersion === true && healthcheckData.application.info.remoteVersion) {
        const version = healthcheckData.application.info.remoteVersion.toString();
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Using latest passbolt version ({{version}})</Trans>
          </span>
        );
      } else if (healthcheckData.application.latestVersion === false && healthcheckData.application.info.remoteVersion) {
        const currentVersion = healthcheckData.application.info.currentVersion.toString();
        const latestAvailableVersion = healthcheckData.application.info.remoteVersion.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>The installation is not up to date. Currently using {{currentVersion}} and it should be {{latestAvailableVersion}}</Trans>
            <Tooltip message={<span><Trans>See <a href="https://help.passbolt.com/hosting/update" target="_blank" rel="noopener noreferrer">this guide</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      } else if (healthcheckData.application.latestVersion === null && healthcheckData.application.info.remoteVersion === "undefined") {
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>It seems that the server is not able to reach internet.</Trans>
            <Tooltip message={<span><Trans>To confirm that you are running the latest version, check <a href="https://help.passbolt.com/releases/" target="_blank" rel="noopener noreferrer">all the releases notes</a></Trans></span>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isForceSSLEnabled = () => {
      if (healthcheckData.application.sslForce === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Passbolt is configured to force SSL use</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Passbolt is not configured to force SSL use</Trans>
            <Tooltip message={<Trans>Set passbolt.ssl.force to true in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isFullBaseUrlSetToHTTPS = () => {
      if (healthcheckData.application.sslFullBaseUrl === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>App.fullBaseUrl is set to HTTPS</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>App.fullBaseUrl is not set to HTTPS</Trans>
            <Tooltip message={<Trans>Check App.fullBaseUrl url scheme in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const areSeleniumEndpointsDisabled = () => {
      if (healthcheckData.application.seleniumDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Selenium API endpoints are disabled</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Selenium API endpoints are active. This setting should be used for testing only</Trans>
            <Tooltip message={<Trans>Set passbolt.selenium.active to false in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSearchEngineNotIndexingContent = () => {
      if (healthcheckData.application.robotsIndexDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Search engine robots are told not to index content</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>Search engine robots are not told not to index content</Trans>
            <Tooltip message={<Trans>Set passbolt.meta.robots to false in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSelfRegistrationPluginEnabled = () => {
      if (healthcheckData.application.registrationClosed.isSelfRegistrationPluginEnabled === true) {
        return (
          <span className='healthcheck-info'>
            <HealthcheckInfoSVG />
            <Trans>The Self Registration plugin is enabled</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-info'>
            <HealthcheckInfoSVG />
            <Trans>The Self Registration plugin is disabled</Trans>
            <Tooltip message={this.props.t("Enable the plugin in order to define self registration settings.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isRegistrationClosed = () => {
      if (healthcheckData.application.registrationClosed.selfRegistrationProvider === null) {
        return (
          <span className='healthcheck-info'>
            <HealthcheckInfoSVG />
            <Trans>Registration is closed, only administrators can add users</Trans>
          </span>
        );
      } else {
        const selfRegistrationProvider = healthcheckData.application.registrationClosed.selfRegistrationProvider.toString();
        return (
          <span className='healthcheck-info'>
            <HealthcheckInfoSVG />
            <Trans>The Self Registration provider is: {{selfRegistrationProvider}}</Trans>
          </span>
        );
      }
    };

    const isRegistrationPublicRemovedFromPassbolt = () => {
      const configurationFilePath = healthcheckData.application.configPath.toString();
      if (healthcheckData.application.registrationClosed.isRegistrationPublicRemovedFromPassbolt === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The deprecated self registration public settings was not found in {configurationFilePath}</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The deprecated self registration public settings was found in {configurationFilePath}</Trans>
            <Tooltip message={this.props.t("You may remove the passbolt.registration.public setting")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isHostAvailabilityCheckEnabled = () => {
      if (healthcheckData.application.hostAvailabilityCheckEnabled === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Host availability will be checked</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>Host availability checking is disabled</Trans>
            <Tooltip message={this.props.t("Make sure the instance is not publicly available on the internet.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isJsAppServed = () => {
      if (healthcheckData.application.jsProd === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>Serving the compiled version of the javascript app</Trans>
          </span>
        );
      } else {
        const configurationFilePath = healthcheckData.application.configPath.toString();
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>Using non-compiled Javascript. Passbolt will be slower</Trans>
            <Tooltip message={<Trans>Set passbolt.js.build in {configurationFilePath}</Trans>}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isEmailNotificationEnabled = () => {
      if (healthcheckData.application.emailNotificationEnabled === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>All email notifications will be sent</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>Some email notifications are disabled by the administrators</Trans>
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
            <HealthcheckSuccessSVG />
            <Trans>The SMTP Settings plugin is enabled</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The SMTP Settings plugin is disabled</Trans>
          </span>
        );
      }
    };

    const isSmtpSettingsCoherent = () => {
      if (healthcheckData.smtpSettings.errorMessage === false) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>SMTP Settings coherent. You may send a test email to validate them</Trans>
          </span>
        );
      } else {
        const errorMessage = healthcheckData.smtpSettings.errorMessage.toString();
        return (
          <span className='healthcheck-fail'>
            <HealthcheckErrorSVG />
            <Trans>SMTP Settings errors: {{errorMessage}}</Trans>
          </span>
        );
      }
    };

    const whatIsSmtpSettingsSource = () => {
      if (healthcheckData.smtpSettings.source) {
        const smtpSettingsSource = healthcheckData.smtpSettings.source.toString();
        if (healthcheckData.smtpSettings.isInDb === true) {
          return (
            <span className='healthcheck-success'>
              <HealthcheckSuccessSVG />
              <Trans>The SMTP Settings source is: {{smtpSettingsSource}}</Trans>
            </span>
          );
        } else {
          return (
            <span className='healthcheck-fail'>
              <HealthcheckErrorSVG />
              <Trans>The SMTP Settings source is: {{smtpSettingsSource}}</Trans>
              <Tooltip message={this.props.t("It is recommended to set the SMTP Settings in the database through the administration section.")}>
                <InfoSVG className="baseline svg-icon"/>
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
            <HealthcheckSuccessSVG />
            <Trans>The SMTP Settings plugin endpoints are disabled</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The SMTP Settings plugin endpoints are enabled</Trans>
            <Tooltip message={this.props.t("It is recommended to disable the plugin endpoints.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isDirectorySyncEndpointsDisabled = () => {
      if (healthcheckData.directorySync.endpointsDisabled === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>The endpoints for updating the users directory configurations are disabled.</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>The endpoints for updating the users directory configurations are enabled.</Trans>
            <Tooltip message={this.props.t("It is recommended to disable endpoints for updating the users directory configurations.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const isSSlCertificationValidationEnabled = () => {
      if (healthcheckData.sso.sslHostVerification === true) {
        return (
          <span className='healthcheck-success'>
            <HealthcheckSuccessSVG />
            <Trans>SSL certification validation for SSO instance is enabled.</Trans>
          </span>
        );
      } else {
        return (
          <span className='healthcheck-warning'>
            <TriangleAlertSVG />
            <Trans>SSL certification validation for SSO instance is disabled.</Trans>
            <Tooltip message={this.props.t("Disabling the ssl verify check can lead to security attacks.")}>
              <InfoSVG className="baseline svg-icon"/>
            </Tooltip>
          </span>
        );
      }
    };

    const renderHealthcheck = () => {
      if (!healthcheckData || this.props.adminHealthcheckContext.isProcessing())  {
        return (<SpinnerSVG/>);
      } else {
        return (
          <>
            <h4 className="no-border"><Trans>Environment</Trans></h4>
            <div className="healthcheck-environment-section">
              <div>{whichPhpVersionIsInstalled()}</div>
              <div>{isPCREcompiled()}</div>
              <div>{isTmpWrittable()}</div>
              <div>{isLogWrittable()}</div>
              <div>{isImagickInstalled()}</div>
              <div>{isIntlInstalled()}</div>
              <div>{isMbStringInstalled()}</div>
            </div>

            <h4><Trans>Config files</Trans></h4>
            <div className="healthcheck-configFiles-section">
              <div>{isAppConfigFilePresent()}</div>
              <div>{isApiConfigFilePresent()}</div>
            </div>

            <h4><Trans>Core config</Trans></h4>
            <div className="healthcheck-core-section">
              <div>{isDebugDisabled()}</div>
              <div>{isCacheWorking()}</div>
              <div>{isSaltUnique()}</div>
              <div>{fullBaseUrl()}</div>
              <div>{isValidFullBaseUrl()}</div>
              <div>{isFullBaseUrlReachable()}</div>
            </div>

            <h4><Trans>SSL Certificate</Trans></h4>
            <div className="healthcheck-ssl-section">
              <div>{peerIsValid()}</div>
              <div>{hostIsValid()}</div>
              <div>{isNotASelfSignedCertificate()}</div>
            </div>

            <h4><Trans>Database</Trans></h4>
            <div className="healthcheck-database-section">
              <div>{canConnectToDabase()}</div>
              <div>{numberOfTables()}</div>
              <div>{isDefaultContentPresent()}</div>
            </div>

            <h4><Trans>GPG Configuration</Trans></h4>
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

            <h4><Trans>Application configuration</Trans></h4>
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

            <h4><Trans>SMTP Settings</Trans></h4>
            <div className="healthcheck-smtp-section">
              <div>{isSmtpPluginEnabled()}</div>
              <div>{isSmtpSettingsCoherent()}</div>
              <div>{whatIsSmtpSettingsSource()}</div>
              <div>{isSmtpEndpointsDisabled()}</div>
            </div>

            {this.isUserDirectoryEnabled &&
              <>
                <h4><Trans>Directory Sync</Trans></h4>
                <div className="healthcheck-directorySync-section">
                  <div>{isDirectorySyncEndpointsDisabled()}</div>
                </div>
              </>
            }

            {this.canIUseSso &&
              <>
                <h4><Trans>SSO</Trans></h4>
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
        <div className="healthcheck-settings main-column">
          <div className="main-content">
            <h3><Trans>Passbolt API Status</Trans></h3>
            {isEndpointEnabled
              ? renderHealthcheck()
              : <div>
                <Trans>The health check API endpoint has been disabled in the server configuration.</Trans>
              </div>
            }
          </div>
          {createSafePortal(
            <>
              <div className="sidebar-help-section">
                <h3><Trans>What is this page?</Trans></h3>
                <p><Trans>This page is available to help administrators diagnose if something is wrong with a passbolt installation and help keeping it secure.</Trans></p>
                <p><Trans>The color is really important here so it&apos;s easier for you to spot what&apos;s not running as expected</Trans></p>
                <div className="healthcheck-color-legends">
                  <div className="healthcheck-success">
                    <HealthcheckSuccessSVG /> <Trans>Everything is running as expected.</Trans>
                  </div>
                  <div className="healthcheck-warning">
                    <TriangleAlertSVG /> <Trans>Something inside your configuration is not what we recommend, but you can skip it if it has been done on purpose.</Trans>
                  </div>
                  <div className="healthcheck-fail">
                    <HealthcheckErrorSVG /> <Trans>There is an error with the current configuration, you might want to resolve it.</Trans>
                  </div>
                  <div className="healthcheck-info">
                    <HealthcheckInfoSVG /> <Trans>This is just an information shared, no action is required.</Trans>
                  </div>
                </div>
              </div>
              <div className="sidebar-help-section">
                <h3><Trans>Something wrong?</Trans></h3>
                <p><Trans>Hang in there! Depending your installation, you might need to check the documentation in order to run the healthcheck from the CLI</Trans></p>
                <a className="button" href="https://www.passbolt.com/docs/admin/server-maintenance/passbolt-api-status/" target="_blank" rel="noopener noreferrer">
                  <FileTextSVG />
                  <span><Trans>Read the documentation</Trans></span>
                </a>
              </div>
            </>,
            document.getElementById("administration-help-panel")
          )}
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
