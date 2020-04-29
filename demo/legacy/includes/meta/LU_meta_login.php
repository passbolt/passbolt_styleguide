<?php if (!isset($base)) { $base = '../../'; } ?>
<base href="<?= $base; ?>">
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<link rel="stylesheet" type="text/css" href="src/css/themes/default/ext_login.css">
<style>
    #js_master_password:focus,
    #js_master_password ~ .security-token {
        background: #FAEADE;
        color: #000;
    }
    #js_master_password:focus ~ .security-token {
        background: #000;
        color: #FAEADE;
    };
</style>