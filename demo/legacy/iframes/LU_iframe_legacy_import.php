<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../../'; ?>
<!doctype html>
<html lang="en">
<head>
    <?php include('../includes/meta/LU_meta_legacy.php'); ?>
    <script src="src/js/jquery-filestyle.js"></script>
</head>
<body class="iframe">
<div id="container" class="page">
    <div class="contain-item">
        <div id="app-container" class="container-wrapper">
            <div id="app" class="app" tabindex="1000">
                <?php $iframeName = '../includes/' . $iframe . '.php'; ?>
                <?php include($iframeName); ?>
            </div>
        </div>
    </div>
</div>
</body>
</html>