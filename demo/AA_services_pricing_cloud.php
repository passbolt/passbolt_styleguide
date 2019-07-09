<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
	<script src="src/js/rangeslider.min.js"></script>
</head>
<body>
<div id="container" class="page featured plans cloud">
    <?php include('includes/headers/AA_header.php'); ?>
	<ul class="pricing-tabs" role="tablist">
		<li role="presentation">
			<a aria-controls="self-hosted" data-toggle="tab" href="demo/AA_services_pricing.php" role="tab">
				<span><i class="fa fa-server" aria-hidden="true"></i></span>
                <div class="offer-text">
                    <h1>Passbolt PRO</h1>
                    <span>You host it</span>
                </div>

			</a>
		</li>
		<li class="active" role="presentation">
			<a aria-controls="cloud" data-toggle="tab" href="demo/AA_services_cloud.php" role="tab">
				<span><i class="fa fa-cloud" aria-hidden="true"></i></span>
                <div class="offer-text">
                    <h1>Passbolt Cloud</h1>
                    <span>We host it</span>
                </div>
			</a>
		</li>
	</ul>
	<div class="tab-content clearfix">
	    <div class="page-row intro">
	        <div class="grid grid-responsive-12">
	            <div class="row">
                    <h2>
                        Skip the technical setup and get passbolt in our cloud <br>while keeping full data ownership
                    </h2>
	            </div>
	        </div>
	    </div>

	    <div class="page-row service pull-up">
	        <div class="grid grid-responsive-12">
	            <div class="row">
                    <div class="col1">&nbsp;</div>
		            <div class="service-col col5 plan business highlighted">
			            <div class="ribbon"><span>POPULAR</span></div>
			            <div class="plan-description">
				            <h2>Business</h2>
			            </div>
			            <div class="row plan-pricing">
                            <div class="col12 cost cost-large">
                                <span class="price"> €3 </span>
                                <span class="frequency">/user /mo</span>
                            </div>
			            </div>
                        <div class="billing-frequency">
                            Paid Monthly
                        </div>
                        <div class="plan-limit">
                            <span class="value">Pay as you go</span>,<br><span>starts from 3 users.</span>
                        </div>
			            <div class="plan-actions">
				            <a href="demo/AA_services_pro_checkout.php" class="button primary big">Try 14 days for free</a>
			            </div>
			            <div class="plan-features">
				            <ul>
					            <li>Hosted on our servers</li>
					            <li><a href="features">Premium features</a></li>
					            <li>Data backup on demand</li>
					            <li>Unlimited email support<br><span class="smaller">(next business day)</span></li>
				            </ul>
			            </div>
			            <div class="second_cta">
				            <a href="#">Try a demo</a>
			            </div>
		            </div>
	                <div class="service-col col5 plan enterprise last">
		                <div class="plan-description">
			                <h2>Enterprise</h2>
		                </div>
                        <div class="row plan-pricing">
                            <div class="col12 cost cost-large align-center">Get in touch</div>
                        </div>
                        <div class="billing-frequency">
                            for a custom quote
                        </div>

		                <div class="plan-limit">
                            <span class="value">Tailor-made</span> <span>hosting</span>,<br><span>adapted to your needs.</span>
		                </div>
		                <div class="plan-actions">
			                <a href="mailto:sales@passbolt.com" class="button  big">Contact us</a>
		                </div>
	                    <div class="plan-features">
		                    <ul>
			                    <ul>
                                    <li>Hosted on a dedicated instance</li>
                                    <li><a href="features">Premium features</a></li>
                                    <li>Data backup on demand</li>
                                    <li>Custom domain</li>
                                    <li>Custom SSL certificate</li>
                                    <li>Custom firewalling</li>
                                    <li>Email and phone support<br><span class="smaller">(4 hours SLA)</span></li>
			                    </ul>
		                    </ul>
	                    </div>
		                <div class="second_cta">
			                <a href="#">Get a quote</a>
		                </div>
	                </div>
	            </div>
	        </div>
	    </div>
		<div class="page-row compare">
			<div class="grid grid-responsive-12">
				<div class="col12">
					<h2>Not sure which one to choose?<br> Compare our plans</h2>
					<?php
						function  displayRes($plan) {
							if(is_bool($plan)) {
								return ($plan === true ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : "–");
							}
							else {
								return $plan;
							}
						}

						function compareRow($title, $plans, $trClass) {
							return "<tr class=\"$trClass\">
								<td>$title</td>
								<td>" . displayRes($plans['ce']) . "</td>
								<td>" . displayRes($plans['startup']) . "</td>
								<td>" . displayRes($plans['business']) . "</td>
								<td>" . displayRes($plans['enterprise']) ."</td>
							</tr>";
						}
					?>
					<table>
						<?= compareRow('', [
							'ce' => 'Community',
							'startup' => 'Startup',
							'business' => 'Business',
							'enterprise' => 'Enterprise'
						], 'plans-title');
						?>
						<?= compareRow('Pricing', ['ce' => '', 'startup' => '', 'business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Users limit', ['ce' => 'Unlimited', 'startup' => '5', 'business' => '100', 'enterprise' => 'Unlimited'], ''); ?>
						<?= compareRow('Instances limit', ['ce' => 'Unlimited', 'startup' => '1', 'business' => '1', 'enterprise' => 'Unlimited'], ''); ?>
						<?= compareRow('License type', ['ce' => 'AGPL V3', 'startup' => 'AGPL V3', 'business' => 'AGPL V3', 'enterprise' => 'AGPL V3'], ''); ?>
						<?= compareRow('License validity', ['ce' => 'Perpetual', 'startup' => 'Perpetual', 'business' => 'Perpetual', 'enterprise' => 'Perpetual'], ''); ?>
						<?= compareRow('Free updates', ['ce' => 'Forever', 'startup' => 'One year', 'business' => 'One year', 'enterprise' => 'One year'], ''); ?>

						<?= compareRow('Support', ['ce' => '', 'startup' => '', 'business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Community support', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Email support', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Phone support', ['ce' => false, 'startup' => false, 'business' => false, 'enterprise' => true], ''); ?>
						<?= compareRow('Slack support', ['ce' => false, 'startup' => false, 'business' => false, 'enterprise' => true], ''); ?>
						<?= compareRow('SLA', ['ce' => false, 'startup' => 'Next business day', 'business' => 'Next business day', 'enterprise' => '4 hours (business hours)'], ''); ?>

						<?= compareRow('Installation', ['ce' => '', 'startup' => '', 'business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Online documentation', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Docker container', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Virtual Machine', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Installation scripts (debian, centos)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Distro package (coming soon)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Web installer', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>

						<?= compareRow('Community features', ['ce' => '', 'startup' => '', 'business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Password sharing', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Favorites', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Filter', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Search', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Comments', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Users management', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Groups management', ['ce' => true, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>

						<?= compareRow('Premium features', ['ce' => '', 'startup' => '', 'business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Master passphrase auto-remember policy', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Import (kdbx, csv)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Export (kdbx, csv)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Tags management', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Dark theme', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Folders (coming soon)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('LDAP (coming soon)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Audit logs (coming soon)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Encrypted files (coming soon)', ['ce' => false, 'startup' => true, 'business' => true, 'enterprise' => true], ''); ?>

						<?= compareRow('',
							[
								'ce' => '<a href="#" class="button primary">Download it</a>',
								'startup' => '<a href="#" class="button primary">Buy now</a>',
								'business' => '<a href="#" class="button primary">Buy now</a>',
								'enterprise' => '<a href="#" class="button primary">Contact us</a>'
							],
							'clear'); ?>
					</table>
				</div>
			</div>
		</div>
		<div class="page-row faq">
			<div class="grid grid-responsive-12">
				<h2>Frequently Asked questions</h2>
				<div class="row">
					<div class="col6">
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
					</div>
					<div class="col6 last">
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
						<h3>Question 1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur</p>
					</div>
				</div>
			</div>
		</div>

	</div>
    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>