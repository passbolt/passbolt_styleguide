<!doctype html>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Register</title>
	<?php include('includes/ALL_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/login.css" />
	<link rel="stylesheet" type="text/css" href="css/devel.css" />
<body>
<div id="container" class="register page">
	<?php include('includes/ALL_top_warning_messages.php'); ?>
	<?php include('includes/AN_header_first.php'); ?>

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
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="users register form">
					<form action="AN_register_thankyou.php" id="UserLoginForm" method="post" accept-charset="utf-8">
						<input type="hidden" name="_method" value="POST"/>
						<fieldset>
							<legend>Please enter your username and password</legend>
							<div class="input text required"><label for="UserFirstname">Firstname</label>
								<input name="data[User][firstname]" class="required fluid" maxlength="50" type="text" id="UserFirstname" required="required"/></div>
							<div class="input text required"><label for="UserLastname">Lastname</label>
								<input name="data[User][lastname]" class="required fluid" maxlength="50" type="text" id="UserLastname" required="required"/></div>
							<div class="input text required"><label for="UserUsername">Email</label>
								<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"/></div>
						</fieldset>
						<div class="actions-wrapper">
							<div class="submit"><input  type="submit" class="button primary big" value="register" /></div>
							<a class="secondary" href="../demo/AN_login.php">already a member?</a>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="row">
			<?php include('includes/AN_promoblock_github.php'); ?>
			<?php include('includes/AN_promoblock_chromeplugin.php'); ?>
			<?php include('includes/AN_promoblock_donate.php'); ?>
		</div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
<div id="js-devel-sql-trace" class="devel-sql-trace grid">
	<div class="row">
		<div class="col12">
			<table class="cake-sql-log" id="cakeSqlLog_14329906465569b3b6c4f022_69163107"><caption>(default) 2 queries took 0 ms</caption>	<thead>
				<tr><th>Nr</th><th>Query</th><th>Error</th><th>Affected</th><th>Num. rows</th><th>Took (ms)</th></tr>
				</thead>
				<tbody>
				<tr><td>1</td><td>SELECT `Role`.`id`, `Role`.`name`, `Role`.`description`, `Role`.`created`, `Role`.`modified`, `Role`.`created_by`, `Role`.`modified_by` FROM `passbolt`.`roles` AS `Role`   WHERE `name` IN (&#039;admin&#039;, &#039;user&#039;)</td><td></td><td style="text-align: right">2</td><td style="text-align: right">2</td><td style="text-align: right">0</td></tr>
				<tr><td>2</td><td>SELECT `AuthenticationBlacklist`.`id`, `AuthenticationBlacklist`.`ip`, `AuthenticationBlacklist`.`expiry`, `AuthenticationBlacklist`.`created`, `AuthenticationBlacklist`.`modified` FROM `passbolt`.`authentication_blacklists` AS `AuthenticationBlacklist`   WHERE `expiry` &gt; &#039;2015-05-30 12:57:26&#039;</td><td></td><td style="text-align: right">0</td><td style="text-align: right">0</td><td style="text-align: right">0</td></tr>
				</tbody></table>
		</div>
	</div>
</div>
</body>
</html>
