<?php
if (!isset($footer)) {
    $footer = 'This email was sent by <a href="#">demo.passbolt.com/test</a> because you are an authorized user on this workspace.
    Click here to <a href="#">unsubscribe</a> to these emails.';
} ?>
<!-- FOOTER // -->
<table border="0" cellpadding="0" cellspacing="0" height="30" width="100%" id="footerTable">
    <tr>
        <td align="center" valign="top" id="footerCell">
            <!-- EMAIL CONTAINER // -->
            <!--
                The table "emailBody" is the email's container.
                    Its width can be set to 100% for a color band
                    that spans the width of the page.
            -->
            <table border="0" cellpadding="0" cellspacing="0" width="480" id="emailFooter">

                <!-- MODULE ROW // TITLE AND TEXT -->
                <tr>
                    <td align="center" valign="top">
                        <!-- CENTERING TABLE // -->
                        <!--
                            The centering table keeps the content
                                tables centered in the emailBody table,
                                in case its width is set to 100%.
                        -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" valign="top">
                                    <!-- FLEXIBLE CONTAINER // -->
                                    <!--
                                        The flexible container has a set width
                                            that gets overridden by the media query.
                                            Most content tables within can then be
                                            given 100% widths.
                                    -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="480" class="flexibleContainer">
                                        <tr>
                                            <td align="center" valign="top" width="480" class="flexibleContainerCell">

                                                <!-- CONTENT TABLE // -->
                                                <!--
                                                    The content table is the first element
                                                        that's entirely separate from the structural
                                                        framework of the email.
                                                -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td valign="top" class="textContentLast">
                                                            <?= $footer; ?>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- // CONTENT TABLE -->

                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // FLEXIBLE CONTAINER -->
                                </td>
                            </tr>
                        </table>
                        <!-- // CENTERING TABLE -->
                    </td>
                </tr>
                <!-- // MODULE ROW -->

            </table>
            <!-- // EMAIL CONTAINER -->
        </td>
    </tr>
</table>
<!-- // FOOTER -->