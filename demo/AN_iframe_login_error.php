<!doctype html>
<html>
<head>
    <?php include('includes/LU_meta_iframe.php'); ?>
    <style>
        #js_master_password:focus,
        #js_master_password + .security-token {
            background:#ffbbbb;
            color:#000;
        }
        #js_master_password:focus + .security-token {
            background:#000;
            color:#ffbbbb;
        }
    </style>
</head>
<body>
<div class="login-form master-password ">
    <form target="_parent" action="../demo/AN_login_stage2.php">

        <div class="input text required">
            <label for="UserUsername">Username</label>
            <input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"
                   value="test@passbolt.com" disabled="disabled"/>
        </div>
        <div class="input text required error">
            <label for="js_master_password">Master password</label>
            <input type="password" placeholder="password" id="js_master_password" maxlength="50">
            <div class="security-token">CKR</div>
            <div class="message error">The password you entered is not valid.</div>
        </div>
        <div class="submit-wrapper clearfix">
            <input type="submit" value="login" class="button primary big">
        </div>
    </form>
</div>
</body>
</html>