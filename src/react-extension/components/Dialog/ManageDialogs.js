/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */

import React from "react";
import {withDialog} from "../../contexts/DialogContext";
import PropTypes from "prop-types";

/**
 * This component acts as an anchor for the different project dialogs.
 */
class ManageDialogs extends React.Component {

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
        this.close = this.close.bind(this);
    }

    /**
     * Removes the index-th dialog
     */
    async close(index) {
        this.props.dialogContext.close(index);
    }

    /**
     * Renders the component
     * @returns {JSX.Element}
     */
    render() {
        return (
            <>
                {
                    this.props.dialogContext.dialogs.map( (Dialog,index) =>
                        <Dialog
                            key={index}
                            onClose={ () => this.close(index)} /> )
                }
                {this.props.children}

            </>
        )
    }
}

ManageDialogs.propTypes = {
    dialogContext: PropTypes.any,
    children: PropTypes.any
}

export default withDialog(ManageDialogs);

