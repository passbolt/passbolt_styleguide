<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Frequently Asked Questions | Passbolt</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="../src/css/help.css">
	<script src="../src/js/jquery-2.2.4.min.js"></script>
	<script src="../src/js/bootstrap-scrollspy.js"></script>
	<script src="../src/js/imagelightbox.min.js"></script>
	<script src="../src/js/greedynav.js"></script>
</head>
<body id="faq-list">
<div id="container" class="page background">
	<!-- first header -->
	<?php include('includes/headers/AA_header.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<?php include('includes/AA_search.php'); ?>
	</div>

	<div class="panel main">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard scrollspy" role="navigation">
				<ul class="nav">
					<li>
						<h2><a href="#">FAQ sections</a></h2>
					</li>
					<li>
						<a href="#introduction">Introduction</a>
					</li>
					<li>
						<a href="#roadmap">Features & Roadmap</a>
					</li>
					<li>
						<a href="#licencing">Licencing</a>
					</li>
					<li>
						<a href="#security">Security</a>
					</li>
					<li>
						<a href="#services">Services</a>
					</li>
					<li>
						<a href="#support">Help & Support</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle" data-spy="scroll" data-target=".scrollspy">
			<div class="grid grid-responsive-12">
				<span id="introduction"></span>
				<?php $_GET['breadcrumbs'] = array(
						'home' => 'AA_home.php',
						'help' => 'AA_help.php',
						'faq' => 'AA_faq.php'
				);
				include('includes/LU_breadcrumbs.php'); ?>
				<article class="faq">
					<ul class="list">
					<li>
					<div class="row">
						<div class="col7">
							<h2>Frequently Asked Questions</h2>
							<h3 class="question">What is passbolt?</h3>
							<video controls>
								<source src="../src/video/an_install_plugin_firefox_864.mp4" type="video/mp4" />
							</video>
							<div class="answer">
								<p>
									Passbolt is a password manager that allows people to securely share and store credentials. For instance, the wifi password of your office, or the administrator password of a router, or your organisation social media account password, can be secured using Passbolt.
								</p>
							</div>
						</div>
						<div class="col5 last">
							<div class="tldr">
								<p>Do you have a question that is not in this list? Get in touch!</p>
								<a href="mailto:contact@passbolt.com" class="button primary">contact us</a>
							</div>
						</div>
					</div>
					</li>
					<li>
						<div class="row">
							<div class="col7">
								<h3 class="question">What functionalities do you support?</h3>
								<div class="answer">
									<img src="../src/img/diagrams/howitworks.svg" alt="How it works">
									<p>
										Here is an overview of the key functionality of Passbolt at present (in blue), and
										what we have in mind for the future (in white). Click on the picture to enlarge.
									</p>
									<figure>
										<a href="../src/img/diagrams/functional_overview.png" class="lightbox">
											<img alt="Passbolt Functional Overview" src="../src/img/diagrams/functional_overview.png"/>
										</a>
									</figure>
								</div>
							</div>
						</div>
					</li>
					<li>
					<div class="row">
						<div class="col7">
							<div>
								<h2 id="licencing">Licencing</h2>
								<h3 class="question">Can I review, modify and share passbolt source code?</h3>
								<div class="answer">
								<p>
									Absolutely. The entire passbolt solution is composed of a free software. Our source code is made available in such a way that all of our users have the rights to :
								</p>
								<ul>
									<li>Use the software for <a href="#">any purpose</a>,</li>
									<li>Change the software to suit their needs,</li>
									<li>Share the software with their friends and neighbors,</li>
									<li>Distribute the software and the changes they make.</li>
								</ul>
								<p>
									You can learn more about free software on the <a href="#">free software foundation website</a>.
								</p>
								</div>
							</div>
						</div>
						<div class="col5 last"></div>
					</div>
					</li>
					<li>
						<div class="row">
							<div class="col7">
								<h3 class="question">What is a "security token" and why is it important?</h3>
								<div class="answer">
									<p>
										This token is used to prevent malicious web pages to trick you by mimicking
										passbolt dialogs in order to to steal your data, e.g. to protect your from
										phishing attacks.
									</p>
									<figure>
										<img src="../src/img/screenshots/LU_security_token.png" src="example of a security token"
											 style="max-width:450px;">
										<span class="legend">fig. example of security token</span>
									</figure>
									<p>
										This cue will be shown whenever we ask you for your passphrase and
										other sensitive places to help make sure you are dealing with an authentic
										passbolt dialog and not a fake one!
									</p>
								</div>
							</div>
							<div class="col5 last"></div>
						</div>
					</li>
					<li>
					<div class="row">
						<div class="col7">
							<div>
								<h3 class="question">Can I commercially host and distribute passbolt?</h3>
								<div class="answer">
								<p>
									If you abide by the licence terms, absolutely!
								</p>
								<p>
									Our goal in selecting the AGPL v3.0, as our default license is to require that enhancements are released back to the community. Traditional open source licences such as GPL often do not achieve this when the software is runs as a web application, e.g. as hosted application available through a network.
								</p>
								</div>
							</div>
						</div>
						<div class="col5 last"></div>
					</div>
					</li>
					<li>
					<div class="row">
						<div class="col7">
							<div>
								<h2 id="services">Services</h2>
								<h3 class="question">Bla bla bla?</h3>
								<div class="answer">
								<p>
									Phasellus placerat venenatis ante, non mollis ipsum rutrum id. Maecenas vitae placerat mauris. Nunc at velit quis eros accumsan rhoncus. Nam ac erat accumsan, ultricies mauris a, pulvinar ipsum. Ut tincidunt lobortis ullamcorper. Mauris rutrum mauris sed condimentum finibus. Integer efficitur est eget ante gravida, in accumsan tellus eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam dapibus molestie efficitur. Sed accumsan semper sem, nec varius nisi iaculis vel. Nulla et lectus fermentum nisi mollis malesuada at in risus. Nunc quis ipsum leo. Integer eleifend accumsan dolor quis mattis. Morbi at neque quis magna lobortis auctor. Quisque tempus, est at consequat feugiat, urna tortor pretium libero, vel dapibus felis elit eu diam. Etiam nec vestibulum dui.
								</p>
								</div>
							</div>
						</div>
						<div class="col5 last"></div>
					</div>
					</li>
					<li>
						<div class="row">
						<div class="col7">
							<div>
								<h3 class="question">Also blah?</h3>
								<div class="answer">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue tristique eros, id molestie dolor bibendum at. Phasellus a ultricies turpis. Proin vitae tristique metus. In efficitur ex sit amet enim convallis scelerisque. Nam et elit convallis, feugiat purus nec, convallis ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sapien odio, dapibus ut tincidunt nec, dictum in diam. Vestibulum id leo aliquet, laoreet risus sed, ullamcorper arcu. Donec vitae dapibus lacus, vel porttitor lectus. Phasellus vel erat augue. Cras accumsan est in ante tempor condimentum. Duis et massa eu lorem luctus auctor non quis nisi. Donec dignissim accumsan varius. Morbi quis nibh justo. Praesent feugiat accumsan enim, nec interdum lectus fringilla at. Mauris nec risus aliquet, tempus justo nec, tempor augue
								</p>
								</div>
							</div>
						</div>
						<div class="col5 last"></div>
					</div>
					</li>
					</ul>
				</article>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>