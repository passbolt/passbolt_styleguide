/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import DisplayInFormMenuItem from "./DisplayInFormMenuItem";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPasswordPolicies} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {
  withResourceTypesLocalStorage
} from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import DiceSVG from "../../../img/svg/dice.svg";
import AddSVG from "../../../img/svg/add.svg";
import SearchSVG from "../../../img/svg/search.svg";
import ResourceIcon from "../../../shared/components/Icons/ResourceIcon";
import {
  withMetadataKeysSettingsLocalStorage
} from "../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";

/** The maximum length of visibility of a generated password */
const TRUNCATED_GENERATED_PASSWORD_MAX_LENGTH = 15;

/**
 * This component is a menu integrated into a target web page which includes
 * an identified authentication form. After the call-to-action performed,
 * the menu proposes different available actions given the situation
 */
class DisplayInFormMenu extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.inFormMenuRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleDisplayConfigurationReceivedEvent();
    document.addEventListener('click', this.handleInFormMenuClickEvent, {capture: true});
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleInFormMenuClickEvent, {capture: true});
  }

  /**
   * Handle click events on in form menu. close the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleInFormMenuClickEvent(event) {
    // Prevent close when the user click on an element of the in form menu
    if (this.inFormMenuRef.current.contains(event.target)) {
      return;
    }
    this.props.context.port.request('passbolt.in-form-menu.close');
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
    this.handleInFormMenuClickEvent = this.handleInFormMenuClickEvent.bind(this);

    this.handleCreateNewCredentialsRequestedEvent = this.handleCreateNewCredentialsRequestedEvent.bind(this);
    this.handleSaveCredentialsRequestedEvent = this.handleSaveCredentialsRequestedEvent.bind(this);
    this.handleBrowseCredentialsRequestedEvent = this.handleBrowseCredentialsRequestedEvent.bind(this);
    this.handleUseSuggestedResourceRequestedEvent = this.handleUseSuggestedResourceRequestedEvent.bind(this);
    this.handleGeneratePasswordRequestedEvent = this.handleGeneratePasswordRequestedEvent.bind(this);
  }

  /**
   * The component default state
   */
  get defaultState() {
    return {
      configuration: {
        inputType: null, // Input inputType attached to the menu
        inputValue: null, // Input inputValue attached to the menu
        suggestedResources: null, // Suggested resources to display
      }, // The display configuration of the menu
      generatedPassword: null, // Generated password
      resourceIdProcessing: null, // The resource id processing
    };
  }

  /**
   * Returns true if the component has a display configuration
   */
  get hasConfiguration() {
    return Boolean(this.state.configuration) && Boolean(this.state.configuration.inputType);
  }

  /**
   * Returns true if the component has a "username" display configuration
   */
  get isUsernameConfiguration() {
    return this.state.configuration.inputType === 'username';
  }

  /**
   * Returns true if the username field has been (
   */
  get isUsernameFilled() {
    return this.state.configuration.inputValue && this.state.configuration.inputValue !== '';
  }

  /**
   * Returns true if the component has a "password" display configuration
   */
  get isPasswordConfiguration() {
    return this.state.configuration.inputType === 'password';
  }

  /**
   * Returns true if the password field has been (
   */
  get isPasswordFilled() {
    return this.state.configuration.inputValue && this.state.configuration.inputValue !== '';
  }

  /**
   * Returns the list of the menu items to display
   */
  get items() {
    if (this.hasConfiguration) {
      if (this.isUsernameConfiguration) {
        return this.isUsernameFilled ? this.filledUsernameMenuItems : this.emptyUsernameMenuItems;
      } else if (this.isPasswordConfiguration) {
        return this.isPasswordFilled ? this.filledPasswordMenuItems : this.emptyPasswordMenuItems;
      }
    }
    return [];
  }

  /**
   * Returns the truncated version of generated password
   */
  get truncatedGeneratedPassword() {
    if (this.state.generatedPassword) {
      const uplimitIndex = Math.min(TRUNCATED_GENERATED_PASSWORD_MAX_LENGTH, Math.floor(this.state.generatedPassword.length / 2));
      return this.state.generatedPassword.substring(0, uplimitIndex);
    }
    return this.state.generatedPassword;
  }

  /**
   * Returns the list of menu items in case of filled username configuration
   * @return {JSX.Element[]}
   */
  get filledUsernameMenuItems() {
    const usernameMenuItems = this.suggestedResourcesItems;
    if (this.hasMetadataTypesSettings() && this.canCreatePassword()) {
      usernameMenuItems.push(this.saveAsNewCredentialItem);
    }
    usernameMenuItems.push(this.browseCredentialsItem);
    return usernameMenuItems;
  }

  /**
   * Returns the list of menu items in case of empty username configuration
   * @return {JSX.Element[]}
   */
  get emptyUsernameMenuItems() {
    const usernameMenuItems = this.suggestedResourcesItems;
    if (this.hasMetadataTypesSettings() && this.canCreatePassword()) {
      usernameMenuItems.push(this.createNewCredentialItem);
    }
    usernameMenuItems.push(this.browseCredentialsItem);
    return usernameMenuItems;
  }

  /**
   * Returns the list of menu items in case of filled password configuration
   * @return {JSX.Element[]}
   */
  get filledPasswordMenuItems() {
    const passwordMenuItems = this.suggestedResourcesItems;
    if (this.hasMetadataTypesSettings() && this.canCreatePassword()) {
      passwordMenuItems.push(this.saveAsNewCredentialItem);
    }
    passwordMenuItems.push(this.browseCredentialsItem);
    return passwordMenuItems;
  }

  /**
   * Returns the list of menu items in case of empty password configuration
   * @return {JSX.Element[]}
   */
  get emptyPasswordMenuItems() {
    const passwordMenuItems = this.suggestedResourcesItems;
    if (this.hasMetadataTypesSettings() && this.canCreatePassword()) {
      passwordMenuItems.push(this.generateNewPasswordItem);
      passwordMenuItems.push(this.createNewCredentialItem);
    }
    passwordMenuItems.push(this.browseCredentialsItem);
    return passwordMenuItems;
  }

  /**
   * Return the generate a new credential menu item.
   * @returns {JSX.Element}
   */
  get generateNewPasswordItem() {
    const disabled = this.state.generatedPassword === null;

    return <DisplayInFormMenuItem
      key="generate-password"
      onClick={this.handleGeneratePasswordRequestedEvent}
      title={this.props.t("Generate a new password securely")}
      subtitle={<span className="in-form-menu-item-content-subheader-password">{this.truncatedGeneratedPassword}</span>}
      description={this.props.t("You will be able to save it after submitting")}
      icon={<DiceSVG />}
      disabled={disabled}/>;
  }

  /**
   * Return the save as new credential menu item.
   * @returns {JSX.Element}
   */
  get saveAsNewCredentialItem() {
    return <DisplayInFormMenuItem
      key="save-credentials"
      onClick={this.handleSaveCredentialsRequestedEvent}
      title={this.props.t("Save as new credential")}
      description={this.props.t("Save the data entered as a new credential")}
      icon={<AddSVG />}
    />;
  }

  /**
   * Return the create a new credential menu item.
   * @returns {JSX.Element}
   */
  get createNewCredentialItem() {
    return <DisplayInFormMenuItem
      key="create-new-credentials"
      onClick={this.handleCreateNewCredentialsRequestedEvent}
      title={this.props.t("Create a new credential")}
      description={this.props.t("Create and customize it yourself")}
      icon={<AddSVG />}
    />;
  }

  /**
   * Return the browse credentials menu item.
   * @returns {JSX.Element}
   */
  get browseCredentialsItem() {
    return <DisplayInFormMenuItem
      key="browse-credentials"
      onClick={this.handleBrowseCredentialsRequestedEvent}
      title={this.props.t("Browse credentials")}
      description={this.props.t("Search among available credentials")}
      icon={<SearchSVG />}
    />;
  }

  /**
   * Returns the list of suggested resources menu items
   */
  get suggestedResourcesItems() {
    const suggestedResources = (this.state.configuration && this.state.configuration.suggestedResources) || [];
    return suggestedResources.reduce((menuItems, resource) => menuItems.concat([
      <DisplayInFormMenuItem
        key={resource.id}
        onClick={() => this.handleUseSuggestedResourceRequestedEvent(resource.id)}
        processing={this.state.resourceIdProcessing === resource.id}
        disabled={this.state.resourceIdProcessing === resource.id}
        title={resource.metadata.name}
        description={resource.metadata?.username}
        icon={<ResourceIcon resource={resource} resourceTypes={this.props.resourceTypes}/>}
      />
    ]), []);
  }

  /**
   * Whenever the display configuration of the menu is received
   */
  async handleDisplayConfigurationReceivedEvent() {
    const configuration = await this.props.context.port.request('passbolt.in-form-menu.init');
    this.setState({configuration});
    if (!this.isPasswordFilled) {
      // Pre-generate the password
      this.generateSecret();
    }
  }

  /**
   * Generates a new secret and store it in the component state.
   * @returns {Promise<void>}
   */
  async generateSecret() {
    const passwordPolicies = await this.props.context.port.request('passbolt.password-policies.get', true);
    const generatedPassword = SecretGenerator.generate(passwordPolicies);
    this.setState({generatedPassword});
  }

  /**
   * Whenever the user requests to create a new credential
   */
  handleCreateNewCredentialsRequestedEvent() {
    this.props.context.port.request('passbolt.in-form-menu.create-new-credentials');
  }

  /**
   * Whenever the user requests to browse credentials
   */
  handleBrowseCredentialsRequestedEvent() {
    this.props.context.port.request('passbolt.in-form-menu.browse-credentials');
  }

  /**
   * Whenever the user requests to save the credentials
   */
  handleSaveCredentialsRequestedEvent() {
    this.props.context.port.request('passbolt.in-form-menu.save-credentials');
  }

  /**
   * Whenever the user requests to use the suggested resource as credentials in the current page
   * @param resourceId
   */
  async handleUseSuggestedResourceRequestedEvent(resourceId) {
    this.setState({resourceIdProcessing: resourceId});
    try {
      await this.props.context.port.request('passbolt.in-form-menu.use-suggested-resource', resourceId);
    } catch (error) {
      console.error(error);
    }
    this.setState({resourceIdProcessing: null});
  }

  /**
   * Whenever the user request to generate a password for the current page
   */
  handleGeneratePasswordRequestedEvent() {
    this.props.context.port.request('passbolt.in-form-menu.fill-password', this.state.generatedPassword);
  }

  /**
   * Has metadata types settings
   * @returns {boolean}
   */
  hasMetadataTypesSettings() {
    return Boolean(this.props.metadataTypeSettings);
  }

  /**
   * Can create password
   * @returns {boolean}
   */
  canCreatePassword() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      const isMetadataSharedKeyEnforced = !this.props.metadataKeysSettings?.allowUsageOfPersonalKeys;
      const userHasMissingKeys = this.props.context.loggedInUser?.missing_metadata_key_ids?.length > 0;
      return !(isMetadataSharedKeyEnforced && userHasMissingKeys) && this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    } else {
      return false;
    }
  }

  /**
   * Render the component
   */
  render() {
    if (!this.hasConfiguration) {
      return null;
    }

    const items = this.items;
    return (
      <div className={`in-form-menu ${items.length > 3 && 'in-form-menu--scrollable'}`} ref={this.inFormMenuRef}>
        {items}
      </div>
    );
  }
}

DisplayInFormMenu.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  passwordPoliciesContext: PropTypes.object, // The password policy context
};

export default withAppContext(withResourceTypesLocalStorage(withMetadataTypesSettingsLocalStorage(withMetadataKeysSettingsLocalStorage(withPasswordPolicies(withTranslation('common')(DisplayInFormMenu))))));
