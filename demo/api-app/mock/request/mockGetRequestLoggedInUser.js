/**
 * return LoggedInUser get request fetch
 */
import {TEST_ROLE_ADMIN_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default () => {
  return {
    "header": {
      "id": "49ee3818-f5a8-4451-842e-bf707086b540",
      "status": "success",
      "servertime": 1604475423,
      "title": "app_users_view_success",
      "action": "881ab948-e40f-5a72-91aa-54b442270029",
      "message": "The operation was successful.",
      "url": "\/users\/me.json?api-version=v2",
      "code": 200
    },
    "body": {
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
          "id": "8e42567e-6e6e-54bc-b17b-0f5afde5b01c",
          "group_id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "03e26ff8-81d2-5b7f-87e4-99bbc40e1f95",
          "group_id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
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
          "id": "c8f4bc84-2ea2-5509-8d6a-6b7378b7fffa",
          "group_id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
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
          "id": "d100fc5d-6685-50aa-897b-87ac816e28c8",
          "group_id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
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
          "id": "ad80b164-c30f-53e0-aac1-3040fa2f136d",
          "group_id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
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
    }
  }
}