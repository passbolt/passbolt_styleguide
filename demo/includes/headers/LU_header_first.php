<!-- top navigation -->
<div class="header first">
<script type="application/javascript">
	$(function() {
		if ($("#container.page").hasClass('password')) {
			$("#js_app_navigation_left .password .row").addClass('selected');
		} else if ($("#container.page").hasClass('people')) {
			$("#js_app_navigation_left .user .row").addClass('selected');
		}
	});
</script>

	<nav>
		<div class="primary navigation top">
			<ul id="js_app_navigation_left"
					class="left passbolt_controller_component_app_navigation_left_controller mad_view_component_tree menu ready">

				<li id="31a2d90f-6c19-8475-0603-8bbb2e0130df" class="password ready">
					<div class="row selected">
						<div class="main-cell-wrapper">
							<div class="main-cell">
								<a href="../demo/LU_passwords.php" role="button" tabindex="2"><span>passwords</span></a>
							</div>
						</div>
					</div>
				</li>
				<li id="067a31de-232c-32a0-8a6d-56c3bfdf83b0" class="user ready">
					<div class="row">
						<div class="main-cell-wrapper">
							<div class="main-cell">
								<a href="../demo/LU_users.php" role="button" tabindex="3"><span>users</span></a>
							</div>
						</div>
					</div>
				</li>
				<li id="067a31de-232c-32a0-8a6d-56c3bfdf83b0" class="users ready">
					<div class="row">
						<div class="main-cell-wrapper">
							<div class="main-cell">
								<a href="../demo" tabindex="4"><span>help</span></a>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<ul id="js_app_navigation_right"
					class="right passbolt_controller_component_app_navigation_right_controller mad_view_component_tree menu ready">
				<li id="ea699358-a04d-179f-cc6c-64e7bd7f4254" class="logout ready">
					<div class="row">
						<div class="main-cell-wrapper">
							<div class="main-cell">
								<a href="../demo/AN_login.php"><span>logout</span></a>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</div>