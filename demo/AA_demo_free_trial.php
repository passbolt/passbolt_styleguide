<?php $error =true; ?>
<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
</head>
<body>
<div id="container" class="page featured free-trial-signup">
    <?php include('includes/headers/AA_header.php'); ?>

    <div class="page-row free-trial-signup">
        <div class="grid grid-responsive-12">
            <div class="row">
	            <div class="col6 decoration">
		            <h2>Sign up for a<br> free trial today!</h2>
                    <p class="message warning"><strong>Warning:</strong>
                        Demo data will be deleted periodically.
                        Do not use it to store sensitive information.
                    </p>
		            <p class="message notice">
                        <strong>How it works: </strong>Enter your details in the form and click on "start free trial".
                        We will then send you an email with a link to get started on a temporary demo instance.
                    </p>
	            </div>
				<div class="col5 push1 last">
                    <div class="logo no-img">
                        <h1><span>Passbolt</span></h1>
                    </div>
                    <div class=" form-wrapper">
					<form action="/" id="RegistrationsPrelaunchForm" method="post" accept-charset="utf-8" class="public">
						<div style="display:none;"><input name="_method" value="POST" type="hidden"></div>
						<div class="singleline clearfix">
							<div class="input text first-field required">
								<label for="CloudInstanceFirstName">Name</label>
								<input name="data[CloudInstance][first_name]" placeholder="First" autocomplete="first-name" type="text" id="CloudInstanceFirstName" required="required">
							</div>
							<div class="input text last-field required">
								<label for="CloudInstanceLastName">&nbsp;</label>
								<input name="data[CloudInstance][last_name]" placeholder="Last" type="text" id="CloudInstanceLastName" required="required">
							</div>
						</div>
						<div class="inline email input <?php if ($error) : ?>error<?php endif;?> required">
                            <label for="RegistrationEmail">Email</label>
                            <input name="data[Registration][email]" class="required fluid" placeholder="your email" id="RegistrationEmail" required="required" type="email">
                            <?php if ($error) : ?><div class="error message">The username should be a valid email address</div><?php endif;?>
                        </div>
						<div class="inline company input">
							<label for="RegistrationEmail">Company name</label>
							<input name="data[Registration][email]" class="fluid" placeholder="company name" id="RegistrationEmail" type="text">
						</div>
						<div class="inline url input ">
							<label for="RegistrationEmail">URL of your passbolt</label>
							<div class="field-url">
								<span class="base-url">https://demo.passbolt.com/</span><input name="data[Registration][email]" class="fluid" placeholder="my-site" id="RegistrationEmail" type="text">
                            </div>
                            <?php if ($error) : ?><div class="error message">This domain is already taken.</div><?php endif;?>
						</div>
                        <div class="input checkbox terms <?php if ($error) : ?>error<?php endif; ?>">
                            <input type="checkbox" name="tos" id="tos" value="value">
                            <label for="tos">I agree to the <a href="#">terms</a> and <a href="#">privacy policy</a>.</label>
                            <?php if ($error) : ?><div class="error message">Please agree with the terms and conditions.</div><?php endif;?>
                        </div>
                        <div class="submit">
							<input class="button primary big" value="Start free trial" type="submit">
						</div>
					</form>
                    </div>
				</div>
            </div>
		</div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>