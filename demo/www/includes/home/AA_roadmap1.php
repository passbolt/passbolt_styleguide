<?php
if (isset($_GET['cards'])) {
	$cards = $_GET['cards'];
} else {
	$cards = [
		'backlog' => [
			[
				'title' => 'Mobile app',
				'description' => 'Passwords are available on Android and iPhones.',
				'eta' => 'Q1 2019',
				'teaser' => 'android'
			],[
				'title' => 'API Documentation',
				'description' => 'Api documentation done in swagger. You can build on top of passbolt!',
				'eta' => 'Q1 2019',
				'teaser' => 'swagger'
			],[
				'title' => 'Files & Secure notes',
				'description' => 'Store other secrets than a password such as notes.',
				'eta' => 'Q1 2019',
				'teaser' => 'securenotes'
			],[
				'title' => 'Users/Groups ACL',
				'description' => 'Define which users/groups can access to which features.',
				'eta' => 'Q2 2019',
				'teaser' => 'acl'
			],[
				'title' => 'External sharing',
				'description' => 'Share a password with an external user.',
				'eta' => 'Q2 2019',
				'teaser' => 'share'
			],[
				'title' => 'Keepass as an offline client',
				'description' => 'Bi-directional sync with keepass file format to work offline.',
				'eta' => 'Q3 2019',
				'teaser' => 'keypassx'
			],[
				'title' => 'Internationalization',
				'description' => 'The interface and documentation are translatable in multiple languages.',
				'eta' => 'Q3 2019',
				'teaser' => 'i18n'
			],
		],
		'in progress' => [
			[
				'title' => 'Quick Access',
				'description' => 'Simplified app to access passwords from the browser extension.',
				'eta' => 'Q4 2018',
				'teaser' => 'quickaccess'
			],[
				'title' => 'Autofill / Autosave',
				'description' => 'Passbolt remembers passwords from web pages and populate forms.',
				'eta' => 'Q4 2018',
				'teaser' => 'check'
			],[
				'title' => 'Audit logs',
				'description' => 'Browse the access logs to see who is doing what on passbolt.',
				'eta' => 'Q4 2018',
				'teaser' => 'monitor'
			],[
				'title' => 'Folders',
				'description' => 'Organize passwords in folders.',
				'eta' => 'Q4 2018',
				'teaser' => 'folder'
			],[
				'title' => 'Admin panel',
				'description' => 'Configure passbolt directly from the admin panel.',
				'eta' => 'Q4 2018',
				'teaser' => 'adminpanel'
			],
		],
		'completed' => [
			[
				'title' => 'Second factor authentication',
				'description' => 'Login requires an additional code sent to your phone.',
				'eta' => 'Q3 2018',
				'teaser' => 'fingerprint'
			],
			[
				'title' => 'LDAP Integration (Pro)',
				'description' => 'Integrate passbolt with your organization user directory.',
				'eta' => 'Q2 2018',
				'teaser' => 'ldap'
			],[
				'title' => 'Import (Pro)',
				'description' => 'Import your passwords from other password managers.',
				'eta' => 'Q1 2018',
				'teaser' => 'sync'
			],[
				'title' => 'Export (Pro)',
				'description' => 'Export your passwords to other password managers.',
				'eta' => 'Q1 2018',
				'teaser' => 'keypassx'
			],[
				'title' => 'Tags (Pro)',
				'description' => 'Organize passwords using tags to quickly find them by themes.',
				'eta' => 'Q1 2018',
				'teaser' => 'folder'
			],[
				'title' => 'API Upgrade',
				'description' => 'Migration of the passbolt core to CakePHP version 3.',
				'eta' => 'December 2017',
				'teaser' => 'passbolt'
			],[
				'title' => 'API Code review',
				'description' => 'An independent security audit of the code.',
				'eta' => 'December 2017',
				'teaser' => 'security'
			],[
				'title' => 'Groups',
				'description' => 'Associate people and passwords with groups to manage access rights.',
				'eta' => 'May 2017',
				'teaser' => 'groups'
			],[
				'title' => 'Comments',
				'description' => 'Browse and reply to comments on a given password.',
				'eta' => 'Spring 2016',
				'teaser' => 'comment'
			],[
				'title' => 'Filtering and sorting',
				'description' => 'Filter your password list as you search. Sort results by columns.',
				'eta' => 'Spring 2016',
				'teaser' => 'search'
			],[
				'title' => 'more...',
				'description' => 'Check out our release notes for the complete list of released items.',
				'eta' => '<a href="https://www.passbolt.com/release/notes">Release notes</a>',
				'teaser' => 'help'
			]
		]
	];
}

?>
<div class="page-row roadmap">
	<div class="grid grid-responsive-12">
		<div class="row">
			<?php foreach($cards as $backlog => $items) : ?>
				<div class="col4 <?php echo $backlog; if($backlog == 'completed') echo ' last'; ?>">
					<h3><?php echo ucfirst($backlog); ?></h3>
					<?php foreach($items as $i => $card) : ?>
						<div class="card <?php echo $backlog;?>">
							<div class="content-wrapper">
								<div class="content">
									<div class="title"><?php echo $card['title']; ?></div>
									<div class="description"><?php echo $card['description']; ?></div>
									<div class="eta">June 2018</div>
								</div>
							</div>
							<div class="teaser">
								<i class="<?php echo $card['teaser']; ?>"></i>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
