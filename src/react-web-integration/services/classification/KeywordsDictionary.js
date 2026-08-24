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

  // TOTP / one-time-code — STRONG tokens only (ambiguous code/pin -> SHORT_AMBIGUOUS).
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
  // Ambiguous TOTP — promoted to TOTP ONLY if corroborated (veto [V]); handled via SHORT_AMBIGUOUS.
  TOTP_AMBIGUOUS: ["code", "pin"],

  // --- Exclusion / veto ---

  // Recovery / backup — VETO: neither password nor TOTP -> OTHER.
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

  // Disqualifies a "password-like" field (+ OTP/2FA/recovery/search families).
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

  // The field is not a credential at all (NOT wired for now — data available).
  FIELD_IGNORE: ["captcha", "search", "query", "find", "go", "forgot"],

  // A username must NOT match these (+ PASSWORD tokens in all languages) (NOT wired — data available).
  IDENTIFIER_NEGATIVE: [
    "pin",
    "token",
    "firstname",
    "lastname",
    "prenom",
    "nom",
    "fullname",
    "givenname",
    "familyname",
  ],

  // --- Form context (tie-breakers, Phase 2) ---

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
  // Dedicated heading / button-text lists, kept apart from the field-attribute lists above.
  // HEADING_CHANGE_PASSWORD uses compound tokens (changepassword…) so generic field words like
  // "change"/"update" cannot false-match free text. HEADING_SIGNUP holds registration terms only.
  // HEADING_EXCLUDE holds non-credential markers (newsletter/search/contact…) that veto the form to
  // OTHER — they mean "not a login/signup form", never "signup".
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
 * Short/ambiguous tokens: EXACT SEGMENT match only (never substring) — hand-curated
 * (anti false-positive: new ⊄ newsletter, pin ⊄ shipping, otp ⊄ notpassword).
 * NB: digit-glued tokens like "2fa" are deliberately NOT here — normalization splits "2FA" into
 * "2 fa" at the digit→uppercase boundary, so an exact segment could never match; they rely on
 * substring recall instead (its distinctive digit makes false positives negligible).
 * @type {ReadonlySet<string>}
 */
export const SHORT_AMBIGUOUS = Object.freeze(
  new Set(["otp", "code", "pin", "id", "go", "mail", "user", "new", "old", "mdp", "mfa"]),
);

/**
 * Standard HTML `autocomplete` token for one-time codes (WHATWG). Single source shared by
 * AUTOCOMPLETE_ROLE and the OTP feature detection.
 * @type {string}
 */
export const AUTOCOMPLETE_OTP_TOKEN = "one-time-code";

/**
 * HTML `autocomplete` tokens that map to a concrete field role. The matcher scans tokens
 * right-to-left, so the last significant token — the most specific one — wins.
 * @type {Readonly<Object<string, string>>}
 */
export const AUTOCOMPLETE_ROLE = Object.freeze({
  username: FieldRole.USERNAME,
  email: FieldRole.EMAIL,
  "current-password": FieldRole.CURRENT_PASSWORD,
  "new-password": FieldRole.NEW_PASSWORD,
  [AUTOCOMPLETE_OTP_TOKEN]: FieldRole.TOTP,
});

/**
 * Autocomplete tokens that never name a concrete field type: the "on"/"off" switches and the
 * WHATWG grouping/contact modifiers. Together with the `section-*` prefix, these are what
 * autocompleteDeclaresType() ignores when deciding whether the author declared a real type.
 * @type {ReadonlySet<string>}
 */
export const AUTOCOMPLETE_NON_TYPE = Object.freeze(
  new Set(["on", "off", "shipping", "billing", "home", "work", "mobile", "fax", "pager"]),
);

/**
 * The Dashlane SAWF `data-form-type` vocabulary. Fixed, single-language, exact-matched tokens —
 * distinct from the fuzzy multilingual keyword lists above.
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
 * Input types a single-character OTP box may carry (keyboard-enterable, `""` for non-input controls).
 * @type {ReadonlyArray<string>}
 */
export const OTP_BOX_INPUT_TYPES = Object.freeze(["text", "tel", "number", "password", ""]);

/**
 * Minimum number of single-character boxes for a run to be a plausible one-time code.
 * @type {number}
 */
export const MIN_OTP_SEGMENTS = 4;

/**
 * Maximum number of single-character boxes for a run to be a plausible one-time code.
 * @type {number}
 */
export const MAX_OTP_SEGMENTS = 8;
