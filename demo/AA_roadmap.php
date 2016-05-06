<?php
    $cards = [
        'backlog' => [
            [
                'title' => 'Security audit',
                'description' => 'An independent 3rd party security review of the code.',
                'teaser' => 'security'
            ],[
                'title' => 'Chrome extension',
                'description' => 'Because not everyone likes red pandas, a chrome plugin is a must.',
                'teaser' => 'chrome'
            ],[
                'title' => 'Categories and tags',
                'description' => 'Organize passwords using tags or a folder tree, just like on a file system.',
                'teaser' => 'folder'
            ],[
                'title' => 'Form saving and filling',
                'description' => 'The plugin can save passwords from login forms, and populate them back.',
                'teaser' => 'check'
            ],[
                'title' => 'Groups',
                'description' => 'Associate people and passwords with groups to easily manage access rights.',
                'teaser' => 'groups'
            ],[
                'title' => 'Internationalization',
                'description' => 'The interface is available in multiple languages. The community can add or edit translations.',
                'teaser' => 'i18n'
            ],[
                'title' => 'Accessibility',
                'description' => 'Better support for screen readers and higher contrast ratio options.',
                'teaser' => 'accessibility'
            ],[
                'title' => 'Mobile support',
                'description' => 'An android and iphone client. Passbolt API also allows to choose which password is available for each device.',
                'teaser' => 'android'
            ],[
                'title' => 'Import / Export',
                'description' => 'Import and export your passwords from/to other password managers.',
                'teaser' => 'keypassx'
            ],[
                'title' => 'LDAP Integration',
                'description' => 'Integrate passbold with your organization user directory.',
                'teaser' => 'ldap'
            ],[
                'title' => 'Advanced keyring management',
                'description' => 'Manually approve and sign keys to build a network of trust.',
                'teaser' => 'keyring'
            ],[
                'title' => 'Second factor authentication',
                'description' => 'Login requires an additional factor like your phone or fingerprint.',
                'teaser' => 'fingerprint'
            ]
        ],
        'in progress' => [
            [
                'title' => 'Email notifications',
                'description' => 'Receive email notifications when someone changed a password, posted a comment, etc.',
                'teaser' => 'email'
            ],[
                'title' => 'Passbolt CLI',
                'description' => 'A simple command line interface prototype as an alternative to the web client.',
                'teaser' => 'terminal'
            ],[
                'title' => 'API Documentation',
                'description' => 'Api documentation done in swagger to allow people to build new integrations.',
                'teaser' => 'swagger'
            ],[
                'title' => 'Risk analysis',
                'description' => 'A complete review of the security risks and mitigations in place.',
                'teaser' => 'lock2'
            ],[
                'title' => 'Slack plugin',
                'description' => 'Receive notifications in your team chat when someone does something important.',
                'teaser' => 'slack'
            ],[
                'title' => 'Multi device support',
                'description' => 'Install passbolt on another computer or recover your account after a system reinstall.',
                'teaser' => 'sync'
            ],[
                'title' => 'Guided tour',
                'description' => 'Get familiar with passbolt features the first time you login.',
                'teaser' => 'notification'
            ],[
                'title' => 'Audit logs',
                'description' => 'Browse the access logs to see who is doing what on your passbolt server.',
                'teaser' => 'monitor'
            ],[
                'title' => 'Improved filtering and sorting options',
                'description' => 'Search filter your password list as you type. Sort results by collumns.',
                'teaser' => 'search'
            ]
        ],
        'completed' => [
            [
                'title' => 'Passbolt Server',
                'description' => 'The solution foundation, a restful JSON API with some extra magic.',
                'teaser' => 'passbolt'
            ],[
                'title' => 'Firefox plugin',
                'description' => 'A plugin to manage encryption and decryption safely.',
                'teaser' => 'firefox'
            ],[
                'title' => 'Installation tools',
                'description' => ' Docker image and install status dashboard.',
                'teaser' => 'docker'
            ],[
                'title' => 'Selenium & unit tests',
                'description' => 'All major features and bugs are tested against regressions.',
                'teaser' => 'jenkins'
            ],[
                'title' => 'Share a password',
                'description' => 'Share a password and decide who can use or edit a password.',
                'teaser' => 'share'
            ],[
                'title' => 'Comment',
                'description' => 'Browse and reply to comments for a given password.',
                'teaser' => 'comment'
            ],[
                'title' => 'Filters',
                'description' => 'Only see favorites, items you own, password recently edited, etc.',
                'teaser' => 'star'
            ],[
                'title' => 'more...',
                'description' => 'Check out our release notes for the complete list of released items',
                'teaser' => 'help'
            ]
        ]
    ];
?>
<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbot | The open source password manager for teams</title>
    <?php include('includes/AA_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="css/public.css" />
</head>
<body>
<div id="container" class="page roadmap featured">
    <?php include('includes/AA_header_prelaunch.php'); ?>

    <div class="page-row intro">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12">
                <h1>Features & roadmap</h1>
                <p>
                    Find out what we are currently working on and what we have in store for the future!
                    Tell us if you feel something is missing!
                </p>
                </div>
            </div>
        </div>
    </div>

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

    <?php include('includes/AA_signup.php'); ?>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</body>
</html>