/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import {v4 as uuidv4} from "uuid";

export const minimalDto = (data = {}) => ({
  "data": "-----BEGIN PGP MESSAGE-----\n\nwcFMAxYTR81eetNbAQ\/\/TEWCA7W1kx7IzcZi4nmT92IZbdpzCBSQt5htSCoJ\nFfzGd27yeDT2GoEtmxmkG+gEak8ci0Jxa9FECaYDBzG4ixEDfDMfWqw\/WK2w\nj04oja+0qCAimV2nyItSYoaK5aZj8vL97V6U\/7YcraC9QTNY1Kd8RDPeL32D\nO2dpquPDLx5uMAmMoSZWruNCGqqJPjxMcxc2PBco+GJMcaGcYa5Y3+YueNpZ\nIIS0PbMpgiJlVvYzZywYC5lkIKFadVeV6MNkMmJfWB4VHq2Hoo3poZVP1rZV\n6cU7a7UuG4W3UUmezxQGQ6WAjh+qzkQHXrwI3cgU14du9sTCh8occwcPhG1C\nj8ljcTJqexQxA91TSj2UqhAnyB9yzZRcoh38bj\/OyGQmtiwxEFIzUymSi2pt\nysjJOZ7lB1Oh2l4vbgxJoNxtgvzY+3dsNXL510x793Hev3X2YcbO\/TJoy6G9\n89cuocJ1dlLIHqrfri43y1V0ZTfoa\/vigma4Qa5kUtB1tN0j38z+6tcjiz\/s\n8RJmXUK2bfHhvEbuc\/YnDDltpiZHc3QUtbj5TV2m+fO0ad2jVqxsi4eZid\/V\n\/WDUrAxRzY7xNRTRQQDbnT831NZeZbYobCpfPqU8ylF9iv\/V4lsyNYFrU0ne\n37JRFzl3cOY+jlqxGHaAF9\/mC3b3D3DmlZ+kOOQ7lE\/SwaoBAuDaJRsKzNqj\nTz8UFif5iwrEQY5BNzYd+zwGVzMlVP\/RNXR2YlAHx5lPMylgI73RDMoMZ4RT\nb7AQB9DqgobZI3dh3B90XqjkRiy3VJ\/nMhwknaZc6onJQgl2O\/ULie9kh69U\n1ojIkN+SHFCl42T1iT2eN08QUPffDVTMvT103WlX+MW8FV6CmF+TcDRUexs3\nT\/2EvFlxP6QTG41vLk4Sm3xce7rEZHiJ9hRrF26xVfT5jM+7z149lP5J8mgA\nARSBj2jlO7P1afQX+5RyYR+guD9LN95qMsNJwukTCzIo1AhE7yywf7b8v3a6\nXyanZo+TbDqxnJlozEMsdyGBwBn7UX6Erv072cZadO\/ZG2RBkbgiBGZ5hAjg\nPqwRAkfzDNa4WhsE9Crqs5ROy6IsDBGuAa8\/as0oCzIV+Ou4BPzKHfQDQS6U\nT0R+48sVAZAYY7TqaNHvf+3nlqMyssaK0SPm2fg3DZXPM2pcDatCFb4gVElC\n1qbG8pRIBmS\/NYr8m7IBnazDs9L6lYAjybuHes6cPqasDmHKha6DKl1P6jX+\nEeDxA0AVL4rZdUCt1fpEcFR\/R\/o4uDDLO8NGiHwM3MnbNI8G0SQy8q\/NhI11\nzWXyDeAR6hHKYC4h6WCCTFxe364PWLjQ5PGOLeAfeWEPCDZmP6U99kwoiOUu\ni8UuoIAFon3lIOXZnJ3ZtAcQ5UJ3gNcJH1EImZFdYtRgLo3GOPjBcNqGbmCu\n4xo+yMGy9Y8YJZM9HakKAChmHf01J3DAwNfUm8Rhx5w+NBQRm0aJ319wsACH\nlLEYvv+bVfPkNTvW\/vWND9eOPGI0Q8o=\n=AOt0\n-----END PGP MESSAGE-----\n",
  ...data
});

export const readSecret = (data = {}) => ({
  id: uuidv4(),
  user_id: uuidv4(),
  resource_id: uuidv4(),
  data: "-----BEGIN PGP MESSAGE----- -----END PGP MESSAGE-----",
  created: "2022-03-04T13:59:11+00:00",
  modified: "2022-03-04T13:59:11+00:00",
  ...data
});
