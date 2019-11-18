<?php include('_includes/bootstrap.php'); ?>
<!doctype html>
<html class=" websqldatabase draganddrop cssscrollbar" lang="en">

<head>
    <?php include('includes/meta/LU_meta.php'); ?>

<body>
    <div id="container" class="page settings smtp-settings">
        <div id="js_app_controller" class="ready">
            <?php
            if (isset($_GET['delete'])) {
                include('includes/dialogs/LU_tags_delete_confirmation.php');
            } else if (isset($_GET['edit'])) {
                include('includes/dialogs/LU_tags_edit.php');
            }
            ?>
            <?php
            $role = 'admin';
            include('includes/headers/LU_header_first.php');
            ?>
            <div class="header second">
                <?php include('includes/headers/LU_header_second_logo.php'); ?>
                <?php include('includes/headers/LU_header_search_tags.php'); ?>
                <?php include('includes/headers/LU_header_userbadge.php'); ?>
            </div>
            <div class="header third">
                <?php include('includes/headers/LU_header_third_title_profile.php'); ?>
                <?php include('includes/headers/AD_header_third_actions_admin_shared_tags.php'); ?>
            </div>
            <div class="panel main ready">
                <div class="">
                    <div class="panel left">
                        <?php
                        $_GET['shortcuts'] = 'shared_tags';
                        include('includes/nav/AD_nav_administration.php');
                        ?>
                    </div>
                    <div class="panel middle" style="overflow:hidden">
                        <?php
                        $_GET['breadcrumbs'] = array(
                            'Administration' => '#',
                            'Tags taxonomy' => 'demo/AD_admin_shared_tags.php',
                        );
                        include('includes/LU_breadcrumbs.php'); ?>
                        <!-- <h3>Tags taxonomy</h3> -->
                        <?php include('includes/tableviews/LU_tableview_tags.php'); ?>
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