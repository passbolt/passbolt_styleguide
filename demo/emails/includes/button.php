<?php
if (!isset($url)) {
    $url = '#';
}
?>
<!-- MODULE ROW // BUTTON -->
<tr>
    <td align="center" valign="top">
        <!-- CENTERING TABLE // -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" valign="top">
                    <!-- FLEXIBLE CONTAINER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="480" class="flexibleContainer">
                        <tr>
                            <td align="center" valign="top" width="480" class="flexibleContainerCell bottomShim">

                                <!-- CONTENT TABLE // -->
                                <!--
                                    The emailButton table's width can be changed
                                        to affect the look of the button. To make the
                                        button width dependent on the text inside, leave
                                        the width blank. When a button is placed in a column,
                                        it's helpful to set the width to 100%.
                                -->
                                <table border="0" cellpadding="0" cellspacing="0" width="260" class="emailButton">
                                    <tr>
                                        <td align="center" valign="middle" class="buttonContent">
                                            <a href="<?= $url; ?>" target="_blank"><?= $text; ?></a>
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