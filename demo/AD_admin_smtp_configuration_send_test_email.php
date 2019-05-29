<?php include('_includes/bootstrap.php'); ?>
<!doctype html>
<html class=" websqldatabase draganddrop cssscrollbar" lang="en">

<head>
    <?php include('includes/meta/LU_meta.php'); ?>

<body>
    <div id="container" class="page settings smtp-settings">
        <div id="js_app_controller" class="ready">
            <?php if (!isset($_GET['result'])) { ?>
                <?php include('includes/dialogs/smtp/AD_smtp_send_test_email.php'); ?>
            <?php } else { ?>
                <?php include('includes/dialogs/smtp/AD_smtp_send_test_email_result.php'); ?>
            <?php } ?>
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
                <?php include('includes/headers/AD_header_third_actions_admin_smtp.php'); ?>
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
                                                        <? include('includes/form/AD_smtp_settings.php') ?>
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
    </div>
</body>

</html>