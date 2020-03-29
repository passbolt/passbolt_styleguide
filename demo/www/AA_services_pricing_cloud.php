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
			<a aria-controls="self-hosted" data-toggle="tab" href="demo/AA_services_pricing_pro_slider.php" role="tab">
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
                    <div class="col2">&nbsp;</div>
		            <div class="service-col col4 plan business highlighted">
			            <div class="ribbon"><span>POPULAR</span></div>
			            <div class="plan-description">
				            <h2>Business</h2>
			            </div>
			            <div class="row plan-pricing">
                            <div class="col12 cost cost-large">
                                <span class="price"> €9 </span>
                                <span class="frequency"> /mo</span>
                            </div>
			            </div>
                        <div class="plan-limit">
                            <span>includes 3 users,</span><br><span>then </span> <span class="value">€3</span> <span>per user / mo.</span>
                        </div>
			            <div class="plan-actions">
				            <a href="demo/AA_services_pro_checkout.php" class="button primary big">Try 14 days for free</a>
			            </div>
			            <div class="plan-features">
                            <p>For agile teams & businesses that want to benefit from all the advantages of open source password management without the on-premise overhead.</p>
				            <ul>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Hosted on Passbolt servers, in Europe</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> <a href="features">Premium features</a></li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Data backup on demand</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Next business day email support</span></li>
				            </ul>
			            </div>
			            <div class="second_cta">
				            <a href="#">Get started</a>
			            </div>
		            </div>
	                <div class="service-col col4 plan enterprise last">
		                <div class="plan-description">
			                <h2>Enterprise</h2>
		                </div>
                        <div class="row plan-pricing">
                            <div class="col12 cost cost-large align-center">Get in touch</div>
                        </div>

		                <div class="plan-limit">
                            <span class="value">Tailor-made</span> <span>hosting</span>,<br><span>adapted to your needs.</span>
		                </div>
		                <div class="plan-actions">
			                <a href="mailto:sales@passbolt.com" class="button  big">Contact us</a>
		                </div>
	                    <div class="plan-features">
                            <p>Engineered for the enterprise with sophisticated needs and advanced compliance and security requirements.<br>&nbsp;</p>
                            <ul>
                                <li><strong>All features from Business and:</strong></li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Hosted on an isolated container</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Ldap connectors</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Custom domain</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Your own SSL certificate</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Custom firewall rules</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> 4 hours SLA email and phone support</span></li>
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
					<h2>Not sure which Cloud offer you need?<br> Compare our plans</h2>
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
								<td>" . displayRes($plans['business']) . "</td>
								<td>" . displayRes($plans['enterprise']) . "</td>
							</tr>";
						}
					?>
					<table>
						<?= compareRow('', [
							'business' => 'Business',
							'enterprise' => 'Enterprise',
						], 'plans-title');
						?>
						<?= compareRow('Pricing', ['business' => '', 'enterprise' => ''], 'head'); ?>
                        <?= compareRow('Pricing model', ['business' => 'per user. Pay as you go.', 'enterprise' => 'tailor made'], ''); ?>
						<?= compareRow('Price', ['business' => '€9 for 3 users, then €3 per additonal user', 'enterprise' => 'varies'], ''); ?>
						<?= compareRow('Frequency', ['business' => 'monthly / yearly', 'enterprise' => 'monthly / yearly'], ''); ?>

                        <?= compareRow('Hosting', ['business' => '', 'enterprise' => ''], 'head'); ?>
                        <?= compareRow('Type', ['business' => 'Multitenant', 'enterprise' => 'Isolated container'], ''); ?>
                        <?= compareRow('Data backup on demand', ['business' => true, 'enterprise' => true], ''); ?>
                        <?= compareRow('Custom domain', ['business' => false, 'enterprise' => true], ''); ?>
                        <?= compareRow('Custom SSL certificate', ['business' => false, 'enterprise' => true], ''); ?>
                        <?= compareRow('Custom firewall rules', ['business' => false, 'enterprise' => true], ''); ?>

						<?= compareRow('Support', ['business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Email support', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Phone support', ['business' => false, 'enterprise' => true], ''); ?>
						<?= compareRow('Slack support', ['business' => false, 'enterprise' => true], ''); ?>
						<?= compareRow('SLA', ['business' => 'Next business day', 'enterprise' => '4 hours (business days)'], ''); ?>

						<?= compareRow('Features', ['business' => '', 'enterprise' => ''], 'head'); ?>
						<?= compareRow('Passwords sharing', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Favorites', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Filters', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Search', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Comments', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Users management', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Groups management', ['business' => true, 'enterprise' => true], ''); ?>
                        <?= compareRow('Passwords activity', ['business' => true, 'enterprise' => true], ''); ?>

						<?= compareRow('Master passphrase auto-remember policy', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Import (kdbx, csv)', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Export (kdbx, csv)', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Tags management', ['business' => true, 'enterprise' => true], ''); ?>
						<?= compareRow('Dark theme', ['business' => true, 'enterprise' => true], ''); ?>
                        <?= compareRow('2FA', ['business' => true, 'enterprise' => true], ''); ?>
                        <?= compareRow('LDAP connector (AD, openldap, freeipa)', ['business' => false, 'enterprise' => true], ''); ?>

						<?= compareRow('',
							[
								'business' => '<a href="#" class="button primary">Try it for free</a>',
								'enterprise' => '<a href="#" class="button">Contact us</a>'
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
    <?php include('includes/footers/AA_footer.php'); ?>
</div>
</body>
</html>