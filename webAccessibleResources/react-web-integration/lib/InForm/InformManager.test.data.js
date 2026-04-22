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

import MockPort from "../../../react-extension/test/mock/MockPort";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a login form with name attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeUsername = `
<div>
  <input type="text" name="username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with multiple usernames and passwords in DOM
 * @type {string}
 */
export const domElementWithMultipleLogin = `
<div>
  <input type="text" name="username" id="username1"/>
  <input type="password" id="password1"/>
</div>
<div>
  <input type="text" name="username" id="username2"/>
  <input type="password" id="password2"/>
</div>
<div>
  <input type="text" name="username" id="username3"/>
  <input type="password" id="password3"/>
</div>`;

/**
 * Create a login form with only password in DOM
 * @type {string}
 */
export const domElementOnlyUsername = `
<div>
  <input type="text" name="username"/>
</div>`;

/**
 * Create a login form with only password in DOM
 * @type {string}
 */
export const domElementOnlyPassword = `
<div>
  <input type="password"/>
</div>`;

/**
 * Create a login form with name attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeEmail = `
<div>
  <input type="text" name="email"/>
  <input type="text" name="password"/>
</div>`;

/**
 * Create a login form with name attribute login in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeLogin = `
<div>
  <input type="text" name="form_login"/>
  <input type="text" name="password"/>
</div>`;

/**
 * Create a login form with name attribute utente (Italian) in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeUtente = `
<div>
  <input type="text" name="Utente"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and name attribute utente (Italian) in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeUtente = `
<div>
  <input name="Utente"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with id attribute utente (Italian) in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeUtente = `
<div>
  <input type="text" id="Utente"/>
  <input type="text" id="Password"/>
</div>`;

/**
 * Create a login form with no type and id attribute utente (Italian) in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeUtente = `
<div>
  <input id="Utente"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with name attribute login in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeLogto = `
<div>
  <input type="text" name="logto"/>
  <input type="text" name="password"/>
</div>`;

/**
 * Create a login form with name attribute benutzerkennung in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeBenutzerkennung = `
<div>
  <input type="text" name="form_benutzerkennung"/>
  <input type="text" name="password"/>
</div>`;

/**
 * Create a login form with name attribute benutzername in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeBenutzername = `
<div>
  <input type="text" name="form_benutzername"/>
  <input type="text" name="password"/>
</div>`;

/**
 * Create a login form with name attribute benutzername and password attribute passwort in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeBenutzernameAndPasswordAttributePasswort = `
<div>
  <input type="text" name="form_benutzername"/>
  <input type="text" name="passwort"/>
</div>`;

/**
 * Create a login form with no type and name attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeUsername = `
<div>
  <input name="username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and name attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeEmail = `
<div>
  <input name="email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and name attribute login in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeLogin = `
<div>
  <input name="Login"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and name attribute benutzerkennung in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeBenutzerkennung = `
<div>
  <input name="Benutzerkennung"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and name attribute benutzername in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeBenutzername = `
<div>
  <input name="Benutzername"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with class username in DOM
 * @type {string}
 */
export const domElementLoginWithClassUsername = `
<div>
  <input type="text" class="username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with class email in DOM
 * @type {string}
 */
export const domElementLoginWithClassEmail = `
<div>
  <input type="text" class="email"/>
  <input type="text" class="password"/>
</div>`;

/**
 * Create a login form with class create-account-input in DOM
 * @type {string}
 */
export const domElementLoginWithClassCreateAccount = `
<div>
  <input type="text" class="create-account-input"/>
  <input type="text" class="password"/>
</div>`;

/**
 * Create a login form with no type and class username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndClassUsername = `
<div>
  <input class="username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and class email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndClassEmail = `
<div>
  <input class="email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and class create-account-input in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndClassCreateAccount = `
<div>
  <input class="create-account-input"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with id attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeUsername = `
<div>
  <input type="text" id="username"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with id attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeEmail = `
<div>
  <input type="text" id="YahooEmail"/>
  <input type="text" id="YahooPassword"/>
</div>`;

/**
 * Create a login form with id attribute login in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeLogin = `
<div>
  <input type="text" id="Test_Ploginutg"/>
  <input type="text" id="YahooPassword"/>
</div>`;

/**
 * Create a login form with id attribute logto in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeLogto = `
