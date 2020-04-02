<ul id="js_contextual_folders_tree_menu" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready" >
    <li id="js_password_browser_menu_create_sub_folder" class="ready closed" data-view-id="369">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_create.php"><span>Create folder</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_edit" class="ready closed" data-view-id="370">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_edit.php"><span>Edit</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_rename" class="separator-after ready closed" data-view-id="371">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_edit.php"><span>Rename</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_move" class="ready closed" data-view-id="372">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_move.php"><span>Move</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_share" class="ready closed" data-view-id="373">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_edit_share.php"><span>Share</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_password_browser_menu_delete" class="ready closed" data-view-id="374">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/legacy/LU_folders_delete.php"><span>Delete</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
        var mouse = { x: -1, y: -1 };
        $(document).mousemove(function(event) {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        });

        $('ul.folders-tree li .row').contextmenu(function() {
            $('#js_contextual_folders_tree_menu').css('display','block').css('left', mouse.x).css('top', mouse.y);
            return false;
        });
        $('html body').click(function(){
            $('#js_contextual_folders_tree_menu').css('display','none');
        });
    });
</script>