<div class="col2_3 actions-wrapper">
	<ul id="js_wsp_primary_menu"
			class="actions mad_controller_component_tab_controller mad_view_component_tab js_component ready">
		<div class="js_tabs_content tabs-content">
			<div id="js_passbolt_passwordWorkspaceMenu_controller"
					 class="passbolt_controller_component_password_workspace_menu_controller mad_view_view tab-content selected selection">
				<li>
					<a id="js_wk_menu_edition_button" href="#"
						 class="button mad_controller_component_button_controller mad_view_view js_component disabled"
						 disabled="disabled">
						<i class="fa fa-fw fa-edit"></i>
						<span>edit</span>
					</a>
				</li>
				<li>
					<a id="js_wk_menu_edition_button" href="#"
						 class="button mad_controller_component_button_controller mad_view_view js_component disabled"
						 disabled="disabled">
						<i class="fa fa-fw fa-trash"></i>
						<span>delete</span>
					</a>
				</li>
			</div>
		</div>
	</ul>
	<ul id="js_wsp_secondary_menu"
			class="actions secondary passbolt_controller_component_workspace_secondary_menu_controller mad_view_view js_component ready">
		<li>
			<a id="js_wk_secondary_menu_view_sidebar_button" href="#"
				 class="button toggle selected mad_controller_component_toggle_button_controller mad_view_view js_component ready">
				<i class="fa fa-lg fa-info-circle"></i>
				<span class="visuallyhidden">view sidebar</span>
			</a>
		</li>
	</ul>
	<script type="application/javascript">
		// DEMO ONLY -- Not for production use
		// Show hide sidebar
		$(function() {
			$('.aside .dialog-close').click(function(){
				$('.aside').toggleClass('hidden');
				return false;
			});
		});
	</script>
</div>