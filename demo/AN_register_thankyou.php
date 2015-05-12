<!doctype html>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Thank you</title>
	<?php include('includes/ALL_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/login.css" />
<body>
<div class="container register thank-you page">
	<?php include('includes/ALL_top_warning_messages.php'); ?>
	<?php include('includes/AN_header_first.php'); ?>
	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>Thank you!</h2>
				<p>
					Thank you for giving passbolt a test run! We just sent you an email, please follow the instructions to get started.
				</p>
				<?php include('includes/AN_disclaimer_demo.php');?>
				<?php include('includes/AN_agreement_notice.php');?>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="register thank-you form feedback">
					<div class="graphical-feedback"><i class="icon huge paperplane"></i></div>
					<p><strong>Email sent!</strong> Please check your spam folder if you do not hear from us after a while.</p>
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
</body>
</html>
