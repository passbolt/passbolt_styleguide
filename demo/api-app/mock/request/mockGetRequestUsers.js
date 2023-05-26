/**
 * return LoggedInUser get request fetch
 */
import {TEST_ROLE_ADMIN_ID, TEST_ROLE_USER_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default () => {
  return {
    "header": {
      "id": "d0e8e203-5031-4ec4-b6b9-cb15a780009b",
      "status": "success",
      "servertime": 1604585526,
      "title": "app_users_index_success",
      "action": "d7bc9044-a64e-5421-a4d7-7a94eaa39d37",
      "message": "The operation was successful.",
      "url": "\/users.json?contain%5Bprofile%5D=1\u0026api-version=v2",
      "code": 200
    },
    "body": [
      {
        "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "role_id": TEST_ROLE_USER_ID,
        "username": "dame@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T12:33:25+00:00",
        "modified": "2020-11-02T13:33:25+00:00",
        "profile": {
          "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "first_name": "Dame Steve",
          "last_name": "Shirley",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "02258aab-c89e-4dd4-8c76-143a1620eb8c",
            "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
            "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            "model": "Avatar",
            "filename": "dame steve.png",
            "filesize": 20676,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "f2695972b9009970ac85aae95f907693268cd249",
            "path": "Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:25+00:00",
            "modified": "2020-11-02T14:33:25+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.a99472d5.png",
              "small": "img\/public\/Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.65a0ba70.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "f0df9afb-2f0a-5273-aa1e-1f625f2920a0",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWVJ3EBEADbUrPtSQprUnUAxYb9qJiDO+nhzQAbVOiz7cc34xYLyjwIzlgn\nfwO2kEUm4mlN6xCbXmlL9KIuTrehYpB1dmAbDk+jYUowPj92YoqDXp8VRZ3Dz86E\nyEXg7Od1XB4Ym6BnYtckkksmBM1eMX99K\/j91PYXRU0Xz8AMtEZu7jg1mLq279bv\nFTY9qKzyJOkshKYcmWLpeKqAKEqPWfTQ89Z\/mVudQDu6KYKNVEe+SdYGJh8jJfe3\nsVgFAlSUeUeylWYjFP6eWobpe+SoIp2Ji2nJAWp4lqXm5sH4w6iPHqCH+jXbr1cL\nHWVU01fLiKOxWVBi9Gmd6PgFn1oBKetXARU6RiETNbQoi1F5\/ugeN+lziJ5DxLoA\ndbqlb34IaAQMS5aaICq+fJKgOtZxDCmFYYzubTqqtDiOqDV5sxLtgyEiwgK6YnXj\n2JElHGbZNKCh33hyg9tOYWUHsXB4kwpAgbI5VEceACCRLO53D8kLOIBp5W8sSOra\n0m+9yitbuFDRWIoAouJdwolHPH8ChhqBUxzs8Mu8KYLe2JIujETiMSvOnaChrVK5\nw\/Q\/AsJYiyKGEVpfNFfMqLRKZMFubHhLsihDbk0Fz6C0M8C9MVZ6vglFBJuT9YjY\nY\/UVm2psWesoXUhfAI1rjEObYHTvFT8gkkxsjvenr9q938HbTn1b1sxIjwARAQAB\ntChEYW1lICdTdGV2ZScgU2hpcmxleSA8ZGFtZUBwYXNzYm9sdC5jb20+iQJOBBMB\nCgA4AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEA+ZTXFKv11RMVVgp3Y4m\n25Wc8dAFAl0bm88ACgkQ3Y4m25Wc8dDSqw\/+O\/wnI48\/Cl\/QxiUuxOzKAQQsbeDw\nnxBWunpx1LQMOqqfwiDu1SBYaBZzoM5phFCjBhZeykWZyzCVAuaXa5mImDWmUitK\nFSgUmMOVe4tBuBXoXhk1sn5pyTxjBjer\/PP2SdRhF0AwRni2vaqFSCueAQ6kCVUK\nfttjBZ\/zWFJqJLqjJmHvJ2yBXLAQrdG1V5aJQT0LxiVBcJ2c2LQw3LrwZ0WlMT4v\nyoLtZq0cZs7q9rjvh42i7HTmkkjHuLhsQ8MsG9kItqoG9Ht903qgqRZYQVJcuqPT\n1dQBLY1YOjqa63qRndwt6r2IGMzABniNWsQ\/DOizae1o6Rb12UcTWW2nREg6IVUe\n+WUNLNOxbnS0bgJzkvV2ab2Rkh4yX3g5SGTbJxnIUEataSuzoo0lk6TaO5BZffyH\n48Ad5dBV7O2BFNVB0H1Fs+A03EqMF1+mxJ1cmc+PYwtcwz135PT7Lkonvu+7Ze9p\nQR\/B+al+3F008D647ciATXIFUsEfS2L7FFRmyaMvr\/Wh0hV\/VA84cKbJuEbuGxFR\nn0cUsh6T0kCahRFdpDq322IxgH3alCYx75dIstnr9ckfE+teAQe3nmLro33q+QTH\nzriUwsSIuZOF29qQgbM9AnW49Nm0fOx6MzlVeoiN8Kqb4wkfN4MsYKDybsY2DkuJ\nh50+vKZm2j6MpJm5Ag0EVZUncQEQAMVk1qBkdXFXIJQSL1oD3jfPL5gSFy9Ho1Hs\nUkN8uM7ILhmD+5sJ\/6mHnJFrV9zDLjmNnOTnfug72+L2sNCIvzFGuncvCNM2Xqtr\nWAsSf+XXS4Map\/Qdn1DrRnIvfeLgvIHGhMe8HdRmr4wwbnocub0ujGtqW2DqHOer\nwxP42ImBpCcY2NoHnu4aCPPPqKd8A6eZcIw9DQ9gb+9St+qGuUzk\/TcwHQb0dHUO\nqyT+zZclyxQYO7gEkbNAsQOtz0YT3vz+dq+g+3JSQApBq74Waws6d9c1l7qWVGds\njYR9qRULv8AZqA53JgzGZfcigzBzX9SGQVgAnBKLeEWIptdEKsQJGVJgO13iWkqv\n72OSrrNlI9LR648m8n80wXRZVgiVQ9hikNJZnEu8nNEVqEXAktu8JRUNxTZvrw6z\nmtIFEwTyvXibYnMniLoUK3sa8GHmMT25c7tgYwSfdsciz+e5In5LHTs1g1qMGb59\nK5+62CYE5WhqBRh\/eB7\/Csiip0ohflwuE62RuSi5rKMbAXmyCv8NNw9ocsF01bZb\nf2s+jl5Vl\/CMyI4k3yCdIq3CZD5fq\/lip2HAjaHCMFWfrBy2HGZRUzN+CAIsJO3L\n2lOUgwNhEBa9vPq+wcLbLxd1TV61g+J\/1nMZ+4H6hRlDrJP15YmgY13Qki5NrjxV\nvf05vCO9ABEBAAGJAjYEGAEKACACGwwWIQQD5lNcUq\/XVExVWCndjibblZzx0AUC\nXRub2gAKCRDdjibblZzx0Nz2D\/9FnXa9KytV\/WvktA74v2N77uUurArhMUAzu8Hz\njeKWMOjofRcX1W0izm5lyi96npRwxo3tF9d6WeE1Filck5FeZeqMK0R3DU1BYPfu\nDFqXVTJokiaCchJfHn+PNMmlyDrDu6FIvOaJBfOrGouMK7pkrpSsfwTRfNK2r9Wv\nEaI5DTP2wMYkEwvoVzHfHioCYoOgP8Lma8\/0PaNIQ8kOpiydc+qXyLly0OSEb7XT\nQEHO3uaCoFodu9QghRxaoIxZ3kb\/LUB4pWnZhd\/00+ijcOU2mmc\/sONfnaD4wbR5\nqrTelDruSAOy2PPBzkcTstg3DQeUUWMGZIGdkrAq+ufGO9xUGJ18LF76xG31FcWN\nmhShZ+rYAAOdy4MMHaMdbACcJRyKX9iI7avmj8nPKeq88JtnFY9v+t6lp+4OHKdj\nHaKgo27jGW8OhPRK4R96W+xQdnB8O7eJS4XilgSUEjDnBsZmbzoVPy4avFk+06wz\nFhCq\/EE26P1lkREPmR72TtSjw5DZUST+uAVCOdz\/VbD7nJh8oSgzWmoZvx53PcjP\nP6H7xJd29T63Hx78ZLekls41qWKXCgXpoapO4pK4Qco4YqlRuQAejcKp6WLCzXDT\nsJqDMAb6AJhuS1Jea7zGoad7YlvCXXiSgSXs\/lmiRt9FEbQaKunk03bDjlJwgU5f\nUXjj0w==\n=ikRL\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Dame \u0027Steve\u0027 Shirley \u003Cdame@passbolt.com\u003E",
          "key_id": "959CF1D0",
          "fingerprint": "03E6535C52AFD7544C555829DD8E26DB959CF1D0",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-02T11:58:41+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "role_id": TEST_ROLE_USER_ID,
        "username": "betty@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-10-19T14:33:25+00:00",
        "modified": "2020-10-26T14:33:25+00:00",
        "profile": {
          "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "first_name": "Betty",
          "last_name": "Holberton",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "0baf5788-8e7f-4f5d-8c1e-c9a7fecd8750",
            "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
            "model": "Avatar",
            "filename": "betty.png",
            "filesize": 115942,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
            "path": "Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:26+00:00",
            "modified": "2020-11-02T14:33:26+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.a99472d5.png",
              "small": "img\/public\/Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.65a0ba70.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "b4ac2e2f-2764-51e6-82c9-2066943733ff",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWVIFEBEADNf9iYgEVVxHAQ06XTEtx2kpm9jW4kiwBUeJxDEWnUPACEW0Qn\n8qA+WAAMeFppxGIjkxW3lyI+TfV0Cclw7h5GTSMlSlIosrNqFRDvj\/q8ghZLAccy\n5rcpHfLwHdmGR+S4qzCxfJQ9rkBdZQkde4LpRDmbx1EkFeed1FXwoNuxFfp7cBoo\n\/Z5if+mf+6pn1oLAy47PlASYltPvtj\/pK3ZNBatPz5vfBVRjTH9UrdXK8ZjnWypw\nACln7pe1vz5mAmNJdpPhxvAMXMx9zWEookYQFCaeOKI9t6t5LX9Vn2wAfHqLV94P\n8trrBRHYgAjMI\/fIoOXxcSBEBM98AeJMgMjwQ4\/P1o0bvAhxitNCIgqeLtW2bR4W\nG+8SF6ALcZM1kGt8a0DSC9X8dtHpKSvoCT7GgCXtuMl1gptjprzHnM1thhSXZyFI\nmVM3e99MC101JG1pQpmyC91KyHPWcwZE\/ugIZTsJQwSjPeLHcGbp+5cLOWArH64Y\nVdiUkQ0SwPdB1tsUvfekoNBWQgCNAL9yFTXOsxNM9AsZ+r55kQvp3voMdt49n6z1\n9P6sVaPa3+7yj1W5LBIV0stgxixbXBBTnAx19R+23FnmecfHYH8cIiFwJsYWsAYB\nCGFzhP9kYzU7Io6TXAZ03LY9KGZW1aRhZTUuY+JErWFYr\/D+9skZ5GE1bQARAQAB\ntCRCZXR0eSBIb2xiZXJ0b24gPGJldHR5QHBhc3Nib2x0LmNvbT6JAk4EEwEKADgC\nGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQSnVIYMOt5asEWZAl7T8f5L5h1w\nCQUCXRubCAAKCRDT8f5L5h1wCS7hEACZMSsu66LG0m875Ow4eivGQaJ8CStPGAaG\nhjgeINUnEWWLABfcGAKYhUCeReKY6sESE+EjS7igeqrjME2Y1WhvUgvuCOz1u8Ei\nV4skeewqV0cfZR0U2HW9nwapP9DNpEVjYPncTshvbYaUzF99RCj5kxpcy4VWd\/On\nacbeWGF2wcrsy6X9zsbkAzHxjq0EfKyZtfnl3\/gMVhaL02v7Q9OtTz\/to0cLPnm0\nYSfCpd91+To9vXQsz8B5OAGOvuEJ3JizL30E\/xc0qqI\/Mn6NtMSsoY3XZHt51c8y\ngtV5PavMBKX1ktp3hXR+qfXoMy5fkT80hNu8geyN3HcRjYWSas\/0lV6ts4kZFrpr\nbH6Xb20O0stiNrD0EM4Z2hUhQTg+\/IOj9LeyBi+XpRx6S1f206u2j4DlEcvLcFCU\nq5RHYqc8AfjdJsaC3t9BkmI8zCAJNM+q15EAkYhVfeznyLzKt2avQAR\/7RYElt4H\nX2mfIa38vIqjl\/hcIgIOFRhLG\/c+ajMG0i7xwt5bffuZsXwqOBZIPTS9RKYjmwJ0\nzTUbTRxYONBR3ddDBfDDm3\/bYcnfqJlApJEdBzdemv7StYN5U6+YXjxmwE3JR7+h\n9a+GYhQ4r6pBi1Q8n69nOStQy\/ikgQq4dzrlw0jYoTcsfYhc1vDA3Gp9ue6CVbRn\n+UoI61Mtm7kCDQRVlSBRARAAu8uW\/hS53cTd6nkO46glyE5MOenGBwX6hs+33OVD\nVWSwZJkO3U\/O6xVspe+SlMZY+bKoDlLrIj5qENFudAwVmq+QuLU+QTE673FD5SFZ\nP1DuTe2Hjoo3s0xmLdQQegECCZBniWwnLmzpl89owtbrli+hlN78VYYezI6ev9WT\n\/JSQRV4GIDxbPjcdeLJNiszpcJRxn7SVSogYax+G8CjGOZRL0ZQAmqhi0x\/NJS7U\n2kiP6BwObNGP1bTmwIBa6VF0NWC07xnUDJ3kV0SOT16EsR8G\/0Huq1AYe7TvKAwy\n8A0x8gd9fLvIjSOWL0vsOvVEzGth3tZZjmMEhwK5ZpA570gEJjDs9zY6WCnR4qmE\nosHdZIaB7DG+zyBm0G4suJAAMsIDOiBdyIKnbQRALegGitVwv3IHTfRKaJDTBrEG\ndMeuE0uHMrR3vQMWDAUj2c6UV2OrHePpucZYLIj11s2xlhhpbf22q3hIp5jQ5qsm\n1\/XKoSuyWuYzAVIKo+7KDB\/rLAbtUsrnRa\/YsgwyAraq5NaBcIvd81aDtosxKbO1\nD3BCWfq2TkHRwTVR\/PhI5RJ1y3\/67+1Q+Su1v2Mqw\/wyfjIMcioZcDSSEZXDVzo+\n8J5mIG3z4ckWcY7LwAu09yV\/RRdkePvMxe0Gz\/fdUP1Vt4Z0W1cuOwPrI2MB\/gnJ\naisAEQEAAYkCNgQYAQoAIAIbDBYhBKdUhgw63lqwRZkCXtPx\/kvmHXAJBQJdG5sg\nAAoJENPx\/kvmHXAJnt8P\/iOaamlsCIWoWgMfWikipAh9M\/xfvxY5E2qWFhDHqFun\noVZYuXeZ\/PX8ZRrhgr7wrvk6XYlitbHWivoq9z\/gchX1l+xj3ncWH6Jwr8VJRKWT\nbFxj6YvbN5gUjXsk1qxx0oLxVALPINIXRuqFZJRpEHbE47S3jC1VN+G2Z3\/JOcoY\nmXCXlx66EA95BPRxSZt65HWEA\/zNyqwR0ZakG0mnuL154A+BPsNcM1I3uHfBzmGb\nBpW1nC7Wmb484fZlVzIcAUsBod1n+nIXUcVnrWD8zwqP\/B7lhYpp1ozb8+vF1hID\nDr\/BJNlZW56rvSKjlIETkqKjWCIxOB9BamnrxxemmEWf82aDosjdGmgwHrYpfgDM\nArtnsZ+2fVCOGggmJ92I0P8zf9qCiSWGg0\/8xzf4SS5TfU4fMjIVqexHiOKX0ci6\nbQOX5VfKRaPMX00ljb+BEz3aFKi7\/lggxSB5vTJqpintCbs182p\/8D9ZTDVyKEVQ\nII0JPr+VdwEO1mm0wMq6iIe2zlKM9qjqq2TuRmsNS7QUnijFU2j3lbfl9LcpEPiw\nVTRIHkS0aUc\/4Ln+IaOAUovDSN0jLwBmbl7gHrp+r7JQgPEQI8P4XjjEndrg0X24\nHdlU4AAE7nI6dZeGf8IEXj5k\/kDkIMSJmMtm2eXpJZcPYGDVUkOA30ioDY14fVY9\n=KJsT\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Betty Holberton \u003Cbetty@passbolt.com\u003E",
          "key_id": "E61D7009",
          "fingerprint": "A754860C3ADE5AB04599025ED3F1FE4BE61D7009",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-02T11:28:17+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "887422c0-bef6-59a7-bbda-84c253ee0848",
        "role_id": TEST_ROLE_USER_ID,
        "username": "frances@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "543865d0-5f9b-598d-928b-2811f3cae77f",
          "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
          "first_name": "Frances",
          "last_name": "Allen",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "3af7b0ca-6b6c-4e54-a36c-60cb060bb34d",
            "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
            "foreign_key": "543865d0-5f9b-598d-928b-2811f3cae77f",
            "model": "Avatar",
            "filename": "frances.png",
            "filesize": 283883,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "95af1b264a94de0b75af95e75030832245afc8bf",
            "path": "Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:25+00:00",
            "modified": "2020-11-02T14:33:25+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.a99472d5.png",
              "small": "img\/public\/Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.65a0ba70.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "38804173-18aa-5ec1-99b9-354496374816",
            "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
            "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "82eaeed6-32a9-5e56-af93-6bc362a9d62b",
          "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaH8BEADaNmNDTAuy9QRsdFTV1yJSbI6u5GYuDWV6TS7isEFxj+BIvgAc\nryRjXfUHJv\/WOC1O4lCS5sOvYxwVTsafY6U4qqEJZa2SO+1GxC5Gdty+G6pVnkw6\n9Zh4RUErKKQYR9qCKyHBDMcEnDHZv4KMRMhwgrihWWyfOgdIkgv7PESsGTJIzZ7q\n62ylAPHRdF7BGFn6WUJbH75NIxpybY8mRuVM\/5rCbn1zxzHiUSR2V8jjjVSZIrye\noJnXuP7ZCG8GkJxRPX0wu5q+2gumczeWBLkFN2+X3wf0y\/K1kn9wB4TFTfpEGxIU\naJ6yhwCS48b6NDG6rENth1idzbu0Q9lKqNxJ8v24bQ2tZsO6qGFxvqA4eCaW+tx1\n182oq4Akmi2Oon\/ryU5OFoLObhDI9uFYkSh5EOS6DefcXMwcUZT9Wvy4DA\/6gqSj\no26lZiqGZ77PtTPB876wHWPyrwiDgTdkaOYdvpx95AnUcQtkgh7n0kCkMEHLP5kc\nNEIoJzbu2UKZ6nxMG\/gMD2kX1anSdI2MJXGdEQO4bX4Do3UeiOyHzXzqe3YC+l3d\nc5F8Nqug\/GiRHGEex3FOEEUHGhzSrOcf0QKAjtK9pfZicrUjLMeQC7veXp\/Hfut4\nuxhl1CtEXMhK\/FIVjNV25gaoA8aZUiw4mb+dnIgIzj7n+B\/aPWurlsE\/iQARAQAB\ntCRGcmFuY2VzIEFsbGVuIDxmcmFuY2VzQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgC\nGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQSY2jM1BpLyG9X4Ohfo3FYXR3+x\nTAUCXRucbQAKCRDo3FYXR3+xTGU8EADNdPHIU02EFJbn1c2\/7oXA60bn4wixt0ZO\nJU5jrbDefpysP7xs7I8wFy2EZDgZQkeKisEs26cNR1i0XqsmvKvqypzpLidSXCGo\n5yOce8llpoasLnCVEvIFyDUX87gYw9W99G3NErIC8E5HkpuErcDxvssMMVfof0Zg\nFetniTQjAXASlDQy681bYsdK56NXoMlO8ZCocM1Kcl\/EGhDGYc6EzjZ8YijjQTyd\nmB\/MqFpibUxUusKtVEpcdBmFmlamTbKGmVZhLTI\/B\/9uk1jrOABeXi00pXJC8ZBq\nKT3VpmHtV9Q7A+Oq2ad6deqYuEPjwUy1Hg7rV87H6CyKwQsgvSUe85X2Wf\/HtmAq\nOX7R1tnCFuzVI6Gt0dja25xKgEt4l3eUa8EhAXh90qHzJ9EqJ6IjqvLK9pVUp6Hs\nfxVfo8abZawiesvJ\/oa2GC\/1fYoHzV0MwXgLqzROEvncGLzZ\/4SMmz5Qzk9a9Zze\n78L1IcbegckJO88CjT6Rf0dEtm2UVawupIRTQavpuR1ECJjNxLA+Mhc6+HJ1zGH4\nSP9\/RAlWgh5C+KzJKC+Vgdl6D83rOOfjk7JO8YdI48R+6K073zQwpIineqRTozR9\nhUra9El4\/7G41WwGl51k+8rssA3YP22tQojP+hStVtjmwNNaLMIIm+nc4KItQsSz\nHO\/+hh+s9bkCDQRVlmh\/ARAAswOgpvan17ZeYR8nr5sKBsMkWKI\/Px8r+dBbO2xS\nBXMdhaUKjbEHPUn0n03FpqDRtW2EWxRpSWcXFQXqXEN7phUXqVHsKT4Enp61J3u8\n2RoMj8fo0Lxce3WO8WbYJpj1+LhvCvttoJaqjB3YiwtYn7U92DZLhEgzXTbuGOSr\nCwQ\/c5zOqnApomnDudL4M34seNtn\/DwYfXdDuHVcYNKBDSJWaZOVYkbvbgFbgjMf\nwRnAt1uyBX1K2bmlsfvvw6iV26EcGOFB2LywlVAZn+nIgbWq+qBS9uaRZXYmKK2I\naiAKK56iRTg\/t524h\/lu5KSZg1Uu6i3R+3ghuMv+Y4pcbSE2L+qs0s5awd66xwBr\nFZpBLwUSPUEuOrZS9HRY4nLmEbQkOuSwmSjQcJNHrVIgCKWIat2tB5v6kjUY7pyO\n7Gj8V5bCv6ewgmSTzW+oPzijY+Qh7+h+ITdfHZvRWm1cXaIj0FL3AvVXPxMoz9\/0\nPqH\/QuAW1jEPJuWlhdvJ\/AO3+rO5fDR+84Xm4Fi\/Bu1cBVJz5fap\/uJZe7ZIn657\nZ7JXAd2WCQ9FHGiWErnjdxEAIp5KHgvo2FOjvXzooC\/\/W4uI8kx001iq22CU8YBd\nX7ulKmR+sBMTT+bimyRhMl2dgOE9IEozDah8Y4D7mcLSJeC5Dhwu7cPVgVKcdHX4\neVsAEQEAAYkCNgQYAQoAIAIbDBYhBJjaMzUGkvIb1fg6F+jcVhdHf7FMBQJdG5xg\nAAoJEOjcVhdHf7FMZzYQAJu\/d3f+3tSi5Hzs\/0A\/TH0jvPjoXPuYlZhlZp1fs8SC\no5KSVOPUrdvlJkX0\/eqg4XcTEz27bWDJ5y73rOOR81y2FE\/WIem0bFQGd8PedX2Y\n2X9VzoElGIh+zji1\/S\/9J63+UrIRDMipjQmNK0UyZXak+mdbU7Jjgg1r5akoji8Z\npOAUGQuGu4wNioCsC0Vx3Y7yC666DjqQy5V4Glxclwjrj26y1VFGE1g1Z+ZHa7fx\noTUv6wNqtp4WvE4AaKpcUzXj\/IUhXR9Kc4Mckz3HXYo4xKPwpzMVo+H7sYtltK+h\nRLG\/HGMzIpphHeW\/T+3NKjVUODIA7R9F9c7ZnEE5QYSzjpeLkdgXgxO312VOYpn2\nVc+Dm5Wj8cS7L3AGwzcM9GkpT4TxJNyAN8ImfcYnBeXXWMXxn+SyrJ07CYGEmcWY\n7Nd7PNDHEi\/1H61hr2RVoMlxd\/4r8MiAAb7P0Q94es2ykdmm6RH8wwL1vkRqgs78\n895GiLiI99ZWeHdO85GJWB6oUwNwqjQm0CP6EklHr4nmJoon\/bNrmHViZvQ9Or1F\nT5sCBF9rH9JdWQ1B7d4kH1hU\/n16ObwxE83spd\/BBo0b7ayiE6\/MCmUouLTIqdh2\nd5o7RTE7uW+LciwI0b78SL7Mw1UH+njrtq6QjfYni1wLI770s3\/7+lSUIi895K5T\n=82jm\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Frances Allen \u003Cfrances@passbolt.com\u003E",
          "key_id": "477FB14C",
          "fingerprint": "98DA33350692F21BD5F83A17E8DC5617477FB14C",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:48:31+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "f848277c-5398-58f8-a82a-72397af2d450",
        "role_id": TEST_ROLE_USER_ID,
        "username": "ada@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-09-02T14:33:25+00:00",
        "modified": "2020-10-02T14:33:25+00:00",
        "profile": {
          "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "first_name": "Ada",
          "last_name": "Lovelace",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "bee583a7-0518-481d-bccc-76466f8608fc",
            "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
            "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            "model": "Avatar",
            "filename": "ada.png",
            "filesize": 170049,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
            "path": "Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:26+00:00",
            "modified": "2020-11-02T14:33:26+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.a99472d5.png",
              "small": "img\/public\/Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.65a0ba70.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "04481719-5d9d-5e22-880a-a6b9270601d2",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFXHTB8BEADAaRMUn++WVatrw3kQK7\/6S6DvBauIYcBateuFjczhwEKXUD6T\nhLm7nOv5\/TKzCpnB5WkP+UZyfT\/+jCC2x4+pSgog46jIOuigWBL6Y9F6KkedApFK\nxnF6cydxsKxNf\/V70Nwagh9ZD4W5ujy+RCB6wYVARDKOlYJnHKWqco7anGhWYj8K\nKaDT+7yM7LGy+tCZ96HCw4AvcTb2nXF197Btu2RDWZ\/0MhO+DFuLMITXbhxgQC\/e\naA1CS6BNS7F91pty7s2hPQgYg3HUaDogTiIyth8R5Inn9DxlMs6WDXGc6IElSfhC\nnfcICao22AlM6X3vTxzdBJ0hm0RV3iU1df0J9GoM7Y7y8OieOJeTI22yFkZpCM8i\ntL+cMjWyiID06dINTRAvN2cHhaLQTfyD1S60GXTrpTMkJzJHlvjMk0wapNdDM1q3\njKZC+9HAFvyVf0UsU156JWtQBfkE1lqAYxFvMR\/ne+kI8+6ueIJNcAtScqh0LpA5\nuvPjiIjvlZygqPwQ\/LUMgxS0P7sPNzaKiWc9OpUNl4\/P3XTboMQ6wwrZ3wOmSYuh\nFN8ez51U8UpHPSsI8tcHWx66WsiiAWdAFctpeR\/ZuQcXMvgEad57pz\/jNN2JHycA\n+awesPIJieX5QmG44sfxkOvHqkB3l193yzxu\/awYRnWinH71ySW4GJepPQARAQAB\ntB9BZGEgTG92ZWxhY2UgPGFkYUBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEA\/YOlY9MspcjrN92E1O1sV2bBU8FAl0b\nmi8ACgkQE1O1sV2bBU+Okw\/\/b\/PRVTz0\/hgdagcVNYPn\/lclDFuwwqanyvYu6y6M\nAiLVn6CUtxfU7GH2aSwZSr7D\/46TSlBHvxVvNlYROMx7odbLgq47OJxfUDG5OPi7\nLZgsuE8zijCPURZTZu20m+ratsieV0ziri+xJV09xJrjdkXHdX2PrkU0YeJxhE50\nJuMR1rf7EHfCp45nWbXoM4H+LnadGC1zSHa1WhSJkeaYw9jp1gh93BKD8+kmUrm6\ncKEjxN54YpgjFwSdA60b+BZgXbMgA37gNQCnZYjk7toaQClUbqLMaQxHPIjETB+Z\njJNKOYn740N2LTRtCi3ioraQNgXQEU7tWsXGS0tuMMN7w4ya1I6sYV3fCtfiyXFw\nfuYnjjGzn5hXtTjiOLJ+2kdy5OmNZc9wpf6IpKv7\/F2RUwLsBUfH4ondNNXscdkB\n6Zoj1Hxt16TpkHnYrKsSWtoOs90JnlwYbHnki6R\/gekYRSRSpD\/ybScQDRASQ0aO\nhbi71WuyFbLZF92P1mEK5GInJeiFjKaifvJ8F+oagI9hiYcHgX6ghktaPrANa2De\nOjmesQ0WjIHirzFKx3avYIkOFwKp8v6KTzynAEQ8XUqZmqEhNjEgVKHH0g3sC+EC\nZ\/HGLHsRRIN1siYnJGahrrkNs7lFI5LTqByHh52bismY3ADLemxH6Voq+DokvQn4\nHxS5Ag0EVcdMHwEQAMFWZvlswoC+dEFISBhJLz0XpTR5M84MCn19s\/ILjp6dGPbC\nvlGcT5Ol\/wL43T3hML8bzq18MRGgkzhwsBkUXO+E7jVePjuGFvRwS5W+QYwCuAmw\nDijDdMhrev1mrdVK61v\/2U9kt5faETW8ZIYIvAWLaw\/lMHbVmKOa35ZCIJWcNsrv\noro2kGUklM6Nq1JQyU+puGPHuvm+1ywZzpAH5q55pMgfO+9JjMU3XFs+eqv6LVyA\n\/Y6T7ZK1H8inbUPm\/26sSvmYsT\/4xNVosC\/ha9lFEAasz\/rbVg7thffje4LWOXJB\no40iBTlHsNbCGs5BfNC0wl719JDA4V8mwhGInNtETCrGwg3mBlDrk5jYrDq5IMVk\nyX4Z6T8Fd2fLHmUr2kFc4vC96tGQGhNrbAa\/EeaAkWMeFyp\/YOW0Z3X2tz5A+lm+\nqevJZ3HcQd+7ca6mPTrYSVVXhclwSkyCLlhRJwEwSxrn+a2ZToYNotLs1uEy6tOL\nbIyhFBQNsR6mTa2ttkd\/89wJ+r9s7XYDOyibTQyUGgOXu\/0l1K0jTREKlC91wKkm\ndw\/lJkjZCIMc\/KTHiB1e7f5NdFtxwErToEZOLVumop0FjRqzHoXZIR9OCSMUzUmM\nspGHalE71GfwB9DkAlgvoJPohyiipJ\/Paw3pOytZnb\/7A\/PoRSjELgDNPJhxABEB\nAAGJAjYEGAEKACACGwwWIQQD9g6Vj0yylyOs33YTU7WxXZsFTwUCXRuaPgAKCRAT\nU7WxXZsFTxX0EADAN9lreHgEvsl4JK89JqwBLjvGeXGTNmHsfczCTLAutVde+Lf0\nqACAhKhG0J8Omru2jVkUqPhkRcaTfaPKopT2KU8GfjKuuAlJ+BzH7oUq\/wy70t2h\nsglAYByv4y0emwnGyFC8VNw2Fe+Wil2y5d8DI8XHGp0bAXehjT2S7\/v1lEypeiiE\nNbhAnGG94Zywwwim0RltyNKXOgGeT4mroYxAL0zeTaX99Lch+DqyaeDq94g4sfhA\nVvGT2KJDT85vR3oNbB0U5wlbKPa+bUl8CokEDjqrDmdZOOs\/UO2mc45V3X5RNRtp\nNZMBGPJsxOKQExEOZncOVsY7ZqLrecuR8UJBQnhPd1aoz3HCJppaPI02uINWyQLs\nCogTf+nQWnLyN9qLrToriahNcZlDfuJCRVKTQ1gw1lkSN3IZRSkBuRYRe05US+C6\n8JMKHP+1XMKMgQM2XR7r4noMJKLaVUzfLXuPIWH2xNdgYXcIOSRjiANkIv4O7lWM\nxX9vD6LklijrepMl55Omu0bhF5rRn2VAubfxKhJs0eQn69+NWaVUrNMQ078nF+8G\nKT6vH32q9i9fpV38XYlwM9qEa0il5wfrSwPuDd5vmGgk9AOlSEzY2vE1kvp7lEt1\nTdb3ZfAajPMO3Iov5dwvm0zhJDQHFo7SFi5jH0Pgk4bAd9HBmB8sioxL4Q==\n=Kwft\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Ada Lovelace \u003Cada@passbolt.com\u003E",
          "key_id": "5D9B054F",
          "fingerprint": "03F60E958F4CB29723ACDF761353B5B15D9B054F",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-08-09T12:48:31+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "role_id": TEST_ROLE_USER_ID,
        "username": "carol@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-10-31T14:33:25+00:00",
        "modified": "2020-11-01T14:33:25+00:00",
        "profile": {
          "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "first_name": "Carol",
          "last_name": "Shaw",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "c3b077ed-9f8e-4d14-b0cb-6edeed3d63f5",
            "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            "model": "Avatar",
            "filename": "carol.png",
            "filesize": 733439,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
            "path": "Avatar\/05\/32\/61\/c3b077ed9f8e4d14b0cb6edeed3d63f5\/c3b077ed9f8e4d14b0cb6edeed3d63f5.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:25+00:00",
            "modified": "2020-11-02T14:33:25+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/05\/32\/61\/c3b077ed9f8e4d14b0cb6edeed3d63f5\/c3b077ed9f8e4d14b0cb6edeed3d63f5.a99472d5.png",
              "small": "img\/public\/Avatar\/05\/32\/61\/c3b077ed9f8e4d14b0cb6edeed3d63f5\/c3b077ed9f8e4d14b0cb6edeed3d63f5.65a0ba70.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "1d3d0565-f075-50d4-b58a-cbb82700e79b",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWVH5gBEADl3Pyvzhciv\/+1k9PL+c+Yr5sasPXJmoJwQwBnvbJEgrVVEPj6\nr0gJeZmHb0cozL1wfUkOAR9l7YreJ3tNsh7y9Mz3RhICVc46MWDAu\/mQMFVLtaXu\nhoed6Xs21jotfBq\/2KZlxY678bAmQTDPCqrN5Ehnt+1mwsSC7DG91A1A57sVyV3C\nJy1T48mLVrggF8iDuePGUppBYzvoW9WpFdalhN6+Ni3VoTlSv5Ds49805eGlHv3d\nsubTUfX8HBSlu3RNPns2qTn3CQNTq\/29DFUN\/T1rGDdRYjCIKkxdwvtwDxOHfLSK\npMtQ5yNL2dJdymsiAGXOLhGCMVVqf91jePTAsjIlKaCtxG\/q77OplLm+SksLBXkO\npROUKuhlImu7aymFu8FrSvEMDIWLbhBavku1tPgQyxF4CDLQiBxZNur6l5xWXVEo\nqpNLsiICsYIFDNBSJy8bQAwoCBTz3tAwI0QZC9G5qFzBkxye6qNbbTGMvrpaM37Y\nqXPkM+i\/wc1cs\/FDqYIgwV6Ws3oIeuulyp9qImJ\/in89DW6Ls51G7lni244Fqgn6\nvQLtFf4XeSmtuRWrUFmPE5Zuv3Dn3G2Y13fN2fFVgaCjH6J1UVlRLobvM8QHWDZk\n+sLsRgQSWaW3cMJQfZUIPCM\/lreLJ3SgW6nKMu8A0EQp9BSmNoNTsMo1BQARAQAB\ntB9DYXJvbCBTaGF3IDxjYXJvbEBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEV959eavnM6I16x+Ezfj8hoKUXT4FAl0b\nm3sACgkQzfj8hoKUXT6jxg\/\/cfgLMLBFVwoEFH15M\/aqmdFjulsDhKBpwhr1N\/DD\nvM0nYeKnyGWldJvy8CtX5ymnvBmg4gLuVKuixSnyjcPOsKlFEFL+n8\/RrxKWmssK\ndgMLp1U9ouPOxXfZPtogCA58vRLTL4dM7hm6Lm5uaP9E3DfpH\/IkTzBx8EZeb4sG\nbKD1TtS55AVEv6HdY9KUb+crHCfAVXB5dtKezdrJgHtmF1Hhg8O7UIF5NtsLMVSp\nrhmepxOK7aYOVuVpPWpWv84OJ\/zEBx1nraTlr97cDdOWhFEpSOug4QnMy2IIYqvj\n1nNCV5FQgPeKwL08M+mR+9xevDd454uWMFaszn0BkY7NtmdZ2APi8cWt6iRwyNGl\ntg+gdNcVee3rp2UVKkKSfncn5b2fnnCzND7asIz2N598iyFqwa4sCwLBLmFyyueG\nq1uMZ5pOzutKQiSrHF\/dlQ6jG83QNwHJNIRCDySjXQgnpDVQBsOkHc40ZvZjJfis\nN6q4Pc52m\/0hK4gAiTq933gEmEGSqxnyCKY69m0QR7\/5T3QXFNqlxOIH5OM+HEmW\nT0D\/8Nsyv7VGnUSz\/t2MxnT\/PoV2GW6AsX5GohqLgwsABOLaVQYfXnvZq4WiFnHR\nm7+xV0XdmI\/cvrReD6oX8RMJFN4Dz0RSMwCDwQJiRT4Ap9L5smYouFjytYC+yThG\nBIa5Ag0EVZUfmAEQAKDw7c8ocLWYdM4Zk6oaDQBrAvjVAvRVw39frI8kzoUuRQqI\nqRs36zol2q\/BrHwxCiV5JQ9VZ77bdl8Ys\/dn6mTeTf9IS+6PAU00G7T5hivLXfDL\nOsKOA5QONLrSf5ddFjYOjStUQdDAEPhtVYl03EV2sIk2xFZC8\/rtHXgUHCE1NDg1\nrn3IWhFStHR9Szp9pUpwsu9etVo5b+lQJKgmDNFTM+KSqcNyhrb4Hkze1Td9DjZg\nm8qBB27yM011aavXb7UKjZgSZ0R6oFIx61fUNtWA0NmYh4+5r0YyMuyhtRe+6XRW\nSj+wH1fbGo0F22NO44Aax9bidEYgpa9l2w5v4T2qi8kKjMXrg3uqay69ITurmTcB\nJwfmtL3eNgsnQ8D73xt2cuSkqoZzSRJaC8alJYtzWO8PQvCyWhiRTJdcRguFJa8T\ntVKn6DfJy9f6FdVaiwPdnrvXkLC\/4wBI4ErQ7zB42qCF8sHU5afxSqf4r7G8yrdh\n4vLFuWO0GBoVVLo3sMK5WVkqJDoYSTxYDqyuR7mLlkdpbjqFGqx7A8vgHK3jS1nv\nXqgKE0txWNoHy1hIyhElQxSiNzzqjKg7cNBy7A7WBSjAusMaYx58cHO+q6mWzwP8\nlF1V6neN4wy+BN6ywKxZc\/acwQm+NcGhZ8Rdr5QEBzM3MfGs1yKzk3N1aFdfABEB\nAAGJAjYEGAEKACACGwwWIQRX3n15q+czojXrH4TN+PyGgpRdPgUCXRubhwAKCRDN\n+PyGgpRdPr3MD\/wLVKacnHTBOzxdrW529HFzESIUI02QQ9YXWlujM8psbrVjQNeh\nYJ485mvD4BVrGi98gbGFlbObdk0NrWzwhsKSJIzqBZwGcKb8HcSCVcNM2u+VsLIH\nIH1zrUNHozuSRFkPbXfeWeDvdof+gyzavksBVENpX5FcdSNrcezDcecMUyAQMDGp\nc2aqt4IS1ljy3CImx4pnr+fjSVgzuSbNDTfBFKUMmlqY5egVvi9e0p7a5wjJoaYY\nlCzsKZwxXZwIcFHMlilnJdRGr2\/ipbS3yLrlCeqUZQMRk+1rhsP4GtihqCn6DwLr\nttYKy9zWCcKDenV3w+gDk999WeHcwwh3yMjLjB+ATvat0vDrMdU6ZoPAGhPw45+4\n4XTSSiLt7fi6n\/nvnESyXbN+14WXnDeaI\/oy\/yhUvBE3V+34DIxiBrInF8Gz4g9w\nrW3z98YIW\/OlGx6Lk2Ep1KaUuoNZpwJhE3YatdwOp38rhSXi2fXkc7dTIC2KkXG1\nQqHpQKb14KlTGLBKptXXLlqm2uksvHgQOJ\/3xUC7IQ5H82IpwDImrDIjDb2m5e\/i\nkLZ8HJMTfMif\/+uTtrd6pDL6XZs9\/59KTXp64t7I57NVtlLR0tdw1UgTLiIKuUVe\njZE642r3n6Qo+9PcAjjX4uof65PPOghNYm3LQOf8XMWxnT+QA+AzzbEoAg==\n=Rjw8\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Carol Shaw \u003Ccarol@passbolt.com\u003E",
          "key_id": "82945D3E",
          "fingerprint": "57DE7D79ABE733A235EB1F84CDF8FC8682945D3E",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-02T11:25:12+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
        "role_id": TEST_ROLE_USER_ID,
        "username": "edith@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:31:25+00:00",
        "modified": "2020-11-02T14:32:25+00:00",
        "profile": {
          "id": "08710a74-8996-5f60-b5db-ffabfa85bfe6",
          "user_id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
          "first_name": "Edith",
          "last_name": "Clarke",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "fca873ee-43eb-4b86-9a40-42dfb4baed70",
            "user_id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
            "foreign_key": "08710a74-8996-5f60-b5db-ffabfa85bfe6",
            "model": "Avatar",
            "filename": "edith.png",
            "filesize": 20462,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "6a508422b1765eaa13c28f4611340414622f9cf9",
            "path": "Avatar\/0f\/92\/e3\/fca873ee43eb4b869a4042dfb4baed70\/fca873ee43eb4b869a4042dfb4baed70.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:25+00:00",
            "modified": "2020-11-02T14:33:25+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/0f\/92\/e3\/fca873ee43eb4b869a4042dfb4baed70\/fca873ee43eb4b869a4042dfb4baed70.a99472d5.png",
              "small": "img\/public\/Avatar\/0f\/92\/e3\/fca873ee43eb4b869a4042dfb4baed70\/fca873ee43eb4b869a4042dfb4baed70.65a0ba70.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "e290ed74-a470-5903-8e80-ee25c16fe47f",
          "user_id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaD8BEADyuAZQc9tus+HALpNvNg562pQAtf0KiTVwE0zaPjojkJcWdhdU\nEHDxNamKt8vUhkk3XwOKth5A9IDwbVsTixh2dA2LlB72vJPAc+FrdfLqLIkn2fD3\nqexc16XDzPd0h3avOCVl1frDGRp2aNhxFZIMAbtsxf2Xs6UI7E9sE+2F+KfRvGEn\ndxACtBvyBtelqDg8a9EuRcZbPileXMAyQUvlWRWCIAmzt3+l8jwhWgGQ22O7kOg+\nlsO3QGCZ+of7277HA3CWXzMS5FC2XaZjC6FYFiWxJI4NDmNPcYN+EhEwGt3BXCMw\nDw3u733oMgxNS\/FzAuVGH4EzEMrt26ESDZQYUXAsNMAI\/SsnLs1q\/ZEWDdm1LNTc\n78fUXAUkQL94MN\/5r9CEambU0DekU5NRl2T6t6BrOnOaLVj3dVxALKJyUbH4Soka\n1FN+35Mb8gT9NWIEWtMaFeBO2A54JKW7uTzqLefOYNXR\/14TKrtyMXqcNeuW2O4d\nvCwv0yuKYBBBwsjymzw01wIPZ9C2SwPSIT4VLhOcbOnn06BQRZmoWHXNYnO\/z\/l3\n8R+hBfua7pvd5pWzcaaoDWo99H4n5QHZZHDcpYpOUkeiJw1ZxbxU\/WgzaEDOwLCN\n6SZuhp\/+UsXQHX4F95TfFB0FnpIJQv9D3rYqIkQBqViyeLMD7R0tVQUtrwARAQAB\ntCFFZGl0aCBDbGFya2UgPGVkaXRoQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgCGwMF\nCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQTV\/eAHt7S5gW7OJfYdZ7qmnmc5bAUC\nXRucFwAKCRAdZ7qmnmc5bNBeEACO\/79n3bIUJOONT5cMU\/8qC8KWkJm97v89EWhi\n85db2JRtDa7PVSGVF\/PBNb3+9wShFdJfArr6JAG5PUzZlaMqUhwB4SH\/zbkwhtj2\nIa344a7HNh7scuTvfgxJCr8UDCKlu\/\/4D4M9M82\/DanN20qaYBgZLQcfYFhzDH9v\neS4QmAh6x9MakSLxhl2QTwmpXCsg9oc4wBYHLsvyXN\/wRKHa9EngHXFQolcrad9I\nwJBde7wJpSxgLU0OmP3xZfcuhtpdBYydz6rtXPjGW6LZSLbuxLbQLW7proBvZxlA\n+7jj6J6qaNYmcFnRLeyaXzot7STcAZHuc2tdg2joL+zle+zEdVkZcAMhNkcUiD55\np3PJDph2usMm1E0w5Impj6\/pvc\/5GxSPjOg6kgwKtMyU4mJla6hI9tL9pbSMZPtE\nBv332Yl0dRDc3ycqAYNSehaT1EqFsMeNuHd1t+HSQw9varkm7IEsrRdqSlbmZRnM\nqMcbMvIK7s3TrC8dzI5UcZh\/G3FOJvyKCBjsGk6hzfTI9kQC6WeFeouULvYb0h22\nH7D7Pt4llSBG4Yda5Ue7zL4dYF6zpH+dbYTtU3+m63B6sixvDGOFH\/c+Dse6lB04\nhJMTUhM7AhzaZb9064ZXpFHYkX6gx5bn\/yTwoxP3BGKFowTpjvWEG9aj0Di0IQ0O\ny7TTe7kCDQRVlmg\/ARAAyg+T7PwfcCmhToMCwWc6wKNzUEe38KhcYme4myCMQ4hH\n73AoU8SDzioploJrDVIY3DsProZeGVnJb1W1O\/dRY5u2ino+6xU8a2i9GcvGhYH\/\n50bhexqOGuyMmc7\/AHZ+obuXGg66kyOgKoM\/NmCJdvD2XA\/PtQVouYvqVqS50Hnb\nFBa+D71WGiTIQC1gGIFj3X6yC26CbRsdS7ir9\/ZszrVQB30ayYjaU\/Ppgoxs62h5\nF53t+7U9C2pWhbh1Gf0cPvvEYqvOvqXGdFXWP8jXMY694HxfFsYjgmYxDXz8uwA8\nfnFjtDMY0z5yhQ23wcnb6E2XPybQMjNu431xSkiXQHM6M6xV2SLmNUfXxwuY8Hgd\n0m3w0OtuUFTBKESgC\/62ufVsv440ayzASGgN5pBolcsLt6gszkLqJaOSMe\/oToLJ\nMOqjIgE27VURwFdzFWDJMKXsxZ0rfBlV1ojQlKQRFEejAp3Xxgr2jJ2msVmXZTpi\nDPia3B7xZLMLNLmbuAv2h28ey61f3Ui+zNrze6xhbSaQUuv6DItgiXwWppWPEjp0\nmCHnOce+J4v8GgdSjeEMpYftZ\/cttnTr7r+KHwLl4\/wz0k6QBHtIOXWAs+dnxo+A\ng5IZJQvpfgasDPRp3UsLZhWw908\/W8trXHA\/KmWPE2fFW1fpakjsTzYSv0nkB9sA\nEQEAAYkCNgQYAQoAIAIbDBYhBNX94Ae3tLmBbs4l9h1nuqaeZzlsBQJdG5wjAAoJ\nEB1nuqaeZzlsUeMQAO2sWlZBJDqGQtM18opLT+oLTPSLz2Tusy2r9TC2KYPgdLbH\nxJ\/YTR02kFl6kLDxpD\/8pM87F7EzQsCs6Pcr8IvQVfECcjpdq4GUHNYm4umA6KCz\no9zbXsBfHXWaSK1Bk8cp3RJvSGEIs2solf7wFN8t6ckdNC0I0hGmX\/Bq\/u7f6wLz\nuFqF6g+NC\/6lsHAAEDgGSP8pj3Cqq2deR+F7VV6Mc2hb05kwsxmPX75XzI+jTXgE\nVN2T0rhcPM7NDZw9fn2o7mvZ9Z9CNvaPpY+GEKfhbHscTQOQEJL8R+tMHBt02t+2\nTry25m2bhosv+FlyUSg+M2gXyitDld6pV4V02AVgrQVEkaXs6yyeVaaM1MXIFB21\nfER\/gdITooYKdVEbKDP7xUXtgVKmer1EgBcU\/NWyORj10uCqRoCfgOmspByNeQJu\nKLpRsR+XmOODhglhIH2mKcX+TyQJTzD4mT5bvO07XvKjYCpbYJZBGJuR3BOIFBfC\nGf\/5Q3fz26CXTgtLQHbemsN1tnCVVVsmGf7oprYzACJv2kxsoPjkG3rqyJeqU3mt\n0MRCl9gMNMrL2nZDqIPjXNU1J0aUmzntuTNSejYeEq2zgDT\/rWcS\/xCwR1WD+g6s\nRCbvyJhlaNqkSTLvnKsGYobuKrbXF+xFs9V7dTsu01W6LjKuHXrgTCsCXdcl\n=d1r3\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Edith Clarke \u003Cedith@passbolt.com\u003E",
          "key_id": "9E67396C",
          "fingerprint": "D5FDE007B7B4B9816ECE25F61D67BAA69E67396C",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:47:27+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
        "role_id": TEST_ROLE_USER_ID,
        "username": "kathleen@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "90c45240-00ae-5aea-92a1-4b5488d5ec11",
          "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
          "first_name": "Kathleen",
          "last_name": "Antonelli",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "id": "feedf49a-ab74-4e72-bbe1-473e5c3cc243",
            "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
            "foreign_key": "90c45240-00ae-5aea-92a1-4b5488d5ec11",
            "model": "Avatar",
            "filename": "kathleen.png",
            "filesize": 53376,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "95474e9309c7c7f14fbe5c3b0f943bd145c0a366",
            "path": "Avatar\/be\/a2\/18\/feedf49aab744e72bbe1473e5c3cc243\/feedf49aab744e72bbe1473e5c3cc243.png",
            "adapter": "Local",
            "created": "2020-11-02T14:33:26+00:00",
            "modified": "2020-11-02T14:33:26+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/be\/a2\/18\/feedf49aab744e72bbe1473e5c3cc243\/feedf49aab744e72bbe1473e5c3cc243.a99472d5.png",
              "small": "img\/public\/Avatar\/be\/a2\/18\/feedf49aab744e72bbe1473e5c3cc243\/feedf49aab744e72bbe1473e5c3cc243.65a0ba70.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "a6753204-eef8-5a57-9a80-019e393626b1",
            "group_id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
            "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "da315c73-bf77-5aa6-8f10-faa47a579f15",
          "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWajsBEADWPdKeeKFC\/L1XFEplL+Aj7jW20YHdjQhnk8w1O6VnGhe4tfZS\ntxZym+KyZe\/pjY6AiaQuNjajGTKTQ1aOEHe\/iagKahTXOp413adf8oL\/snTgBzBo\nSgCVrs\/F9Gx2MfRcUsck4ELZSmuEXkYCympu6vyLqMHT+vH5nAb\/kujHuUW+ttWK\nL7Qy6oZ8ygyVEg5y2EXNST\/2+n17TS5dEz069d9T+Sl9f3zNQI0CVpphT7UMkNZD\n+Ow67WNY+M\/+PtSgW73zEOJE8hMppHx2FvKF\/dq8HhezXUQdetQnBMILvYU2IEI8\nhElaUQr0n3jMj1yfOG5cRQ5JZUdkXTc+TYuBOzGISWtI3IQod+a4ozDOe8sHqE1H\nL7QgCotbl9Yi+A6Eo55bgSiIW2Gf+LyE2OOpA8KmnAGh841EyZydnOqgVxfoSBdK\nlFBpj0Drbqw9Tef7XjVynE+e6kIffLXlbVJJgEv+zXF2IRGDXManFBVI3VLzKJot\nD5W0SCEQUgo7OMiWgNLm8qxh76j1ZVCpzlMD2gVXfgstJSv3REdmuj1QOJ1LfKiE\npODpwK1GVpMcSUbbHtNy7tVzEax95K2OAzyk8dpVID9hg4xZ0HKXKwo7AxahCba\/\nXi35DKTAwZGGmwCn3sryqdG\/Gd0Dzl5vnqj+4aGGlZVhwrqwDSjF544U1QARAQAB\ntCpLYXRobGVlbiBBbnRvbmVsbGkgPGthdGhsZWVuQHBhc3Nib2x0LmNvbT6JAk4E\nEwEKADgCGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQQU0Hr\/3pFryQTxevtN\nIDZCpzrieQUCXRueHgAKCRBNIDZCpzrieRz4D\/46U5QKuKnz4nx2iuoLI3AD8pxZ\nlM0+9KibqwVSwh\/HRznNTt3Dh6mhogDeAH7Ox+DpedueUJwqRT8vb1ZFefFzXAdo\nkP0SUxKFsg7Y87xn9dFaxre93wifi1yPCG0Z5a1H+kLY2kGZ\/qDUCTqaVL0j53FF\nqjgHWne6gAyytaKkonhhQOuK1HNixf1fEOu\/Dkeqot5F+3nGGHOS4mLZM51Uf3Ly\nPhSmcjbqJ4ugHWj4s9focZAWE2Z0PpH35z0TyVXLm8DFWmIGwtWFhrI+IQwlG98g\n7rSREGzHzJceu1jikjkO9jeVhfMCS4jBCmicXFqGYcNI5bCqLtkF1reM+gd0ylZ0\nNYQ0t9WdOdkaVrctdyfkTpUzc3ny7zc+4k5fIfUAxg9CyYzEz9VcW3HShuwqmUeU\ndWzbbvUKZ8aq0+QjkqWZjiCMYuRX50OV8Sq8PiYWg3Jl8YyIdUVzDQ5Kd\/gbeO0Z\n92c6BgnaGUKTz0Ag0hEVhP6vu+cudvMUX5XA7us7ZRATgRk5gsH6A0u9O+pqiFrM\nkfs5cn8uyb\/BXKxgSU4IyNLR\/\/fW0gD9q0hY0bFAj19RLzVVXStFogO0aoC\/OEhi\nFRnbDtXgXfG1ULG7IqDSL5ttX92a1mmTJYp92MxTlORGndSV6iKvKGTqy7Wh6VHE\n4WI3+lyBLGZRLAUDxrkCDQRVlmo7ARAAu8UE6NWgVg8hCADxmu+dAI0SgpyO8YfZ\nctZfGkEIZUFtcVn6cuxr3K5gn1yroZrLPJ03weuzt3yCwrqpDHsBAwoFwVWEuYUx\n7E3KR7XdNr8zZ0T3i+MTS27hPohZR2uOOB7W8LkmuhtvICO8\/ph2JJFPgHQoYnEh\njHzCI6XfavBMM+7aA2YYz4ZwmHVuQ2N44saCekRgLktrpdO4lKjEzZ1UGsVe9Jmm\nxjPs0FysZ2XgnAVe5Ngzox9CBFq2pjCoCrVPe3Ckb88kZEQklP9SG4jiceae9I\/Q\n4OqeB6EfXiisEyyMqlqNByTr9r4\/DwaDN5InH6MGVF7twH9TS9Pv2tcfskVkNRSt\ninv4gT4fTlPIxjyY26\/Mky+u3QpHbamQTQIKaEhtrH5ApNLU4AJWJnJmF35s6ouC\n4Tosvg69Jvsleyu1MxblEiuS0kPz6qxgbqlMdmeCy2+UeD3XJMOv5kPY+hYO7r8I\n96DnGqGdvNNF0624ewb+M+maMqKnLxSjrD9OVzXZQH59LyyWWHvnNg3ZQveAF\/XD\nCwp2nfdX8vjF0nlmzLxOWtSGTPwTKpAB8hSGb+WkjNtDF0BgLpEaqWW8BJZATdfW\nduztPZ3WFiyWPiom4bpM8zWm346H2wYBnn9Mka6KyGsdVaUNjJa5tQ3xU812DDlx\nmkxUdtqVbTUAEQEAAYkCNgQYAQoAIAIbDBYhBBTQev\/ekWvJBPF6+00gNkKnOuJ5\nBQJdG54tAAoJEE0gNkKnOuJ5QuYQAJT8+QM7p5\/kd86FOe9Uu7MCtABdGQE67svr\navJF7YfKfkAXlPvNdrZxQOQZAJvaJkbZCjdu+oH+Hu6Idva4Vw5TZdi6ZeqSYQgn\n9PAkHYOOU8uRoFl2wDBMD+\/fF+TXZsi6Uv9Q8T2V99GQG1kI35wvTTYYLYeoZjyJ\n6ZSKIjd3P9y6mMEbTMbvAkWcTt0Z4E6HyVSG3mjU4IwuBVxKGPj1Ciey5AP+ayl9\nS3uIRIFBtObyOohWs0ndaj8o5tlkB8Kh7qYuMXKOc87LL+K9OvvPFX8Q33RGe3oY\n96NtC1H2FZGuFC5675VFxC6nW1+nfylIp0NyGJL+zM0eySGV\/g1OHkMNFH2WXFyh\ngzM0z45iwnpSZ55F\/1HvX7ydKuQIs7EhQ7lO7lZu8YCthFHF8EGXikM3CjQJD1fg\n45jCmNvzModpVMKGceLSoNr64krRAztiBPTtrZFHknf96kdnJDWkVQTZBvYhomOb\ngNyVz+gP9lsQizS8ZUOXNcijwQPrqxOYHZz8ZN6r3JL6NEcbbA1bOVLLK5+J2Mty\ndRy1zdyCtV8bs6ghR4crhS3yvXFyu9UC8q2DGcQyvmhvIgWfj8zMJSFoLIP7zzQ7\nROaH1y+gt2UZ7zVnGKBX28x0\/sAzjWQlh9T8C5+egAGjcRhpY+AAkh3XAbsXwver\nxp1ZRg5j\n=X6r2\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Kathleen Antonelli \u003Ckathleen@passbolt.com\u003E",
          "key_id": "A73AE279",
          "fingerprint": "14D07AFFDE916BC904F17AFB4D203642A73AE279",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:55:55+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss12@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "0615ba9d-e88c-5b48-841a-98dd2a5be0c3",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "first_name": "jav\u0026#x0A;ascript:document.write(\u0027XSS13\u0027);",
          "last_name": "jav\u0026#x0A;ascript:document.write(\u0027XSS13\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0cdae460-e8e4-5f91-9ea3-c24c94859536",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "61214aaa-944e-58c6-8ff9-bcf3d141f69c",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6adb2168-34f6-5ca0-b59e-d1c79aadabd1",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6ee95e9b-3ed6-53bc-8042-58d41de86d76",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "77c66a1e-27b4-5f8e-849c-febc0742692d",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7b3c021a-08ae-561b-8454-d00f24f87a17",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7c0a6c37-dbff-5926-9d01-45e7681b2bdf",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "82399e0b-97c8-5e7a-b0cd-3a95a770098c",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8635209b-785f-5cd6-9c2a-01a8565d2eb2",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "89c4710a-7b04-5475-82a9-82a6035e2501",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8caca7f4-4277-5083-8da5-52e233063e8b",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "90653e21-1f03-59de-99f6-e14243fc7b8a",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a95f61f7-ceb7-5957-b498-201c6113803b",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "aae96cae-dac3-5edc-9aa7-08298946e307",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b177ac25-54d7-5e74-9beb-d428727a271a",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "bbc5e93e-e7f2-5615-9a82-58f9884f2f1a",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ea4766e5-bec6-5611-9524-265e52543072",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "c82ec137-4bef-5e75-8a2f-5cc6cb3d39d8",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
        "role_id": TEST_ROLE_USER_ID,
        "username": "nancy@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "0c39d45d-5355-53d8-ab10-8375ce3425da",
          "user_id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
          "first_name": "Nancy",
          "last_name": "Leveson",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "b2e0831f-dd63-54e2-ac50-4af24eaf5e74",
            "group_id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
            "user_id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "e152cd5e-f4fb-593c-aebc-9b06a434cb39",
          "user_id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG\/MacGPG2 v2.0.22 (Darwin)\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFdFk8gBCADsd3uX1zydSNTc3V1G74qXiMTrDi30X4O5SBaFM\/UUG7mQcu34\nHHqWt6I1YeH87Z7Dxq3hetvFbaWR8ZfvlPAruXIzFHzJEZzlCLU5YnRBFM5gvGkJ\nVbeKSKTOr+8oVeXnio+Z44T+UtBxXS+2G7wLYYTNd2UaM2WsiJaATeFiD9jZq22h\nTakgoOWKIpUrg4eKD7K8Iu+qm2l4btm7QLRyCxhP4x+d1MtwcXArmMXenUvnr\/2a\n6MDwfddmIcf23I216sJmNjEDWgWHjHoQibs3tx2pBKzY\/GI0y0NzhPZCvTdbNqTZ\nXAsOfDHm9OuziuNRCgIrx6WtekGB+iZkon6bABEBAAG0IE5hbmN5IE5hbmN5IDxu\nYW5jeUBwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJXRZPIAhsDBQsJCAcDBRUKCQgL\nBRYCAwEAAh4BAheAAAoJEA7FR62ef6FSlucIAJzL2Jzzka2FWpSPpC0ijp2uhugZ\nGkUpbFqBTx9twO992\/BvAJeyU6Kfcss0obqNZP1c5sLl2RMvc35WtpBvjkedSUEQ\npoET0FGhNUi2ZyqiU8bdbbm8EnDuLv0GG06x2ZSuQ4AXE+JKn8H4saFnPmX2h8a+\nYfhKbtS01msQmMviVaF1ZpxTugTqgFYU6wp39O7IR6DMmeKgSwElW8Gd\/gJMWx8H\n7pizEq5SQCFzR0soBpIOHg2QMDAIWS91zAHdQQoiaI5wAlAm4IeIIY90KaurRQC0\nsTziZcdrp0m65FGxZ6790nGhhqLc7u8N69CcxKNkipong4yKkFqyIErFv7e5AQ0E\nV0WTyAEIANdrlla22hZ1rg8wFPgeXKJ06JJRS8SRt9WUXLAuIuO1Xqi5uRKXpril\ngcC6t6QuipRg0ypwICcBEI2Iem9hgksKG82GVz0LSWSENAF35EG0eE8fFtssBiop\navvLKjiJa+tm4hqDYPHP1SvCf3Wl1PKNTjwuXwH2gX4bOpGF86rWUIriIgmfVVsH\nFy\/A0pQoynuYwKr+C+i4CtmZFl0F\/WTahVhVTi+KqxMU4z8a90b4gG52ZWGQ0LAS\nOahnyHXnicPQQBm80KdC1Exw6Z9QYMXj+ZMWSUvmKb\/58S0PBXRapN2KDyhHovvd\nZGHazOFTLnwZvyCmsReb8SfpyE0dtC0AEQEAAYkBHwQYAQoACQUCV0WTyAIbDAAK\nCRAOxUetnn+hUqjUB\/9EqjSSK789BAFVnY5fymq\/vMnCBkE4U\/wEVp3\/4\/e7c6Vf\ndyLmT0ULORfOVOyRPZCaohs3+2mUZJcySRHrK0SCI33H7dWXTAj8wYTE+neznZrW\nhI\/7COYcdEzRdYmFEe1qRJvmXWiSW6C6TjARZTdF7ScBzGhzRUmcyr7h9KcqJ2N\/\nbSYDlRHigAbDq57S1aa+cN92RHyAvQkJ8S1TBF3\/uqSFz41hY4GekegcEg9h5ATl\nX9fv56KCnrIdY4NZx8iYqEmjMOZ\/FRz9fpwxWapqn+V7eQl7mpSybNEt3gevuTmc\n\/RFZsK5btBeTdj8jzgg83\/jvsasJnTLgAoOdSv2j\n=1k\/p\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 2048,
          "uid": "Nancy Nancy \u003Cnancy@passbolt.com\u003E",
          "key_id": "9E7FA152",
          "fingerprint": "459B102D43F683E7EFC523610EC547AD9E7FA152",
          "type": "RSA",
          "expires": null,
          "key_created": "2016-05-25T12:00:08+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss8@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "0f713577-7e19-5b6c-8844-1e0d6f8f2878",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
          "first_name": "\u0026#x6A\u0026#x61\u0026#x76\u0026#x61\u0026#x73\u0026#x63\u0026#x72\u0026#x69\u0026#x70\u0026#x74\u0026#x3A\u0026#x64\u0026#x6f\u0026#x63\u0026#x75\u0026#x6d\u0026#x65\u0026#x6e\u0026#x74\u0026#x2e\u0026#x77\u0026#x72\u0026#x69\u0026#x74\u0026#x65\u0026#x27\u0026#x58\u0026#x53\u0026#x53\u0026#x39\u0026#x27\u0026#x29",
          "last_name": "\u0026#x6A\u0026#x61\u0026#x76\u0026#x61\u0026#x73\u0026#x63\u0026#x72\u0026#x69\u0026#x70\u0026#x74\u0026#x3A\u0026#x64\u0026#x6f\u0026#x63\u0026#x75\u0026#x6d\u0026#x65\u0026#x6e\u0026#x74\u0026#x2e\u0026#x77\u0026#x72\u0026#x69\u0026#x74\u0026#x65\u0026#x27\u0026#x58\u0026#x53\u0026#x53\u0026#x39\u0026#x27\u0026#x29",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0c0b0b51-5eba-580f-afd8-ff0c5fde6ac4",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1ddf9915-4da9-59c7-8391-46c64ebd6c58",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "44d33eea-52be-5403-8fa3-2dbb93edb889",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "47445251-5507-51a9-aded-1fa302589731",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "57cae5ef-fd72-50de-bb69-9a6b706e2cf5",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6d039d51-c875-54b2-8f39-e4832446db9e",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7bd1d078-f1c6-5989-8649-b940a763d959",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "7f6eae56-0fb1-510b-8402-84ae340cfb68",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "9085f3f4-d174-508a-8820-954efe5993b1",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "94d1f863-6664-570c-8416-cef40ef48b05",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "96220719-d07e-54d9-8c6c-a8f2858b5995",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "9c290211-1a4c-5490-b65a-64feceea61b4",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d13481e7-7db6-570b-a3cc-c2d56a60219b",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "dca5a36b-5fdf-5ce8-8a52-a5d353bb4f61",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "ea16fd0b-9761-5a4a-90df-b645b29edea4",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "eb8530b2-f086-59d9-aff6-0922210d177f",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "fda56161-f4a0-5750-bc8b-c613ed6efa39",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "8c6f3a27-8669-531e-adba-02f71c21d176",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
        "role_id": TEST_ROLE_USER_ID,
        "username": "lynne@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "12265c99-7d79-5b69-b63d-bb28cd29c6bd",
          "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
          "first_name": "Lynne",
          "last_name": "Jolitz",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "6ccbafad-8590-55bb-b2ce-02746fffcf28",
            "group_id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
            "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "596201e6-8d3b-54b9-84e6-3ed6ef99113d",
          "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWanIBEADEXgN8jBKhjQJhvuRhKL\/iiqtNetH2Y1UL4ObPjVz5Sk6E2oKQ\nB8eVotWDa4Hp65P3wJDnO29wwKXCSOwYsvIMp\/q6hDvUzdf\/toYWWiZSVRn2nG36\ncL7nSu4opcTROxILT+jc7Gcs6JNm77MbhoNXppuKF0tCBWPtx9KNLmNhvg6WMQQs\n2LgmxrJitiAJfqbVgGFvtLQyWD6gpoxbcnEo0ScymzF8l9gzDid0wHPap2izRaMJ\nPUbhUQPT5IHwKA30xHmu4PVJ7iN0PdvGERXvDmf7xzPMJ9FH7dQqhlfwwKE+KQab\noQ3EI3OcAPDuXqFLApNDAHTqMa32\/oKJSlD2VFkznmQmCIHbuhyHnLucB5d019qA\nkBupor3ovKkPHxj6wg4w45tDn0xiG4Nv25E2EbWQBQIVgjjnVVRrqXAMeUSXO9R+\nlgTo66moJUYnForNTKovS8jKe+aafu6DkxGOFfk1Bnb4XvYZoEXpHcuAtGVSYlny\nIOglToWO1Ix4P2qTnsRy2Hrv3uQNVYK+PRuxAt5XLx5m9wdDVDGBItMA5L0iZwdF\nBuEjVH+LF8AtsPX3Wgrlxn750nHImjdYZKfvtSiU1VCqbQY3CGyckL0CnkzRZ+7R\nPv+QWPdYTh\/8LNKSms\/buvrZeS+g\/u2\/vsDT4LwprxyLu6Ru8A9AwrORMQARAQAB\ntB9MeW5uIEpvbGl0eiA8bHlubkBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEtdNk7Nq1s\/ecaHm4X2TRPo6ljPwFAl0b\nnogACgkQX2TRPo6ljPxWZxAArUUavay5PqrZ5uyIptzJ\/HvHsKKsMPXQPMjy81i7\nCi2XSKgpFh2s4XcfybmzCSw52HDdOTXev+TM4xhwKyT+Zel2f6Aq0GUU31sjrtHT\nrUpbTxNiEcyyvmEmQlWIlEeuRcDFvABhqO5kp2Q7xkNmntWbNJGT27nC2jA8lKbC\nYyN52CPsElWc5DxvnqyJqJGdge34pXL\/aJB1QPhU3StS\/diUXeAu1wNvyEk2ivWi\ni1ymo4z5FY7hOr6Y2f20Effj7G\/+Ps0RPJVLOw9aIauuVjL4qlOGpF039BuvEcPB\nXY2dZiONsgsNdGnZ1aPCQWGxyX4nhIP0FFflVS0OOF7T\/G2GdXLG\/s6CHHPCpM90\nXPaipbE\/ABX\/lKP6e\/ek8tRoOjEIv1m2vQqF5ZJYFnnIJFPOCZm4SMfhFQYAlzSL\nJp+Y+Ib4t\/R1xsQQDJCQONlCUN8QZ3BnbPd36hC56Br2q9htWYHcCvYKNrh5udIa\ng94yNa2dDjMNnSO6Tt6cZNkFRk92Y5HStxo7v5nPGBy1m1YLQiSyiVBCDGivMLHr\nDQwwVrikz6EypQSKwYwYIIgYoRJU8y8+P+it\/qCfQP9aYTMUS6ElyeZCp2a1boh7\ntM2w5AciZ0ex1tZCEY7sILfmOB452eAMxXIM0g83OEh0Hk2BsRDg578h4Lnt\/F6c\n0zu0IUx5bm5lIEpvbGl0eiA8bHlubmVAcGFzc2JvbHQuY29tPokCTgQTAQoAOAIb\nAwULCQgHAwUVCgkICwUWAgMBAAIeAQIXgBYhBLXTZOzatbP3nGh5uF9k0T6OpYz8\nBQJdG56EAAoJEF9k0T6OpYz8J1YQALPpVan50ocroz4\/7P1Kzd40OKLbOlFtplc5\n9tfjywDCdXA3Y7sH4COOlIa\/ZCd8GPQz7PYmEv7KxE4SSgK86CLl8bteAdM7Wk9m\nuGr1VzChuM\/N5CmO0PLRUbnRgkA3CjXY+MNNrZmmfSu46tul0Ec7mSu5DUvFfLLO\nx39fm4IACi5ymN6W8Y4aPrlW06dOuIx0ZE4QOheVq1MKHUIv2Fr8R45BVMzsaMaP\nJZqOUd8X4OS1VZPJ9dWeLdObHyW2xCt6X+lLfbbsdfruvyZH9O9nRLykPa0kXZA2\nVdmGlgpx1LJmMpN\/HwfzRfJXFPQbb6FFMAcqiJGc+Dkb5Ph1fF\/PeyX7Jod3jghB\n5hYg3uCz\/VyXBO\/bPen\/RU8Wg79SzZKfArC6k3bRReWTs9HscDV+1CkNd8aRsABe\nWuLa0erIZdBU9gCF8fQLWORsy4py50Kjf5w5VAd7oyuuWtajSuY1P\/kQ4X\/5yNdW\nF8LiPID0rUakAic4Mbvat7isQhqTAfNcaKj4u6QqMyQXPUSjX4pZXBbwUKyUjAtV\nEVXg5cXL5i\/Sqy7uBtNE4UFToxeL72KovwaPjw\/+d\/p3x0rj8wfbw1Q3WqtpDmuI\nsyE9F3rl+yxv+jfW9hfYh3NZmNZ+wX6Om2EHy81lwSF67DkHu4Q0DgHykj0jQWdr\nzYkI+XoBuQINBFWWanIBEADv81fpcHsJr5Ah2519BRZHPL8R4XswmFGtWoLrAMbq\nk7\/FIcb9FbrhoOTLiAxc40+wgkBwvP\/rhVp4K+qyOrw+ycyYfF+U7wWlnxvyKg8H\nxos2fntccN9OXLoKqeO2FyOsE+acira\/Q+IYLx2+lszbebTadThIuU4dFk+yqbeN\n3JGPTf4CixE8tN3k1OdbTksGENhWBAPzY6Kfbi91O0LsIedsm7XolYzTZDsCSjdg\nTtyyaeoJMh1ptdEX5DM5kIWv1dtQat2xhn51NhPD0VTY8CrQJLyYuFe0sV5Vu\/+l\n2\/s\/HQfSV+f77i+4\/aLwDipuHoqAkblZQno1KoqoMpjlgFkZRlwqPgKpWgz4xvf0\nN9uK5GqvGDH4qxS4\/rye8M1efcwTsH1DZqiv1NQd1wwZKGfQzXOhvq6kkEQ+TCOl\nn8uMRsMvIWKXRq7MtC7d1i2Qjp4MRffUziAahW3VyTeQntnYyDYac7zTp3inHTbs\nsuJReBHHDUihh2iVCnasvuo\/inCZxQB1C4O1qH0\/KWs6viBMUcanNn+cIDA+5Fy5\nIEMmXVMHdmN6j84BHjZ1EzHIwJjig4RQGD4Hb2v5h03rLg\/F4fnbkpDqDetC\/9DI\ncVT2ZJk0yE4T6K7Y\/UheVfXn2dF\/UR2HR8l3wDIgNwFppKfLgKbvzFlTaaMMNEDk\nvwARAQABiQI2BBgBCgAgAhsMFiEEtdNk7Nq1s\/ecaHm4X2TRPo6ljPwFAl0bnpAA\nCgkQX2TRPo6ljPyLUQ\/\/eBF7g0+Wn1EQPTWVZmDEoOzK3GJsV2rgVGhyg2rMCLWJ\n7znl1TTQh\/jaGa9j8vFBBGNc3NbUdVz6J3vdl6HPfXIWlEXgT59kF7N\/8jjBfsYE\n53RdAw3R5sLE5vn7qqIzBBtYkFl7KsKsSjh+U96LOO4I\/Rhaen6T9yTVOy82c3o+\nkbDkAlKIFZ\/tEKsmcyGVwWYIXE3Np8ECq1zJoFpSO4KZ84zz3Egn9U+cjKvbWGEh\n8\/irHrWMhdJO\/RBit00m7igHCzg9pxpkeuPP1xQkr1QNo1Esf0Q+RkN8lUgCeS1R\nE5hQxlDFCAeyI0lm0aaeOULqjK37O98so0RhyNDvDeyUWWGSDuInhvJQfD3gxXsn\nOsAoC3NdLO8geEY4TqnLIC5vQP6d3Tak4PEcP5r3aYeivbQLP\/7itz3naBlwGne3\nnl4UFUhrTFMxxcu8FLIKAhM8cREedbCzNosbf3tOl5qB0+t2I4hMV+DIC2xzOlkK\nuz9HMfmFRqAKRorBPYykK6gU8RZmyjSolkZGUrNjXqF\/IhV51vMJbjqHWzdfgrZ0\n2J4uSMYcZdsgWTqhAvNJMIEna0rv5HnPGgaL0vE6CY6LM2A9SvLi7Wsafzu\/aG4W\nc+LkVBCVV14NzzHmUm+4pjM\/dVxyQCfURrT1rxB+9y5sy2F6SpCX4RkbZcsn+Ho=\n=O082\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Lynn Jolitz \u003Clynn@passbolt.com\u003E",
          "key_id": "8EA58CFC",
          "fingerprint": "B5D364ECDAB5B3F79C6879B85F64D13E8EA58CFC",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:56:50+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "92946500-2940-54ff-889a-3da69afe5078",
        "role_id": TEST_ROLE_USER_ID,
        "username": "joan@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "1fcdc377-3759-5dff-8b91-3b5d00cec999",
          "user_id": "92946500-2940-54ff-889a-3da69afe5078",
          "first_name": "Joan",
          "last_name": "Clarke",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "0cb9e76f-4994-5e43-b3eb-848815042a03",
          "user_id": "92946500-2940-54ff-889a-3da69afe5078",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss14@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "2d314443-3968-505b-b636-4b3635692a5b",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "first_name": "\u0022\u003E\u003Cscript\u003Edocument.write(\u0027xss15\u0027)\u003C\/script\u003E",
          "last_name": "\u0022\u003E\u003Cscript\u003Edocument.write(\u0027xss15\u0027)\u003C\/script\u003E",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "02b9c6a4-19df-5b17-80d3-2f57ba9dd05f",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "0a490e04-90c1-58d2-bc64-fa53d8c974a5",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "0db58277-1f93-5128-882e-07304909921f",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1d94d291-754a-511c-a0f9-4a67cc815742",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "2ea7f31a-8dc2-5fd8-ad1c-8d446c39dc5a",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "39fbad20-dbc4-55fd-ae84-a17381008d1e",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "59ddb5a8-11e8-5974-ba59-4890dbd1ce8e",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6432cbdc-928c-50dc-8ef9-11ffba0d3de9",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7000b930-4814-5a21-9179-80b9fdaa7353",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "775ab19c-2b16-51df-9242-a1a4a0de2a24",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7b4c0cf3-6b8f-5d66-87f1-5b494741fbcd",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8cdfb3da-3289-524c-b446-6198fbfa044c",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a7ea44e9-74ce-5525-9492-1dda3cbba4a8",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "bf7630a4-8a02-536e-8c08-fff8bd4cf482",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c8ded64f-8eeb-5fe1-8bf6-0f458bd11d66",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "e02ddd2f-c685-5d45-b3d8-a50091b212f0",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "f6f5c4aa-7c92-50a9-9cbb-c1a4a326e43d",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "9e9fcfc5-ea23-54d5-bfb5-6bb7f628245a",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "5b81d798-df23-5d02-9f49-709851a4501f",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss2@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "2fd90402-c571-5d95-a929-7f17c6012d99",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "first_name": "javascript:document.write(\u0022XSS3\u0022)",
          "last_name": "javascript:document.write(\u0022XSS3\u0022)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "139a6641-ad84-5f35-b18a-ef66180bd8e7",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "15615428-8ce5-5527-94b4-ab25c2c07334",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "177a4c13-e040-5ff3-ac51-78266dda600f",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "1d500950-b80c-5866-8abc-b514f4981438",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "22da4f80-9692-5264-8184-60d17191d997",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "2bff990c-c96f-53ba-a1d3-9b8f8a34d094",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "2d3c7957-d1ae-596e-aff6-a9a8b2851c80",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "4b0d12b0-3743-53d3-bce3-320fd1acea8c",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "69dc369d-03ab-5d91-8603-d13a19e77e97",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "70804cb9-6c19-5c1e-8b52-d1097cd11749",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "75caa6ec-ffb4-5e57-89d2-2dbf4d10e24f",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "ab5a8bf1-9cac-5ecb-b13f-7755fb6e94b2",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c6bf4b5b-d52f-5172-89a3-188b3be3f759",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "c73cad75-6446-5502-9536-18f3fa22f113",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d32f0ed4-021f-58f0-9081-bd9292b1863a",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d6b11db0-43da-534c-8580-cf804f54ee9f",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ea78cf97-cb5a-5c4e-9b19-1dd2ebdc3db7",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "c98d8d6f-3565-57bd-9a3d-fc3c031a7cb3",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        "role_id": TEST_ROLE_USER_ID,
        "username": "hedy@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "403c7bdf-068d-585a-8fc0-2049a131f8e6",
          "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
          "first_name": "Hedy",
          "last_name": "Lamarr",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "860fcc8f-dad6-5a90-ad86-45253c58e642",
            "group_id": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
            "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "2111bdd2-b19c-55a1-94ae-13e9ae67c1e9",
          "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaTMBEADRzy5PKpWKGNnNJO5JpaV1050Tmjmo+zXOth6Ta\/cZ+1kgeBun\nIbyRfE25p7mIyfrR\/TDHfgnW\/OwUEARhngFlt6B0dxxWALHA8mZyv3eLAXqIMei9\nb5m98506KXx1hsZDL2Io3SJa4C8fp\/lb6NoY\/YajDrTifUjtdQwo3AYp8bGPqkpk\n10R2ZrmD+xol1FHcImk2ySxavIVht+72cWlHm1i9EoXG0XiCEIwm9gepFjux+3FX\nzJ3otihOgExxAyxa5cyonn3dkAKfFUHrMMtRfm+6C7ETtdsDtaH1J2NdYwbH\/r1o\nNIh32M4RZPA66hrBg1YRVs5O81vo4Ut7DNZVmiKhQwA1b3OK7nSAH4r\/AlbReaH2\nnFACv8\/lyoLN5hFnUIa9vO4FHwsM7X4aHmzydT6qgbUvXdfCLV2P6p9bg9RpNuEu\n8ymJjpkKJWVlcQZWoabfx8WwQ2eTNh8Q42345T2\/moYBpcL0a4AULywXpKYswaGX\nWrK4fUX1P8aCR0R\/zQBPrSE8t+vx9n2nVa6RnseIIe45h9vSoF6cezeJGZ4BMbg5\n1D9d+qPJYdcj2GSJrEjO6dktMTYY9IB+VGCLAs\/7Sfwr0VQH0bru9Y22uywJ\/faO\nMoluZ6NTSlmAlM4WpNuQVMXkg4eJ5ZN+QyClAFug9ArorZi1eo\/qHQ3B9wARAQAB\ntB9IZWR5IExhbWFyciA8aGVkeUBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEE7Tn6HRXAsqgTWahykoCI2qgSph4FAl0b\nnPYACgkQkoCI2qgSph4W9A\/\/Uvqb6HiS6CEE9z8sv8qDkUStK5s32K0UzS96pM7G\n6AyXAxTRiPVCpPX9zPFn\/n9P9eJiRM4UGbOXsM6tszeijjI8dmy5ykVZyQu3SlBW\nmHJCIJVFtLcQl0RJgYnkRgyfetUV8VbOR4PpgRveB8NlOzKt1vpqa9J3eDbPAl0i\nwEus4RKbnI1FKdur0BM8bGNAi8MW1NAe7fO6d+13bqnW8lekv3eFP2WHY0vEAaDt\nMZntQcFFCmSVzNqBGR2tyASm137mZsaoWZFnJtBdpXN9vnDQBGDKf6fWk2GW\/1\/B\n22bgGf9++mDnwP6oDHaqJGVueVaUdyEQjdPAXIje0BXPbXspalwv0mndwbC5f27G\nZqeh3uYzZUybHDZZtx7aISmAv2CuA8f9w\/wjl7jH8BS2miAXnZiTMdtC4ESFesAm\nC8\/8BXwOZEjsdJFa5s90AvbYdqRNWfoPXx3zWZ3Zmyn\/ncEaCkjROJPjBYIbeXDt\n7KqgG1rFoHX+xxlpW4\/C0Gn3a4nd7Emb3FwXO2R9OP2v0OK3gPfZzSnFSxs5jS95\n7jQQcYvCCOtqgoXwxTTTox+8NLCMkIQXZRWc2rLZBsLPt4GnZkvR40SVBaP+46\/K\n6uAXh+BV7f89zDvrVoJv7GA8ci1bUXF71EZdaX6RfaQ8\/LwXES1dIakJHm\/fEvJt\nEjK5Ag0EVZZpMwEQAKbNx8KGrEkdt3RAjy0+AncC8\/H36KozDn81eLti4fmxKTUf\nu\/2ysC3cbFaxCbUVAZvOWfS8WMRZuLBVkVVqTjJ4v7bq\/D3h2fjqZsct\/qsxMBJJ\nK2qWklTt2ekdTkk3cUmQHlR2pBce+3VimtbHcs5K0atQ\/BgnAVN8w8tKbKSUCbDy\nWPozLTtJ28eEMWtEXMaBl1WDb6FwF7f+zcLG3pAcAz2ludopRLt1O\/uOkKJ8VV6R\na4GdRq6U3QthxlGJen3yW+Ju6lhPYaFANJ1pyvKaz4Xt27J\/vGfhP9ihylkKtM2n\nkV3VM5seUozapvKQGMfyln8f2QeC++y3nv0bLFj6ANvE9LXjChYDkjKJU3GM53D3\nG4SHYdXee6sEv\/Qw1dNBc+9CEDnzcnVXwedD7gwSQ8SPmeLMSTFf1G6+JM78Hj4W\nL6r\/59QNowQobVjNWUkZcW\/ZPxPepsI64GqWH6fGsJGajpILuccUuz4qveDSrTbO\nLHj1oj4bKfQeZZ0DDPg9WMH3aaoz3v0FtrNAnPLFs9tYI\/U\/L7bk\/9OvUztsrgmt\ny\/k3VLW0E6lcokeRuMFPNrieK8QZXWTtdyRCM6t08IOZVpQqmUJROmH9i6\/b3SL0\nK2f7ZOZObwlRt3Dd4bry1lS6CCG0Vka35KRc11ps0hmXOz5UfNgu2TjlY+nrABEB\nAAGJAjYEGAEKACACGwwWIQTtOfodFcCyqBNZqHKSgIjaqBKmHgUCXRudAQAKCRCS\ngIjaqBKmHsJcEAC+hjas2JxLYZNOGlsJYit+AvLNQDoQuc0bn6Bln2AVWdNLkpBI\nhoCzDqASx9rb8NSc0CM1i2gewke3\/zjrhUbu7sptkPFQQF5UV8Eqczfe8L9u1sDS\n0o51C7s4WzbQs1ooHRWkcn5XgU3Yn26yRVfiCowOR2O4ttEeiLC2upUi0XwjhpI9\nNV\/lPDV4nd6QlhZyk6jlfMNc5vN0W2Rr7GJTgxcriaXuvJrssPHgrqj9bjsjao4r\nNRXvEKLjYHWvaL\/TKVdefhHxngSLa4dLzcBLDh6evlW0iroKL4LfSqAWIUMxlrZm\nZrqYoLhHMGqDjnQJu5GycNTjNlge8GI\/GWu77SMkppYtdKwERPjvCJ1vx+eVSNOG\nxDvQ6OUoSiiwrjp1OkNeB3C9Gb0De1\/32XMvCBATKIqibX7WWJj\/WUL8Z+M8nMFb\nfp0ZLN107A9x3RWnEbSMC5OJq+NDZFa2dqXPHewtoYyifW+dSUDoaeit7aKNaMqI\nOwoBszYWnO0Y2gQ9JjO\/4foJZPDYPzaasr6NIy0OAQQonr4KC0SZbCBkA2aJ45Tq\nu8J4Azkwu5Dw09l+UHwPqSb\/3EJLI0Sc72M\/fNrbVkk8o4r+SbxfZOUwqV5mCox7\nnJk6Cf187yErhiX\/ozLwXOCDDIDlT0vqPdgO6K2jbr8AoZpF+Zd5CzcZFA==\n=jTGL\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Hedy Lamarr \u003Chedy@passbolt.com\u003E",
          "key_id": "A812A61E",
          "fingerprint": "ED39FA1D15C0B2A81359A872928088DAA812A61E",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:51:31+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss16@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "4a7ffe65-3e66-595f-9500-60541c32d2ac",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "first_name": "\u0026{document.write(\u0027XSS17\u0027)}",
          "last_name": "\u0026{document.write(\u0027XSS17\u0027)}",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "05cd1db6-2a79-559f-b971-15c1661677d7",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "0ccc8adf-9087-5aa5-a971-6a47be140ef1",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3a92f07b-86d3-5cfe-82af-a876148fb538",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "56038e49-9284-5691-a894-98a25fe415ff",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "57831f71-573c-5a29-93a3-ac3355901791",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "59e18480-077c-58fb-8662-6b241d499cfb",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5c67035a-b42a-5565-b5db-3488efce6865",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "60d540bc-1aec-523c-ad30-f7cb5622d181",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "63a25a44-dfd7-5a9d-bf21-b45c78f589b9",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8bc30e32-f4c7-5849-9dfe-04eda72beb28",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "96bfa8c4-86f3-5f48-83c3-51ad8865a648",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "bea6d802-9946-5554-8cb4-691cec162440",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "cf93944c-d356-5cb0-9966-12954fe23b7f",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "de8f288b-10a0-549b-ae87-88f792de05fc",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "e8fbee6a-418d-53a5-847e-693fe4fe1c6d",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "ec174c28-599f-5d37-b1e7-ca26423ce3dc",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "f669a846-ef56-5f09-b516-366ceee72e48",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "1e9a24c3-0828-53aa-8234-533eace5017d",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "688efba3-0fe6-5bb3-9524-c4088274c178",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss0@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "562928e0-d4b5-537d-b841-79efe2e05744",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "first_name": "javascript:document.write(\u0027xss1\u0027);",
          "last_name": "javascript:document.write(\u0027xss1\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "06571665-2e75-52ce-b8dd-257e9143ca05",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1f82b7b9-0dbe-59e4-a01c-aee04357b724",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "29788639-666f-5ad5-860d-024485d17601",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "36cbecbc-1f1a-5456-8803-7f560baca899",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3840b150-0cef-5f6c-a670-44d21b277f65",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "4235dbbd-cfc8-57c1-aae0-e8333554f036",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6dde55b8-661b-5614-b821-34456035c565",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "80b3d68d-32e1-54d0-b6b8-2c034122b53e",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8b9c52d8-2ae5-5e36-9ad5-9c2a377d8232",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8e6ce350-1018-594c-ac7c-06064702200e",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "90c2126e-d096-51a2-8c96-2f39c575abd6",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "9332c9bf-45aa-5c4e-b654-58974bb72ac2",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "9a02db1d-1cb8-537a-9ef4-7e762b3113d8",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "aa68f137-af34-57a2-b620-20b4bd05ac6e",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "aec20916-5120-5407-bd95-2f8460d9eadc",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "deaa59f4-57e4-5a4e-ae81-01d7775ce820",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "ed307709-63b1-567c-84d4-bd43660c2928",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "060c1c79-c5c2-511c-947b-3e6b001fa3e1",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFpTm\/wBEAC4zh12x5g+1wgdWCD+j9UEBUllzfV7rewO5TrVCokKehtvPgqY\n+1DGgNlVAKkkWn7BSG8qVW2OkddOi2Tthk55uD\/72hRwUdAxFiLJU4xiXJDRyqVD\nAP6TteW01j2Jjwy5Pp3gjMH09Tqcfxk8Bfc1bDGHNbRZYFg08N3KJoLHuZD\/SYLR\nk6F4gyXav6lK9HWkn+oimDtuhX5c\/mGvuMVMhuYNQndxDSaMPPEII+y\/5wt8K6tr\neNmA7518rjobL2O1qpEFWjXmEK9OXOyNEMWU3ebxCEgVXOZ6rnpOECyL09UAyJtc\nMYsPDXTC8dD4bK6KnzbOfhlcPIIhYv6Dck4tfVjA4FXrRpkCPe6B97cfF612xc2M\nj7zwU1ueGboRDtJGcoR4ITiOQq4y0HK2VrlZPa1784\/n5laIbm4DQbwKHGrWp8kx\nc7FiTlfFiBVy6TA7\/TdZeLmFyY7jJUhIWj5\/aLCpUAmgdGtpl35hdJONVmI8dJaI\naY5YDD852xOqS29DBU2\/I10ip49wjxb0L5MbjWOx5jqLPHSrViC5lgIOZ6uvDyMp\nKUF4qPeqWFkd+qPlpZFAET2uHD1CawhYRiNQY9c7FyuUwl4ZIr75gpXHqB1zrrc5\nlMacsEBFnTAUrj3Y3kkqAiFXMTWXnA3jXNJoxSKj1kKBhkfi6M3H8xcgywARAQAB\ntB5Yc3MgVXNlciAwIDx4c3MwQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgWIQTOQjYF\ncTDcKxPB6fs107QyzF7S1wUCWlOb\/AIbAwULCQgHAwUVCgkICwUWAgMBAAIeAQIX\ngAAKCRA107QyzF7S13czEACOykZJviWuiMX9lVW1gsjp3Wl3KVS3LYfqRsssgWjo\nkbLtjwf\/seTlmVfC0tAv5FExqaw4KNdKRMzKTbEvnZ2MkN7I1zsx6j5iPYCO4pPm\n5gj8yYC8X\/V6KAk2H0ZU6jSF6ToxXvgWYWVVtL2w7TMxOwsWqG9RM\/OYC4sCkKF\/\nWI+k8SOihZf4jlZi0S7H5NOad77lXhN9xc+Wxk1mGfyZsbaYdaRXxgeeH\/9P+fHT\nMSu9wZIEWzRre4z97tpuHGANZum\/jE3oSjwKVYO9IpFpJK+Lqe8PfdIZzjIdd9H6\n6vUew+Vvx3D\/TevcPK+aWL\/NnhoQ866JPdXHBCnkX4d6Sy5a\/+Xwpz7JEXOQqblB\nczkxRq7Q\/GqI0EHIMq8SHi8CnGwf86tSZs89DTIx9flXz2pRkjEbY2oAFEjAS1SO\nodaMKA\/OuhcDaB808vCV3Yfoq0XJdqMCwm5m7anwc5ChlcuOsj2mcBFfQbUVyyI4\nNBV1HLlWxGQhJp5ia1j2BL53myMKaAa0R43vjotviU5K7DfUSyE5VpYu0uFODa6X\n85txnngRLrtorAFpQvXJmHbPuqmTesrGBMJi273TBCuswn3xyG7+FPBobeEKhW2X\na75RD0MWF\/yIy+H4wfAyGtsYdvlvEGiSYG0\/bzHU8i98dLNwMdofYWkQUnajnCRY\nNbkCDQRaU5v8ARAAucaS8uZY9GaxzSQr5ocnz55+\/OT6BIERGCZrRSGKX3St7LEV\nFPYWhipkNUrd+dK9+hMk0ALYzssVy+berHuHu6n+j4N4Fl1XzDYoDOVD0sYlyfyF\n+MkKLW74yliZjakqGqMSxF3QEm4cPnP7iTgODSP5F+7uZcHLrOlacskEGCZE\/W4M\n8TD+CiJSK4ETINSNLTC7B+iRULRByRR0JUDMO+I1Lxq9lWid8fOELBj4n\/TCrfJn\n7cDljbJH8d7Aj7NEeLnbMOhuV6Pn7YW8yHXZtdVkLmwYjexR3kgHIQN44hWUkXLa\nOuV9jK\/lOMFlvcDzNOgxKnMOndNI+VHlxn4X9RqDio1Ac3xshpo7m9LXzD2NzYOx\nBj5xUlHvSkb6WHjeOZQzKgBeWj6RpyvNZtJALshBaMRAN3dbGOxL+4DiLWmBKkiO\nY+\/9c8Quw7cUPMBYW6gKWnayYJBZqX4QmQqcgc\/tfcxLhEF0KVo0ZhAmJ1OKJzsr\n9aFGSNButP\/KbPBuU08Zw36rX2VvWmhtyKVMYHzp0oyKKmteYi3Y\/Pv4pB6TDicX\noaHZYRa7MdKx+hVXokTcJT7i\/bMnY2tu1JprADyK6mBWyyivi4Hp9Y4hdc8ISOKK\nA\/AWVzfJsqoe2v9HA6N1rcwlwHu6YaWPWo4LwEMQcEcnFAHShXolFHujUA8AEQEA\nAYkCNgQYAQoAIBYhBM5CNgVxMNwrE8Hp+zXTtDLMXtLXBQJaU5v8AhsMAAoJEDXT\ntDLMXtLXnPIP\/3uUJykEAVcuYEE14zchcc9xlElt+HYGNRKdQTG0WsFllpKIyKZ0\nNG3TVbyGKdI5HDqlaDy4NORpsVrpQInhF7IyVSnFk0F4WUMQZBvFMgZ8xZYcZkWI\nM9ERHa6HhfMVKebA6M3IvHJD8bWI6NtPVsTkb\/oj8OUY2u2EOQLIJKDUKJ6O+oqm\nw61eU3g1v4YXY0hGjsuvZEKLSda2u5iqVMxmj0Pg5vVWas+ZECjK4FYqZHpZ7aqF\nwFYjaOxmTe91e7bx3hdCTiH0ascGFkz4P\/zSkE2TZx+SYtz+0YsZ5wqB0gAQ+5HE\nYsVnefjFvVwuc+ZGzE3jtgcmV7zb8iTkL6wiPbh3KwuUTnZotNPh22BIOfmLOwpX\n2d6t2\/UVqXYWqrrAmXW3Vlpkl9SDg1i6pRQ7ura48BqYCZQ3\/EmVTC00K4vqfliI\nF0pqbXSKymb51YOqwM15VZR79EGJi\/+yGOlOBKRUlSeH35JYnG26Ms1il7xm2OFj\nyGIojpUttyeEHpSSCSuGXa2but6SLNNNaFzSgnTZ3RknBCPN0ftKixpiczZU5BDh\nXPFeZiBL8Rkft2VJoezN3RIIq0YadXN2cI5Vwcw+qB3vtLvi7rI43x4ME6Ur5B20\nG8GD4adkbgFWQz+GEyIh2C9MRogzLIVbt3LX5oEHYBipHrMTgRko9M1h\n=gQvg\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 4096,
          "uid": "Xss User 0 \u003Cxss0@passbolt.com\u003E",
          "key_id": "CC5ED2D7",
          "fingerprint": "CE4236057130DC2B13C1E9FB35D3B432CC5ED2D7",
          "type": "RSA",
          "expires": null,
          "key_created": "2018-01-08T16:27:40+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss7@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "57c50395-6776-58f6-a801-6e3172b151e8",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "first_name": "\u0026#0000106;\u0026#0000097;\u0026#0000118;\u0026#0000097;\u0026#0000115;\u0026#0000099;\u0026#0000114;\u0026#0000105;\u0026#0000112;\u0026#0000116;\u0026#0000058;\u0026#0000100;\u0026#0000111;\u0026#0000099;\u0026#0000117;\u0026#0000109;\u0026#0000101;\u0026#0000110;\u0026#0000116;\u0026#0000046;\u0026#0000119;\u0026#0000114;\u0026#0000105;\u0026#0000116;\u0026#0000101;\u0026#000",
          "last_name": "\u0026#0000106;\u0026#0000097;\u0026#0000118;\u0026#0000097;\u0026#0000115;\u0026#0000099;\u0026#0000114;\u0026#0000105;\u0026#0000112;\u0026#0000116;\u0026#0000058;\u0026#0000100;\u0026#0000111;\u0026#0000099;\u0026#0000117;\u0026#0000109;\u0026#0000101;\u0026#0000110;\u0026#0000116;\u0026#0000046;\u0026#0000119;\u0026#0000114;\u0026#0000105;\u0026#0000116;\u0026#0000101;\u0026#000",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "12a35f8d-40cc-5b9c-b25f-d40a7a3dbe28",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1aed587b-4f6d-57c1-b641-bf5ecfda8cf5",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "34b4fc55-7258-5f11-99a7-e5154ca9290e",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "3a3861e2-2826-524a-b45d-0391d0b610b7",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5eec3826-7440-55b3-9f15-7296924f5514",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5fe3d075-6b0c-5abe-b891-294ed8208c39",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7de2732e-c482-5162-8dee-3e03c231bbbc",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "93dea9c4-1b2a-5dcc-9f99-675ea13a9ac2",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "95a66acc-0c13-5267-9bd9-b81bd995d49a",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a4124be3-1a48-5f08-92dc-96a998c2f66a",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a671e207-a9b5-5ce3-9dad-53435f65e5da",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a73a1359-b122-57bc-b60b-2682b17c6a3c",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "abcb6b25-f3ab-53e5-9c60-23305d61206c",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b89f7f51-b48b-509a-9d67-1c761dffc48c",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "c74f0f6b-486c-5c4a-8f3f-8a52281a1867",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c75b2fed-f49a-517c-9192-83ed4b7f50f7",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f232900e-a143-5ee1-bca1-fb5c9f4d5896",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "b3874d71-33b5-59d0-91ed-4aa9d6412c4a",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "8d038399-ecac-55b4-8ad3-b7f0650de2a2",
        "role_id": TEST_ROLE_USER_ID,
        "username": "orna@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "5984642b-1be7-539a-850f-749c752bd610",
          "user_id": "8d038399-ecac-55b4-8ad3-b7f0650de2a2",
          "first_name": "Orna",
          "last_name": "Berry",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "b2581347-f1e0-5296-99af-baee3240dcf6",
          "user_id": "8d038399-ecac-55b4-8ad3-b7f0650de2a2",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQINBFdIFF0BEAC9+7iwspiQR6NZWIBhuZQcHbYCses59ByTEgKU1E5ZQTFLmBXj\nx7DcSb1bnWHvzZ4cFAZSpuXAzXkJVSiUhPEbjQdQ8RbDKGTi08n\/QUvFKzDUnrAr\nK4u3QDeol4HPywKl7yhseuOVxmga\/iMqKlmzfinwPWoyGEWV1PxNb7phcSy\/48Iu\ni9mFd2ERbxEJMpimW3YlzYHY1v\/1nqUCRPtkLkDYrwAjwN8oCgrtb\/lv1BuEIZdn\njnxNJgH+4SAX2TP8X8WRZmlggQC6XEv2l9jZSOnvhqb+Zq0TZF9r8AZNQ2O4A5bA\nVzTcNK+5xnqGwtBsgBNPR0NZtZ1DUCtEYeZugPXSoauAizvVbiRaJQNU0qJgLTjr\ni7hlTXXdzo9OLS\/m5kk2AwHhWZErOu1S\/n0pWtewresG1iEkkfmfZ\/rO7x8h5ezx\nKtXn9\/5I2qZdDrHNPIMqcbVpG3SyhmImUm73\/qyimEy+Z0VQSJywPARuD\/AoXNm8\nlDWU9A94nbAZXqMA2GcnPaUKz9ykw4eQWUNNJUtvtdJ9OFroevlmgmjc6CVqHmpO\noTrHsji7sJJvDpoqzN\/uFaOngrtorebgJ5t9biusrIkFwa94HeqyTGJfXeXwlD2B\nPTZqh6CHyG3G6rXPGkctRzf8kReERaYzpQNw5Owrx1ojkdPOPDt+V1zwFQARAQAB\ntB5Pcm5hIEJlcnJ5IDxvcm5hQHBhc3Nib2x0LmNvbT6JAj0EEwEKACcFAldIFF0C\nGwMFCQeGH4AFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AACgkQ6mLgszl+6rbpZw\/\/\nQ\/nBQd867w1V5piqaDDVoWZExKvQ7M2TA885sHRm+zvyLLEGd3hxW4nLC8bYCpYY\ndFJrMZQODnfiHFQGsm6FvwsbuwhfVX4FeyYwKTy6dOVdVQPIZSMQ+GnXou9Qh+NH\nBAKBlNfpGkHoAGoNzKXJ8j5vUnn77puO0wVigdhq3dxkV8bSGHX2KxoMpnWeU4sR\nQbnQye2k1tIc7pELUB2uy3YMk8mc+xOnKxO80KahLAZlADBcuO1KoK4vCZcemoRz\nW3R4oNMalbv15AjR4nDY2os+IFzioYegm3y8o8P3gVGHlw2JsaypR7bnWz+x\/haS\nWWFPp3NdRAIuWFIppzGikiezilPCYBd5qVsiM83R2YeIsUhFBn8oQvQYBenonNwS\n47qtsN\/Fj7IXv8qrSWBKstOfYPUKeyEh3He3N1itocyCGNgq+BvjzVfiPWM5OLP8\nus0gw3wQIRsvMhTQV7RqQo76t5juf\/dD5SSHtXyZcyZf3J0qMxi6nkaUgOkyW6jS\nAJOrZuVC\/tw5r6iZvfdkQWimhZtDHP20RpnBew23vqNhvlPew\/p1fzzVnHrrrG+m\ntgPhLGL\/agwOuyy8cPr4ZmSwPu6LBK1hc0TnnzDRuo1T9OM++c6CctEbY\/K9nlUc\nlidBoFGu0kCrAJB6LR+w9GIn+xKA+jSZSCDIyqTVpiq5Ag0EV0gUXQEQAPLlcGWl\nwTAEBhzZRixBRf9NPM5eLUfL1ekHadmnWAWXknpExsGNfxymDnPi4aXmJhD5pFI2\nsqerNmd7LxUo188RdZiIJ58EZzttiT\/nz8o4iHzpAmRrE1eHaXlXvV9OKyHEYwwT\nFLJLO0mAXo7Snodk1cq9PPP3zVKJCrQ073X5tYD\/ZIyeRM1JWe0+FgrmiSwihzAK\nv2AD1TahF5j0nJ5O8S+P3w7Z+va\/m1t5G\/A2UidnJ2VotNKwf8R4NsVP7QUCLoiH\npIB9P0eZ+6pYPzCguw+GuMPnzpKskfycw9iN\/s52PFh\/BvXwW0s0YgVB0tLl0Z7M\n10sqOmvqBBqhExkybNkQWz04j5nZ246lQVFitNBC0GQGMvsL\/HWwBQxjHnBa0Fao\n1X6ZFu6g6vMB0tuFRsxdJGzh36xK4TAGerIw4rKk4f2n5kWUMr42LuL5d7IfMpxA\nQnl9509B8Xzn1dykBpsXDRMfywUWkxKTLWSWrkf+AhwEqkr1ilFaWApPSZz89zUX\n+RKLhArv8SEVNOzzbamXksHi8Tsf7PZBrdlDXpnkSoABBJTKWslfXO1qv19mzCeG\noBrxAcFhhlL5ggFElVPKdua6+pI+N6g+GaVnExHNmEN7B+Bsgzo\/A9YGEyS3ewcU\n5EZVHYEznsWLvz50PXtpPSKD+n1uRXr2mRn7ABEBAAGJAiUEGAEKAA8FAldIFF0C\nGwwFCQeGH4AACgkQ6mLgszl+6raCFA\/+N3cDuokZ4aXB3ZPyzMgZVmzd5vQEffy4\nIGMG8fVsV+qLPpnWrdrBnbwz4WX6Ai9IQfKKr\/jwRlEXbfBoCcFoKX2GmlAY9fzq\n8AJrbUrOBDo2RFjPTX67J3gj+99oz\/l6gfKbUNdHPUtaPZ+74zgF0L4a6pIBXm+L\n7okPeMN2XEfn628jX8fDsrEPT41xWrgx8H3xA0gHNHxA7x5K9GAtEP+iu4Ll\/5uY\ndIzm92JhMGY6aG\/00\/pmY4NZ5uz4YdW2xeRkL5UvFHhXmlYC6M3bmLJtMKtCUfZU\nvhItJLl5GAbav9HfAQQjS8fkiGACDPV9KORz5JI8YFV8bYayW2cNYDrqG+Qk1KQX\nfKcrCst+Oa6ARfkd\/7MaggZblQGwWhRIl+DjZCjcKNms\/ImfVhk1ksCOWX53EhIb\nPP7wbokSilSzN\/ZkKAyAXW7nyMByMAb\/6LbYJOt4dhmn6P0XGb5+e8UlPjGh502d\nT+iY5W8i79nHBvra7WPMw7O8ARuTYrLM1La\/eppfjEp71rxNYusRklS4n\/atNXMX\n8sLwCEXOddtoATXdibM1Iql6mzUtZIh0qul3TZ8kLFwlAfms5yaLHS0kakYTRLH4\nUyQvpIWfKF43WwR0444ZRDipGWEDk\/qN4l0F6paZ4y2CvGmk5BzIQuVvwcNW2itp\nw9E+yhN8gIA=\n=qtKg\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 4096,
          "uid": "Orna Berry \u003Corna@passbolt.com\u003E",
          "key_id": "397EEAB6",
          "fingerprint": "E2E98DCC84FB41F69603C346EA62E0B3397EEAB6",
          "type": "RSA",
          "expires": "2020-05-27T09:33:17+00:00",
          "key_created": "2016-05-27T09:33:17+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
        "role_id": TEST_ROLE_USER_ID,
        "username": "ping@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "5ab1b8a0-6ef9-5d49-81c2-ae1de848b629",
          "user_id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
          "first_name": "Ping",
          "last_name": "Fu",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "97091e37-dba3-5256-a13b-7549d30db452",
            "group_id": "de5fcb71-6db2-5fe5-8803-7d3eb4d6ad9c",
            "user_id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "b49abe97-b291-5a9e-b80f-e16313c8d6a9",
            "group_id": "b8b17d77-51e5-5c99-a0b6-86cf5757a781",
            "user_id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "e0a978e1-fa74-5cf1-803d-25818671e886",
          "user_id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFi69+MBCAC01FHt73wQwudYIPpD6XUtJXOoRWIMnLYFiBy4Y4VSpzySrtr4\nTDMmcJFclLHt8eDGPanxMrIZjqVyjy7xPXN5PUpwOZjuqjvBofiVikkDP\/wHcyUC\nIvAbRw7IQvGF9hAMKEbBL9Yi4+31ZoxNOYbHrRxhW2gzUIPCo5GbKw+aRKCpEd3E\nY\/Pp0biqpnfinumBMSrSDFCHg4\/xtxr0cmrQrZEmlBwUiN68SsCXtayyg4zkPKNh\n5I9BSY3esIqkHedzbZw\/uoWBe1a1XEUEDbtme\/jxGbphs51eaYJ++y8hBdJXsQ2N\novl\/U6RVQZejtD5RSpeFBIGmn75ch4XPcneNABEBAAG0G1BpbmcgRnUgPHBpbmdA\ncGFzc2JvbHQuY29tPokBNwQTAQoAIQUCWLr34wIbAwULCQgHAwUVCgkICwUWAgMB\nAAIeAQIXgAAKCRCs5l4WutVKivLEB\/4j7cJpZTjtjjUTUNPoqfPPII1JnXk1seMc\nfuHE\/NDuiHHNhd+7GdbnKJzD39yIAHbecLJgFaCJX0\/BqSkWSutihllUi5iq5YyF\n0voJeSJWittUOmqV9MmWTNppe8RpPYnoB5eYqz1AvP+0ZyHc3Xn9yHFWjRvmeASX\ntO+badiCo7W2hjRrD8K8UxL6stUVAmtLUgTb81LD1E9NKDMKlPH+GGOXdWuaBGOx\n5YPdaLaNoDYv679c9JSgPqQ9Y6KsgQOQ\/H74B+cZyqmjzB1\/uPfVElhyI2q9tz\/g\nAsVNNGIoe0VOx4cY4veegMleHBFlTGKhi0gMQZF1RwbGs1e5BSRLuQENBFi69+MB\nCADWwFXTvotgQn18YVUj0D59i4jJxaI3r2wbEinsz0hzEvN3wjCyRVuuVS67LZuW\neX18hKgO74hAdiiFq1nKfgDsRSywyjcyIVLP97AvUQYFqDZ4aNNWQBrXEyTTPlqz\n3ujbXVPJntAArrkpTdl8i+oVmAruz\/cSqX2YRmXWm\/GWNRU0M3ndrNT6qCi\/+1yQ\nL2sYeYKG89ujQRbX\/H0xFmGDgHEuPgLrc9CrpbcF24FivLW\/Sh3Ux6VkORKG9Cku\nh878xX8+CMfRgg4rSdFAmnpUeb2n6w03EHJsQKUwlaxYmUZoOIeU95i7QTvHfLnx\n8c5fniAEH2CEy+4hP9BHdcfbABEBAAGJAR8EGAEKAAkFAli69+MCGwwACgkQrOZe\nFrrVSopDOAf\/dbSB9A+o3JD2UEJmO2E8RuxXFIYSH5\/veH0yLOLGSnfg3OHcwAaZ\nEvxDmCIetr1EvZQoJV2w63l4szm554cIRN0E9quISvqgKMMaE82OUFAhoOBClQEp\n46RxmUWP+FTiqIxUdIdVsmOJ8LRYk+NobG9JOFUMQtTxUSiE9AE1TWFUu2\/ZdKA2\nBAP4d5fxuGlCGwXxJg42p9cw5xCcC8GTmvqemO8iVlkLqRrihMjHYW3R9DBOVUAe\n3ZdBR0McqR6ZhvSARWBQG80VjlvMt8\/7SzDdeeXgBlCo0US81hAa+Yxmk8yiyEYC\ncOv3QJcgi02rfOMbtFrfHqeEPITCru9nZg==\n=Aszm\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Ping Fu \u003Cping@passbolt.com\u003E",
          "key_id": "BAD54A8A",
          "fingerprint": "AABF40FA29BA54073E8BB956ACE65E16BAD54A8A",
          "type": "RSA",
          "expires": null,
          "key_created": "2017-03-04T17:22:43+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "742554b6-2940-5b7d-a8e7-b03a19f78b8e",
        "role_id": TEST_ROLE_USER_ID,
        "username": "margaret@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "5d3858cc-73e2-5b0f-9757-4ce9fecb7b6c",
          "user_id": "742554b6-2940-5b7d-a8e7-b03a19f78b8e",
          "first_name": "Margaret",
          "last_name": "Hamilton",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "37691d6a-a057-57bf-80e1-485b59d790fa",
          "user_id": "742554b6-2940-5b7d-a8e7-b03a19f78b8e",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss6@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "670f1154-53c9-50c0-ab14-0cd3c16cc472",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "first_name": "\u0026#106;\u0026#97;\u0026#118;\u0026#97;\u0026#115;\u0026#99;\u0026#114;\u0026#105;\u0026#112;\u0026#116;\u0026#58;\u0026#100;\u0026#111;\u0026#99;\u0026#117;\u0026#109;\u0026#101;\u0026#110;\u0026#116;\u0026#46;\u0026#119;\u0026#114;\u0026#105;\u0026#116;\u0026#101;\u0026#40;\u0026#39;\u0026#88;\u0026#83;\u0026#83;\u0026#55;\u0026#39;\u0026#41;",
          "last_name": "\u0026#106;\u0026#97;\u0026#118;\u0026#97;\u0026#115;\u0026#99;\u0026#114;\u0026#105;\u0026#112;\u0026#116;\u0026#58;\u0026#100;\u0026#111;\u0026#99;\u0026#117;\u0026#109;\u0026#101;\u0026#110;\u0026#116;\u0026#46;\u0026#119;\u0026#114;\u0026#105;\u0026#116;\u0026#101;\u0026#40;\u0026#39;\u0026#88;\u0026#83;\u0026#83;\u0026#55;\u0026#39;\u0026#41;",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0d3465bc-323e-5f60-b776-232b82966058",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "0dce6c5c-2347-5101-ad51-0a1d657ee2e1",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1c1a8b7f-c4c5-5656-887f-99454a62fa5f",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "3474ba8b-ae3f-5ad4-86aa-eb4c74c57804",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "415eaeff-2467-5971-93c4-8a190ce5e4c2",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "59d36229-82c1-58de-839a-8b5dcba13f72",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "62ff48a1-b301-5516-80f6-08c97d835bc2",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "82d790fe-bf7e-53b0-9aab-98aa8f212d44",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8391f71f-07dc-545e-9e99-11e8262e2f68",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8d27eec8-6ad9-5b38-b634-77e9d3923cee",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8de75edc-4ff8-57bd-a9fd-3449651001a4",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8ee5b2b3-f2cc-5568-acd6-0c64296d09a3",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a36dd096-5b00-5f77-8f39-e24a8f047312",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "c12f5102-e742-53e3-bbf2-c4fd5144591e",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c4780bb9-1576-5d77-b0d6-91d2939a136a",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "eb2aa4c9-755a-543e-810f-a7981ae3871a",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f12b94aa-92af-5525-8690-e4c73f7051a8",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "eba802e8-6876-56fd-9feb-ea85f11f1daa",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss15@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "6d994e96-70ce-599a-b5ab-91f30253dfa5",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "first_name": "\u0022\u003Eonclick=document.write(\u0027xxs16\u0027)",
          "last_name": "\u0022\u003Eonclick=document.write(\u0027xxs16\u0027)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "02e097e3-1daa-5430-9418-7dcd7896ef76",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "2eb2cb70-cb32-5b88-b4b3-32c39f6a8a1e",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "2edf9c03-bbe2-58f6-9ee4-db914aba71f0",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "42d7e307-d706-5a54-baeb-42ec816a3947",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "44729169-bb55-59f3-aaba-7840bf4a92cf",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "532011db-4021-5058-b146-0d040363bf0e",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5d183cd6-14bc-5055-acd1-86e898fc2b83",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "7e976e76-8d3d-5251-9474-5b2211c9c8fd",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "881d402e-41f9-5d31-85b1-a2e602d4df03",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8f88f788-69f1-5c6c-b7f3-c2ff6ca5f4a7",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a690ee63-f502-5c1f-b06e-854d9032c251",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b45bbe4c-8d2a-56de-8c2b-7676f89ce7c5",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "bc847513-db9c-50c5-a786-5531be5cf309",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c025235d-bda7-549b-b95e-8d0e7e597849",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d862d947-915a-5867-8ee2-1589698d4762",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "eac580d1-0416-528c-98bc-06af2f14998a",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "edfc08f9-431c-5ac1-98ee-37334b5adf0f",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "045e6588-1616-5d68-9e1c-76ac58eca807",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss1@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "8be7b3cc-d122-57d1-b68c-9f577cc34013",
          "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
          "first_name": "javascript:document.write(\u0027xss2\u0027)",
          "last_name": "javascript:document.write(\u0027xss2\u0027)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "01981ef8-0936-5f38-8ffd-5794e360fbfe",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "11c34cd3-8580-5dfc-bb6f-973650f381ce",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1948abfe-d28f-5ce9-a4dd-9acc5c98dd2b",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "197196cd-9f06-5197-a2cd-95641f3e01a8",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "202ce905-5bcd-5304-9064-ae1992a81717",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "285dc1c5-c358-507e-af2a-9201d9fed9f5",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "34b069cd-d336-596f-aa0f-ea2b5a2b2525",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3ad47dd5-7a24-5340-8ae5-c542295c491a",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "6531d010-6a41-5497-9742-d03efcc95366",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8bd6c57b-13f9-500f-a38b-63e11000c239",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a7367ecb-3e1f-5d83-b0f8-0d49b31785ae",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "aab41615-2b0f-5290-a5c2-1835acc5935a",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "b77b1872-3097-56f8-8f3d-3fa21dd4b1fb",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "bebe55a2-9e3f-509b-a1bd-f69ed8270c18",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d90c2dbf-6e83-5cdd-b8fa-8674088a8dad",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e3146e26-9c1a-559d-b62f-57c003738a72",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "e5557964-0f0d-5263-9ac4-7031f983814b",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ff26be4a-1d88-59a0-a9d3-4c8ca199011b",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "75f30a42-8bcc-5c41-b585-7824162512cb",
          "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "admin@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "first_name": "Admin",
          "last_name": "User",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "03e26ff8-81d2-5b7f-87e4-99bbc40e1f95",
            "group_id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "15b5e2c6-164a-50e9-a46f-2b4a9ab9345a",
            "group_id": "c9c8fd8e-a0fa-53f0-967b-42edca3d91e4",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "15f486f6-4f5a-53f7-82ca-974e0be74e95",
            "group_id": "4ff007f6-80ec-5bf7-8f0a-46a17178db6f",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "2510a118-c838-5470-a0dd-aff268d4a2b6",
            "group_id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8e42567e-6e6e-54bc-b17b-0f5afde5b01c",
            "group_id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "99fabba9-e069-59e6-a3b6-775436322b21",
            "group_id": "a89b771e-62ab-5434-b2fa-950827439ac7",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "9c937007-8d53-532d-b02f-80f100139990",
            "group_id": "faa73142-fb5e-5891-8b9f-4a00b3836fad",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ad80b164-c30f-53e0-aac1-3040fa2f136d",
            "group_id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "c8f4bc84-2ea2-5509-8d6a-6b7378b7fffa",
            "group_id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "d100fc5d-6685-50aa-897b-87ac816e28c8",
            "group_id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
            "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "91d8a7fd-3ab3-5e98-a4a5-0d8694ff23b9",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFY06pcBEADjYRuq05Zatu4qYtXmexbrwtUdakNJJHPlWxcusohdTLUmSXrt\n7LegXBE3OjvV9HbdBQfbpjitFp8eJw5krYQmh1+w\/UYjb5Jy\/A7ma3oawzbVwNpL\nwuAafYma5LLLloZD\/OpYKprhWfW9FHKyq6t+AcH5CFs\/HvixdrdbAO7K1\/z6mgWc\nT6HBP5\/dGTseAlrvUDTsW1kzo6qsrOWoUunrqm31umsvcfNROtDKM16zgZl+GlYY\n1BxNcRKr1\/AcZUrp4zdSSc6IXrYjJ+1kgHz\/ZoSrKn5QiqEn7wQEveJu+jNGSv8j\nMvQgjq+AmzveJ\/4f+RQirbe9JOeDgzX7NqloRil3I0FPFoivbRU0PHi4N2q7sN8e\nYpXxXzuL+OEq1GQe5fTsSotQTRZUJxbdUS8DfPckQaK79HoybTQAgA6mgQf\/C+U0\nX2TiBUzgBuhayiW12kHmKyK02htDeRNOYs4bBMdeZhAFm+5C74LJ3FGQOHe+\/o2o\nBktk0rAZScjizijzNzJviRB\/3nAJSBW6NSNYcbnosk0ET2osg2tLvzegRI6+NQJE\nb0EpByTMypUDhCNKgg5aEDUVWcq4iucps\/1e6\/2vg2XVB7xdphT4\/K44ZeBHdFuf\nhGQvs8rkAPzpkpsEWKgpTR+hdhbMmNiL984Ywk98nNuzgfkgpcP57xawNwARAQAB\ntCtQYXNzYm9sdCBEZWZhdWx0IEFkbWluIDxhZG1pbkBwYXNzYm9sdC5jb20+iQJO\nBBMBCgA4AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEDB0XYRENHjPJAG0a\nWxszLtBkJtMFAl0bmoYACgkQWxszLtBkJtPnxg\/\/Q9WOWUGf7VOnfbaIix3NGAON\nI7rgXuLFc1E0vG20XWT2+C6xGskFwjoJbiyDrbMYnILGn7vDIn3MSoITemLjtt97\n\/lEXK7AgbJEWQWF1lxpXm0nCvjJ6h+qatGK96ncjcua6ecUut10A\/CACpuqxfKOh\nD6CaM5l\/ksEDtwvrv2MIaVajuCvwg+yUx0I0rfAQv0YTXbJ5MRn1pvOo3c6n5Q0z\n5eu\/iiG0UNNIE3Tk5KpT02MTMv5ullpt3mtNjMHH0\/TdPxCtUKVh4q34x3syiYLe\npaddf5Ctv9CL52VWfsG3qFPHp7euOFY8lfzuemoqD9jcE7QIJnkCmwtLXLQrE0O2\nRW\/y\/oXqrETXu2sFyHMr1Xw\/\/QeJgIv63LBGmcPOj93VyHIlcUDarM2oq2+DXKxr\nDs2xfnFKVCZwpSvecIfKXUKsnX3AGrpetoZdfw0jAUVI3nt6YCu8KvczXxetfjOV\n3HHXa40gtOZk5OoKbfuTjzQlpc1oaDyLH8PT1GYsN3wWoDs4zulh6uKDpSt+4z58\nH1BfPFlrO2uhZSfk3E83uBQXZcABeXNxCdrTCJm8P90sbjLu1TlaeOnrWwVT7Yq8\ni8LE7lbAXnT1HjQlDi8GB2+2EnZZmOX+Z84a16jDElZazUNsE8zT7OmyjuB7GGDb\nQEFYzkb9dr1j1sukzty5Ag0EVjTqlwEQAJ37C9s4pq4jvcEF3bJgL+q3SBolgBIp\nN1g1\/woi9vEiOh+7e08Kr8mEhF04cpRDbhY6dcZ8OIXIQ99fgdNXfehlAWnI56NE\n\/FOIyif8TvGBfO6yE35fKSskwGNdUZWIZ0U0pxSXQvB+KEGWlq2c3Uf\/jhTZDnLN\nvfDjnYmn5ycp5sVWhtAmKFha9NJ6LGA0D1MC+jcCJCKtQRGgVvlqOESFDmQ7Pu8\/\nayr2BO0URHJ0Ob30lHluCnoKIv50qGpL9BYuGAdCfLBHXzRQhHIbfc\/cTPkK1kTX\nX5x\/MkiEl88TeGN+yjNVS7qqdxYgs+QYnDDZqevhWEvVyXVQjcCWSIHfjL1x5Ndq\nYL6+ci\/OxyIFoPs4K2umN3JPmpFi+fIPh2CexKy6BnyE8oAgNvgdDb6ZOfAtvShZ\nPM7QG4LZal2+nYp4n7gJRh6kepTQT\/4Bua0xOtRQhgcI4nGtcCxEDRMMzjqbGYlc\nnciMjsiMg9LPpWPDA+xKrRZKYwVFy8vLx\/alOz\/h1BZjx2u7YmuaGENxE62Lfyh0\nxeoCBDTdnWEOQTH6LVsomVtUO1FVap1t5jkYSdpxBuHf8\/2Ye7N3FTMRKe9n4e75\nsAJ00utnMl6P2Zca9mM4T29PK+LPFx2G2h35DQ7MbEid1cAZ8QVR3UyoiR8+u9jM\nek+9uFCm+nAxABEBAAGJAjYEGAEKACACGwwWIQQMHRdhEQ0eM8kAbRpbGzMu0GQm\n0wUCXRuamQAKCRBbGzMu0GQm004PD\/9sFmFkdoSqwU\/En77+h0gt4knlgZbgj0iR\nromnknIwLKBbJJXksHmMPXJB9b3WZ\/gGV3pPVtDWDKg3NZW4HLK13w3s3wQ2ViVV\nA6FzABDSkI3YBqkkasLRZU7oN9XajdFfph5wLhDSgTCjSncGfcjVzPugWKLqPPih\nZO6mpqxSFYEhx+p\/O80Tlj90UsOFRdot7cqn5wOhXZtKsQ0RwaA\/uq\/sFe6UNKHG\n2RBgQfoj5JbazJbvlgMiWxhBalwZKQWs8IBh\/4ag8AFwwoJN+gOtNM9C4UCHu+yt\n0Tv2\/Tu+Apcj0oyFaKJD4uQUmChQ2fDRysqJEIhee+yL29mrdcB4jG7Q2rt8HbhY\nwlsHKgas0YIHdR6dUOCiyw72i0khwrd2PDgxKRu5+cob6wMSqXbIIxFLLLACHy2s\nKd6fQcg8FxoivEiF0lRfMi32A\/YWGJ\/k1OoFCzW55KFXqqBMptYZWh2Jezhttmid\nYHPc7jas7HEPnw3SvVM0gYAcmEVWWvjKfUpOhSYYkk\/B71w9RuIpPyyI7G2XI8Db\nG2ttngDIOL8njS6ybU9Og6yTNUoHL1wWEZN1b3fznKHcC9lyr8MIg00QNeDItt9i\nILCOkjoEdUdauqlRIa+EmUu+AL+JobrlQTzyrCIm7aaT3Hp9EyaEx5xvJDWtmjgf\nFYNCFtV1fw==\n=amwR\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Passbolt Default Admin \u003Cadmin@passbolt.com\u003E",
          "key_id": "D06426D3",
          "fingerprint": "0C1D1761110D1E33C9006D1A5B1B332ED06426D3",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-10-31T16:21:43+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss3@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "9c154eba-b9fa-508d-a8e7-9679be8c2016",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "first_name": "JaVaScRiPt:document.write(\u0027XSS4\u0027)",
          "last_name": "JaVaScRiPt:document.write(\u0027XSS4\u0027)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0219c123-5b35-5a2e-af2d-5a33b5583a63",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "2bf4878a-338c-500e-b771-d85e27e30c55",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3126dec5-03d6-5652-b94f-3b9114f8757b",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "319af6c4-4f4c-5c6f-8368-b384cd1c2cec",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "32799792-23b8-5057-851d-91db5cddfbff",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "37540438-7188-5fb8-8b23-a00765a672e3",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "533de0e5-fa60-583c-8f0a-51e53c2159e2",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "88246817-beaa-5dfd-a009-db75323b4632",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8b327496-cc4f-56d2-9848-dde7e4e6e3e2",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8ecd07a4-8fa5-5548-8f74-69ac95ec922d",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "909d61e3-5979-5184-a952-5c05028438c3",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ae5e6237-6b5f-527e-99bc-bdb295106523",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b5b45045-aaa8-5ece-a632-07b652e3faaf",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "b9e508b0-3550-51e0-9895-d8082f6c44a4",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c8bf4f37-13ae-5210-bd29-544654a22d2b",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d6e3285f-0299-597b-bfc3-d7c301cde918",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "fce4897e-1a64-531d-ba57-dd4b3c98c3df",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "5da96d9b-e1a9-5e7a-bcbf-6b7c4ebb10bf",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
        "role_id": TEST_ROLE_USER_ID,
        "username": "wang@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "a2143312-d2f3-5ab5-a790-29a1f5d0217d",
          "user_id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
          "first_name": "Wang",
          "last_name": "Xiaoyun",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "e137ab7f-025d-5f4f-98e0-e14769948905",
            "group_id": "de5fcb71-6db2-5fe5-8803-7d3eb4d6ad9c",
            "user_id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "fcc26e60-1a64-50f5-b7f0-9a8c9ea69208",
            "group_id": "b8b17d77-51e5-5c99-a0b6-86cf5757a781",
            "user_id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "a1dd3f22-30b1-51f1-a22d-5aeeb00fee1e",
          "user_id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFi6+SUBCADM9AAyXMBp32rNl4Hz2KqIsBYO7Fi9zFANzSM2jBCEuZVAE0pw\nwVRgKOn3DAcis2RtUyd5p1n3v7okuYOEzATDxtRq33vmRX3U39Zr5UzeDD6rM3rd\nT7RuaAjXhQA\/O+ODw0eOATJf0sYftabVD6BRv93iKmOo1r8SEU56+GX8NrqcpD9R\np40wxcb0fRLfEie9vCex8VcusUaKXzqMARy9hctmFykoKl9cvvHkW0XYYnHWGr9G\nKEZEytex2fpHNlkjVv6Ic1PUY+PxZyZ+6V0RgwMqztRdX8yrj07FoYgBi5+yJbBF\nWI4LrYMAlQp+\/vOsQuPkX2+6vI0RFHuNHehTABEBAAG0IFdhbmcgWGlhb3l1biA8\nd2FuZ0BwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJYuvklAhsDBQsJCAcDBRUKCQgL\nBRYCAwEAAh4BAheAAAoJEEdQAVv8B5UxId4H\/0OD+N+I8+0go+FqWSNiLBKrFVDl\nbrqwrdcGMBFDWCCy95zQX2xxIpAhtLr0Dnn80ecu6UklzHsw8LbybsHf66v8daa8\nCr9yC5raNQfVGifdB77AkDuA8rjRP4cotAI3CsKlvV2YQRrCGWCRyIFI\/u+UtOea\nrdM3yv\/JasLAHw8ExhDXwxhYkKgNwn3SZciFSaDLL0UwldBS93qi6pjYsmOVA1sq\nOgT61Y2dvqgiNhIO5cmiVxlDNJcrHnCEcSepU5nmv0A72kNfmE4mOTnG4rtU3NwF\nGdTntH26K5BfyQCDw9aHZklaGofuxVGeZ7ZwPyvSj5HZrPP1WgD7LnMHVJ25AQ0E\nWLr5JQEIAKeyT+yEhWyjCQhrH5QUgieFUu6IV2npC+ErafvrtVnUeWLprWPBnDul\nqoiTu7QbzEXT\/7MbwlgticNq9QwINWsNSHKBvMjOXEFRhOltF4AXYTBJThnyFR\/o\nhuGQezmjV4TpN8yXtpgiy21W+\/XYjrY8PaIRM1Adc1hSmMSiuzLu+VtKIs+8tFFa\ns8acWmskgKww2vHHJkxQ+ubWl5W1Vxa1Y\/kOGjMc+qSHZ0v6jEnkUjaxLd0DW0hH\nG8weEunPzBBSJKf7NstZ6c91+4LUCVoNqCYMkq3ymKRITN3vmJSfU+jIXNOd7OoA\n+TP8Bsj\/RS4opQ6kRrL3tficrX6QzcEAEQEAAYkBHwQYAQoACQUCWLr5JQIbDAAK\nCRBHUAFb\/AeVMbTTCADCdL5UyXBfCOp4D\/T2L0uUL\/2d37nyfOU7c2FCbVuviG+s\nBAVypL7KaXNF6gp\/FGidSUZDVIr+UzD9cv3s+7J0h5OeZZigyPlUbWaNy56CBJEr\nYZH5u3+i6S9cc3udbP5DaD9EpASWUbsREi9t37O6hTS\/OGBTGxH5KpFsVBIWBTL\/\n+XQPsd+YMdoBVka3yKSzkFMLRLHt3K0\/miwXj7IK1g43mcYHUCrWxjjQFVjUZPBL\nQiL18WhPkMO2lCHdGR9skSycwGDnt5WVtGnn0x7+JV0Yk8RpuopfOWo83+oBzq3c\nerR4fuZF\/\/Io+VikJe6mKufSflOpCDYfSOscdAA9\n=q+Sl\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Wang Xiaoyun \u003Cwang@passbolt.com\u003E",
          "key_id": "FC079531",
          "fingerprint": "28C3C228F27C892A0583AF534750015BFC079531",
          "type": "RSA",
          "expires": null,
          "key_created": "2017-03-04T17:28:05+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "33966163-6457-50a7-968e-836b904d7867",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss5@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "a9dfd11b-c442-5b3a-9fad-6d5995245f5d",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "first_name": "javascript:document.write(String.fromCharCode(88,83,83,54))",
          "last_name": "javascript:document.write(String.fromCharCode(88,83,83,54))",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "00bbd7ad-fe61-5878-9331-116c3541cd43",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1c67a74b-7307-5d5a-9c7a-508cd6f1c0ae",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "41d50f10-2673-5eed-9ae2-2540887feb0e",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "44f6b9fa-0208-55d6-90b6-4aff8d4a1b55",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "4a400490-05e4-5ac5-919d-546c1da590ce",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "4a780943-f456-5f33-bd75-b245ae927041",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "737de3ae-4250-521e-9573-4d3115fdf620",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "88b6b4ac-1fcb-5fbe-8d6a-9fd306c90dd6",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a6eb45e8-8184-57e6-b415-1d367960c4c5",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "be21a072-6314-5f5f-bb30-9c454123df4e",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c050e7a3-5f83-52be-9534-9bbfddd27d38",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "da0167ff-dcdc-5a92-a4f1-3eb189aab98f",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "df72bbbd-207d-50c1-9e02-f8af900c615e",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "df81dc80-2de0-59fc-abc3-e02717be573d",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e8eec0fc-2703-5f7a-8004-cbf6599decb5",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ed2494eb-3354-5c0f-aa71-0c5a17b0a644",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f465c3ed-1ec5-50cb-9ef0-747c2cbf53e9",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "33966163-6457-50a7-968e-836b904d7867",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "b24c581d-d8d0-57e1-a9df-5f49de9b75d5",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "92f42805-bc0f-58fd-9de6-aab13ed0c28d",
        "role_id": TEST_ROLE_USER_ID,
        "username": "ruth@passbolt.com",
        "active": false,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "b10a6f64-668c-5947-9602-29ccbbc26ece",
          "user_id": "92f42805-bc0f-58fd-9de6-aab13ed0c28d",
          "first_name": "Ruth",
          "last_name": "Teitelbaum",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": null,
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss4@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "c05c7aec-c2e4-52f6-882d-5bd460797e4f",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "first_name": "javascript:document.write(\u0026quot;XSS5\u0026quot;)",
          "last_name": "javascript:document.write(\u0026quot;XSS5\u0026quot;)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "410e440b-29e4-5b0d-9572-d71260f556aa",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "45241714-8e2d-568f-8c3f-12b772b2bb2b",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "47203e91-00f3-5460-ba2d-71b303977223",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "622cb93f-a0b4-5655-a2ea-65f010df3e76",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "70882129-6176-557b-ab48-37a6c6241685",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "7116c7b0-3bb0-5106-ac4c-fb4db38eb049",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "761a5741-6068-59f0-bca1-a7cbe2869375",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "76b2816b-10f4-50ea-b911-db2377d9959c",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "90096077-071d-5dc7-8c55-c22e8fa5d353",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "99755e8d-9f2c-5ff1-b1c1-19988ab68d24",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a0baca7c-e2fa-5c20-975b-b058ad872c4c",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "c51ee46c-2429-540f-a73c-2f89cde6a786",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "cc73952d-1a8f-5a5d-b59e-f7617ce91303",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "dace2938-43b1-5f01-b6c7-432f90dca30b",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e18e4b2d-76f2-57f5-8fc4-566726b2d74a",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e1a3511c-a2c3-532a-82e8-a4b74bca54ca",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f741fe2d-622b-51db-a485-243c69f7965f",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "fc727901-e0d3-5390-a459-6533819b963b",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "e87e2cb1-5fa7-52f8-b487-29f36dba1552",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
        "role_id": TEST_ROLE_USER_ID,
        "username": "marlyn@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "c1c1552b-486a-504f-a317-7efa0973384d",
          "user_id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
          "first_name": "Marlyn",
          "last_name": "Wescoff",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "fa3fa0b2-cdf4-5c9a-8edf-2892dc35e27a",
            "group_id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
            "user_id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "c4834439-b383-58bc-8386-a2e475d85318",
          "user_id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWatoBEADG8gXYLlFBwO0iHkhAjWNByPdIDvsWvhZFCgFTQcVAjEr\/VY3n\noCadB1+yidXZtWN6oIl9BFou0g+MV81Tx6J7W43HPtnpxbULo+PmM16E+a1zUuuM\n6L46F6SbYpOffNG85OvnmkSbuckusYaOTrjiEsnfbdFMMI2GUZEQJaGvdP1hhhXf\n8AlvE0z7QLqpi7wl8Ix1H4KaDMI1WrA+Xk4Lvg3YfvKVMZRSE54dmsgx4IWnSs1b\nPTt8\/x6rVqK6R0fqCUL8DGAk+PzLbBbw0j2TG6n3xeuevxpo\/eRxt0ITchAGPGvd\nd+v7Z1n55IWLCyHSON4T0k6mwJR7K8n1MemMSnfrTOEajAvxkaqzeSpuodsVSCEt\nSxAuFlJ0yy+ad6K4ApGI4R5uDAz6gwzaXOYk5kjLKRSSxWp4xiRfG5SnlXRLOVxR\nvEDEp\/ZYDEwWtpVbjfhfu9V0MiO8bA\/VmeJ3YlZfU0m\/6owiVPoUD\/A\/1drrVxYO\nlUjlbEFUy1\/IWkgI+04GJ7EiUwKtHAI6CO4wWHQz8u0dg8qdTWGuO8Ryakp8HD7S\nqUli3Ku1fC69WOIpT9rFmrNlPV54i5SpcVC8HIh2EuvNyyN3ceffLbMPQUtKChzM\n7lO9XL89iwWAEyVBSWOENskrrMCe8ZmJO1eSjxd\/G2tR5bgcWMfYOCvCvwARAQAB\ntCRNYXJseW4gV2VzY29mZiA8bWFybHluQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgC\nGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQTkQA7l5JuGuW+31\/SLsK1JBzWx\nwAUCXRufEAAKCRCLsK1JBzWxwIADD\/9LeHr0CY4v3uRYRTFlwLV39o2wZzR9Ydho\ngZDvvcdlGHFKbjUPQvl8UQxSzlsYzyi8q2agGDKj3iPnELU+3l2YFITLo9OXe27R\nXyb0y0mYWBJmUpbhTEbrN1Q9hbtcR66ksoYeNyRt74SyQJRDLKaQK\/6lkdUkGepb\nNs4pkhkC0XFwkEskzdm2DzcgFGJ5jJVWwFPOsmqJy1NEfEY35DtWIoeYF5M2D7mL\n7pAaobSbr6bAy4YN1Kff5AGfbMgfrPesC1pCnXBl\/v7W9SHHnHAfHuDfah+Y0nH\/\nWrP\/jyhpRi1JCizotIvnA\/7QumlYxhplCpQ8BOSYKVlekcNbW90PCGh+pAT96INm\nF5CNgUtqrSuAo38TOXa2HNrkJ\/L9DWdztuoZuMqQYNOrEFSSqcHY8VrhWR+EkuQW\n+NdVz8oT\/YGIk7gl5vhWnG0q35csIMlqGKZmOCgnmzoRh0u\/O4v0+aH4n3DhexIo\nhfgPaC1WnqDSHxCNUtcdzBu1kWPqygcL4LuTEshyUrGLWcf+uDhnCNYmRTy4kYhV\ndQX4l0Bd0ONFyn5ey0MAYZ\/jMwLIM+UjgtF84l7n2OQBhR0rgqkBIFb4YmnKXA4A\nSoU3narFrvNmeEf3tog9yPtNDw606YyjB6oaBadLHCw7UH4mZb1yOtcxzlk9C1s2\npYA7CnlBIrkCDQRVlmraARAA2GCue8yluOgohRzG7ZrFtbiQuU7sOXeOLRtuZPjU\n0BcuiDONpOmpKYI2zBnCQf26ZT\/aQfeffgWrs2t329bLo+avZ8CqgwW2CbWpC8ii\nkd4B4oSDJA9QKmjmlxBFuzbLAdoefC6fwGd8n1B7A9HvZdnBuv2CpR8t8lALwDv1\nu70RCqAoAJ1gRirJ5wButOW3g4Nur633MOFG2QOA9BEBJnjnGhh2sVNLtRP7MI3x\nJ1\/+QjkYqV2zqs9syTdobPerr3E3duo7J+CJ0EOfRpMdqJXeBKFIRUpBAWLjhP9i\nQ3AO8eOJJ8UPIp6ffnMLj0cmJZpyeoZA7jYXfrbA4oMGhgmFhe\/3zucRfjCOJ8rz\n8yClJzHXOnwNrGz2AUo5DVU8GmNodjIz1KD7S+D8EZDTI6+9KE18U+x+EI9XmKY4\nzcygv7QRrivTtXqRxEZymOJX2PMqXY47U9DBE0Z185ZU+UjhEWnqtBfvMsWA8F1c\nlBVj47x5zRjkVUB3Dndx\/KcplAk3e7n0xt\/KzRnWvpdLho9mjKDljczQuqBzr\/dS\nBp\/kl46RmxTiM\/pM\/eVOPc9LwkpPjLqSUoQSDRShF\/UjdZJJIltYOkuZYq83+szs\nJ1HAq94zqR7rAqYVgzrEemLyc8my\/EGw1mN8HU\/AtPJKVKq78glyFb7Y76s53Wu7\nEzsAEQEAAYkCNgQYAQoAIAIbDBYhBORADuXkm4a5b7fX9IuwrUkHNbHABQJdG58B\nAAoJEIuwrUkHNbHAyicQAMbU40igq2U0xZmRYx8tUQjdDpwdzxaFXAGvAYZj2XDC\nuljp1U8vntWpeTot6QETTrOzZnLNzibAEtEee6yswneFWzb+W1+BEYAbVnEDVUy0\nxzszB2th+8h5xIQRdsQGdGcOwA9sbJzkbf90OtZjAs2ZpKfMzn9gGJZcqyrBwIyz\nL991TVaVEtPQwPLzZYk7ZyLyAzS3k2kE1ZHVWE+UPruQj1MTBkRchM6bgpqpCu3k\nGs6XNEdRlyY4uP5+nNpSnwlAiKmeG9WQyXbh6AbfN6vsIereNF2usaYiaBeZu1Ik\neAw2BDg6rebtuYbWdAKG8GBjVkKGmiaSxwVgoFlNkOLDasRvu5jLmT0G3+dqKlgz\nVFKQFZIlLoTH4Mid6AbAxyEXe5KFoatY9uUq7ouxvubxRRqW9iO+Kre4zkl5GYA2\nBMs4EJrzgNlDLVczlwnLaefr3tGG+HJY98pTuw7MFCKtY0I8D3tbwlmKcPLAJRsl\nc7gr4o8roi6Cctka03P1WZ\/HNpofr0KqweQp+YcueFYY1Y564FG3SpIKM3oXGoTz\nTVbj9aqN7cxo+hl6nxIVaDnzQ2vjWlhXJRuHcy2MWdJC3aDzYs8lUpbY4IFIsOUT\nINLXDnGOuemMrmgWDFgRchk72iJDJh8\/F\/\/ZylnJ8ZON6aWT1hAZQxnnD17TXbsz\n=yEE2\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Marlyn Wescoff \u003Cmarlyn@passbolt.com\u003E",
          "key_id": "0735B1C0",
          "fingerprint": "E4400EE5E49B86B96FB7D7F48BB0AD490735B1C0",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:58:34+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "af5e1f70-a0ee-5b76-935b-c846f8a6a190",
        "role_id": TEST_ROLE_USER_ID,
        "username": "adele@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-09-02T14:33:25+00:00",
        "modified": "2020-10-02T14:33:25+00:00",
        "profile": {
          "id": "c219edf1-e104-55dc-ac80-cefdaffc943a",
          "user_id": "af5e1f70-a0ee-5b76-935b-c846f8a6a190",
          "first_name": "Adele",
          "last_name": "Goldstine",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "0239c721-8b7d-59fc-9bff-69e75aff349c",
          "user_id": "af5e1f70-a0ee-5b76-935b-c846f8a6a190",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        "role_id": TEST_ROLE_USER_ID,
        "username": "irene@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "c551fc12-59b4-51ad-ae73-1659812e9ba5",
          "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
          "first_name": "Irene",
          "last_name": "Greif",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "6b8bc98f-a456-56a5-8492-db2faaebe2a2",
            "group_id": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
            "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "6c3a4077-966c-5f08-9ac6-325da1321eb2",
            "group_id": "4cdc85b3-f442-5511-b28d-cbd109100189",
            "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "eeccd1ac-c99c-594b-8d13-b38f819a5871",
            "group_id": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
            "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "118fd79b-b683-5595-98d5-fe622c679711",
          "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFdFp7MBCADJIBQnJRuqNHJZTsFTK8byR7WJG7EpEHL+lS3qeOLoALYB+y8N\nfYbNDhGvpCWNgOatzGX0+PyjhZfHfGwgM\/yGeULmWKdfpaWIEcmgG2YaKucSvBll\nurDnA8mKlMZ8hXAZTbIYbr+IOl084824A0O3PoOoTYYPUk5DPtlbCP4e5JUF5OKb\n2VCjHxJbY+zstpOHipqmJJH5CejyZpmP4j0IYPDtUS2SeqdmFcYs0Nv7al3+Sc5s\nz4vbc\/Doiusyi00BWYXkI0yX3DQGz06FeFAgaQjIdChu207JF2UY+rylPTnMi1\/Y\nx+WKvP8Eidtb0+brOQPebl+oDq7c9SgXKWkfABEBAAG0IElyZW5lIEdyZWlmIDxp\ncmVuZUBwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJZkvYUAhsDBQsJCAcDBRUKCQgL\nBRYCAwEAAh4BAheAAAoJEFIHxWR0\/o0x\/MIH\/RdKE6q+gAkD3WG52vCQxgDk\/8hY\npTRjKKaEHknTzGzjC7tF0PtWrXo6LYYyvMdRB7sQyGLQl\/qMo+MzsNa2oHKF7ujE\n10WO6uqqBf+ePw7Odqllh542pYpoMAg76eOPbXItM50ZgHXJZeFin5s9c14ATyai\nhRQRjoDII2WLGm\/ZbVgjBjQvZ9A4o2nLJ91pxZxav2pIR3EIWZxYa33uOkzvYQT4\nvQ1lqrksOqorXj8pFqj6HZRFU2Gq8IbhZqE6EZk62CfDBknuZl+88mZ4yfRHwtsx\nsWev+GpS0s6XMfI4cbT68oRCoXMZxv0aiPnli4hOP0vUFxe59WXdBVz\/yUS0Jkly\nZW5lIEdyZWlmIDxpcmVuZS5ncmVpZkBwYXNzYm9sdC5jb20+iQE6BBMBCgAkAhsD\nBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheABQJZkvYVAhkBAAoJEFIHxWR0\/o0xG0AH\n\/06LUmgQR8ZJCmCeCZnJ9UuLvcCs7oh2CrQHWSGsy263MA3SPXwmoDWWyEwy4rgA\nVNiYYGqRJYBt6OqiHvk0q2I+Qg9O92c1rL0qnTp5LWgrX1wtZTxBPQNd8YDuyWK8\nLQ7kwzEi0zkLgNwvhv0cJaLjHidGWlWaN9uqUlJjHTI4dXLKIKKSIiYP6rHQWpF\/\n7Q9D5Ftd5Y6sfXdBud04H7AUWib1Tv3PZ82+WgKgwssc00SMTjMCFe3m1skcRwYT\nQu2zQCslG0ipfvKHOxJwC8Hz3l8E8zH55NBPRqM+qOnLRu9KL7OSupnYf8bpOfhU\n9CRe1a\/xIQgpmFG4PXPwAoe5AQ0EV0WnswEIAKp2ZNBEqWlCVnxdb\/cfsUOiLzsS\nyjoRCxeZXs6C3PS4ZmIVn07v3ij14xCFjTAMQChmTDfquo5HV4sSd6mtUcBOXx+E\n9D4rZQ4oweFSa5zF1xZ4rXGNU00OT59UOEkSvGHCsRGGPmtdSIX59131RCbITcHu\nsF51vIq4duRR351c9tjHBWWRmeZQHmV3Ysmh+GSEYR2DK+1YtlptxGvZE7UbmsnV\n0NAGqmRmIkOvz1ycfLcZ27O272jEBBUsU6CgulTbPscJtkAR2eyeStLJQuK+CUp\/\nvGxIOWMiYO82iTyKs7Lm59X4gVq5A8J2QEY1g9e9Ywhy7MixJm2p05awMXEAEQEA\nAYkBHwQYAQoACQUCV0WnswIbDAAKCRBSB8VkdP6NMapPB\/9\/SdVnB9tk3Paw5cQA\nmRxjpNFkj4KH3EsARO5\/st2+X9bUOsdvRjofOfgp3IL\/aN5pPciW\/oJ4bQVa2612\ndFZwPfPEQwOhXE7Ebumxjzy+4Uu3OxgxMg\/K1Ju6liP5+46FVeE2ylQ1nqS2RrD4\ncsnx5Uk5BhWlF7umI6Y0e6SstTgpNb71+B2DIFg7MBYmfInnhWBuVlzauEzQksVC\n6mpHsoj6S9KxvblsJSmEI2MAaVoAIcU+1dnX2PJ9zRnovR6U9wugJwOOMQfzOnMf\nw5Kyiy+4Plc5hbT7k+cnx50EPBCFlm9nP0dVemvD64PDjbWxVxY9w1gDgeYfdaJM\nRQKw\n=8Nu4\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Irene Greif \u003Cirene@passbolt.com\u003E",
          "key_id": "74FE8D31",
          "fingerprint": "FDC7DF9AB0C61C33B2D871C25207C56474FE8D31",
          "type": "RSA",
          "expires": null,
          "key_created": "2016-05-25T13:25:07+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "c92a1885-1644-5bdb-8486-12d751b976ff",
        "role_id": TEST_ROLE_USER_ID,
        "username": "thelma@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "c6b23ff3-b8e3-52b8-bf76-2cd57e8c701d",
          "user_id": "c92a1885-1644-5bdb-8486-12d751b976ff",
          "first_name": "Thelma",
          "last_name": "Estrin",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "38839a7d-1e33-590e-a675-e24894819cd8",
            "group_id": "b8b17d77-51e5-5c99-a0b6-86cf5757a781",
            "user_id": "c92a1885-1644-5bdb-8486-12d751b976ff",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a588e9c4-c35c-53f5-9cb1-77a01afd482e",
            "group_id": "de5fcb71-6db2-5fe5-8803-7d3eb4d6ad9c",
            "user_id": "c92a1885-1644-5bdb-8486-12d751b976ff",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "b3cdb8ae-c5ab-52e6-a394-8cd800bfaed6",
          "user_id": "c92a1885-1644-5bdb-8486-12d751b976ff",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFi6+KABCACr10aZS+MSkQAuyducjLJ5Pb9rShxlmIXClTYry2RaoeOe7Pp3\njNcaNLtXNUhxI56AhGSuiRvnKC+yKTYWm4DmOEtLD4o1hEJ1SZSOKx4QLqCEW7dz\ngK6+S9fOuZTpQuo78P5rAjtXo7PvI5LfSsZDjZZtlzkaB1i50bpr8u2uzVOC\/2O+\nTPK04iY+\/EXF5kOt6qCgUYJibk1hnzAxQUZ6ORawNzoPAI5OPZwnwXlq1BB1YDSt\n5vWgHJjhq+7V086CW8csgWBZwfQHXLH\/Wt19NgTkmAkn4Znz\/CA7b9fQivxFNZuU\nUeS4IV8u8hX59rx0Vlfk2\/abaeF+Hbyp+1C5ABEBAAG0I1RoZWxtYSBFc3RyaW4g\nPHRoZWxtYUBwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJYuvigAhsDBQsJCAcDBRUK\nCQgLBRYCAwEAAh4BAheAAAoJEKcRoHMXh+VNqtYH\/i+pb0FDVEtO01HbK05CMQtP\n1boWBnO5vv50zLHmAbWRcUTZoQ7KR2lOAhWAH8mAaqL5TEr85haU0Qa9MMRfm8x3\np344cxJrZkViXBxqTCUSaHj53v2npDlkD6o41yHazzhIdZgWKWjM4zdvhNM7Swop\nTHswRjXp2S\/QwzmiFRhwR6rgAEBAxrU4lMxVsCHiam\/Hy+U0mJSK3jN0\/D5FOcMU\nlaFaVSC23Gdh6K4ho1dmWhUczMp8avgaqP4M+rk6\/8AxKrprdBykkHvvvKFIcWDp\nzYdyYYzXq8w4evCRDNpvjEA6CQZIwYvtIsZ3aIFjbbN2UpQuDwJJ4uzAzhE73lK5\nAQ0EWLr4oAEIALzPqR1QG576wp\/P+uDvrJ0EXqGD4rEG+2F3xclfkWmpRkCKQBWl\nKc40j4J0aNnPbRwclIa19C6GUNBaTIHEQ73tYhdREwku+7h5YO64XWrPH6bHLDCK\n+dBpwf42bcCTQzfL5P+M35UGDai32f361xzOwbsXEJDBSkN+5MJlumN\/LyPN\/Vb0\nxAMpx1uBb3qVgIUfq\/UacjTJZjc8GjpqNm4vRw6M4\/BVoBKPzyfUB5sxMkQum7yr\nI+VO0gP+Md6FO5lp4tsXpSR0RSCd1roHdH7+sjy8OG\/xXPG+05xitO2Ji3eumBM0\nvhK4iynQCU1FHkhC1rzVVICr7UkXjvdJtsUAEQEAAYkBHwQYAQoACQUCWLr4oAIb\nDAAKCRCnEaBzF4flTVM\/B\/9DbHQuNH7t+dKurPFHoJNTXIieMKzGSeoeRIr1R8ap\nP\/G6+xT4pV6UobPBH70SxzT8mMO591hnuRJ7qRA1Gpmq3EV+hSHD7SmczgjLbC2m\nKgvL0uHHtV\/a8qDh3CLDrW2\/jsIHKGfDHkUP71+bC8wJ6mmRysP7LLJRcy8mtQuS\nZDFzwL3PcSJHaBjjxsk59FCv7zEyVrOSNwq6NOuYNLf6VDp6LSGsGPm4Bjb0odcp\nlw8+0yy1CqS6XDpWdxSpAadsy3Fwv2pWZhHcaEw\/HK4ppQUy3Rb5CYFoDnxAyZAL\nwlPmpnNFp1iLbkFM2+\/gVSR+9Ty2DNFPgRAov58Cb+oQ\n=eX9A\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Thelma Estrin \u003Cthelma@passbolt.com\u003E",
          "key_id": "1787E54D",
          "fingerprint": "522E59EAC81C5D8470C45077A711A0731787E54D",
          "type": "RSA",
          "expires": null,
          "key_created": "2017-03-04T17:25:52+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "620de627-8f07-5427-9149-e2c43219c5aa",
        "role_id": TEST_ROLE_USER_ID,
        "username": "grace@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "d12b4113-9368-5923-9e86-deea9fdca094",
          "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
          "first_name": "Grace",
          "last_name": "Hopper",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "a932a3ce-82bc-59b6-ac4e-bf325435e534",
            "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
            "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "d7c9f849-71ba-5940-a3ca-ab26472c06fb",
          "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaLEBEADEw\/przig4P+MKh4qmtZaSHgOew9REKcjxnVH+sCLxyDej81xQ\nodYWIw3UvRcA5p1\/n+I8PlX5+cOX8nk4NmevM1tPuCEuEs7Cy5s1jJTw57+yhPm4\ntBP5oymugT5COYivo8gi6sJqjkwrIirEUtjEp0h1KdA76kuoh07akPsae184eIxu\n0T1Cjh0iFxqoXolNTB+96N9QtOucd4zdd9iSmAYaJ2rRhQp2AXSvZ6H9FZFFRlYI\n3s0UVDCrT0JhDYIHTYOOQxZsgGAvwHugrn31kWR752F5acj8p9bftS5HeiaatRVl\nYPxZAkZ\/4MMO4g6ssynTVFz3V9p+SbP+NnHijtCPZKp5dyvSEkhk8EsxOEr2Escz\nD7JG5vFZDEXgPsWM9tH41\/poSzCgcdI6s8dfB7i6jVI\/fzJ30ZdE98dRrzyTrVid\negmmwuiMKgBLQvnAuNj2TDUpFrhN9NgA5lIUuaLKatxPyKQvBm1YDzBfhLARIHKV\navdLxWjWxQiHLriQr5LTA7ESWupAIL9frOqPeirl0qwXsw8FGLzKqNJrIjLEgP0K\nerea00B8GIwnGOQR3i8FSNUDPO3v\/39bYINX4beLjHhqn+4boMstkeJ1jXyTAqEQ\nShAQ8eQvh151Eu+3c9KVET9nobnUBv+Si5bJ3Dblp7TU1HMAS3hi7QIX7wARAQAB\ntCFHcmFjZSBIb3BwZXIgPGdyYWNlQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgCGwMF\nCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQRjRSx6Cub66MjDCWQL2eJAm8alaQUC\nXRucpwAKCRAL2eJAm8alaZVJEACNg4gkpQKLBi8WkAh7StzegjyDQEJuNSupTdTQ\nWF9Fqev7VPxkNoapLylLB0dkAVE+tJOocNVTU81\/hL4+wtEIWu4eOrCRS3e\/9agJ\n5os8LvKOVp+GJUpyd9KofiRXLE2cQBEp2cN2GWEUbqcxa7Wa\/58El4XJn\/5bSfOd\nOabKqp9r8r9tyidoqIr2L7o7qW23qoB2eyGe0DFxQ5ERWWsiekeCmbq9ZF+xHxjM\nIv0zyVQA+k9nOR6JnYl+B6OJ9XNVkxX0FsMNKJ9oMX61ZyjXrahwMcCNPx6+1tzy\nBzkWJndSE0zvMHU53tBv3lo3WORlcq53qhJxl5ZR6kTcvfv8RNDzVaR66KScGnD1\nsD18kpD5Os\/bjAxoUlXL9ezn4YCl5Iv3EhlUc0Irw3AuT6c4RQwhXHX96VEFBJmO\nTakoXGUW7f1l0upvLWJ9ohyAb949UNIL0snOsVu1hhJ+sNx7R+eGAqciQx6kRDql\ntdHckYIVGd3EnWX7VaYYT6I1EkoMisrRU+ewOWEnJqw+S0E95r4zF6nyh0nsS8Ha\nfVhJ5o0GDRmUjac8M2Qp2PpV\/T1kpTOt6ZUuBROP4qWvtBrKO4k4Md89BsJikV8S\nGPYND7csi5S0clzhE34WBnubydoV3zVuhOodhXIGS\/8lZoJaLeKNO9EZq2Xp1ERl\nYdVt+rkCDQRVlmixARAAxygU9kJvG1vPPFqREnPcnVt\/m5tGE9KoUg3P00Z7XxxT\nrSnn1MwGtziArBalcbyIQ3EgjudrZNuPapJjZVpcT9U4W2i47vYrmQmvrbvei8jn\nFoVa590LP+r49TBewQAHaWFz0YvJLXxCjuOxeASGrz7Fu4DKoU54tJWGehzZutHP\nS+g\/aq2\/\/VRTj4ZYguc\/MEnTCYXWiI2GYPmaLliZ+LrI3OXlavqp5I7ykI3ugF31\nZUjzppfNZQHxwGxSDTm5TRr3tKMMibZyXHSV5Mg2wo\/BdejVdMapwY9nlhZ2VFfw\n2USG0\/1+oRtV8NPTCsg1NyBfRg1LVPf6kWvZ\/9BrxSIFoT2AOrl7xnKa5PpsAx4w\ngEsN7h+zxkvYPQQqT0v9cSOSJUjLnj+9MBv+Q3PA+NX5y0YUdqK9NeA0jKNbbnJD\nQRY59mLPQDWyjld8tMArWbG4VNexCYdieQfoqyKAHMm\/nF+YwwO2hT0CaW5hA\/81\npR1ANtXSgGeBXAKLUbdAxeJr4xi\/KpB2q6mvDEBM3Y2Ps2PsTW0k\/ypDlETVF19m\nD2Sjh9uF+cDzENrRtFOFQ33FBAzps4LNm9mS1Ugqob998i6796SqIfGsuJuchGhk\n81iqLb1hSwL9eWowMPDabVvii7IdVhGxeUmZiimwt3SfSZPJeQffuXtE1vn660EA\nEQEAAYkCNgQYAQoAIAIbDBYhBGNFLHoK5vroyMMJZAvZ4kCbxqVpBQJdG5y0AAoJ\nEAvZ4kCbxqVpQC4P+gKusB4ClKWZi853E164PCkFsmc7nzAP3eJ1R9HcP25kpd8r\ndu2sNBopNPUTXzR5FuF2AS+OwoiFfAgkgtXSH4qsCfkEg8mdLCxl\/oocP+tFN2Bg\nD4lgPTz8+Qbws7db7Kn\/TPgYn3EffRW0iZU7KLqVJ5L+uaxJ7Ypvo2pP0RKpjwmV\n5Oi2g8MYQhBL5WMAYrbM+eNPCqj0eYXGh0iW11tC\/INkbJQYD2HAF9XsS1s6nN9P\nfLPigqMjegILrEVuN5FopItYmbtX75FGjZh2oPQSOdmnqjnuJzdH3kUy+wjN8Q96\n8V+YEyh9XUAcRWnWFc\/JVoF9Lb2dp8TmNFsR4G3w1zR54wC2Bdk9zgvKlNE9ovz1\nhrwgHz3ESxWu5cLjNhegr6d3jG7Q8boqPRXT2TYXvmZMfVLEjegixLO2ILwpdDcE\nAy\/b0NykH0DNKhnn7H+koZHrUT3XPdnAvQCxwdbK264LEhYOjm+UpGXkm85iy+Z7\nhUPl+e3I\/H0V+vsZIx0866Co97w81+sO23rblLFVoTwMS7KPkRr+ZWIZrj8fL6sW\nuELuUEIu49BmmEtFSW6JJeIQfqqDfM2L6noXdi6Jl6HcAmi9rRz2cwnQoDEGSK7a\nU7pXXdihSht1ABsRNzO1YQLWDvrVWr1zaIC3bu0+ykwEsHEN4OQ2leaZ6Blj\n=7xas\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Grace Hopper \u003Cgrace@passbolt.com\u003E",
          "key_id": "9BC6A569",
          "fingerprint": "63452C7A0AE6FAE8C8C309640BD9E2409BC6A569",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:49:21+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
        "role_id": TEST_ROLE_USER_ID,
        "username": "jean@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "d15ca284-74b3-56ef-a9f4-02816113797f",
          "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
          "first_name": "Jean",
          "last_name": "Bartik",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "6025a745-34a1-513f-9ecb-205448e10b9b",
            "group_id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
            "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "cf85775a-cfb0-5ad5-90b2-ecfde355f7de",
          "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaeEBEADO1XF9WVHK56igXdIkeu\/4ifu7Mrbpte4ieyjEXtwzQ33u6T+o\nsu2V7PfI\/HvNlVsyivV46mrdJQ5iBF5S1ZnWO2PH\/5hJ9Jxz+iSEbR4wc++B\/AaR\nNVyy9bk5mewsOEumLQSHcda+892GxQ7YkT6294y6Z1vd316h4y7TYxrlMhaMuLhu\nt4MD8BDT6Hd2A93MMJYt+7pJzIeL9ECmjMvdEnVvGpyJkMMbaDSli5UQZnev66GO\np4zZB3JbzEtExOZcn1o8wrjskoAmVRU0W8QRSE\/sKoBNK77w4JlsrAL2VKj4MK6i\nQGTsFgh1H6YCtPgkavaM\/eYTExYpMBezoYIR+N+RiUP4HVvROiYgEXVtB+BTfMCu\nKJ5Oiab4C7tn8wr+zg79rpe++28qbZhU4pmHJl1BVm6W+qrrGYz3o8jFBgP3eWUF\nJnnUeq1hogKFdypMA7fQ4RuZtDUrik3up10rlh7anGnoVuTm4R\/X1KjvRkfitC7y\nKI4J5VFl\/OMl0ylXrfBMxfxaJ\/oUrlS7uZxZJa6S8U9uVH0TFuAdVbjdA02MM18v\nANaqK8Ls+CWjsxV4nlKB7FKI6y64HKomi1+lZ986BzX0Ckn8cizPbGGmAULtb79v\nyBPvcffVZH0xzIII2x4UsU0l0mUCXaQoy3TwStvZDq462eCBcjpDP\/ag\/wARAQAB\ntB9KZWFuIEJhcnRpayA8amVhbkBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEj3WOO92ERTYaimrQc7rChSSqEZMFAl0b\nnZkACgkQc7rChSSqEZO+hg\/\/YPZm8jnqW71MXAUk3rLuxONVBVuctjN56OOg\/bho\nLZqFuGExrp5cMym0OLnMPFsrMgUqDsB+zC+11hYKtrOtdg5+7gLNqFwQu2n7OMcc\n20Rug9lruhk\/P9r+ebbqHmTWBXPBxMAYuqEUCFDSbF8Oz26lfoDg4NeTGjrgf14o\nPwXNoBlfOQ7mf9LaAiSSKTR3MNqckXNURG4MMyPUACucDGcx7pi0OpZO9CDm+H5v\nuQaEIXqHLSWXo7hd8tF7iVH+jK3k+Qw3WAWXV\/JwKMveyz1gSmpQVpjzVBCf6zff\nfCjVzS51TrJ180Wkk3U3vPCVvM08LE8+XaSG1ti\/iGAk76GxC9W\/pqCnSgCB60dq\n9NQGXCZdCaTSR3zfAyX5fw7fJ+XsE9IhPR5jfTOok6qU3K+f3R7Mzd60UQkL9jNi\nf8ZKCk8oy\/LtQaIZ9AuD7sUxOBB2\/sYFABrCMTqykjFqJtQ9IF0AHoPutR4O50nv\nhFNmnlT4gOvzkjLzBes3YkuLYAD97EpIHpwCHIh5pHdM8HeMHspM70Mx7xNVjGMI\ndUthDKYCoyrWqK30UVCeu5MrFzLbUFCSkkpYs5wpaNAi6NEyduVlMt+3IZYFOavi\nMOJM+si3moZUEppP+Alaj58T1Egg30hBJlPaqO6CG6mveYu1xg24e3LJx9EVMCIi\nOPS5Ag0EVZZp4QEQAM1O4\/\/NeadN9+devdGyCVajildCNmbaD7ZhjU5fZwX23p6A\nXjgNnkPJqipqnVfdaOKeIjGVlb4WsC+a1iXurCGg2K6hCogMKCfXmwCdP2gKMSiT\nZB8HpakKGZAhXItHPSm6nHSq0XzuML5h6ixhrNyZqQ5qf3fdFY089qfUoXMNPm30\nKFHVWBx6c9f0yqalj09TYgvuS\/YfFOd5Uv3TeU1glgwPkOxBIZGfmRTwFZ0aRVuq\nz1mRkfZcy94oIWwgv6t8DEDHVmY+FyveXTVjB09yc6jU6hfY5NSyX4gHg1GOGJvy\nVobXI7WvAUasd\/d+lo+CRQf22x7+wNPX29FSKgB7TzEX8GseimIwe7tkXzRiAArD\nmbN\/J3Hvbaoh1n9DdiphxBQa8fazxRF19u38XAGwpjiRDEmaUx5mPQDWVZ2iWB\/5\nS17soaHvQirJGLa0uAk\/s\/73ZSjUlSVFfaAC4mUsO0IRWZ2XHRyg4jEuEvD4DeQH\nz6fkw4YBc0gxjbrcgcfcBMS7tWNx\/01kqOog\/pzuw\/HGNniXi3P\/kIj7Um7AqokN\nh7\/TyzlQFApBmp0zEKAL12h9fvpg8d\/73JL7gtdUZNNR2JmOnuf4HnVa71mQoXcS\nHuaQjjhpJczQnjfvQtaRZGaIn0eyqIpgSdy3\/EyyhX8CmruzwIxo4pCXjrsHABEB\nAAGJAjYEGAEKACACGwwWIQSPdY473YRFNhqKatBzusKFJKoRkwUCXRudjwAKCRBz\nusKFJKoRkxESEACiBDqkt7nVEHKyeC6bK5ViIod8tk54VJY07ZEro\/vGAce9j2Tt\nyRfnshgeakbU+H+qnFA3vyKq3vYZcdtLhEh2bt98GWPGhJ2\/pVNIVDPcghJ0PaLT\nPCvwWO12J38Do+iDdo4AJZ1fXY\/EZ9hQMnvD1cf9FDTU\/YZQvAI4M6D4SaXoBKGp\n+5JnTWFlFh80wnigcl969bdolXsINkLX6tFRcZNlkcjlKGc+YESwKH8rnhuEtqwJ\nIDbcCcEQyhn4m4DMxrKrDBRekKFFG8SM4\/5Anvqx+9T2PFGFfAD1ck0X5stLY+Ff\n4VDDkarLhDd\/5XjQLtmoZb1eZ4pRBkgPWql17\/37UOtesdYkiyswFOpLMN4Y\/cc+\nWlvvO4YAQ56dn2vJs8eI+ZSFyGl2Ypmcgg2JJg4sVkqgy5BxYtSRi2pgL19f\/Obz\nCBZTwdGWRqFKsFySsBJSf5QDs8N52vdFI8lgnAESsp\/H3W0BTOET+7MYq0NB7vbR\n3EHgMRIobFG3QkHu7ijO\/mX2nDsHrdiWTGpMfQ\/mY0zIp25ugA0JDvf5omESL8xm\ni3j8VXivsG\/BTfeQvQo7PQj68CKNMgVrrNvmVLEZUDG8LVHdbllp\/i8ogW3jR\/sk\nROjyJ0\/pKQiiFpLzfIZkXq2HO6E2A3U+n+SnbwxiXSJ5owOVjNtV+NC7Ew==\n=h0zv\n-----END PGP PUBLIC KEY BLOCK-----",
          "bits": 4096,
          "uid": "Jean Bartik \u003Cjean@passbolt.com\u003E",
          "key_id": "24AA1193",
          "fingerprint": "8F758E3BDD8445361A8A6AD073BAC28524AA1193",
          "type": "RSA",
          "expires": null,
          "key_created": "2015-07-03T10:54:25+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss11@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "d1e369be-f991-5fc9-8494-01c1b3a0d1c9",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "first_name": "jav\u0026#x0D;ascript:document.write(\u0027XSS12\u0027);",
          "last_name": "jav\u0026#x0D;ascript:document.write(\u0027XSS12\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "028f9a63-4dcd-5eeb-aa78-288446351696",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "21534a70-aa29-567c-8eab-68a643e56cc0",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "244d0805-7b9a-5036-9234-aacc219f8b94",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "31ff01b9-d56f-5aff-8908-f20a17101462",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "340fc33c-02bf-5dd7-8d25-ddbce87fcd49",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "3a864bdd-04d1-5f94-9fdb-2ebc888a14cd",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "64e7756d-81d2-5567-89e7-d8241e2961f9",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "7efd3e2d-4d79-5999-8f22-8863e3aaf6cd",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8c72e8a6-f6c0-5657-b205-f953d7d0afd0",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a29087be-00cd-5662-aac8-6777e50e1873",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a8c08043-cb04-5a5e-9429-8182e6d8eaae",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "ae6667fc-a23f-53e4-b8f9-0e1c97469527",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c43fd15f-4d00-585e-83b9-f9e599f34782",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d2dfc4de-ba58-53da-8284-2805bd0fe649",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e8cb9d85-b777-5ef4-be3c-79ec111d11bd",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "f45b3512-c551-5d43-a331-324a66513c75",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f825e924-355f-515e-b5c8-3babfe8e01a8",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "e4df3000-7abd-5f17-9635-19ffe4c68b54",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss10@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "d39a4b0c-c08c-58a4-9ffa-c50e1741dbaf",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "first_name": "jav\u0026#x09;ascript:document.write(\u0027XSS11\u0027);",
          "last_name": "jav\u0026#x09;ascript:document.write(\u0027XSS11\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "01a2a58b-4df5-5622-88a4-758a1b07d415",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "258488a8-5e39-5e89-bd22-76d5e00766f0",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "3abe7fbc-4625-5d77-9231-6fd644e9c982",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "6441ae1d-ce6b-5294-8958-f101dc694951",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "673cac8e-1d0c-51dd-920a-e424c775bb56",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "76fc7232-5739-52d8-8498-c974b84f6085",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8005096e-80d2-5fe3-91e9-e70d16819200",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8f0844ed-249f-54e5-8046-5b5e250f970d",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "9085a4bd-3e08-500f-ac56-7f91d7384506",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a3b8a558-f105-5671-929c-e413b6baf347",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a404a7fc-953e-5a8a-8d59-8b7c7321a077",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ad3c3d4f-8316-5f24-b6a0-f554a24d4fb3",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c54c08f8-d6b4-597c-b2f7-6c71e895dcfc",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d4da9a2e-fc7b-5c45-a378-45db26f64058",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e2413f3c-c3ae-579b-a483-0a1518ccd8cf",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "e44143bd-3c1b-5eb8-aa13-5f54ae8a5b85",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f8a5aebc-1e75-5498-874a-cd9f829a5cee",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "48b34f8d-c1a1-5b54-ab01-cd1418d78ce8",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss17@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "d9bc69ce-e364-5d39-9d36-4bd9feac426c",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "first_name": "java\\0script:document.write(\u0022XSS18\u0022)",
          "last_name": "java\\0script:document.write(\u0022XSS18\u0022)",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0a0f298c-c0ce-5ac5-be02-341e7493065c",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1ace60a6-a7a6-5687-97bd-ee0661740af8",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "359acad0-da83-55c1-8f82-4ef3b138d01c",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "40bef540-de86-5abe-9cf3-9d5ebdcf9f47",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "429f6875-7cea-514f-9362-b2e51a681e0d",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5c994520-250f-50d5-b31e-a35d771be469",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "62651a0a-a49e-5956-a33b-4509f6d554d4",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "94b09e9e-8cbd-5a72-9910-131b61aa15d4",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "a3e90cf2-7e70-5ecb-8cf4-e733652cbc7b",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ace7ee6a-5e0e-5353-b1a0-3499d39ea96f",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b2169c6a-5b52-548b-a102-7a1a03dc835d",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c047484c-1b7e-5787-8610-c1ae2a01789e",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c2d1faf7-3507-5754-92eb-e32a6bb13d6c",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c8c57bf5-ad3f-5693-97be-82e338e2b642",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d3a95548-0c61-5bc3-9090-0ca3ee944ea0",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "d8712969-fd35-573e-86cf-62c63bd8615b",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "e0b2c3e9-3474-5782-aacb-4783ef9e1c96",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "cdd3c0d8-c92e-56d8-885d-a23a10d8b9bb",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss9@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "eae6d68f-3b5e-533f-9e0d-cab3ddcf79e3",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "first_name": "jav        ascript:document.write(\u0027XSS10\u0027);",
          "last_name": "jav        ascript:document.write(\u0027XSS10\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "01bb4e8b-8224-5cde-a4f9-ce60dbc6442b",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "10275f9f-6119-549b-8ec7-473b9f584a98",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "229cabd3-c566-5b32-bbe2-458ae0d1547b",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "2ed6c150-6bc4-5c58-ad9d-562a8fdeb73c",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5ad9b496-ca17-59f4-a349-8bbab64cec9e",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5e87699c-e0e5-5552-8e07-23b8f94bc0d3",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "5f4a1ad7-8e14-5830-ba3a-a9ced156bf5b",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8adfe0e6-173e-55be-b9c0-950eb4519b3e",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "8be0d9ad-52e4-5d96-931c-1ddb15be2b3b",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8fe4d472-11fc-5917-8c21-a580f331359a",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a356f717-befe-5192-86d7-3ba517096322",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a4b8d9f1-b84f-5c0b-8aff-0463db060db1",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c33b3c2e-86fa-56e9-b071-63e5ad9a6572",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c7878448-c664-5033-b799-7760c44062bc",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "df453526-84a5-5add-8548-a5682690a919",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ec101c7f-9ad4-5c6d-9fb9-b12d18564c64",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "ef6439f9-d5d9-5afa-bcc2-1a05fd9d98a3",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "06fe70ed-08b8-5e0c-9dd5-5affb9717b44",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
        "role_id": TEST_ROLE_USER_ID,
        "username": "ursula@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "f6177e5b-ef9e-53c6-a4de-a5be4117d646",
          "user_id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
          "first_name": "Ursula",
          "last_name": "Martin",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "2e450a49-1639-5971-bf82-b945b310cc1d",
            "group_id": "de5fcb71-6db2-5fe5-8803-7d3eb4d6ad9c",
            "user_id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
            "is_admin": false,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "afb94ff6-4bf2-5de3-a944-0074f1d57289",
            "group_id": "b8b17d77-51e5-5c99-a0b6-86cf5757a781",
            "user_id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "f2b76b3a-892a-5b4d-9b27-2c051d4d6f4a",
          "user_id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: GPGTools - https:\/\/gpgtools.org\n\nmQENBFi6+NoBCADDDLnrYnzqJJCCPRtsMy27QNnb13eD69xv15D5vHWzXjl0HoNb\nFpxRQ6dBIsfkaxfmEPb8wC8ExGd4\/IDB+69wMOy8x387kLEBDHFlwzC9ocRlLBKc\nM7Fny8vLluh8ybrzuvqYreJUdBhzQPyYtVlOniU6P+jxnGOItp5Kcuv7fEMazVBo\noZj84ddo3yUuzq2Dc1t+lX6buJ3gMMalAMJSBjuyRabGy1EGod5o33FOtVdncs4D\nx1xxAllB85a8voyfju30Xd8fhzGvfSg089D5Zwn6Ceb\/WT6wZGdYbQh1pQTQZ2Ja\nLu3FQzpVh9QHLUmgV9llWZkyo7YArUlzGjl5ABEBAAG0I1Vyc3VsYSBNYXJ0aW4g\nPHVyc3VsYUBwYXNzYm9sdC5jb20+iQE3BBMBCgAhBQJYuvjaAhsDBQsJCAcDBRUK\nCQgLBRYCAwEAAh4BAheAAAoJEEA+DkoSiUh0lDsH\/jpRKnBrNjy0U\/c4zoM71S+x\nicFdZ5YONLhN+\/vNVEaVhx2w5FZYLUufgR2F2SwsvZ8vmCztPQyArUpSz0QbhTXb\nPdTwMdtjJt1xqOgo9O07l904KMSDnpaWAfTp0LjMPOyVAdcM1+NVG6j8TC5547Vh\nvlB\/WSoge0+dhVyzmkDO4gQA6CPQiJfzuiItYkuX0FWUU7MrkOjL72zUot1uHuZH\nGNGBYDtLcONzwauMdfblcZYH8YMW\/IXCX0EEY6U8gRC8af0ruanWeY25W0\/sJ\/H7\nMHTQ5\/2rAOhRLQb7WiK\/nNjGvLwwUiRNwzVZfXWRBeX7hgSvJFZb1QaIHQUCINW5\nAQ0EWLr42gEIAMILiYSI8UVcU8LTuRSi2l7ZIMVymTAF1RBcMnaVW4rDIdY\/FyNb\n4ZoYmcxP9fkbNAedqmrloNJx0\/ZnT6CYl1Fu7KQRM8kuunuD7xi3\/0Xwp3OMMAns\nmUUHkY4GKMiDeZ1+1QGVMN8ACRJioAmK0aTHSdFhx0jOfU+HDwG7\/Hj8qo8HmTiE\nsZ6SWi8wp2kdItdc+pEt4JO1nxwfHxXdBVgPJaxkWuCyZoEeuaoLz2N8YWbLTTy7\nElHcmcHAXC3noRd0p80Nvb+109H8lwv3pFkzFcrqsdM2y6+dYjtI\/9SCDtBSZghX\nCelFyDJ0msVfujGBoa1HU8RsivAR64sMBlcAEQEAAYkBHwQYAQoACQUCWLr42gIb\nDAAKCRBAPg5KEolIdMSqCADDBO\/i8DiNbsKtJwHM9y7dXDPpb8W\/Hu3S4EIx68V7\nsnoUn6E9S\/sOdqubq5kuFk+S\/a1sE84iq8T\/kDBT8i3d2e6LGXcYdxQXRcUEKawI\nf8VYyA4J8UKXPLLo1J5A1MN\/xc8Duuw7mdLDnbXEjjSFG7G7BBYNC7UBHmdDxOK2\n+yt46o8ogqI59iREelIiVg+n1gU1mnhbFIdrhonv1bjr7Fu8nGz\/iLynAMlxV4TF\nOm211avkc+sUYjZF8k3zWGsNOEz3Cng3kaUFRZ0rmqVRZTRcAJuU1k7M9eo6I2j4\nC1bPERQcYXABssLYtGmFVdoC3DLBcCY+tjrJRz7DXtpo\n=Z4Om\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Ursula Martin \u003Cursula@passbolt.com\u003E",
          "key_id": "12894874",
          "fingerprint": "DD6A88103741A623F8AB8F43403E0E4A12894874",
          "type": "RSA",
          "expires": null,
          "key_created": "2017-03-04T17:26:50+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "a0559bb5-050b-50a3-ad39-c6756a46dbb7",
        "role_id": TEST_ROLE_USER_ID,
        "username": "yvonne@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "f80586be-369b-5732-9184-8bb7db74d750",
          "user_id": "a0559bb5-050b-50a3-ad39-c6756a46dbb7",
          "first_name": "Yvonne",
          "last_name": "Choquet-Bruhat",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [],
        "role": {
          "id": TEST_ROLE_USER_ID,
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "9801f2a6-a0f6-5cf6-8f81-df16855d07e9",
          "user_id": "a0559bb5-050b-50a3-ad39-c6756a46dbb7",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      },
      {
        "id": "81504708-c785-58e7-bd19-c1f2385dd074",
        "role_id": TEST_ROLE_ADMIN_ID,
        "username": "xss13@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "profile": {
          "id": "fb9dc6c2-30b2-5e99-8c16-05c61b90d2b4",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "first_name": "\u0026#14;  javascript:document.write(\u0027XSS14\u0027);",
          "last_name": "\u0026#14;  javascript:document.write(\u0027XSS14\u0027);",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "avatar": {
            "url": {
              "medium": "img\/avatar\/user_medium.png",
              "small": "img\/avatar\/user.png"
            }
          }
        },
        "groups_users": [
          {
            "id": "0bb1d666-28a5-5797-a1bc-986f90da8c96",
            "group_id": "a50d00b7-a05d-5ad7-a7ee-d8e6dea6b839",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1860058e-55bc-526c-92b1-9d13c2f095b0",
            "group_id": "bda0a05c-b1fa-58be-b5b9-446e65ace052",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "1da467d2-f6e7-5ff3-94b3-bc86935f6d47",
            "group_id": "d130bdf9-e4c8-53a0-b429-5157871f47cd",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
            "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "45b98d1a-e9df-5939-abf5-a465ae47d154",
            "group_id": "1f77e401-c33f-54f6-97ed-a5794c13a29e",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "4b3ba91c-f465-5c5f-a0e5-e407b44dfb4a",
            "group_id": "7f330ecb-a7f0-5c55-9b03-db1a49f24e68",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "79702574-dec2-5a1e-b812-47a66f0726b3",
            "group_id": "b32d7cad-88e7-5a82-b529-a4e351bea0ad",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "8b02254e-a39d-5f5f-8ee9-ae3510cd7c86",
            "group_id": "82380646-fd09-59e6-ae9f-5bbc652f1387",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "93076962-4d74-5c5a-a5bc-bc0122d88003",
            "group_id": "b826f445-88d1-5d00-a594-422f28ba1aa2",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "a25a8ef5-f7a0-522a-8d43-7c981c1fe5ec",
            "group_id": "d54dfb2a-c1b4-52f4-9076-8ce572960399",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "af047da6-45c5-58b8-95e9-c0e160df8efa",
            "group_id": "c3cc86f9-7f42-514a-b005-b87df1390440",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "af6c6175-2370-599a-b129-51af4c35e34e",
            "group_id": "083cdec9-d3e7-5bbe-86b0-1f352549dd1a",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "b0f51b1e-2244-5e3e-9fe8-adbfc65a449e",
            "group_id": "c1180278-c44e-5af9-82dc-013a0d2e9914",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c2342f29-d48f-52a3-aa40-e133b1d768e7",
            "group_id": "cd3dc0ae-2527-5ca5-88b2-afc6c0573e3f",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "c41e2a17-8601-5205-800b-dc43e30c8288",
            "group_id": "db7bbe7a-f99e-505a-af1a-331dcb0deb33",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "dd3f76d2-a623-5510-b923-c637f5f562d6",
            "group_id": "7f5bd1ff-1611-5875-a589-15ab2cc02ea5",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          },
          {
            "id": "e9eb4e5d-5c10-581d-862f-f53416c3c59f",
            "group_id": "e01cab56-18c6-5bc9-b962-f5407cf7ba69",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:27+00:00"
          },
          {
            "id": "f0600978-d66e-5757-b7df-5038dbef7e11",
            "group_id": "8b3c7b0a-57ea-5649-9214-4a9021cb2f1a",
            "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
            "is_admin": true,
            "created": "2020-11-02T14:33:26+00:00"
          }
        ],
        "role": {
          "id": TEST_ROLE_ADMIN_ID,
          "name": "admin",
          "description": "Organization administrator",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
        "gpgkey": {
          "id": "c1974eb3-b982-5324-a691-b8e0615306d4",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQENBFv\/eJgBCADDkW8IYwHmaQXWw5Dce9OzPH4N5NMuhdgli286ADBH3\/Tkfi96\n2SBtcf3sOfw0yNXlFU9F2yv9c+pAsjL+TUveTotCcKp3GflT4qCKbTTj2Vt09m8z\n8nrZUwe05szcWqnCKCh7sBGQlFG3GkiH42QQ7kqE0vuEa08eSYUhBWYsK28hBtUJ\nsXC2iP4sNymC+0DmzpdJ6DjZJUpoHnk77B1IvPAPTDo\/jFH4\/PwAMoi4khPvFjMJ\ngKq40exIL\/a60osYZN1D2KrawEjPRo3jJslrr6F2OwBJ77bTLCScHLxRmE3LOULp\nYhkHx1A6GmVzZoF0BIBTKfWk21lM9BhI7wXxABEBAAG0I1Bhc3Nib2x0IGR1bW15\nIDxkdW1teUBwYXNzYm9sdC5jb20+iQFUBBMBCAA+FiEENlfUAuY5Y5ZX4xTR7Hu+\n\/5sJExsFAlv\/eJgCGwMFCQeGH4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQ\n7Hu+\/5sJExsefQgAkW+m4AAE1skaUol2StivuwDaO5ncpo25YC9+jg8TTRlUq7qq\ncM1Dfys+7G5leOLNrIA98e+Rv3gtlLy3UevGVRN4R3iRhV7A9bgb3o\/rQR2dVI3P\nXEkB2iKGY\/YsmayebzaMwY2rWhYrqJC4VDkAiLP7nC1xFDkBvzGvIxg\/fJWi0eiv\nNbQ\/ztZla1ZctxttNRejDyLWzDgvR0aruv2+rRbO++QzrLEXv\/NThD4Iy8diHM48\nQoVWKwKOgHNorNYi4zeBOycP6KJ3No0oOOvnQ1dMa8EUee7FEgDp9pZ7TKpcC2P0\nFEkjd4HDiLYZ0ppci0VAd4eLKddUbtEoseEYKrkBDQRb\/3iYAQgA1SxFmNm4Byys\n7MFXebJsh9TfYDcS0wnAXKy6frABFS1O\/e35djH5Emr9xKTFVQn9VouJ6jd5WDCg\noplssKLC1izItQePe2p6JLP4p+Zv23MfsluyEEjlHviT\/VOwGCYXuYjKgqrHd\/Uj\nXPKijsrLKH2BIXWB1Zt8gHxS8StL+632SXT3ZONETf7nKKnHosIxa8ATBm9Ncr1Z\naqahQmuOFqqyVw1U34vznBz8Xx009h39oKkJTymUXEzb\/rYCdo6iKLSO6NqpG2Gz\n0H8wl2q6KiG84hcSEFiJ6t9m8U9iq08PxSyV8AUaY950Pa0yI\/8AkX+yxLEXkHNF\ntbptB0fKPQARAQABiQE8BBgBCAAmFiEENlfUAuY5Y5ZX4xTR7Hu+\/5sJExsFAlv\/\neJgCGwwFCQeGH4AACgkQ7Hu+\/5sJExvluggApQcvGqkfyD4Eb115LUmi549IKKWq\n8FFf85MWoZJ0BLNpIiWLBZFIs8dC4GJYSc1TaBlqlPtaHVh4kxlMvmAWGvDJ0AiE\nGVhwE8B5T7pMkFZBIzKPpOPMxBSIue\/\/K2XzxN0yXz+Rae7wpdQlgbcHByZZPnp3\n\/9E46AOwf5WDWu9J3081jIspeoAl4XOOncVi4azCNX8iwPcJVERQnInnpqBEV9qf\nH7sFPO+a9XpBJWjB8mMJzoA3ICWzb0u5YyUpBU6LmHHCGWY+gBDaNKMbRoRUUYyK\neZOICKSe4NoPeN03QbqyJsSV1vynpafS+G+AFfbCGnj0dy6DvWldiSR6kA==\n=OtIW\n-----END PGP PUBLIC KEY BLOCK-----\n",
          "bits": 2048,
          "uid": "Passbolt dummy \u003Cdummy@passbolt.com\u003E",
          "key_id": "9B09131B",
          "fingerprint": "3657D402E639639657E314D1EC7BBEFF9B09131B",
          "type": "RSA",
          "expires": "2022-11-29T05:26:48+00:00",
          "key_created": "2018-11-29T05:26:48+00:00",
          "deleted": false,
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00"
        },
        "is_mfa_enabled": false,
        "last_logged_in": null
      }
    ]
  }
}