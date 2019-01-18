<div id="a484a5eb-4258-bde9-6b1e-20c6f26204fb" class="dialog-wrapper ready">
	<div class="dialog ldap-synchronise">
		<div class="dialog-header">
			<h2>Synchronize simulation report</h2>
			<a href="demo/AD_admin_ldap_configuration.php" class="dialog-close">
				<i class="fa fa-close"></i><span class="visuallyhidden">close</span>
			</a>

		</div>
		<div class="js_dialog_content dialog-content">
		<div class="form-content">
			<p><strong>The synchronize simulation was successfull</strong></p>
			<p>4 users and 4 groups will be synchronized.</p>
			<p class="error inline-error">Some resources won't be synchronized and will require your attention, see the full report.</p>
			<div class="accordion operation-details closed">
				<div class="accordion-header">
					<a role="link">Full report</a>
				</div>
				<div class="accordion-content hidden">
					<div class="input text">
						<label for="js_field_debug" class="visuallyhidden">Report</label>
						<textarea  id="js_field_debug">
-----------------------------------------------------------------------------
 Users
-----------------------------------------------------------------------------

Synchronized:
- The user ada@passbolt.com was mapped with an existing user in passbolt.
- The user betty@passbolt.com was mapped with an existing user in passbolt.
- The user zoe@passbolt.com was successfully added to passbolt.
- The user neil@passbolt.com was successfully added to passbolt.

Error:
- The previously deleted user sofia@passbolt.com was not re-added to passbolt.
  To ignore this error in the next sync please run
  ./bin/cake directory_sync ignore-create --id=16789f75-2cf7-4755-9bd9-634d1ff42240 --model=DirectoryEntries

-----------------------------------------------------------------------------
 Groups
-----------------------------------------------------------------------------
Synchronized:
- The group Finance was successfully added to passbolt.
- The group DevOps was successfully added to passbolt.

Error:
- The group Operations could not be mapped with an existing group in passbolt because it was created after.
  To ignore this error in the next sync please run
  ./bin/cake directory_sync ignore-create --id=91ea4dda-8925-4799-8b0a-279b9cde0610 --model=DirectoryEntries

Ignored:
- The user CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local could not be added to group Finance because there is no matching directory entry in passbolt.
- The user CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local could not be added to group Operations because there is no matching directory entry in passbolt.
						</textarea>
					</div>
				</div>
			</div>
		</div>
		<div class="submit-wrapper clearfix">
			<a class="button primary" href="demo/AD_admin_ldap_synchronize.php">Synchronize</a>
			<a class="js-dialog-cancel cancel" href="demo/AD_admin_ldap_configuration.php">cancel</a>
		</div>
		</div>
	</div>
</div>