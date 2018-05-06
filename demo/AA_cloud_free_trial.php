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
	            <div class="col7 decoration">
		            <h2>Sign up for <br>your free trial</h2>
		            <p>Enter your details in the form and click on "start free trial".</p>
		            <p class="message warning"><strong>Warning:</strong>
			            Demo data will be deleted periodically.
			            This is a demo instance of passbolt for trial purposes only.
			            Do not use it to store sensitive information.
		            </p>
	            </div>
				<div class="col5 last form-wrapper">
					<form action="/" id="RegistrationsPrelaunchForm" method="post" accept-charset="utf-8" class="public">
						<div style="display:none;"><input name="_method" value="POST" type="hidden"></div>
						<div class="singleline clearfix">
							<label for="first_name">Name</label>
							<div class="input text first-field">
								<input type="text" id="first_name" placeholder="First" autocomplete="first-name">
							</div>
							<div class="input text">
								<input type="text" id="first_name" placeholder="Last" autocomplete="last-name">
							</div>
						</div>
						<div class="inline email input required">
							<label for="RegistrationEmail">Email</label>
							<input name="data[Registration][email]" class="required fluid" placeholder="your email" id="RegistrationEmail" required="required" type="email">
						</div>
						<div class="inline company input">
							<label for="RegistrationEmail">Company name</label>
							<input name="data[Registration][email]" class="fluid" placeholder="company name" id="RegistrationEmail" type="text">
						</div>
						<div class="inline url input">
							<label for="RegistrationEmail">URL of your passbolt</label>
							<div class="field-url">
								<span class="base-url">https://cloud.passbolt.com/</span><input name="data[Registration][email]" class="fluid" placeholder="my-site" id="RegistrationEmail" type="text">
							</div>

						</div>
						<div class="submit">
							<input class="button primary big" value="Start free trial" type="submit">
						</div>
					</form>
				</div>
				</div>
		</div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>