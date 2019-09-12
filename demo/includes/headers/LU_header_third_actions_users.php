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
						 <span class="svg-icon">
						<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"></path></svg>
					</span>
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
				 <span class="svg-icon icon-only">
							<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
						</span>
				<span class="visuallyhidden">View sidebar</span>
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
