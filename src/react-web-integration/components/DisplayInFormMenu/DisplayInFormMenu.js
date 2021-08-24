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
 * @since         3.4.0
 */

import React from "react";
import DisplayInFormMenuItem from "./DisplayInFormMenuItem";
import {withAppContext} from "../../contexts/AppContext";
import PropTypes from "prop-types";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";




/**
 * This component is a menu integrated into a target web page which includes
 * an identified authentication form. After the call-to-action performed,
 * the menu proposes different available actions given the situation
 */
class DisplayInFormMenu extends React.Component {
  /** The maximum length of visibility of a generated password */
  static #TRUNCATED_GENERATED_PASSWORD_MAX_LENGTH = 15;

  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleDisplayConfigurationReceivedEvent();
  }

  /**
   * Binds methods callbacks
   */
  bindCallbacks() {
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
        secretGeneratorConfiguration: null, // A secret generator configuration
      }, // The display configuration of the menu
      generatedPassword: null // Generated passord
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
        return this.isUsernameFilled ? this.filledUsernameMenuItems: this.emptyUsernameMenuItems;
      } else if(this.isPasswordConfiguration) {
        return this.isPasswordFilled ? this.filledPasswordMenuItems: this.emptyPasswordMenuItems;
      }
    }
    return [];
  }

  /**
   * Returns the truncated version of generated password
   */
  get truncatedGeneratedPassword() {
    if (this.state.generatedPassword) {
      const uplimitIndex = Math.min(DisplayInFormMenu.#TRUNCATED_GENERATED_PASSWORD_MAX_LENGTH, Math.floor(this.state.generatedPassword.length/2));
      return this.state.generatedPassword.substring(0,uplimitIndex);
    }
    return this.state.generatedPassword;
  }

  /**
   * Returns the list of menu items in case of filled username configuration
   * @return {JSX.Element[]}
   */
  get filledUsernameMenuItems() {
    return [
      ...this.suggestedResourcesItems,
      <DisplayInFormMenuItem
        key="save-credentials"
        onClick={this.handleSaveCredentialsRequestedEvent}
        title="Save as new credential"
        description="Save the data entered as a new credential"
        icon="add"/>,
      <DisplayInFormMenuItem
        key="browse-credentials"
        onClick={this.handleBrowseCredentialsRequestedEvent}
        title="Browse credentials"
        description="Search among available credentials"
        icon="search"/>
    ];
  }

  /**
   * Returns the list of menu items in case of empty username configuration
   * @return {JSX.Element[]}
   */
  get emptyUsernameMenuItems() {
    return [
      ...this.suggestedResourcesItems,
      <DisplayInFormMenuItem
        key="create-new-credentials"
        onClick={this.handleCreateNewCredentialsRequestedEvent}
        title="Create a new credential"
        description="Create and customize it yourself"
        icon="add"/>,
      <DisplayInFormMenuItem
        key="browse-credentials"
        onClick={this.handleBrowseCredentialsRequestedEvent}
        title="Browser credentials"
        description="Search among available credentials"
        icon="search"/>
    ];
  }

  /**
   * Returns the list of menu items in case of filled password configuration
   * @return {JSX.Element[]}
   */
  get filledPasswordMenuItems() {
    return [
      ...this.suggestedResourcesItems,
      <DisplayInFormMenuItem
        key="save-credentials"
        onClick={this.handleSaveCredentialsRequestedEvent}
        title="Save as new credential"
        description="Save the data entered as a new credential"
        icon="add"/>,
      <DisplayInFormMenuItem
        key="browse-credentials"
        onClick={this.handleBrowseCredentialsRequestedEvent}
        title="Browse credentials"
        description="Search among available credentials"
        icon="search"/>
    ];
  }

  /**
   * Returns the list of menu items in case of empty password configuration
   * @return {JSX.Element[]}
   */
  get emptyPasswordMenuItems() {
    return [
      ...this.suggestedResourcesItems,
      <DisplayInFormMenuItem
        key="generate-password"
        onClick={this.handleGeneratePasswordRequestedEvent}
        title="Generate a new password securely"
        subtitle={<span className="in-form-menu-item-content-subheader-password">{this.truncatedGeneratedPassword}"</span>}
        description="You will be able to save it after submitting"
        icon="magic-wand"/>,
      <DisplayInFormMenuItem
        key="create-new-credentials"
        onClick={this.handleCreateNewCredentialsRequestedEvent}
        title="Create a new credential"
        description="Create and customize it yourself"
        icon="add"/>,
      <DisplayInFormMenuItem
        key="browse-credentials"
        onClick={this.handleBrowseCredentialsRequestedEvent}
        title="Browser credentials"
        description="Search among available credentials"
        icon="search"/>
    ];
  }

  /**
   * Returns the list of susggested resources menu items
   */
  get suggestedResourcesItems() {
    const suggestedResources = (this.state.configuration && this.state.configuration.suggestedResources) || [];
    return suggestedResources.reduce((menuItems, resource) => {
      return menuItems.concat([
        <DisplayInFormMenuItem
          key={resource.id}
          onClick={() => this.handleUseSuggestedResourceRequestedEvent(resource.id)}
          title={resource.name}
          description={resource.username}
          icon="key"/>
      ]);
    }, []);
  }

  /**
   * Whenever the display configuration of the menu is received
   */
  async handleDisplayConfigurationReceivedEvent() {
    const configuration = await this.props.context.port.request('passbolt.in-form-menu.init');
    this.setState({configuration});
    if (!this.isPasswordFilled) {
      // Pre-generate the password
      this.setState({generatedPassword: SecretGenerator.generate(configuration.secretGeneratorConfiguration)});
    }
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
  handleUseSuggestedResourceRequestedEvent(resourceId) {
    this.props.context.port.request('passbolt.in-form-menu.use-suggested-resource', resourceId);
  }

  /**
   * Whenever the user request to generate a password for the current page
   */
  handleGeneratePasswordRequestedEvent() {
    this.props.context.port.request('passbolt.in-form-menu.fill-password', this.state.generatedPassword);
  }


  /**
   * Render the component
   */
  render() {
    const items = this.items;
    return (
      <>
        {this.hasConfiguration &&
        <div className={`in-form-menu ${items.length > 3 ? 'in-form-menu--scrollable' : ''}`}>
          {items}
        </div>
        }
      </>
    );
  }
}

DisplayInFormMenu.propTypes = {
  context: PropTypes.any // The application context
};

export default withAppContext(DisplayInFormMenu);