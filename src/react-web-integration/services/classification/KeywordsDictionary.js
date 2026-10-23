/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.15.0
 */

import { FieldRole } from "./Taxonomy";

export const Keywords = Object.freeze({
  // --- Identification & credentials ---

  EMAIL: [
    "email",
    "emailaddress",
    "mail", // en
    "courriel",
    "adressecourriel",
    "adresseemail", // fr
    "emailadresse", // de
    "correo",
    "correoelectronico", // es
    "posta",
    "postaelettronica", // it
    "correioeletronico", // pt
    "emailadres", // nl
    "электроннаяпочта", // ru
    "メールアドレス",
    "邮件",
    "邮箱",
    "電郵地址",
    "이메일", // ja / zh-CN / zh-TW / ko
  ],

  IDENTIFIER: [
    "username",
    "user",
    "userid",
    "userlogin",
    "login",
    "loginid",
    "loginname",
    "account",
    "accountname",
    "accountid",
    "memberid",
    "membername",
    "customerid",
    "pseudo",
    "handle",
    "uid",
    "uname", // en
    "identifiant",
    "nomdutilisateur",
    "utilisateur",
    "compte", // fr
    "benutzername",
    "benutzer",
    "benutzerid",
    "anmeldename", // de
    "usuario",
    "nombredeusuario",
    "cuenta", // es
    "utente",
    "nomeutente", // it
    "nomedeusuario",
    "nomedeutilizador", // pt
    "gebruikersnaam",
    "gebruiker", // nl
    "nazwauzytkownika",
    "uzytkownik", // pl
    "имяпользователя",
    "пользователь",
    "логин", // ru
    "anvandarnamn",
    "brugernavn",
    "brukernavn", // sv / da / no
    "kullaniciadi",
    "kullanici", // tr
    "用户名",
    "用戶名",
    "ユーザー名",
    "사용자이름", // zh-CN / zh-TW / ja / ko
    "اسمالمستخدم",
    "שםמשתמש",
    "نامکاربری",
    "उपयोगकर्तानाम",
    "ชื่อผู้ใช้",
    "tentruynhap", // ar / he / fa / hi / th / vi
    "ονομαχρηστη",
    "χρηστης", // el
    "імякористувача",
    "користувач", // uk
    "потребителскоиме",
    "потребител", // bg
    "korisnickoime",
    "korisnik", // sr / hr / bs (latin)
    "uzivatelskejmeno",
    "uzivatel", // cs / sk
    "felhasznalonev",
    "hasznalo", // hu
    "numedeutilizator",
    "utilizator", // ro
    "kayttajatunnus",
    "kayttaja", // fi
    "uporabniskoime",
    "uporabnik", // sl
    "vartotojovardas",
    "vartotojas", // lt
    "lietotajvards",
    "lietotajs", // lv
    "notandanafn",
    "notandi", // is
    "օգտագործող", // hy
    "მომხმარებელი", // ka
  ],
  IDENTIFIER_EXCLUDE: [
    "pin",
    "token",
    "userfirstname",
    "firstname",
    "userlastname",
    "lastname",
    "prenom",
    "nom",
    "fullname",
    "givenname",
    "familyname",
    "fname",
    "lname",
    "middlename",
  ],

  PASSWORD: [
    "password",
    "passwd",
    "pwd",
    "passphrase", // en
    "motdepasse",
    "mdp", // fr
    "passwort",
    "kennwort", // de
    "contrasena",
    "contrasenya",
    "clave", // es / ca
    "senha", // pt
    "parola",
    "paroladordine", // it / ro
    "wachtwoord",
    "wachtwurd", // nl / fy
    "haslo", // pl
    "losenord",
    "adgangskode",
    "passord",
    "salasana", // sv / da / no / fi
    "heslo",
    "geslo",
    "lozinka",
    "slaptazodis",
    "parool", // cs-sk / sl / hr-sr / lt / et
    "sifre",
    "pasahitza",
    "cyfrinair",
    "contrasinal", // tr / eu / cy / gl
    "katalaluan",
    "katasandi",
    "sandi",
    "parol", // ms-id / uz-tg
    "пароль", // ru / uk / bg / kk
    "密码",
    "密碼",
    "パスワード",
    "암호", // zh-CN / zh-TW / ja / ko
    "كلمةالسر",
    "رمز",
    "کلمهعبور",
    "پاسورڈ", // ar / fa / ur
    "पासवर्ड",
    "পাসওয়ার্ড",
    "รหัสผ่าน",
    "matkhau",
    "κωδικοςπροσβασης",
    "סיסמה",
    "jelszo",
    "პაროლი", // hi / bn / th / vi / el / he / hu / ka
    // extended breadth — scripts safe under fold
    "парола", // bg
    "parole", // lv
    "գաղտնաբառ", // hy
  ],

  // --- MFA ---

  // Strong one-time-code tokens; the ambiguous ones are in TOTP_AMBIGUOUS.
  TOTP: [
    "otp",
    "totp",
    "2fa",
    "mfa",
    "authenticator",
    "passcode",
    "onetimecode",
    "onetimepassword",
    "verificationcode",
    "securitycode",
    "twofactor",
    "twofactorcode", // universal
    "codedeverification",
    "codeauthentification",
    "authentificateur", // fr
    "bestatigungscode",
    "sicherheitscode", // de
    "codigodeverificacion",
    "codicediverifica",
    "codigodeverificacao", // es / it / pt
    "sixdigit",
    "6chiffres", // "six digit" / "6-digit code" (Chromium ONE_TIME_CODE)
  ],
  // Ambiguous one-time-code tokens, counted as TOTP only when another signal confirms it.
  TOTP_AMBIGUOUS: ["code", "pin"],

  // --- Exclusion / veto ---

  // Recovery and backup tokens (OTHER)
  RECOVERY: [
    "recovery",
    "recoverycode",
    "backup",
    "backupcode", // en
    "secours",
    "codedesecours",
    "restauration",
    "recuperation", // fr
    "wiederherstellung",
    "notfallcode",
    "recuperacion",
    "respaldo",
    "recuperacao", // de / es / pt
  ],

  // Tokens which disqualify a password field.
  PASSWORD_EXCLUDE: [
    "forgot",
    "oublie",
    "hint",
    "indice",
    "search",
    "recherche",
    "captcha",
    "passwordless",
    "otp",
    "code",
    "2fa",
    "mfa",
    "totp",
    "onetimecode",
    "verificationcode",
    "securitycode",
    "secondfactor",
    "pin",
    "backup",
    "recovery",
    "query",
    "find",
  ],

  // The field is not a credential at all — wired as a veto in FieldClassificationService.ignoreVeto,
  // after the declared/native-type tiers and before the keyword tiers.
  FIELD_IGNORE: ["captcha", "search", "query", "find", "go", "forgot"],

  // --- Form context ---

  ACCOUNT_CREATION: [
    "new",
    "newpassword",
    "create",
    "createpassword",
    "createaccount",
    "register",
    "registration",
    "signup",
    "confirm",
    "confirmpassword",
    "confirmation",
    "repeat",
    "retype",
    "verifypassword", // en
    "nouveau",
    "nouveaumotdepasse",
    "creer",
    "creercompte",
    "inscription",
    "confirmer",
    "repeter", // fr
    "neu",
    "neuespasswort",
    "registrieren",
    "bestatigen",
    "wiederholen", // de
    "nuevo",
    "crearcuenta",
    "registrarse",
    "confirmar",
    "repetir", // es
    "nuovo",
    "crea",
    "registrati",
    "conferma", // it
    "novo",
    "criarconta",
    "registrar", // pt
  ],
  PASSWORD_UPDATE: [
    "current",
    "currentpassword",
    "old",
    "oldpassword",
    "change",
    "changepassword",
    "update",
    "updatepassword", // en
    "actuel",
    "motdepasseactuel",
    "ancien",
    "modifier",
    "changer", // fr
    "aktuell",
    "alt",
    "andern",
    "kennwortandern", // de
    "actual",
    "antigua",
    "cambiar", // es
    "attuale",
    "vecchia",
    "cambia", // it
    "atual",
    "antiga",
    "alterar", // pt
  ],
  // Heading and button text lists
  HEADING_LOGIN: [
    "signin",
    "login",
    "logon", // en
    "connexion",
    "seconnecter",
    "identification", // fr
    "anmelden",
    "einloggen",
    "iniciarsesion",
    "acceder",
    "accedi",
    "entrar", // de / es / it / pt
  ],
  HEADING_SIGNUP: [
    "signup",
    "register",
    "registration",
    "createaccount",
    "createanaccount",
    "newaccount", // en
    "inscription",
    "creeruncompte",
    "sinscrire", // fr
    "registrieren",
    "kontoerstellen", // de
    "registrarse",
    "crearcuenta", // es
    "registrati", // it
    "criarconta", // pt
  ],
  HEADING_EXCLUDE: [
    "newsletter",
    "subscribe",
    "unsubscribe",
    "mailinglist",
    "contact",
    "search", // en
    "abonnement",
    "sabonner",
    "recherche",
    "contacter", // fr
    "abonnieren",
    "kontakt",
    "suche", // de
    "suscribirse",
    "contacto",
    "buscar", // es
    "ricerca",
    "contatti", // it
    "pesquisar",
    "contato", // pt
  ],
  HEADING_CHANGE_PASSWORD: [
    "changepassword",
    "changeyourpassword",
    "updatepassword",
    "resetpassword", // en
    "changermotdepasse",
    "modifiermotdepasse",
    "reinitialisermotdepasse", // fr
    "passwortandern",
    "passwortzurucksetzen", // de
    "cambiarcontrasena",
    "restablecercontrasena",
    "cambiapassword",
    "alterarsenha",
    "redefinirsenha", // es / it / pt
  ],

  // Submit buttons — for auto-save
  SUBMIT_LOGIN: [
    "signin",
    "login",
    "logon",
    "submit",
    "continue",
    "next",
    "verify",
    "connexion",
    "seconnecter",
    "valider",
    "suivant",
    "anmelden",
  ],
  SUBMIT_CHANGE_PASSWORD: [
    "change",
    "save",
    "update",
    "savepassword",
    "updatepassword",
    "changepassword",
    "resetpassword",
    "enregistrer",
    "modifier",
  ],
});

