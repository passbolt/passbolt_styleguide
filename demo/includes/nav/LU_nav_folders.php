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
            <div class="row" id="plants-li-row" draggable="true">
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
                    <div class="row">
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
                    <div class="row">
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
                    <div class="row">
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
            <div class="row" id="beta-li-row">
                <div class="main-cell-wrapper">
                    <div class="main-cell">
                        <a>
                            <?php include('includes/svg-icons/caret-down.php'); ?>
                            <?php include('includes/svg-icons/folder.php'); ?>
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
                    <div class="row">
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
                    <div class="row">
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
                            <div class="row disabled">
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
                            <div class="row">
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
    $(function() {
      $('.folders .row .svg-icon.caret-down').click(function(event) {
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

      $('.folders-tree .row .svg-icon.caret-down').click(function(event) {
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

      const draggableElements = $('ul.folders-tree li .row:not(".disabled")');
      draggableElements.draggable({
        cursor: "move",
        appendTo: "body",
        start: function( event, ui ) {
          $(event.target).closest('li').find('.row').addClass('disabled');
        },
        helper: function() {
          let content = $(this).find('span.folder-name')[0].innerText;
          let helper = $("<div>", {
            class: "passwords-folders-dnd-helper"
          });
          helper.append(`<span>${content}</span>`);
          return helper;
        },
        cursorAt: {
          top: 5,
          left: 5
        },
        opacity: "0.8",
        revert:  function(event) {
          let draggable = $(this);
          draggable.closest('li').find('.row').removeClass('disabled');
          let hasBeenDroppedBefore = draggable.data('hasBeenDropped');
          if (hasBeenDroppedBefore) {
            draggable.animate({ top: 0, left: 0 }, 'slow');
            return false;
          } else {
            return true;
          }
        }
      });

      $('.folders-tree li .row:not(".disabled")').droppable({
        accept: function () {
          return draggableElements || '#4241e122-62d8-340c-a607-150d8ca0c5c5';
        },
        over: function(event, ui) {
          $(event.target).addClass('passwords-folders-drop-focus-in');
          $(event.target).closest('li').find('.row.disabled').removeClass('passwords-folders-drop-focus-in');
        },
        out: function(event, ui) {
          $(event.target).removeClass('passwords-folders-drop-focus-in');
        },
        drop: function(event, ui) {
          $(event.target).removeClass('passwords-folders-drop-focus-in');
          $(ui.draggable).data('hasBeenDropped', true);
          $('#js_app_notificator .message.animated').addClass('fadeInUp').html('<strong>Success</strong> Dropped successfully!')
        }
      });
    });
</script>