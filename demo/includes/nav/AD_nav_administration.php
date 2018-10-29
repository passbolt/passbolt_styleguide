<?php
	if(!isset($_GET['shortcuts'])) {
		$_GET['shortcuts'] = 'profile';
	}
	function isselected($i) {
		if ($i == $_GET['shortcuts'])
			return 'selected';
	}
?>

<div class="navigation first" >
	<ul class="ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Users Directory Settings"><span>Dashboard</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>

<div class="navigation accordion" >
	<ul class="accordion-header">
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3><a href="#" title="Access Management">Access Management</a></h3>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<ul class="accordion-content ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Access control list"><span>Access control list</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_ldap_configuration.php" title="Users Directory Settings"><span>Users directory</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>

<div class="navigation accordion" >
	<ul class="accordion-header">
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3><a href="#" title="Access Management">Application</a></h3>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<ul class="accordion-content ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Email notifications"><span>Import / Export</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Email notifications"><span>Groups</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>


<div class="navigation accordion" >
	<ul class="accordion-header">
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3><a href="#" title="Access Management">Notification</a></h3>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<ul class="accordion-content ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Alert notifications"><span>Alerts</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Email notifications"><span>Email</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Slack notifications"><span>Slack</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>

<div class="navigation accordion" >
	<ul class="accordion-header">
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3><a href="#" title="Security">Security</a></h3>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<ul class="accordion-content ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Users Directory Settings"><span>Audit log</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_mfa_configuration.php" title="Users Directory Settings"><span>Multi factor authentication</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="#" title="Users Directory Settings"><span>Password rotation</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>

<div class="navigation accordion" >
	<ul class="accordion-header">
		<li class="open node root">
			<div class="row title">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<h3><a href="#" title="Access Management">Reports</a></h3>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<ul class="accordion-content ready">
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_ldap_configuration.php" title="Users Directory Settings"><span>Passwords</span></a>
					</div>
				</div>
			</div>
		</li>
		<li class="open node root">
			<div class="row">
				<div class="main-cell-wrapper">
					<div class="main-cell">
						<a href="demo/AD_admin_ldap_configuration.php" title="Users Directory Settings"><span>Users directory</span></a>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>