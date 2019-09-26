<div class="col1 main-action-wrapper">
	<div class="dropdown">
		<a id="js_wsp_pwd_create_button" href="#" class="primary create button mad_component_button js_component mad_view ready">
					<span class="svg-icon">
							<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
									<path d="M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
							</svg>
					</span>
			<span>Create</span>
		</a>
		<a id="js_wsp_pwd_import_button" href="demo/LU_passwords_import.php" class="tooltip-bottom button mad_component_button js_component mad_view ready">
		<span class="svg-icon">
			<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"/></svg>
		</span>
		<span class="visuallyhidden">Upload</span>
		</a>
		<ul id="pwd_workspace_create_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
			<li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="ready" data-view-id="10">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="demo/LU_passwords_create.php"><span>New password</span></a>
						</div>
					</div>
				</div>
			</li>
			<li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="ready" data-view-id="11">
				<div class="row">
					<div class="main-cell-wrapper">
						<div class="main-cell">
							<a href="demo/LU_folders_create.php"><span>New folder</span></a>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<script type="application/javascript">
		// SAMPLE INTERACTION - Not for production
		$(function() {
			$('#js_wsp_pwd_create_button').click(function(){
				$('#pwd_workspace_create_button_dropdown').toggleClass('visible');
				return false;
			});
		});
		$('body').click(function(e) {
			if($(e.target).closest('#pwd_workspace_create_button_dropdown').length === 0) {
				$('#pwd_workspace_create_button_dropdown').removeClass('visible');
			}
		});
	</script>
</div>