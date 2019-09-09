<?php
    include('includes/layout/start.php');

    $title = 'Your workspace is ready!';
    $text = 'Your passbolt cloud workspace is now active. You can access it using the link bellow. ';
    $text .= 'If you didn\'t get a chance to complete the setup yet, you can also click on the link to continue.';
    include('includes/title_and_text_big.php');

    $text = 'Access your workspace';
    $text2 = 'or continue the setup';
    include('includes/button_big_alt.php');

    include('includes/layout/end.php');
?>