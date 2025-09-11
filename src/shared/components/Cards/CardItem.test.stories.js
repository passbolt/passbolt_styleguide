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
 * @since         5.0.0
 */
import React from "react";
import CardItem from "./CardItem";
import KeySVG from "../../../img/svg/key.svg";

export default {
  title: 'Foundations/CardsItems',
  component: CardItem
};

export const Default = {
  args: {
    icon: <KeySVG/>,
    title: "Card item",
    description: "This is an example of a card",
    onClick: () => console.log("It clicked!"),
  }
};

export const WithoutDescription = {
  args: {
    icon: <KeySVG/>,
    title: "Card item",
    onClick: () => console.log("It clicked!"),
  }
};

export const isBeta = {
  args: {
    icon: <KeySVG/>,
    title: "Beta card item",
    description: "This is an example of a beta card item",
    isBeta: true,
    onClick: () => console.log("It clicked!"),
  }
};

export const proTeasing = {
  args: {
    icon: <KeySVG/>,
    title: "Pro Teasing card item",
    description: "This is an example of a PRO teasing card item",
    isBeta: false,
    onClick: () => console.log("It clicked!"),
    proTeasing: true,
  }
};
