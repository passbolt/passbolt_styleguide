<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Create a new key or <a href="demo/AN_setup2b0_importkey.php" class="button primary">import</a> an existing one</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="">
						<a href="demo/AN_setup1a0_plugincheckfail.php">1. Get the plugin</a>
					</li>
					<li class="selected">
						<a href="demo/AN_setup2a0_createnewkey.php">2. Define your keys</a>
					</li>
					<li class="disabled">
						3. Set a passphrase
					</li>
					<li class="disabled">
						4. Set a security token
					</li>
					<li class="disabled">
						5. Login!
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
				<form>
					<div class="row">
						<!-- left column -->
						<div class="col6">
							<h3>Create a new key</h3>
							<div class="input text required">
								<label for="OwnerName">Owner Name</label>
								<input name="data[Owner][name]" class="required fluid" id="OwnerName" required="required" type="text" value="Mr. test">
							</div>
							<div class="input text required disabled">
								<label for="OwnerEmail">Owner Email</label>
								<input name="data[Owner][email]" class="required fluid" id="OwnerEmail" required="required" type="text" disabled="disabled" value="test@passbolt.com">
							</div>
							<div class="input text">
								<label for="KeyComment">Comment</label>
								<input name="data[Key][comment]" class="required fluid" id="KeyComment" required="required" type="text" placeholder="add a comment (optional)">
							</div>
							<div class="input file image ">
								<label for="UserAvatar">Avatar </label>
								<div class="image-wrapper avatar">
									<img src="src/img//avatar/user.png" alt="avatar preview"/>
								</div>
								<div class="input-wrapper">
									<div class="input-wrapper-2">
										<p class="helptext">Upload a .jpg or .png that is less than 500ko.</p>
										<input name="data[User][avatar]" value="" id="UserAvatar" type="file">
									</div>
								</div>
							</div>
						</div>

						<!-- right column -->
						<div class="col4 last">
							<h3>Advanced settings</h3>
							<div class="input select required">
								<label for="KeyType">Key Type</label>
								<select name="data[Key][type]" id="KeyType" disabled="disabled" class="fluid">
									<option value="RSA-DSA" selected="selected">RSA and DSA (default)</option>
									<option value="DSA-EL" >DSA and Elgamal</option>
								</select>
							</div>
							<div class="input select required">
								<label for="KeyLength">Key Length</label>
								<select name="data[Key][length]" id="KeyLength" disabled="disabled" class="fluid">
									<option value="1024" >1024</option>
									<option value="2048" selected="selected">2048</option>
									<option value="3076" >3076</option>
								</select>
							</div>

							<div class="input date">
								<label for="KeyExpire">Key Expire</label>
								<input name="data[Key][expire]" class="required fluid" id="KeyExpire" disabled="disabled" required="required" type="text" placeholder="dd/mm/yyyy">
								<span class="input-addon"><i class="fa fa-calendar fa-fw"></i></span>
							</div>

						</div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="demo/AN_setup1a1_plugincheckok.php" class="button cancel big">cancel</a>
							<a href="demo/AN_setup3a0_setmasterpassword.php" class="button primary next big">next</a>
						</div>
					</div>

				</form>

			</div>
		</div>

	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>