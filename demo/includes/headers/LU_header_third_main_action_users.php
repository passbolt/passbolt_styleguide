<div class="col1 main-action-wrapper">
	<div class="dropdown">
		<a id="user_workspace_create_button" href="#" class="button primary mad_component_button_dropdown js_component mad_view_component_button_dropdown ready">
			<i class="fa fa-fw fa-plus-circle"></i>
			<span>create</span>
		</a>
		<ul id="user_workspace_create_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
			<li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="ready" data-view-id="10">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="../demo/AD_users_create_user.php"><span>New user</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="ready" data-view-id="11">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="../demo/AD_users_create_group.php"><span>New group</span></a>
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