/**
 * Short ambiguous tokens which must match a whole segment, never a substring (new vs newsletter, pin vs shipping).
 * @type {ReadonlySet<string>}
 */
export const SHORT_AMBIGUOUS = Object.freeze(
  new Set(["otp", "code", "pin", "id", "go", "mail", "user", "new", "old", "mdp", "mfa"]),
);

/**
 * The standard HTML autocomplete token for one-time codes.
 * @type {string}
 */
export const AUTOCOMPLETE_OTP_TOKEN = "one-time-code";

/**
 * The HTML autocomplete tokens which map to a field role.
 * @type {Readonly<Object<string, string>>}
 */
export const AUTOCOMPLETE_ROLE = Object.freeze({
  username: FieldRole.USERNAME,
  email: FieldRole.EMAIL,
  "current-password": FieldRole.CURRENT_PASSWORD,
  "new-password": FieldRole.NEW_PASSWORD,
  [AUTOCOMPLETE_OTP_TOKEN]: FieldRole.TOTP,
  // Not a valid token but a common site mistake meaning "this is the password field".
  password: FieldRole.PASSWORD,
});

/**
 * The data-form-type (SAWF) tokens.
 * @type {Readonly<Object<string, string>>}
 */
export const SawfToken = Object.freeze({
  OTP: "otp",
  USERNAME: "username",
  EMAIL: "email",
  SECONDARY: "secondary",
  PASSWORD: "password",
  CONFIRMATION: "confirmation",
  NEW: "new",
  LOGIN: "login",
  REGISTER: "register",
  CHANGE_PASSWORD: "change_password",
  ACTION: "action",
  STEP: "step",
  FINAL: "final",
});

/**
 * Input types a single-character OTP box may have
 * @type {ReadonlyArray<string>}
 */
export const OTP_BOX_INPUT_TYPES = Object.freeze(["text", "tel", "number", "password", ""]);

/**
 * Minimum one-time code length.
 * @type {number}
 */
export const MIN_OTP_SEGMENTS = 4;

/**
 * Maximum one-time code length.
 * @type {number}
 */
export const MAX_OTP_SEGMENTS = 12;

/**
 * Maximum number of fields classified per page.
 * @type {number}
 */
export const MAX_CLASSIFIED_FIELDS = 200;

/**
 * Input types which can never hold a credential.
 * @type {ReadonlySet<string>}
 */
export const NON_CREDENTIAL_INPUT_TYPES = Object.freeze(
  new Set(["checkbox", "radio", "submit", "reset", "button", "image", "file", "range", "color", "hidden"]),
);
