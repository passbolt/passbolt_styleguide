fetch = async function (url) {
  let data = '';
  console.log('url', url);
  if (url === '/settings.json?contain[header]=0') {
    data = {
      "app": {
        "version": {
          "number": "2.12.0",
          "name": "Call me"
        },
        "url": "http:\/\/127.0.0.1:3000\/",
        "debug": 1,
        "server_timezone": "UTC",
        "session_timeout": 24,
        "image_storage": {
          "public_path": "img\/public\/"
        }
      },
      "passbolt": {
        "edition": "ce",
        "plugins": {
          "import": {
            "version": "2.0.1",
            "config": {
              "format": [
                "kdbx",
                "csv"
              ]
            }
          },
          "export": {
            "version": "2.0.0"
          },
          "selenium_api": {
            "version": "2.2.0"
          },
          "passbolt_test_data": {
            "version": "2.0"
          },
          "rememberMe": {
            "version": "2.0.0",
            "options": {
              "300": "5 minutes",
              "900": "15 minutes",
              "1800": "30 minutes",
              "3600": "1 hour",
              "-1": "until I log out"
            }
          },
          "emailNotificationSettings": {
            "version": "1.0.0"
          },
          "folders": {
            "version": "2.0.0"
          },
          "log": {
            "version": "1.0.0"
          },
          "previewPassword": {
            "version": "3.0.0"
          }
        }
      }
    };
  }
  if (url === '/users/me.json?api-version=v2') {
    data = {
      "header": {
        "id": "511d0592-7ea2-42c1-95f7-829de74e6cac",
        "status": "success",
        "servertime": 1586518229,
        "title": "app_users_view_success",
        "action": "881ab948-e40f-5a72-91aa-54b442270029",
        "message": "The operation was successful.",
        "url": "\/users\/me.json?api-version=v2",
        "code": 200
      },
      "body": {
        "id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "username": "jean@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-03-24T10:57:40+00:00",
        "modified": "2020-03-24T10:57:40+00:00",
        "profile": {
          "id": "d15ca284-74b3-56ef-a9f4-02816113797f",
          "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
          "first_name": "Jean",
          "last_name": "Bartik",
          "created": "2020-03-24T10:57:41+00:00",
          "modified": "2020-03-24T10:57:41+00:00",
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
            "created": "2020-03-24T10:57:50+00:00"
          }
        ],
        "role": {
          "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
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
          "created": "2020-03-24T10:57:45+00:00",
          "modified": "2020-03-24T10:57:45+00:00"
        },
        "last_logged_in": ""
      }
    };
  }
  if (url === '/account/settings.json?api-version=v2') {
    data = {
      "header": {
        "id": "c453d51f-3e0f-4438-b8cd-a07876a0503c",
        "status": "success",
        "servertime": 1586517396,
        "title": "app_accountsettings_index_success",
        "action": "9b473b19-0e3e-5efb-be19-8a1719843762",
        "message": "The operation was successful.",
        "url": "/account/settings.json?api-version=v2",
        "code": 200
      },
      "body": [{
        "id": "299be77f-a480-4775-bbc5-4223bc7d3cec",
        "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
        "property_id": "bfbdfc34-38e1-5027-9230-950d9338d064",
        "property": "theme",
        "value": "midgar",
        "created": null,
        "modified": "2018-10-20T15:55:29+00:00"
      }]
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const init = { "status" : 200 , "statusText" : "alright" };
      const response = new Response(JSON.stringify(data), init);
      resolve(response);
    }, 3000);
  });
}


window.fetch = fetch;