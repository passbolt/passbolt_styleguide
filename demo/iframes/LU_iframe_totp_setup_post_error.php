<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../'; ?>
<!doctype html>
<html lang="en">
<head>
    <?php include('../includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page iframe mfa">
    <div class="grid grid-responsive-12">
        <div class="grid grid-responsive-12">
            <form method="post" class="totp-setup" accept-charset="utf-8" action="demo/iframes/LU_iframe_totp_setup_post_success.php">
                <div style="display:none;"><input type="hidden" name="_method" value="POST">
                    <input type="hidden" name="_csrfToken" autocomplete="off" value="42cd30d4a261de3cdb66a226ebe38f16bc5709737f7295f4f6d4e4c92410d608aeecbc4f39d6b9214cb14a7afb29b9ceb125b65839f4ac529111ccfc4dded730">
                </div>
                <div class="row">
                    <div class="col12 last">
                        <h3>Time based One Time Password (TOTP)</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col7">
                        <h4>Scan this bar code</h4>
                        <input type="hidden" name="otpQrCodeImage" value="data:image/png;base64,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">
                        <input type="hidden" name="otpProvisioningUri" value="otpauth://totp/Passbolt%3Abetty%40passbolt.com?issuer=Passbolt&amp;secret=CE5D6FJ5EA75MNVPEA3U3HSLYF6CZMJPHNBOLAQ76EWRY2UYGXFS3WC32EXRTU5RPWAMZL2K42CGDSZ7OTUFRGXSRKIXQOAQ7XO6J2ICUDPT54HNVZI3GBUGA7OVJ2AIICMHBNAVUSHWUQXWNXO6WX7GMOA7JBOV5S62QM4ATLKZZPRVXQMF2JVTSQ4FFZDWRBVCHZ2CSSZTFDXBMUMDU4MMZXH6RXS7A33TKHQ4FIKNVOKGEI5IAKRC3FXFO2IEB5Z2I7SL4YDQ7KJAXX3Y7KWC7HLOMC2Z5QAHASTULCXY7ETVU6QSQOVPTNBQGGGSJTCQLW5FHDVCVJS5UEYSKKRZNWK7IK4AQCFXXVH6RRSKIU5DJ2F4BEFVJ4SUH7M6EWIRPIBQRP4GPLVI5G723HXY7E">
                        <img class="qrcode" alt="qrcode" src="data:image/png;base64,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" width="128" height="128">
                        <div class="input-verify">
                            <div class="input text required error">
                                <label for="otp">One Time Password (OTP)</label>
                                <input type="text" name="otp" placeholder="123456" required="required" id="otp" class="form-error" value="rw3">
                                <div class="error-message">
                                    <ul>
                                        <li>This OTP is not valid.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="helptext">
                                Enter the six digit number as presented on your phone or tablet.
                            </div>
                        </div>
                    </div>
                    <div class="col4 last">
                        <h4>Requirements</h4>
                        <div class="message notice">
                            <p>
                                To proceed you need to install an application that supports
                                Time Based One Time Passwords (TOTP) on your phone or
                                tablet such as
                                <a href="#" target="_blank" rel="noopener">Google Authenticator</a> or
                                <a href="#" target="_blank" rel="noopener">FreeOTP</a>.
                            </p>
                            <a class="button">learn more</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col7">
                        <div class="actions-wrapper">
                            <a href="demo/iframes/LU_iframe_totp_setup_start.php" class="button cancel">Cancel</a>
                            <input type="submit" class="button primary" value="Validate"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>