<div>
  <input type="text" id="logto"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with id attribute benutzerkennung in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeBenutzerkennung = `
<div>
  <input type="text" id="Test_Pbenutzerkennungutg"/>
  <input type="text" id="Password"/>
</div>`;

/**
 * Create a login form with id attribute benutzername in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeBenutzername = `
<div>
  <input type="text" id="Test_Pbenutzernameutg"/>
  <input type="text" id="Password"/>
</div>`;

/**
 * Create a login form with no type and id attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeUsername = `
<div>
  <input id="username-Y"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and id attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeEmail = `
<div>
  <input id="Email-Y"/>
  <input type="text" id="password-Y"/>
</div>`;

/**
 * Create a login form with no type and id attribute login in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeLogin = `
<div>
  <input id="login-Y"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with no type and id attribute benutzerkennung in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeBenutzerkennung = `
<div>
  <input id="benutzerkennung-Y"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with no type and id attribute benutzername in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeBenutzername = `
<div>
  <input id="benutzername-Y"/>
  <input type="text" id="password"/>
</div>`;

/**
 * Create a login form with autocomplete attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithAutocompleteAttributeUsername = `
<div>
  <input type="text" autocomplete="USERNAME"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with autocomplete attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithAutocompleteAttributeEmail = `
<div>
  <input type="text" autocomplete="Email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and autocomplete attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndAutocompleteAttributeUsername = `
<div>
  <input autocomplete="USERNAME"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and autocomplete attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndAutocompleteAttributeEmail = `
<div>
  <input autocomplete="Email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with placeholder attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithPlaceHolderAttributeUsername = `
<div>
  <input type="Text" placeholder="Username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with placeholder attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithPlaceHolderAttributeEmail = `
<div>
  <input type="TEXT" placeholder="email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with placeholder attribute e-mail in DOM
 * @type {string}
 */
export const domElementLoginWithPlaceHolderAttributeE_mail = `
<div>
  <input type="Text" placeholder="e-mail"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and placeholder attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndPlaceHolderAttributeUsername = `
<div>
  <input placeholder="Username"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and placeholder attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndPlaceHolderAttributeEmail = `
<div>
  <input placeholder="email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with no type and placeholder attribute e-mail in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndPlaceHolderAttributeE_mail = `
<div>
  <input placeholder="The-mailO"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with submit button in DOM
 * @type {string}
 */
export const domElementLoginWithSubmitButton = `
<div>
  <form onsubmit="return false;">
    <input type="text" id="username"/>
    <input type="password"/>
    <input type="submit"/>
  </form>
</div>`;

/**
 * Create a login form only password with submit button in DOM
 * @type {string}
 */
export const domElementLoginOnlyPasswordWithSubmitButton = `
<div>
  <form onsubmit="return false;">
    <input type="password"/>
    <input type="submit"/>
  </form>
</div>`;

/**
 * Create a login form in DOM
 * @type {string}
 */
export const domElementWithNoUsernamePassword = `
<div>
  <input type="text" id="search" name="search" />
</div>`;

/**
 * Create a login form with username and password in nested divs
 * @type {string}
 */
export const domNestedUsernamePassword = `
<div>
  <div>
    <input type="text" name="username"/>
  </div>
  <div>
    <input type="password"/>
  </div>
</div>`;

/**
 * Create a login form with multiple username candidates
 * @type {string}
 */
export const domMultipleUsernameCandidates = `
<div>
  <input type="text" name="firstname"/>
  <input type="text" id="user_email"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with username identified by id attribute
 * @type {string}
 */
export const domUsernameById = `
<div>
  <input type="text" id="user_login"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with username identified by class attribute
 * @type {string}
 */
export const domUsernameByClass = `
<div>
  <input type="text" class="email-input"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with two password fields, first hidden, second visible
 * @type {string}
 */
export const domWithMultiplePasswords = `
<div>
  <input type="text" name="username"/>
  <input type="password" id="hidden-pw"/>
  <input type="password" id="visible-pw"/>
</div>`;

/**
 * Create a login form with a generic text input (no username-related keyword)
 * @type {string}
 */
export const domGenericTextAndPassword = `
<div>
  <input type="text" name="something"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with two email inputs and a password.
 * Both emails match USERNAME_FIELD_SELECTOR but extractUsernameElementWithFallback
 * should fall back to the first element.
 * @type {string}
 */
