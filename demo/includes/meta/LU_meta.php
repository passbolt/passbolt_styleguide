<meta charset="utf-8">
<title>Passbolt - The open source password manager for team</title>
<!--
         ____                  __          ____
        / __ \____  _____ ____/ /_  ____  / / /_
       / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
      / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
     /_/    \__,_/____/____/_.___/\____/_/\__/

    The open source password manager for team
	 (c) 2019 Passbolt SA

-->
<?php if (!isset($base)) { $base = '../'; } ?>
<base href="<?= $base; ?>">
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" type="image/x-icon" href="src/img/webroot/favicon.ico" />
<link rel="stylesheet" type="text/css" href="src/css/themes/<?= $theme; ?>/api_main.css">
<link rel="stylesheet" type="text/css" href="src/css/themes/default/ext_external.css" />
<script src="src/js/jquery-3.3.1.min.js"></script>
<script src="src/js/jquery.tag-editor.js"></script>
<script type="application/javascript">
    function resizeElement(selector, dimension) {
        if (typeof dimension.height != 'undefined') {
            $(selector).css('height', dimension.height);
        }
        if (typeof dimension.width != 'undefined') {
            $(selector).css('width', dimension.width);
        }
    }
</script>
<script src="src/js/chosen.jquery.js"></script>