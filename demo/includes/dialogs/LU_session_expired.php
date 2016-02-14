<!doctype html>
<html>
<head>
    <?php include('includes/LU_meta_iframe.php'); ?>
</head>
<body>
<div class="dialog-wrapper">
    <div class="dialog confirm">
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
                    Your session has expired, please log in again. You will be automatically redirected to the login
                    page in <span id="js-redirect-count-down">60</span> seconds.
                </p>
            </div>

            <div class="submit-wrapper clearfix">
                <input type="submit" value="Redirect now" class="button primary">
            </div>
        </div>
    </div>
</div>
</body>
</html>