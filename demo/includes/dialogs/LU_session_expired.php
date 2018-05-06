<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
    <?php include('includes/meta/LU_meta_iframe.php'); ?>
</head>
<body>
<div class="dialog-wrapper session-expired-dialog">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Session expired</h2>
            <a class="dialog-close js-dialog-close" href="#">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content">
                <p>
                    Your session has expired, you will be automatically redirected to the login page.
                </p>
            </div>

            <div class="submit-wrapper clearfix">
                <input type="submit" value="OK" class="button primary">
            </div>
        </div>
    </div>
</div>
</body>
</html>