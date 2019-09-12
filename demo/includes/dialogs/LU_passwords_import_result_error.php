<div class="dialog-wrapper">
	<div class="dialog import">
		<div class="dialog-header">
			<h2>Something went wrong!</h2>
			<a href="demo/LU_passwords.php" class="dialog-close">
			<span class="svg-icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>	
			<span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">

			<form
				action="demo/LU_passwords.php"
				class="tab-content ready selected"
				id="js_rs_import">
				<div class="form-content">

                    <p class="error inline-error">There was an issue when importing the passwords:</p>
					<p>
                        <strong>25 out 28 </strong> passwords have been imported.
                        The newly imported passwords are tagged with: 'import-kdbx-201293494'.
                    </p>
                    <div class="accordion error-details closed">
                        <div class="accordion-header">
                            <a role="link">Errors details</a>
                        </div>
                        <div class="accordion-content hidden">
                            <div class="input text">
                                <label for="js_field_debug" class="visuallyhidden">Errors details</label>
                                <textarea id="js_field_debug">Here the json with errors</textarea>
                            </div>
                        </div>
                    </div>
				</div>
				<div class="submit-wrapper clearfix">
					<input class="button primary" value="OK" type="submit" onclick="javascript:window.location.href='demo/LU_passwords.php'; return false;">
				</div>
			</form>
		</div>
	</div>
</div>