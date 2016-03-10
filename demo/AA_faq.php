<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Frequently Asked Questions | Passbolt</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="../src/css/public.css">
	<script src="../src/js/jquery-2.1.3.min.js"></script>
	<script src="../src/js/bootstrap-scrollspy.js"></script>
	<script src="../src/js/list.min.js"></script>
	<script src="../src/js/list.fuzzysearch.min.js"></script>
</head>
<body id="faq-list">
<div id="container" class="page background">
	<!-- first header -->
	<?php include('includes/AA_header_prelaunch.php'); ?>

	<!-- second header -->
	<div class="header second">
		<div class="col1">
			<div class="logo no-img">
				<h1><span>Passbolt</span></h1>
			</div>
		</div>
		<div class="col2 search-wrapper">
			<h2 class="visuallyhidden"><span>Frequently Asked questions</span></h2>
			<!-- if js is enabled only -->
			<div>
				<form class="search ready">
					<div class="input required">
						<label for="filter_faq">Search</label>
						<input id="filter_faq" maxlength="50" placeholder="search frequently asked questions" type="search" class="fuzzy-search">
					</div>
					<button value="search">
						<i class="fa fa-fw fa-search"></i>
						<span class="text visuallyhidden">search</span>
					</button>
				</form>
			</div>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard scrollspy" role="navigation">
				<ul class="nav">
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
				<article class="faq">
					<ul class="list">
					<li>
					<div class="row">
						<div class="col7">
							<div>
								<h2 id="introduction">Frequently Asked Questions</h2>
								<h3 class="question">What is passbolt?</h3>
								<div class="answer">
								<p>
									Passbolt is a password manager that allows people to securely share and store credentials. For instance, the wifi password of your office, or the administrator password of a router, or your organisation social media account password, can be secured using Passbolt.
								</p>
								</div>
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
							<div>
								<h3 class="question">Why does my organisation need a password manager?</h3>
								<div class="answer">
								<p>
									A password manager allows you to comfortably implement best security practices and therefore reduces risks for you and your organisation.
								</p><p>
									With a password manager you can prevent your team from reusing the same password on multiple systems. You can also make sure they generate stronger passwords by default, since they do not have to remember them anymore. It also makes it easier to rotate credentials, e.g. help you change your passwords regularly,  every 40 days for example.
								</p><p>
									Additionally, having an overview of who has access to what, allows you to reset passwords when somebody leaves your organisation. Reciprocally it can also help facilitate when someone is joining your team, since a new member can easily be given access to the all the password they need. It also prevents loss of credentials since you can perform backups.
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
								<h2 id="licencing">Licencing</h2>
								<h3 class="question">Can I review, modify and share passbolt source code?</h3>
								<div class="answer">
								<p>
									Absolutely. The entire passbolt solution is composed of a free software. Our source code is made available in such a way that all of our users have the rights to :
								</p>
								<ul>
									<li>Use the software for any purpose,</li>
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
							<div>
								<h3 class="question">Can I commercially host and distribute passbolt?</h3>
								<div class="answer">
								<p>
									If you abide by the licence terms, absolutely!
								</p>
								<p>
									Our goal in selecting the AGPL v3.0, as our default license is to require that enhancements are released back to the community. Traditional open source licences such as GPL often do not achieve this when the software is runs as a web application, e.g. as hosted application available through a network.
								</p>
								<p>
									If the AGPL v3 does not satisfy your organisation, commercial licenses are available. Feel free to contact us for more details.
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

<script>
	$(function() {
		var faqlist = new List('faq-list', {
			valueNames: ['question', 'answer'],
			plugins: [ ListFuzzySearch() ]
		});
	});
</script>
</body>
</html>