<div class="col2_3 actions-wrapper">
	<ul id="js_wsp_primary_menu"
			class="actions mad_controller_component_tab_controller mad_view_component_tab js_component ready">
		<div class="js_tabs_content tabs-content">
			<div id="js_passbolt_passwordWorkspaceMenu_controller"
					 class="passbolt_controller_component_password_workspace_menu_controller mad_view_view tab-content selected selection">
				<li>
					<a id="js_wk_menu_edition_button" href="#"
						 class="button mad_controller_component_button_controller mad_view_view js_component "
						 disabled="disabled">
						<i class="fa fa-fw fa-edit"></i>
						<span>Edit</span>
					</a>
				</li>
				<li>
					<a id="js_wk_menu_edition_button" href="#"
						 class="button mad_controller_component_button_controller mad_view_view js_component "
						 disabled="disabled">
						<i class="fa fa-fw fa-trash"></i>
						<span>Delete</span>
					</a>
				</li>
                <li>
                    <div class="dropdown">
                        <a id="js_wk_menu_more_button" href="#" class="button mad_component_button_dropdown js_component mad_view_component_button_dropdown ready disabled">
                            <span>More</span>
                            <i class="fa fa-fw fa-caret-down"></i></a>
                        </a>
                        <ul id="js_wk_menu_more_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
                            <li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="ready disabled" data-view-id="10">
                                <div class="row">
                                    <div class="main-cell-wrapper">
                                        <div class="main-cell">
                                            <a href="#"><span>Reset MFA</span></a>
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