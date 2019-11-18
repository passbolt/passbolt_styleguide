<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>

    <script src = "https://js.chargebee.com/v2/chargebee.js"  data-cb-site = "passbolt-test" > </script>

    <script src="src/js/rangeslider.min.js"></script>
    <script type="text/javascript">
        $(function() {
          var prevPos = 0,
            pricePerSeat = 2;

          var $slider = $('input[type="range"]'),
            $usersQty = $('#users-qty'),
            $productPrice = $('#product-price'),
            $checkoutLink = $('#checkout-link');

          function updateText(value) {
            if (value > 100) {
              value = (value - (value % 10));
            }
            $usersQty.text(value);
            $productPrice.text(value * pricePerSeat);
            $checkoutLink.attr('data-cb-plan-quantity', value);
          }

          $slider.rangeslider({
            polyfill: false,
            onSlide: function(position, value) {
              var direction = 1,
                step = $slider.attr('step');

              if (prevPos == position) {
                return;
              } else if (prevPos < position) {
                direction = 1;
              } else if (prevPos > position) {
                direction = 2;
              }
              prevPos = position;

              if (value >= 100 && direction == 1 && step == 5) {
                $slider.attr('step', 10);
                $slider.rangeslider('update', true);
              } else if (value <= 100 && direction == 2 && step == 10) {
                $slider.attr('step', 5);
                $slider.rangeslider('update', true);
              }

              updateText(value);
            }
          });
        });

        $("#checkout-link").click(function() {
          $checkout = $("#checkout-link");
          $.post(
            $checkout.attr('href'),
            {
              "subscription[plan_quantity]" : 10
            }
          );
          return false;

        });
    </script>
</head>
<body>
<div id="container" class="page featured plans">
    <?php include('includes/headers/AA_header.php'); ?>
    <ul class="pricing-tabs" role="tablist">
        <li class="active" role="presentation">
            <a aria-controls="self-hosted" data-toggle="tab" href="demo/AA_services_pricing_pro_slider.php" role="tab">
                <span><i class="fa fa-server" aria-hidden="true"></i></span>
                <div class="offer-text">
                    <h1>Passbolt PRO</h1>
                    <span>You host it</span>
                </div>

            </a>
        </li>
        <li role="presentation">
            <a aria-controls="cloud" data-toggle="tab" href="demo/AA_services_pricing_cloud.php" role="tab">
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
                        Self-host passbolt on your own server<br>
                        and keep full data ownership
                        <!--	                    <span class="outline">April special offer - early birds get <strong>30%</strong> off!</span>-->
                    </h2>
	            </div>
	        </div>
	    </div>

	    <div class="page-row service pull-up">
	        <div class="grid grid-responsive-12">
	            <div class="row">
		            <div class="service-col col4 plan community">
			            <div class="plan-description">
				            <h2>Community</h2>
			            </div>
			            <div class="row plan-pricing">
				            <div class="col12 cost cost-large align-center"> FREE </div>
			            </div>
                        <div class="billing-frequency">
                            Forever
                        </div>
			            <div class="plan-limit">
                            <span class="value">unlimited</span> <span>users</span>,<br><span>no strings attached.</span>
			            </div>
			            <div class="plan-actions">
				            <a href="demo/AA_services_pro_checkout.php" class="button primary big">Download</a>
			            </div>

			            <div class="plan-features">
                            <p>For the agile team beginning to transition from spreadsheets / keepass to password management practices.</p>
				            <ul>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Hosted on your own server</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Passwords management</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Users and groups management</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Granular passwords sharing</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Import / export (csv, xls, kdbx)</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> browser extensions & CLI</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Open API</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Installation scripts, docker container</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Community support <a href="https://community.passbolt.com">(Community forum)</a></li>
				            </ul>
			            </div>
			            <div class="second_cta">
				            <a href="#">See all features</a>
			            </div>
		            </div>
		            <div class="service-col col4 plan with-tab-options business highlighted">
			            <div class="ribbon"><span>POPULAR</span></div>
			            <div class="plan-description">
				            <h2>Business</h2>
			            </div>
                        <div class="pricing-toggle">
                            <ul>
                                <li class="monthly selected">
                                    <a data-term="yearly">Annual (-10%)</a>
                                </li>
                                <li class="yearly">
                                    <a data-term="monthly">Monthly</a>
                                </li>
                            </ul>
                        </div>
			            <div class="row plan-pricing">
                            <div class="col12 cost cost-large">
                                <span class="currency">€</span><span class="price" id="product-price">10</span>
                                <span class="frequency">/mo</span>
                            </div>
			            </div>
                        <div class="billing-frequency">
                            Billed annually
                        </div>
			            <div class="plan-limit">
                            <div class="users-quantity-selector">
                                <input type="range" min="5" max="200" step="5" value="5">
                            </div>
                            <div class="users-quantity-display">
                                <span class="value" id="users-qty">5</span> <span>users included</span>
                            </div>
			            </div>
			            <div class="plan-actions">
                            <a id="checkout-link" href="demo/AA_services_pro_checkout.php" class="button primary big" data-cb-plan-quantity = "10">Buy now</a>
			            </div>
			            <div class="plan-features">
                            <p>For teams & businesses that want to improve passwords collaboration while maintaining strict security standards.</p>
				            <ul>
                                <li><strong>All features from Community and:</strong></li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Tags management</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Ldap connectors</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> MFA</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Audit logs</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Dark theme</li>
					            <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> VM appliance</li>
                                <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Next business day support</li>
				            </ul>
			            </div>
			            <div class="second_cta">
				            <a href="#">See all features</a>
                        </div>
		            </div>
	                <div class="service-col col4 plan enterprise last">
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
                            <span>&nbsp;</span><br>
			                <span class="value">Unlimited</span> <span>users</span>
		                </div>
		                <div class="plan-actions">
			                <a href="mailto:sales@passbolt.com" class="button primary big">Contact us</a>
		                </div>
	                    <div class="plan-features">
                            <p>Engineered for the enterprise with sophisticated operations and advanced compliance requirements.</p>
		                    <ul>
			                    <ul>
                                    <li><strong>All features from Business and:</strong></li>
				                    <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> High availability</li>
				                    <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Disaster recovery</li>
                                    <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> On-premise management</li>
				                    <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Custom features development</li>
				                    <li><i class="fa fa-long-arrow-right" aria-hidden="true"></i> 4 hours SLA phone & email support</li>
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