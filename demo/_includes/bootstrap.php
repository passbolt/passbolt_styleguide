<?php
/*
  Theme Switcher
  You can provide a theme name using ?theme=default|midgar
  The theme selection will persist using cookies just like old times
*/
$themes = ['default', 'midgar'];
if (isset($_REQUEST['theme']) && in_array($_REQUEST['theme'], $themes)) {
    $theme = $_REQUEST['theme'];
    setcookie("settings[theme]", $theme);
} else {
    if (isset($_COOKIE['settings']['theme']) && in_array($_COOKIE['settings']['theme'], $themes)) {
        $theme = $_COOKIE['settings']['theme'];
    } else {
        $theme = $themes[0];
    }
}
