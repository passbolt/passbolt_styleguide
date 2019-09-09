<div class="dialog-wrapper ready">
	<div class="dialog export">
		<div class="dialog-header">
			<h2>Export passwords</h2>
			<a href="demo/LU_passwords.php" class="dialog-close">
			<span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
								</span>
								<span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">
			<form
				action="demo/LU_passwords.php"
				class="tab-content ready selected"
				id="js_rs_export">
				<div class="form-content">
					<div class="input select required">
						<label for="">Choose the export format (
							<a role="link" data-tooltip="csv export format is compatible with the one of keepassx">csv</a> and
							<a role="link" data-tooltip="kdbx files are files generated by keepass v2.x">kdbx are supported)</a></label>
						<select>
							<option>kdbx (keepass / keepassx)</option>
							<option>csv (comma separated values)</option>
						</select>

					</div>
					<p><br><em>28 passwords are going to be exported.</em></p>
				</div>
				<div class="submit-wrapper clearfix">
					<input class="button primary" value="Export" type="submit" onclick="javascript:window.location.href='demo/LU_passwords.php'; return false;">
				</div>
			</form>
		</div>
	</div>
</div>