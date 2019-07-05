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
                    <table border="0" cellpadding="0" cellspacing="0" width="480" class="flexibleContainer ">
                        <tr>
                            <td align="center" valign="top" width="480" class="flexibleContainerCell noPaddingTop">

                                <!-- CONTENT TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" class="textContent" align="center">
                                            <h1 style="Margin:0;Margin-bottom:12px;color:inherit;font-family:arial,sans-serif;font-size:24px;font-weight:700;line-height:1.6;margin:0!important;margin-bottom:12px;padding:30px 0 24px;text-align:left;word-wrap:normal">
                                               <?= $title; ?>
                                            </h1>
                                            <p style="Margin:0;Margin-bottom:12px;color:#202022;font-family:arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0!important;margin-bottom:12px;padding:0 0 0;text-align:left;">
                                                <?= $text; ?>
                                            </p>
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