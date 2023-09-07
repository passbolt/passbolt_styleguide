/**
 * Passbolt ~ Open source PasswordComplexity manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */
import React from "react";
import PasswordComplexityWithGoal from "./PasswordComplexityWithGoal";

export default {
  title: 'Foundations/PasswordComplexityWithGoal',
  component: "PasswordComplexityWithGoal"
};

const commonStyle = {
  width: "49%",
  marginRight: "1%"
};

const componentConfigurations = [
  {targettedEntropy: 128},
  {targettedEntropy: 76, error: true},
  {targettedEntropy: 90, entropy: 50},
  {targettedEntropy: 80, entropy: 75.9, error: true},
  {targettedEntropy: 112, entropy: 87.5, error: true},
  {targettedEntropy: 95, entropy: 117.98},
  {targettedEntropy: 100, entropy: 158.7},
];

const Template = () =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={commonStyle}>With minimum entropy mandatory</div>
    <div style={commonStyle}>With minimum entropy recommended</div>
    {componentConfigurations.map((config, key) =>
      <React.Fragment key={key}>
        <div style={commonStyle}>
          <PasswordComplexityWithGoal {...config} isMinimumEntropyRequired={true}/>
        </div>
        <div key={key} style={commonStyle}>
          <PasswordComplexityWithGoal {...config} isMinimumEntropyRequired={false}/>
        </div>
      </React.Fragment>
    )}
  </div>;

export const Default = Template.bind({});
