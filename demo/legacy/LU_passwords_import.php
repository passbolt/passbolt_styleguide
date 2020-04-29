<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt cloud edition" lang="en">
<head>
    <?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page password">
    <div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
        <?php include('includes/workspace/LU_folders_workspace.php'); ?>
    </div>
</div>
<?php include('includes/LU_footer.php'); ?>
<iframe id="passbolt-iframe-import-passwords"
        src="demo/legacy/iframes/LU_iframe_legacy_import.php?iframe=dialogs/LU_passwords_import"
        frameborder="0"
        class="passbolt-plugin-dialog loading"></iframe>
</body>
</html>