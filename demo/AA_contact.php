<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
</head>
<body>
<div id="container" class="page contacts featured">
    <?php include('includes/headers/AA_header.php'); ?>

    <div class="page-row intro">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12">
                    <h1>Contact us!</h1>
                    <p>
                        Get in touch with us by filling the form. <br>We'll get back to you as soon as possible.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="page-row contact">
        <div class="grid grid-responsive-12">
            <div class="row">
					<div class="col8 last form-wrapper">
							<form action="/" id="RegistrationsPrelaunchForm" method="post" accept-charset="utf-8" class="public">
								<div style="display:none;"><input name="_method" value="POST" type="hidden"></div>
								<div class="inline name input text required">
									<label for="RegistrationEmail">Name</label>
									<input name="data[Registration][email]" class="required fluid" placeholder="your name" id="RegistrationEmail" required="required" type="text">
								</div>
								<div class="inline email input required">
									<label for="RegistrationEmail">Email</label>
									<input name="data[Registration][email]" class="required fluid" placeholder="your email" id="RegistrationEmail" required="required" type="email">
								</div>
								<div class="inline company input text">
									<label for="RegistrationEmail">Company name</label>
									<input name="data[Registration][email]" class="fluid" placeholder="company name" id="RegistrationEmail" type="text">
								</div>
								<div class="inline service input text required">
									<label for="MessageSubject">What would you like to talk about?</label>
									<input name="data[Message][subject]" class="required fluid" placeholder="subject" id="RegistrationEmail" required="required" type="text" value="Cloud Hosting">
								</div>
								<div class="inline message input text required">
									<label for="RegistrationEmail">Your message</label>
									<textarea name=""></textarea>
								</div>
								<div class="submit">
									<input class="button primary big" value="Send message" type="submit">
								</div>
							</form>
					</div>
            </div>
				</div>
	            <p class="direct-email">Or email us directly at <a href="mailto:contact@passbolt.com">contact [at] passbolt [dot] com</a></p>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>