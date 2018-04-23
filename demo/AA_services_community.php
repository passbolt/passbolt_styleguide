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
<div id="container" class="page services community featured">
    <?php include('includes/headers/AA_header.php'); ?>

	<div class="page-row intro">
		<div class="grid grid-responsive-12">
			<div class="row">
				<div class="col12">
					<h1>Community Edition</h1>
					<p>
						Install and run passbolt on your own server
					</p>
				</div>
			</div>
		</div>
	</div>
    <div class="page-row service-details">
        <div class="grid grid-responsive-12">

	        <div class="row">
		        <ul class="features clearfix">
			        <li class="col3">
				        <i class="fa fa-fw fa-check"></i><div>Access to passbolt source code</div>
			        </li>
			        <li class="col3">
				        <i class="fa fa-fw fa-check"></i><div>Free forever, updates included</div>
			        </li>
			        <li class="col3">
				        <i class="fa fa-fw fa-check"></i><div>Keep full data ownership</div>
			        </li>
			        <li class="col3 last">
				        <i class="fa fa-fw fa-check"></i><div>Join the vibrant community</div>
			        </li>
		        </ul>
	        </div>

	        <div class="row">
		        <div class="col12 presentation">
			        <div class="col8 registration-form">
				        <div class="registration form">
					        <form action="/" id="RegistrationsPrelaunchForm" method="post" accept-charset="utf-8">
						        <div style="display:none;"><input name="_method" value="POST" type="hidden"></div>
						        <div class="name input required">
							        <label for="RegistrationName">Full name</label>
							        <input name="data[Registration][name]" class="required fluid" placeholder="your name" id="RegistrationName" required="required" type="text">
						        </div>
						        <div class="email input required">
							        <label for="RegistrationEmail">Email</label>
							        <input name="data[Registration][email]" class="required fluid" placeholder="your email" id="RegistrationEmail" required="required" type="email">
						            <em><a href="/help/privacy">We respect your privacy</a></em>
						        </div>
						        <div class="sponsorship input select">
							        <label for="RegistrationSponsorship">Sponsorship</label>
							        <input type="checkbox" name="becomeSponsor" id="sponsorship-checkbox" checked="checked"> Yes, I want to help make passbolt better
							        <div class="sponsorship-options">
										<ul>
											<li>
												<input type="radio" name="data[Registration][sponsorship]" id="sponsor-10" value="10">
												<label class="label-for-check" for="sponsor-10">10€</label>
											</li>
											<li>
												<input type="radio" name="data[Registration][sponsorship]" id="sponsor-25" value="25" checked="checked">
												<label class="label-for-check" for="sponsor-25">25€</label>
											</li>
											<li>
												<input type="radio" name="data[Registration][sponsorship]" id="sponsor-50" value="50">
												<label class="label-for-check" for="sponsor-50">50€</label>
											</li>
											<li>
												<input type="radio" name="data[Registration][sponsorship]" id="sponsor-100" value="100">
												<label class="label-for-check" for="sponsor-100">100€</label>
											</li>
										</ul>
							        </div>
							        <em>by sponsoring passbolt, you contribute to help us maintain high quality standards and become part of our vibrant community.</em>
						        </div>

						        <div class="submit">
							        <input class="button primary big" id="button-submit" value="Continue" type="submit">
							        <a href="../demo/AA_services_community_download.php">Skip, and go directly to installation instructions</a>
						        </div>
					        </form>
				        </div>
			        </div>
			        <div class="col4 last sponsorhip-details">
				        <h3>Sponsorship benefits</h3>
				        <p>By becoming a sponsor of passbolt, you don't only help us develop an awesome and sustainable password manager, you
				        also get some advantages:</p>
				        <ul class="fa-ul">
					        <li><i class="fa fa-li fa-star"></i><strong>Get the right to vote</strong> for the next upcoming feature</li>
					        <li><i class="fa fa-li fa-star"></i><strong>Get to test beta features</strong> in priority</li>
					        <li><i class="fa fa-li fa-star"></i><strong>Get updated</strong> about what's happening behind the scene</li>
				        </ul>
					</div>
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