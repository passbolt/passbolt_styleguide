<?php
    include('includes/layout/start.php');

    $text = '<span style="font-weight:bold;">';
    $text.= 'Ada (<a href="mailto:ada@passbolt.com">ada@passbolt.com</a>)</span><br>';
    $text.= 'added you to a group<br>';
    $text.= 'on Jun 06, 2017 at 17:37<br>';
    include('includes/avatar.php');

    $title = 'Name: Freelancer<br>Your role: Group manager';
    $text = 'As member of the group you now have access to all the passwords that are shared with this group.';
    $text .= 'And as group manager you are also authorized to edit the members of the group.';
    include('includes/title_and_text.php');

    $text = 'View it in passbolt';
    include('includes/button.php');

    include('includes/layout/end.php');
?>