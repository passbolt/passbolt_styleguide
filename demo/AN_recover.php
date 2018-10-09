<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Register</title>
	<?php include('includes/meta/AN_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="src/css/themes/default/api_login.css" />
<body>
<div id="container" class="register page">
	<?php include('includes/ALL_top_warning_messages.php'); ?>
	<?php include('includes/headers/AN_header_first.php'); ?>

	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>Recover an existing account!</h2>
				<p>
					You can use the account recovery to install passbolt on a new machine
					(or if you reinstalled your browser, etc).
					Enter your email address and we will send you an email to get started.
				</p>
				<?php include('includes/AN_disclaimer_recovery.php');?>
			</div>
			<div class="col4 push1 last">

				<div class="logo">
					<h1><span>Passbolt</span></h1>
				</div>
				<div class="users register form">
					<form action="demo/AN_recover_thankyou.php" id="UserLoginForm" method="post" accept-charset="utf-8">
						<input type="hidden" name="_method" value="POST"/>
						<fieldset>
							<legend>Please enter your username</legend>
							<div class="input text required"><label for="UserUsername">Email</label>
								<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"/></div>
						</fieldset>
                        <div class="submit-wrapper clearfix">
                            <input class="button primary big" value="start recovery" type="submit">
                        </div>
					</form>
				</div>
			</div>
		</div>

	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
