<div class="col2_3 actions-wrapper">
	<div id="js_wsp_primary_menu_wrapper" class="actions">
		<ul class="passbolt_component_password_workspace_menu js_component mad_view selection" id="665c45ec-1780-87cf-1230-be4fe8684479">

			<li>
				<a id="js_wk_menu_secretcopy_button" href="#" class="button mad_component_button js_component mad_view ready">
                    <?php include('includes/svg-icons/copy.php'); ?>
					<span>Copy</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_edition_button" href="demo/legacy/LU_passwords_edit.php" class="button mad_component_button js_component mad_view ready">
                    <?php include('includes/svg-icons/edit.php'); ?>
					<span>Edit</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_sharing_button" href="demo/legacy/LU_passwords_share.php" class="button mad_component_button js_component mad_view ready">
                    <?php include('includes/svg-icons/share.php'); ?>
                    <span>Share</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_sharing_button" href="demo/legacy/LU_passwords_export.php" class="button mad_component_button js_component mad_view ready">

                    <?php include('includes/svg-icons/export.php'); ?>
                    <span>Export</span>
				</a>
			</li>
			<li>
				<div class="dropdown">
					<a id="js_wk_menu_more_button" href="#" class="button mad_component_button_dropdown js_component mad_view_component_button_dropdown ready">
						<span>More</span>
						<span class="svg-icon">
							<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"/></svg>
						</span>
					</a>
					</a>
					<ul id="js_wk_menu_more_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
						<li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="todo ready" data-view-id="10">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Copy username</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="todo ready" data-view-id="11">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Copy password</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="todo ready disabled" data-view-id="11">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>Delete</span></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<script type="application/javascript">
					// SAMPLE INTERACTION - Not for production
					$(function() {
						$('#js_wk_menu_more_button').click(function(){
							$('#js_wk_menu_more_button_dropdown').toggleClass('visible');
							return false;
						});
					});
					$('body').click(function(e) {
						if($(e.target).closest('#js_wk_menu_more_button_dropdown').length === 0) {
							$('#js_wk_menu_more_button_dropdown').removeClass('visible');
						}
					});
				</script>
			</li>
		</ul>
	</div>
	<div id="js_wsp_secondary_menu_wrapper" class="actions secondary">
		<ul class="passbolt_component_workspace_secondary_menu js_component mad_view ready" id="b59038b5-ed72-a48a-06e1-fb06523b5bfd">
			<li>
				<a id="js_wk_secondary_menu_view_sidebar_button" href="#" class="button toggle mad_component_toggle_button js_component mad_view ready">
						<span class="svg-icon icon-only">
							<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
						</span>
					<span class="visuallyhidden">View sidebar</span>
				</a>
			</li>
		</ul>
	</div>
</div>