export const domTwoEmailInputsAndPassword = `
<div>
  <input type="email" id="first-field"/>
  <input type="email" id="second-field"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form with an OTP field.
 * @type {string}
 */
export const domSingleOTPField = `
<div>
  <input autocomplete="one-time-code" data-testid="otp" />
</div>`;

/**
 * Create a login form with an OTP, a username and a password fields.
 * @type {string}
 */
export const domSingleOTPFieldWithUsernameAndPassword = `
<div>
  <input type="text" name="username" />
  <input type="password" />
  <input autocomplete="one-time-code" data-testid="otp" />
</div>`;

/**
 * Create a login form with an OTP field composed of 6 inputs.
 * @type {string}
 */
export const domSingleOTPMultiField = `
<div data-testid="otp">
    <input class="time-otp" />
    <input class="time-otp" />
    <input class="time-otp" />
    <input class="time-otp" />
    <input class="time-otp" />
    <input class="time-otp" />
</div>`;

/**
 * Create a login form with an OTP field composed of 6 inputs with aria-label.
 * @type {string}
 */
export const domSingleOTPMultiFieldAriaLabel = `
<div data-testid="otp">
    <input aria-label="time-based otp" />
    <input aria-label="time-based otp" />
    <input aria-label="time-based otp" />
    <input aria-label="time-based otp" />
    <input aria-label="time-based otp" />
    <input aria-label="time-based otp" />
</div>`;

/**
 * Create a login form with a single input using a generic numeric pattern
 * @type {string}
 */
export const domOTPSingleFieldPatternLookalike = `
<div>
  <input pattern="^\\d+$" />
</div>`;

/**
 * Create a login form with a single input using custom pattern
 * @type {string}
 */
export const domOTPSingleFieldCustomPatternLookalike = `
<div>
  <input pattern="-?\d*([.]\d{0,6})?" />
</div>`;

/**
 * Create a login form with a DOM looking like a OTP field composed of 6 inputs type number.
 * @type {string}
 */
export const domOTPMultiFieldNumberLookalike = `
<div>
    <input type="number" />
    <input type="number" />
    <input type="number" />
    <input type="number" />
    <input type="number" />
    <input type="number" />
</div>`;

/**
 * Create a login form with a DOM looking like a OTP field composed of 6 inputs type text.
 * @type {string}
 */
export const domOTPMultiFieldTextLookalike = `
<div>
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
</div>`;

/**
 * Create a login form similar to partslink24.com with 3 fields: Company ID, Username, Password.
 * Both accountLogin and userLogin match username selectors (contain "login").
 * The disambiguation should prefer userLogin (contains "user") over accountLogin.
 * @type {string}
 */
export const domPartslink24ThreeFieldLogin = `
<div>
  <form>
    <input type="text" name="accountLogin" id="login-id"/>
    <input type="text" name="userLogin" id="login-name"/>
    <input type="password" name="loginBean.password" id="inputPassword"/>
  </form>
</div>`;

/**
 * Create a login form similar to societadistribuzionericambi.it with Italian field names.
 * @type {string}
 */
export const domSDRLoginForm = `
<div>
  <form>
    <input type="text" id="Utente" name="Utente"/>
    <input type="password" id="Password" name="Password"/>
  </form>
</div>`;

/**
 * Create a login form where the best keyword match ("user") is on the first DOM element.
 * Verifies that element iteration picks the first element when it has the best score.
 * @type {string}
 */
export const domBestKeywordOnFirstElement = `
<div>
  <input type="text" name="username" id="field-user"/>
  <input type="text" name="accountLogin" id="field-login"/>
  <input type="password"/>
</div>`;

/**
 * Create a login form where two elements have the same keyword priority ("user").
 * Verifies that DOM order is the tiebreaker when scores are equal.
 * @type {string}
 */
export const domSameKeywordPriorityTwoElements = `
<div>
  <input type="text" name="main_user" id="first"/>
  <input type="text" name="alt_user" id="second"/>
  <input type="password"/>
</div>`;

/**
 * Mock global variable in window
 */
export const initializeWindow = () => {
  window.port = new MockPort();
  jest.spyOn(window.port, "request").mockImplementation(() => uuidv4());
  window.port._port = {
    onDisconnect: {
      addListener: () => {},
    },
  };
};
