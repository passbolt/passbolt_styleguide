<div class="col2_3 actions-wrapper">
	<div id="js_wsp_primary_menu_wrapper" class="actions">
		<ul class="passbolt_component_password_workspace_menu js_component mad_view selection" id="665c45ec-1780-87cf-1230-be4fe8684479">

			<li>
				<a id="js_wk_menu_secretcopy_button" href="#" class="button mad_component_button js_component mad_view ready">
					<i class="fa fa-fw fa-clipboard"></i>
					<span>copy</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_edition_button" href="../demo/LU_passwords_edit.php" class="button mad_component_button js_component mad_view ready">
					<i class="fa fa-fw fa-edit"></i>
					<span>edit</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_sharing_button" href="../demo/LU_passwords_share.php" class="button mad_component_button js_component mad_view ready">
					<i class="fa fa-fw fa-share"></i>
					<span>share</span>
				</a>
			</li>
			<li>
				<a id="js_wk_menu_sharing_button" href="../demo/LU_passwords_export.php" class="button mad_component_button js_component mad_view ready">
					<i class="fa fa-fw fa-cloud-download"></i>
					<span>export</span>
				</a>
			</li>
			<li>
				<div class="dropdown">
					<a id="js_wk_menu_more_button" href="#" class="button mad_component_button_dropdown js_component mad_view_component_button_dropdown ready">
						<span>more</span>
						<i class="fa fa-fw fa-caret-down"></i></a>
					</a>
					<ul id="js_wk_menu_more_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
						<li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="todo ready" data-view-id="10">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>copy login to clipboard</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="todo ready" data-view-id="11">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>copy password to clipboard</span></a>
									</div>
								</div>
							</div>
						</li>
						<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="todo ready disabled" data-view-id="11">
							<div class="row">
								<div class="main-cell-wrapper">
									<div class="main-cell">
										<a href="#"><span>delete</span></a>
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
					<i class="fa fa-info-circle fa-lg"></i>
					<span class="visuallyhidden">view sidebar</span>
				</a>
			</li>
		</ul>
	</div>
</div>