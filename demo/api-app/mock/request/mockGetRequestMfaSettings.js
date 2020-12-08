/**
 * return LoggedInUser get request fetch
 */
export default () => {
  return {
    "header": {
      "id": "eae592b6-19d5-4b07-9103-49d04b135093",
      "status": "success",
      "servertime": 1604490709,
      "title": "app_orgsettings_get_success",
      "action": "6d616537-c449-589d-bebe-b2d5883e9d35",
      "message": "The operation was successful.",
      "url": "\/mfa\/settings.json?api-version=v2",
      "code": 200
    },
    "body": {
      "providers": [
        "totp",
        "yubikey"
      ],
      "yubikey": {
        "clientId": "43664",
        "secretKey": "a6zf3pavrJEjvmXm6dfkm8jfkNY="
      }
    }
  }
}