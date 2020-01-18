<!-- group item action -->
﻿<ul id="js_contextual_menu_folders_tree" class="mad_component_contextual_menu contextual-menu mad_view_component_contextual_menu ready">
    <li id="js_tag_browser_menu_create_sub_folder" class="ready closed" data-view-id="373">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/LU_folders_create.php"><span>Create folder</span></a>
                </div>
            </div>
        </div>
    </li>
    <li id="js_tag_browser_menu_edit" class="ready closed hidden" data-view-id="374">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/LU_folders_edit.php"><span>Edit</span></a>
                </div>
            </div>
        </div>
      </li>
      <li id="js_delete_browser_menu_rename" class="separator-after ready closed" data-view-id="375">
          <div class="row">
              <div class="main-cell-wrapper">
                  <div class="main-cell">
                      <a href="demo/LU_folders_rename.php"><span>Rename</span></a>
                  </div>
              </div>
          </div>
      </li>
      <li id="js_delete_browser_menu_move" class="ready closed" data-view-id="376">
          <div class="row">
              <div class="main-cell-wrapper">
                  <div class="main-cell">
                      <a href="demo/LU_folders_move.php"><span>Move</span></a>
                  </div>
              </div>
          </div>
      </li>
      <li id="js_delete_browser_menu_share" class="ready closed" data-view-id="377">
          <div class="row">
              <div class="main-cell-wrapper">
                  <div class="main-cell">
                      <a href="demo/LU_folders_share.php"><span>Share</span></a>
                  </div>
              </div>
          </div>
      </li>
    <li id="js_delete_browser_menu_delete" class="ready closed" data-view-id="378">
        <div class="row">
            <div class="main-cell-wrapper">
                <div class="main-cell">
                    <a href="demo/LU_folders_delete.php"><span>Delete</span></a>
                </div>
            </div>
        </div>
    </li>
</ul>
<script type="application/javascript">
    // DEMO ONLY -- not for production use
    $(function() {
        // group item actions
        $('.folders.navigation .folder-item .more-ctrl').click(function() {
            var p = $(this).offset();
            p.top += 16;
            p.left -= 4;
            $('#js_contextual_menu_folders_tree').css('display','block').css('left', p.left).css('top', p.top);
            return false;
        });
        // hide everything
        $('html body').click(function(){
            $('#js_contextual_menu_folders_tree').css('display','none');
        });
    });
</script>