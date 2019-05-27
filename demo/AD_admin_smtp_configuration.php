<?php include('_includes/bootstrap.php'); ?>
<!doctype html>
<html class=" websqldatabase draganddrop cssscrollbar" lang="en">

<head>
    <?php include('includes/meta/LU_meta.php'); ?>

<body>
    <div id="container" class="page settings login-history">
        <div class="mad_event_event_bus"></div>
        <div class="ready">
            <?php
            $role = 'admin';
            include('includes/headers/LU_header_first.php');
            ?>
            <div class="header second">
                <?php include('includes/headers/LU_header_second_logo.php'); ?>
                <?php include('includes/headers/LU_header_search_users.php'); ?>
                <?php include('includes/headers/LU_header_userbadge.php'); ?>
            </div>
            <div class="header third">
                <?php include('includes/headers/LU_header_third_title_profile.php'); ?>
                <div class="col2_3 actions-wrapper">
                    <ul class="actions ready">
                        <div class="tabs-content">
                            <div class="tab-content selected selection">
                                <li>
                                    <a class="button " href="demo/AD_admin_email_notifications.php">
                                        <i class="fa fa-fw fa-save"></i>
                                        <span>save settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="button " href="demo/AD_admin_email_notifications.php">
                                        <i class="fa fa-fw fa-magic"></i>
                                        <span>send test email</span>
                                    </a>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
                <!-- no action on login history -->
            </div>
            <div class="panel main ready">
                <div class="tabs-content">
                    <div lass="tab-content ready selected">
                        <div class="">
                            <div class="panel left">
                                <?php
                                $_GET['shortcuts'] = 'smtp';
                                include('includes/nav/AD_nav_administration.php');
                                ?>
                            </div>
                            <div class="panel middle">
                                <?php
                                $_GET['breadcrumbs'] = array(
                                    'administration' => '#',
                                    'smtp server' => 'demo/AD_admin_smtp_configuration.php',
                                    'settings' => 'demo/AD_admin_smtp_configuration.php'
                                );
                                include('includes/LU_breadcrumbs.php'); ?>
                                <div class="ready">
                                    <div class="tabs-content">
                                        <div class="tab-content ready selected">
                                            <div class="grid grid-responsive-12">
                                                <div class="row">
                                                    <div class="ldap-configuration-credentials col8">
                                                        <br/>
                                                        <div class="warning message" id="email-notification-setting-overridden-banner">
                                                            <p>
                                                                Settings have been found in your database as well as in your passbolt.php (or environment variables). The settings displayed in the form below are the one stored in your database and have precedence over others.
                                                            </p>
                                                        </div>
                                                        <h3>SMTP server</h3>
                                                        <div class="input text required">
                                                            <label for="SmtpHost">SMTP host</label>
                                                            <input name="data[Smtp][host]" class="required fluid" id="SmtpHost" required="required" type="text" placeholder="host name or ip address">
                                                        </div>
                                                        <div class="input text required">
                                                            <label for="SmtpTls">Use TLS?</label>
                                                            <select name="data[Smtp][tls]" class="required fluid" id="SmtpTls" required="required">
                                                                <option value="1">Yes</option>
                                                                <option value="0">No</option>
                                                            </select>
                                                        </div>
                                                        <div class="input text required">
                                                            <label for="SmtpPort">Port</label>
                                                            <input name="data[Smtp][port]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="port" value="587">
                                                        </div>
                                                        <div class="input text">
                                                            <label for="SmtpUsername">Username</label>
                                                            <input name="data[Smtp][username]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="username">
                                                        </div>
                                                        <div class="input text">
                                                            <label for="SmtpPassword">Password</label>
                                                            <input name="data[Smtp][password]" class="required fluid" id="SmtpPassword" required="required" type="password" placeholder="password">
                                                        </div>
                                                    </div>

                                                    <div class="col4 last">
                                                        <h3>Need some help?</h3>
                                                        <div class="notice message">
                                                            <p>For more information about smtp server configuration, checkout the
                                                                dedicated page on the help website.</p>
                                                            <a class="button" href="https://help.passbolt.com/configure/" target="_blank">
                                                                <i class="fa fa-fw fa-life-ring"></i>
                                                                <span>Read the documentation</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include('includes/LU_footer.php'); ?>
</body>

</html>