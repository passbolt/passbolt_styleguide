<?php
    $folders = [
        'Notes' => ['shared' => true, 'right' => 'Can read', 'disabled' => false],
        'Freelancer' => ['shared' => false, 'right' => 'Owner', 'disabled' => false],
        'Management' => ['shared' => true, 'right' => 'Can update', 'disabled' => false],
        'Product' => ['shared' => true, 'right' => 'Can read', 'disabled' => true],
        'Appjs' => ['shared' => false, 'right' => 'Owner', 'disabled' => false],
        'Extension' => ['shared' => true, 'right' => 'Can update', 'disabled' => false],
        'Styleguide' => ['shared' => true, 'right' => 'Can read', 'disabled' => false],
        'Docker' => ['shared' => false, 'right' => 'Owner', 'disabled' => false],
    ];
?>
<div class="move-folder-dialog dialog-wrapper">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                <span>Move</span>
                <span class="dialog-header-subtitle">Beta</span>
            </h2>
            <a class="dialog-close" role="button" href="demo/LU_passwords_folders.php">
                <?php include('includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="dialog-content">
            <div class="breadcrumbs">
                <a class="button" href="#" role="button">
                    <?php include('includes/svg-icons/caret-left.php'); ?>
                    <span class="visuallyhidden">Up</span>
                </a>
                <ul>
                    <li><a class="parent-folders" href="#" role="button">Folders</a></li>
                    <li><a class="parent-folders" href="#" role="button">All Plants</a></li>
                    <li><a class="parent-folders" href="#" role="button">Succulents</a></li>
                    <li>Long folder name that shouldn't break things</li>
                </ul>
            </div>
            <div class="folders-list-wrapper">
                <ul class="folders-list scroll">
                    <?php foreach ($folders as $name => $props) : ?>
                    <li class="folders-list-item <?php if ($props['disabled']) : ?>disabled<?php endif; ?>">
                        <?php if ($props['shared']) : ?>
                            <?php include('includes/svg-icons/shared-folder.php'); ?>
                        <?php else : ?>
                            <?php include('includes/svg-icons/folder.php'); ?>
                        <?php endif; ?>
                        <span class="folder-name"><?= $name ;?></span>
                        <span class="folder-permission"><?= $props['right']; ?></span>
                        <a class="folder-view" href="#" role="button">
                            <?php include('includes/svg-icons/caret-right.php'); ?>
                        </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="submit-wrapper clearfix">
              <a class="button primary disabled" href="demo/LU_folders_move_confirm.php">Move</a>
              <a class="cancel" href="demo/LU_passwords_folders.php">Cancel</a>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function() {
    // group item actions
    $('.move-folder-dialog .folders-list-item').click(function() {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('.move-folder-dialog .button.primary').addClass('disabled');
      } else {
        $('.move-folder-dialog .folders-list-item.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.move-folder-dialog button.primary.disabled').removeClass('disabled');
      }
    });
  });
</script>