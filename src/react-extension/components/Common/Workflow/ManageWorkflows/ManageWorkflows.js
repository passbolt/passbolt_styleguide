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

import React from "react";
import {withWorkflow} from "../../../../contexts/WorkflowContext";
import PropTypes from "prop-types";


/**
 * This component acts as an anchor for the different project workflows.
 */
class ManageWorkflows extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallback();
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.stop = this.stop.bind(this);
  }

  /**
   * Removes the index-th workflow
   */
  async stop(index) {
    this.props.workflowContext.stop(index);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        {
          this.props.workflowContext.workflows.map(({key, Workflow, workflowProps}) =>
            <Workflow
              key={key}
              onStop={ () => this.stop(key)}
              {...workflowProps} />)
        }
        {this.props.children}
      </>
    );
  }
}

ManageWorkflows.propTypes = {
  workflowContext: PropTypes.any,
  children: PropTypes.any
};

export default withWorkflow(ManageWorkflows);
