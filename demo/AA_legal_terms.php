<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Passbolt - Privacy Policy</title>
	<?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
</head>
<body>
<div id="container" class="page background">
	<!-- first header -->
	<?php include('includes/headers/AA_header.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>TL;DR: We respect your privacy!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation-help">
                <h2>Section title</h2>
				<ul>
                    <li>
						<a href="demo/AA_legal_terms.php" >Privacy</a>
					</li>
					<li class="selected">
						<a href="demo/AA_legal_terms.php" >Terms</a>
                        <ul>
                            <li><a href="#">Website terms</a></li>
                            <li><a href="#">Pro edition terms</a></li>
                            <li><a href="#">Cloud offer terms</a></li>
                        </ul>
					</li>
					<li>
						<a href="demo/AA_about_credits.php" >Credits</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
			<article>
				<div class="row">
					<div class="col12">
						<?php $_GET['breadcrumbs'] = array(
								'home' => '/',
								'legal' => '/legal',
								'terms of service' => '/terms'
						);
						include('includes/LU_breadcrumbs.php'); ?>
					</div>
				</div>
				<div class="row">
					<div class="col7">
						<div>
							<h2>Terms of Service</h2>
							<p>
								This website, www.passbolt.com and its subdomains (collectively referred to as the "Site" in these Terms of Service)
								is owned and operated by Passbolt SARL ("we", "us" or "Passbolt"). By using and accessing our Site,
								you ("you", "user" or, "end user") agree to these Terms of Service (collectively, the "Terms of Service", “Terms and
								conditions” or "Agreement").
							</p><p>
								IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, IMMEDIATELY STOP ACCESSING THIS SITE.
							</p>
						</div>
						<div>
							<h3>Intellectual Property</h3>
							<p>
								You acknowledge and agree that all content and information on the Site is protected by proprietary rights and laws.
							<p></p>
							Unless otherwise noted, we own the intellectual property rights in the website and material on the website. Subject to
							the licenses below, all our intellectual property rights are reserved.
							</p>
						</div>
					</div>
					<div class="col5 last">
						<div class="tldr">
							<p>Do you have a question about our terms of service? Get in touch!</p>
							<a href="mailto:contact@passbolt.com" class="button primary">contact us</a>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col7">
						<div>
							<h3>Licences</h3>
							<p>
								Unless otherwise noted, all Passbolt software presented on the Site (including but not limited to Passbolt application
								and browser extensions, testing and deployment tools, etc.) is available under Free Software Foundation's
								<a href="http://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL v3.0</a>.
							</p>
							<p>
								Unless otherwise noted, the Site content (including but not limited to articles, blog entry, technical documentation,
								diagrams and illustrations, etc.) are licensed under
								<a href="creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">Creative Commons BY NC SA 3.0 License</a>.
								This license lets others remix, tweak, and build upon our work non-commercially, as long as they credit us and license
								their new creations under identical terms.
							</p>
							<p>
								Commercial licenses are also available from Passbolt SARL on request.
							</p>
						</div>
					</div>
					<div class="col5 last">
						<div class="tldr">
							<h4 class="visuallyhidden">Licence Summary</h4>
							<p>
								<i class="fa fa-thumbs-o-up"></i> Free Software license for code
							</p>
							<p>
								<i class="fa fa-thumbs-o-up"></i> Creative Common licence for content
							</p>
						</div>
					</div>
					<div class="row">
						<div class="col7">
							<div>
								<h3>Date of Last Update</h3>
								<p>
									This agreement was last updated on February 4th, 2016.
								</p>
							</div>
						</div>
					</div>
			</article>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>