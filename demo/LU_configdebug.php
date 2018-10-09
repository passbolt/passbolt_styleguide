<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin version alpha" lang="en">
<head>
	<meta charset="utf-8"/>
	<!--
			 ____                  __          ____
			/ __ \____  _____ ____/ /_  ____  / / /_
		   / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
		  / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
		 /_/    \__,_/____/____/_.___/\____/_/\__/

		 The password management solution
		 (c) 2018 Passbolt SARL

	-->
	<title>Passbolt config</title>
	<meta name="viewport" content="width=device-width">
    <?php if (!isset($base)) { $base = '../'; } ?>
    <base href="<?= $base; ?>">
	<link rel="stylesheet" media="all" href="src/css/themes/default/ext_config_debug.css"/>
</head>
<body>
<div id="container" class="config page debug plugin">
	<!-- header -->
	<header>
		<div class="header first ">
			<nav>
				<div class="top navigation primary">
					<!-- empty for now -->
				</div>
			</nav>
		</div>
	</header>

	<!-- second header -->
	<div class="header second">
		<div class="col1">
			<div class="logo">
				<img src="src/img/logo/logo.png" alt="passbolt">
				<h1><span>Passbolt</span></h1>
			</div>
		</div>
		<div class="col2_3">
			<h2>Welcome to the client configuration debug screen!</h2>
		</div>
	</div>

	<div class="panel main">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="selected">
						<a href="#useranddomainanchor">1. User and domain</a>
					</li>
					<li class="selected">
						<a href="#mykeysettingsanchor">2. My key settings</a>
					</li>
					<li class="selected">
						<a href="#serverkeysettingsanchor">3. Server public key</a>
					</li>
					<li class="selected">
						<a href="#localstorageanchor">4. Local storage</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle scroll">
			<div class="grid grid-responsive-12">
				<div class="row">
					<div class="col12">
						<h2>Browser plugin configuration</h2>
						<div class="message warning">
							<strong>Warning:</strong> This section allows you to view and change the settings of client, e.g. the passbolt browser extension.
							It is for development purposes only. It can break the integrity of your password and data.
							Use at your own risks!
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col6">
						<a name="useranddomainanchor"></a>
						<h3>User and domain</h3>
						<div class="input text">
							<label for="baseUrl">Domain</label>
							<input name="data[Config][BaseUrl]" class="fluid" id="baseUrl" type="text">
						</div>
						<div class="input text">
							<label for="UserUsername">Username</label>
							<input name="data[User][username]" class="fluid" id="UserUsername" type="text">
						</div>
						<div class="input text">
							<label for="ProfileFirstName">First Name</label>
							<input name="data[Profile][first_name]" class="fluid" id="ProfileFirstName" type="text">
						</div>
						<div class="input text">
							<label for="ProfileLastName">Last Name</label>
							<input name="data[Profile][last_name]" class="fluid" id="ProfileLastName" type="text">
						</div>
					</div>
					<div class="col6 last">
						<h3>Security Token</h3>
						<div class="input text">
							<label for="securityTokenCode">Token Code</label>
							<input name="data[Config][securityTokenCode]" id="securityTokenCode" required="required" type="text">
						</div>
						<div class="input text">
							<label for="securityTokenColor">Token Color</label>
							<input name="data[Config][securityTokenColor]" id="securityTokenColor" required="required" type="text">
						</div>
						<div class="input text">
							<label for="securityTokenTextColor">Token Text Color</label>
							<input name="data[Config][securityTokenTextColor]" id="securityTokenTextColor" required="required" type="text">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="submit-input-wrapper">
						<input value="save" id="js_save_conf" type="submit" class="button primary big"/>
					</div>
				</div>

				<!-- Key Settings -->
				<div class="row keysettings">
					<a name="keysettingsanchor"></a>
					<h2>Passbolt key settings</h2>
					<div class="col6">
						<h3>Add-on private key</h3>
						<div id="privkeyinfo">
							<div class="feedback"></div>
							<table class="table-info">
								<tr>
									<td>UID</td>
									<td class="uid"></td>
								</tr>
								<tr>
									<td>Fingerprint</td>
									<td class="fingerprint"></td>
								</tr>
								<tr>
									<td>Algorithm</td>
									<td class="algorithm"></td>
								</tr>
								<tr>
									<td>Created</td>
									<td class="created"></td>
								</tr>
								<tr>
									<td>Expires</td>
									<td class="expires"></td>
								</tr>
							</table>
						</div>
					</div>
					<div class="col6 last key-save">
						<h3>Set a new key</h3>
						<div class="input text required">
							<label for="KeyAscii">Paste your key here</label>
							<textarea id="keyAscii" class="code fluid"></textarea>
						</div>
						<div class="submit">
							<input type="button" value="browse" id="keyFilepicker" class="button">
							<input value="save" id="saveKey" type="submit"/>
						</div>
						<div class="key-import feedback"></div>
					</div>
				</div>
				<div class="row">
					<div class="col6">
						<h3>Add-on public key</h3>
						<div id="pubkeyinfo-plugin">
							<div class="feedback"></div>
							<table class="table-info">
								<tr>
									<td>UID</td>
									<td class="uid"></td>
								</tr>
								<tr>
									<td>Fingerprint</td>
									<td class="fingerprint"></td>
								</tr>
								<tr>
									<td>Algorithm</td>
									<td class="algorithm"></td>
								</tr>
								<tr>
									<td>Created</td>
									<td class="created"></td>
								</tr>
								<tr>
									<td>Expires</td>
									<td class="expires"></td>
								</tr>
							</table>
						</div>
					</div>
					<div class="col6 last">
						<h3>Server public key</h3>
						<div id="pubkeyinfo-server">
							<div class="feedback"></div>
							<table class="table-info">
								<tr>
									<td>UID</td>
									<td class="uid"></td>
								</tr>
								<tr>
									<td>Fingerprint</td>
									<td class="fingerprint"></td>
								</tr>
								<tr>
									<td>Algorithm</td>
									<td class="algorithm"></td>
								</tr>
								<tr>
									<td>Created</td>
									<td class="created"></td>
								</tr>
								<tr>
									<td>Expires</td>
									<td class="expires"></td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				<!-- Local storage -->
				<div class="row localstoragesettings">
					<div class="col12">
						<a name="localstorageanchor"></a>
						<h2>Browser plugin local storage</h2>
						<div class="message warning">
							<strong>Warning:</strong> This section allows you to view the variables stored by passbolt in the local storage.
							Your can flush them. It is for development purposes only. It can break the integrity of your password and data.
							Use at your own risks!
						</div>
						<div class="user settings feedback"></div>
					</div>
				</div>
				<div class="row">
					<div class="col12 last">
						<h3>Local storage</h3>

						<div class="json text">
							<pre id="localStorage">
{
  "extensionId": "passbolt-firefox-plugin@passbolt.com",
  "extensionBasePath": "resource://passbolt-firefox-addon-at-passbolt-dot-com",
  "baseUrl": "http://passbolt.com",
  "setupBootstrapRegex": "(.*)/setup/install/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12})/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12})",
  "debug": true,
  "user.id": "cd49eb9e-73a2-3433-a018-6ed993d421e8",
  "user.username": "ada@passbolt.com",
  "user.firstname": "Ada",
  "user.lastname": "Lovelace",
  "user.settings.securityToken.code": "CAC",
  "user.settings.securityToken.color": "#FF0000",
  "user.settings.securityToken.textColor": "#FFFFFF",
  "user.settings.trustedDomain": "http://192.168.99.100:8081"
}
							</pre>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="submit-input-wrapper">
						<input value="flush local storage" id="js_flush_conf" type="submit" class="button primary big"/>
					</div>
				</div>

			</div>
		</div>

	</div>


	<!-- footer -->
	<footer>
		<div class="footer">
			<span class="copyright">2015 &copy; Passbolt.com</span>
		</div>
	</footer>

</div>
</body>
</html>