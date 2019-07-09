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
                            <td align="center" valign="top" width="480" class="flexibleContainerCell">

                                <table border="0" cellpadding="0" cellspacing="0" width="260" class="emailButton">
                                    <tr>
                                        <td align="center" valign="middle" class="buttonContent">
                                            <a style="Margin:0;Margin-bottom:12px;color:#FFFFFF;font-family:arial,sans-serif;font-size:18px;font-weight:400;line-height:1.2;margin:0!important;margin-bottom:12px;padding:0 0 0;text-align:center;"
                                               href="<?= $url; ?>" target="_blank">
                                                <?= $text; ?>
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" width="480" class="flexibleContainerCell bottomShimBig">
                                <table border="0" cellpadding="0" cellspacing="0" width="260" class="">
                                    <tr>
                                        <td align="center" valign="middle">
                                            <a style="Margin:0;Margin-bottom:12px;color:#2894DF;font-family:arial,sans-serif;font-size:18px;font-weight:400;line-height:1.2;margin:0!important;margin-bottom:12px;padding:0 0 0;text-align:center;"
                                               href="<?= $url; ?>" target="_blank">
                                                <?= $text2; ?>
                                            </a>
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