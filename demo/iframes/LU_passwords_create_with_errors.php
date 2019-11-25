<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../'; ?>
<!doctype html>
<html lang="en">
<head>
    <?php include('../includes/meta/LU_meta_reactapp.php'); ?>
</head>
<body>
<div id="container" class="page iframe">
    <div class="contain-item">
        <div id="app-container" class="container-wrapper">
            <div id="app" class="app" tabindex="1000">
                <?php include('../includes/dialogs/passwords/LU_password_create_with_errors.php'); ?>
            </div>
        </div>
    </div>
</div>
</body>
</html>