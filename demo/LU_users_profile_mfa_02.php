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
								'multi-factor authentication' => '../demo/LU_users_profile_mfa_01.php',
                                'setup' => '../demo/LU_users_profile_mfa_02.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>

                            <div class="mfa wizard verify">
							<div class="grid grid-responsive-12">
                                <form>
                                <div class="row">
                                    <div class="col6 last">
                                        <h3>Scan this bar code</h3
                                        <p>
                                            Scan this bar code using your phone or your tablet
                                            using an application that supports one time passwords such as
                                            Google Authenticator or FreeOTP.
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col3">
                                        <img src="data:image/png;base64,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" />
                                    </div>
                                    <div class="col4">
                                        <div class="input-verify">
                                        <div class="input text required ">
                                            <label for="js_field_name">One Time Password</label>
                                            <input name="passbolt.model.Resource.name"
                                                   class="required" maxlength="6" id="js_field_name" placeholder="123456" type="text">
                                            <div class="message helptext">
                                                Enter the six digit number as presented on your phone or tablet.
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="actions-wrapper">
                                        <a class="button cancel big" href="../demo/LU_users_profile_mfa_01.php">Cancel</a>
                                        <a class="button primary big" href="../demo/LU_users_profile_mfa_02b.php">Validate</a>
                                    </div>
                                </div>
                                </form>
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