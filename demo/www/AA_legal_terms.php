<?php include('includes/bootstrap.php'); ?><!doctype html>
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
		<?php include('includes/headers/AA_logo.php'); ?>
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
								'Home' => '/',
								'Legal' => '/legal',
								'Terms of service' => '/terms'
						);
						include('includes/AA_breadcrumbs.php'); ?>
					</div>
				</div>
				<div class="row">
					<div class="col7">
						<div>
							<h2>Terms of Service</h2>
							<p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis iaculis purus,
                                sed suscipit sapien. Integer gravida tempus odio, id accumsan erat semper in.
                                Suspendisse ut congue nisi, a blandit neque. Pellentesque ut posuere nisi. Duis
                                maximus ligula ut dignissim eleifend. Phasellus sed diam rhoncus, luctus neque ut,
                                ultricies odio. Vivamus sed auctor velit, et scelerisque dui. Vestibulum pretium
                                lacus ac blandit fermentum. Donec hendrerit commodo leo, non laoreet turpis porta
                                d. Sed vel ullamcorper ex.
                            </p>
						</div>
						<div>
							<h3>Intellectual Property</h3>
							<p>
                                Aenean dapibus, ante et ultrices consectetur, massa massa condimentum purus, ut
                                bibendum felis turpis in purus. Sed eu facilisis ipsum, vel consectetur nisl.
                                Suspendisse sodales lorem sed libero commodo dapibus. Aliquam erat volutpat.
                                Aliquam vitae finibus libero, quis fringilla eros. Nam sed velit libero. Aliquam
                                erat volutpat. Cras maximus, urna in pellentesque dignissim, tellus nibh porttitor
                                lacus, a consectetur enim nibh at elit. Phasellus dui metus, rhoncus vel suscipit
                                quis, vestibulum id sapien. Maecenas orci orci, rhoncus at arcu at, finibus
                                pulvinar mi. Aenean sed purus interdum, euismod nisl id, semper sapien.
                                Etiam tristique vitae metus sed pretium. Pellentesque ultricies, justo quis
                                accumsan efficitur, mauris arcu tristique purus, eu maximus tellus justo eu
                                felis. In eu mollis sem, tempor finibus est. Vivamus posuere malesuada neque,
                                nec molestie lacus viverra in. Donec facilisis lacinia tellus eu tempus.
                            </p>
						</div>
					</div>
					<div class="col5 last">
						<div class="tldr">
							<p>Do you have a question about our terms of service? Get in touch!</p>
							<a href="mailto:contact@passbolt.com" class="button primary">Contact us</a>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col7">
						<div>
							<h3>Licences</h3>
                            <p>
                                Sed at facilisis risus. Curabitur nec ante lectus. In finibus mollis arcu ac
                                malesuada. Nulla velit ligula, efficitur ac ultricies in, accumsan nec leo.
                                Nullam semper faucibus egestas. Praesent nec eleifend libero, id lacinia sem. V
                                ivamus quis ullamcorper ipsum. Vestibulum laoreet lectus magna. Vestibulum
                                ultricies nisi suscipit, viverra turpis vel, iaculis orci. Aenean non maximus
                                nisl. Vestibulum a bibendum enim. Nam eleifend rutrum finibus. Nulla pulvinar,
                                ex sed pellentesque scelerisque, dui urna posuere nisl, id accumsan risus felis
                                et purus. Praesent non diam venenatis, pretium libero fringilla, dapibus nulla.
                                Duis sed ligula elit. Sed volutpat, mi vel pellentesque dapibus, mauris augue
                                suscipit mauris, eget vulputate ante nisi id turpis.
                            </p>
						</div>
					</div>
					<div class="col5 last">
						<div class="tldr">
							<h4 class="visuallyhidden">Licence Summary</h4>
							<p>
								<i class="fa fa-thumbs-o-up"></i> Nice stuffs
							</p>
							<p>
								<i class="fa fa-thumbs-o-up"></i> Really gud
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
	<?php include('includes/footers/AA_footer.php'); ?>
</div>
</body>
</html>