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

  // Disqualifies a "password-like" field (+ OTP/2FA/recovery/search families, Bitwarden survey).
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
  LOGIN_HEADING: [
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
  NONLOGIN_HEADING: [
    "register",
    "signup",
    "createaccount",
    "newsletter",
    "subscribe",
    "unsubscribe",
    "mailinglist",
    "contact",
    "search", // en
    "inscription",
    "creeruncompte",
    "abonnement",
    "sabonner",
    "recherche", // fr
    "registrieren",
    "abonnieren",
    "registrarse",
    "suscribirse", // de / es
  ],

  // Submit buttons — for auto-save (future feature, NOT consumed now).
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

// Short/ambiguous tokens: EXACT SEGMENT match only (never substring) — hand-curated
// (anti false-positive: new ⊄ newsletter, pin ⊄ shipping, otp ⊄ notpassword).
export const SHORT_AMBIGUOUS = Object.freeze(
  new Set(["otp", "code", "pin", "id", "go", "mail", "user", "new", "old", "mdp", "2fa", "mfa"]),
);
