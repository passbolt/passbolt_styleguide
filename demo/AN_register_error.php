<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Register</title>
	<?php include('includes/meta/AN_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/themes/default/api_login.css" />
<body>
<div id="container" class="register page">
	<?php include('includes/ALL_top_warning_messages.php'); ?>
	<?php include('includes/headers/AN_header_first.php'); ?>

	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>Try passbolt today!</h2>
				<p>
					 Enter your details in the form.
					We will send you an email to get you started.
				</p>
				<?php include('includes/AN_disclaimer_demo.php');?>
				<?php include('includes/AN_agreement_notice.php');?>
			</div>
			<div class="col4 push1 last">

				<div class="logo">
					<h1><span>Passbolt</span></h1>
				</div>
				<div class="users register form">
					<form action="AN_register_thankyou.php" id="UserLoginForm" method="post" accept-charset="utf-8">
						<input type="hidden" name="_method" value="POST"/>
						<fieldset>
							<legend>Please enter your username and password</legend>
							<div class="input text required"><label for="UserFirstname">Firstname</label>
								<input name="data[User][firstname]" class="required fluid" maxlength="50" type="text" id="UserFirstname" required="required"/></div>
							<div class="input text required error">
								<label for="UserLastname">Lastname</label>
								<input name="data[User][lastname]" class="required fluid" maxlength="50" type="text" id="UserLastname" required="required"/>
								<div class="error message">Last name should be between 2 and 64 characters long</div>
							</div>
							<div class="input text required"><label for="UserUsername">Email</label>
								<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"/></div>
						</fieldset>
                        <div class="submit-wrapper clearfix">
                            <input class="button primary big" value="register" data-view-id="423" type="submit">
                            <a href="../demo/AN_login.php" class="secondary">already a member?</a>
                        </div>
					</form>
				</div>
			</div>
		</div>
        <div class="row">
            <?php include('includes/promoblocks/AN_promoblock_cloud.php'); ?>
            <?php include('includes/promoblocks/AN_promoblock_passboltpro.php'); ?>
            <?php include('includes/promoblocks/AN_promoblock_github.php'); ?>
        </div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
