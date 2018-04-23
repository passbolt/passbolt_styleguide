<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
	<script src="https://checkout.stripe.com/checkout.js"></script>
</head>
<body>
<div id="container" class="page services community download">
    <?php include('includes/headers/AA_header.php'); ?>

	<div class="page-row intro">
		<div class="grid grid-responsive-12">
			<div class="row">
				<div class="col12">
					<h1>Community Edition</h1>
					<p>
						Download and installation instructions
					</p>
				</div>
			</div>
		</div>
	</div>
    <div class="page-row service-details">
        <div class="grid grid-responsive-12">
	        <div class="row">
		        <div class="col12 presentation">
			        <p class="headline">Thank you! You are now ready to install passbolt on your own server.<br>Get started with it in 3 simple steps:</p>
		        </div>
		        <div class="col4 step">
			        <div class="illustration">
				        <i class="fa fa-fw fa-5x fa-cloud-download"></i>
			        </div>
			        <h2>1. Download passbolt</h2>
			        <p>Passbolt can be downloaded as a zip archive, or directly cloned from our github repository (recommended).</p>
			        <p>
				        <a href="https://www.github.com/passbolt" class="button primary"><i class="fa fa-fw fa-github-alt"></i> See the code on github</a>
				        <a href="https://www.github.com/passbolt" class="button"><i class="fa fa-fw fa-file-archive-o"></i> Download the zip archive</a>
			        </p>
		        </div>
		        <div class="col4 step">
			        <div class="illustration">
				        <i class="fa fa-fw fa-5x fa-gears"></i>
			        </div>
			        <h2>2. Install it</h2>
			        <p>Follow the installation instructions or one of our step by step tutorial, which are available in our help section.</p>
			        <p>
				        <a href="https://www.github.com/passbolt" class="button"><i class="fa fa-fw fa-book"></i> Read installation instructions</a>
			        </p>
		        </div>
		        <div class="col4 step last">
			        <div class="illustration">
				        <i class="fa fa-fw fa-5x fa-support"></i>
			        </div>
			        <h2>3. Get support</h2>
			        <p>You are stuck with an issue? The community edition includes community support. Post a question on github and get help from other passbolt users.</p>
			        <p>
				        <a href="https://www.github.com/passbolt" class="button"><i class="fa fa-fw fa-question-circle"></i> Get help</a>
			        </p>
		        </div>
	        </div>
        </div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
<script type="application/javascript">
	var handler = StripeCheckout.configure({
		key: 'pk_test_ppqoAYxccH4fLRPQWmbD9Q9W',
		image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
		locale: 'auto',
		token: function(token) {
			// You can access the token ID with `token.id`.
			// Get the token ID to your server-side code for use.
			console.log('token', token);
		}
	});

	$('#button-submit').on('click', function(e) {
		// Open Checkout with further options:
		handler.open({
			name: 'Passbolt',
			image: 'https://raw.githubusercontent.com/passbolt/passbolt_styleguide/master/src/img/logo/icon-128.png',
			description: 'sponsorship',
			currency: 'eur',
			allowRememberMe: false,
			email: 'kevin@passbolt.com',
			amount: 2000
		});
		e.preventDefault();
	});

	// Close Checkout on page navigation:
	window.addEventListener('popstate', function() {
		handler.close();
	});

	$('#sponsorship-checkbox').change(function() {
		if(this.checked) {
			$('.sponsorship-options').show('blind');
		}
		else {
			$('.sponsorship-options').hide('blind');
		}
	});
</script>
</body>
</html>