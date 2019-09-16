<div class="col1 main-action-wrapper">
	<div class="dropdown">
		<a id="user_workspace_create_button" href="#" class="button create primary mad_component_button_dropdown js_component mad_view_component_button_dropdown ready">
            <span class="svg-icon">
                <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                </svg>
            </span>
			<span>Create</span>
		</a>
		<ul id="user_workspace_create_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
			<li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="ready" data-view-id="10">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="demo/AD_users_create_user.php"><span>New user</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="ready" data-view-id="11">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="demo/AD_users_create_group.php"><span>New group</span></a>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<script type="application/javascript">
		// SAMPLE INTERACTION - Not for production
		$(function() {
			$('#user_workspace_create_button').click(function(){
				$('#user_workspace_create_button_dropdown').toggleClass('visible');
				return false;
			});
		});
		$('body').click(function(e) {
			if($(e.target).closest('#user_workspace_create_button_dropdown').length === 0) {
				$('#user_workspace_create_button_dropdown').removeClass('visible');
			}
		});
	</script>
</div>
