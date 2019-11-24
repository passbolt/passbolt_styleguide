<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
    <?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page password">
    <div class="mad_event_event_bus"></div>
    <div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
        <iframe id="react-app" src="demo/iframes/LU_passwords_create_with_errors.php" frameborder="0" style="display: block; position: absolute; width: 100%; height: 100%; z-index: 999;"></iframe>
        <?php include('includes/workspace/LU_passwords_workspace.php'); ?>
    </div>
</div>
<?php include('includes/LU_footer.php'); ?>
</body>
</html>