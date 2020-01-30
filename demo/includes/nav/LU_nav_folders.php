<div class="folders navigation first accordion">
    <div class="accordion-header1">
        <div class="open node root">
            <div class="row title">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <h3>
                            <span class="folders-label">
                                <?php include('includes/svg-icons/caret-down.php'); ?>
                                <span href="demo/LU_folders.php">Folders</span>
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ul class="folders-tree">
        <li class="open folder-item">
            <div class="row selected" draggable="true" title="Plants">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a>
                            <?php include('includes/svg-icons/caret-down.php'); ?>
                            <?php include('includes/svg-icons/folder.php'); ?>
                            <span title="Plants" class="folder-name">Plants</span>
                        </a>
                    </div>
                </div>
                <div class="right-cell more-ctrl">
                    <a><span>more</span></a>
                </div>
            </div>
            <ul>
                <li class="closed child folder-item">
                    <div class="row" draggable="true" title="Cactus">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a>
                                    <?php include('includes/svg-icons/caret-down.php'); ?>
                                    <?php include('includes/svg-icons/shared-folder.php'); ?>
                                    <span title="Cactus" class="folder-name">Cactus</span>
                                </a>
                            </div>
                        </div>
                        <div class="right-cell more-ctrl">
                            <a><span>more</span></a>
                        </div>
                    </div>
                </li>
                <li class="closed child folder-item">
                    <div class="row" draggable="true" title="Bamboo">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a>
                                    <?php include('includes/svg-icons/caret-down.php'); ?>
                                    <?php include('includes/svg-icons/shared-folder.php'); ?>
                                    <span title="Bamboo" class="folder-name">Bamboo</span>
                                </a>
                            </div>
                        </div>
                        <div class="right-cell more-ctrl">
                            <a><span>more</span></a>
                        </div>
                    </div>
                </li>
                <li class="closed child folder-item">
                    <div class="row" draggable="true" title="Bonsai">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a>
                                    <?php include('includes/svg-icons/caret-down.php'); ?>
                                    <?php include('includes/svg-icons/folder.php'); ?>
                                    <span title="Bonsai" class="folder-name">Bonsai</span>
                                </a>
                            </div>
                        </div>
                        <div class="right-cell more-ctrl">
                            <a><span>more</span></a>
                        </div>
                    </div>
                </li>
            </ul>
        </li>
        <li class="open folder-item">
            <div class="row" draggable="true" title="Beta">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a>
                            <?php include('includes/svg-icons/caret-down.php'); ?>
                            <?php include('includes/svg-icons/shared-folder.php'); ?>
                            <span title="Beta" class="folder-name">Beta</span>
                        </a>
                    </div>
                </div>
                <div class="right-cell more-ctrl">
                    <a><span>more</span></a>
                </div>
            </div>
            <ul>
                <li class="closed child folder-item">
                    <div class="row" draggable="true" title="Square Book">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a>
                                    <?php include('includes/svg-icons/caret-down.php'); ?>
                                    <?php include('includes/svg-icons/folder.php'); ?>
                                    <span title="Square Book" class="folder-name">Square Book</span>
                                </a>
                            </div>
                        </div>
                        <div class="right-cell more-ctrl">
                            <a><span>more</span></a>
                        </div>
                    </div>
                </li>
                <li class="open child folder-item">
                    <div class="row" draggable="true" title="Famous Painters in the World">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a>
                                    <?php include('includes/svg-icons/caret-down.php'); ?>
                                    <?php include('includes/svg-icons/folder.php'); ?>
                                    <span title="Famous Painters in the World" class="folder-name">Famous Painters in the World</span>
                                </a>
                            </div>
                        </div>
                        <div class="right-cell more-ctrl">
                            <a><span>more</span></a>
                        </div>
                    </div>
                    <ul class="nested">
                        <li class="closed child folder-item">
                            <div class="row disabled" draggable="true" title="Leonardo Da Vinci">
                                <div class="main-cell-wrapper">
                                    <div class="main-cell">
                                        <a>
                                            <?php include('includes/svg-icons/caret-down.php'); ?>
                                            <?php include('includes/svg-icons/shared-folder.php'); ?>
                                            <span title="Leonardo Da Vinci" class="folder-name">Leonardo Da Vinci</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="right-cell more-ctrl">
                                    <a><span>more</span></a>
                                </div>
                            </div>
                        </li>
                        <li class="closed child folder-item">
                            <div class="row" draggable="true" title="Pablo Picasso">
                                <div class="main-cell-wrapper">
                                    <div class="main-cell">
                                        <a>
                                            <?php include('includes/svg-icons/caret-down.php'); ?>
                                            <?php include('includes/svg-icons/folder.php'); ?>
                                            <span title="Pablo Picasso" class="folder-name">Pablo Picasso</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="right-cell more-ctrl">
                                    <a><span>more</span></a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>

<script type="application/javascript">
  // DEMO ONLY -- not for production use
  $(function () {
    $('.folders .row .svg-icon.caret-down').click(function (event) {
      $(event.target).closest('h3').find('.svg-icon.caret-down svg').toggleClass('rotate-right');
      let $content = $(this).closest('.accordion-header1').next();
      if ($content.is(':hidden')) {
        $content.slideDown(50);
      } else {
        $content.slideUp(25);
      }
      $content.toggleClass('closed');
      $content.parent().toggleClass('folders-label-height');
      return false;
    });

    $('.folders-tree .row .svg-icon.caret-down').click(function (event) {
      $(event.target).closest('li').find('.svg-icon.caret-down svg').toggleClass('rotate-right');
      const $content = $(this).closest('li').children('ul');
      if ($content.is(':hidden')) {
        $content.slideDown(50);
      } else {
        $content.slideUp(25);
      }
      $(this).toggleClass('closed');
      return false;
    });

  });
</script>