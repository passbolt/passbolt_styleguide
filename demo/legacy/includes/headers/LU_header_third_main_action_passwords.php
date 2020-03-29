<div class="col1 main-action-wrapper">
	<div class="dropdown">
		<a id="js_wsp_pwd_create_button" href="#" class="primary create button mad_component_button js_component mad_view ready">
            <?php include('includes/svg-icons/create.php'); ?>
			<span>Create</span>
		</a>
        <ul id="pwd_workspace_create_button_dropdown" class="dropdown-content mad_component_menu menu mad_view_component_tree ready">
            <li id="ceb12fee-d370-a60c-8596-a559e560f4e6" class="ready" data-view-id="10">
                <div class="row">
                    <div class="main-cell-wrapper">
                        <div class="main-cell">
                            <a href="demo/legacy/LU_passwords_create.php"><span>New password</span></a>
                        </div>
                    </div>
                </div>
            </li>
            <li id="9609c19d-7c4f-be67-7c97-5b82720049f8" class="ready" data-view-id="11">
                <div class="row">
                    <div class="main-cell-wrapper">
                        <div class="main-cell">
                            <a href="demo/legacy/LU_folders_create.php"><span>New folder</span></a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <a id="js_wsp_pwd_import_button" href="demo/legacy/LU_passwords_import.php" class="tooltip-bottom button mad_component_button js_component mad_view ready">
        <?php include('includes/svg-icons/upload.php'); ?>
        <span class="visuallyhidden">Upload</span>
    </a>
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