<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings mfa">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<?php include('includes/headers/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/headers/LU_header_second_logo.php'); ?>
			<?php include('includes/headers/LU_header_search_users.php'); ?>
			<?php include('includes/headers/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
            <!-- no actions -->
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php
								$_GET['shortcuts'] = 'loginhistory';
								include('includes/nav/LU_nav_shortcuts_profile.php');
							?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'profile' => '../demo/LU_users_profile.php',
								'multi-factor authentication' => '../demo/LU_users_profile_mfa01.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>

                            <div class="grid grid-responsive-12">
                                <div class="row">
                                    <div class="col12 last">
                                        <h3>Multi-factor authentication</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="mfa wizard">
							<div class="grid grid-responsive-12">
                                <div class="row">
                                    <div class="col6 ">
                                        <h4>How does it work?</h4>
                                        <img src="../src/img/diagrams/totp.svg"/>
                                    </div>
                                    <div class="push1 col4 last">
                                        <h4>What is multi-factor authentication?</h4>
                                        <div class="message notice">
                                            <p>
                                                Multi-factor authentication (MFA) is a method of confirming a user's
                                                identity that requires presenting two or more pieces of evidence (or factor).
                                            </p>
                                            <a class="button">learn more</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col2">
                                        <p>You sign in to passbolt just like you normally do.</p>
                                    </div>
                                    <div class="col2">
                                        <p>When using a new browser, you need an additional
                                            code from your phone.</p>
                                    </div>
                                    <div class="col2 last">
                                        <p>Once you enter this code, you can log in.</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col3">
                                        <div class="input">
                                            <a class="button primary big" href="../demo/LU_users_profile_mfa_02.php">Let's get started!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/LU_footer.php'); ?>
</body>
</html>