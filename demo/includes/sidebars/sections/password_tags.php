<?php include(dirname(__DIR__) . '/../../fixtures/tags.php'); ?>
<!-- Tags management -->
<div id="js_rs_details_tags" class="clearfix accordion open sidebar-section">
    <div class="accordion-header">
        <h4><a href="#" role="button">Tags</a></h4>
    </div>
    <div class="accordion-content">
        <a id="js_edit_tags_button" class="edit_tags_button section-action" href="#">
            <i class="fa fa-fw fa-edit"></i>
            <span class="visuallyhidden">edit</span>
        </a>
        <ul id="js_rs_details_tags_list" class="tags tags-list">
<?php foreach ($tags as $i => $tag) : ?>
            <li>
                <a href="#" class="tag"><?= $tag['name']; ?></a>
            </li>
<?php endforeach; ?>
        </ul>
        <div id="js_edit_tags_form" class="tags-edit-wrapper hidden form">
            <div class="form-content">
                <div id="js_tags_editor" class="input tag-editor">
                    <div class="tag-editor-input-wrapper">
                        <div class="tags">
                            <!-- predefined value can be set with
                            <div class="tag">
                                <span class="tag-content">alpha</span>
                                <span class="tag-delete" role="button"><i class="fa fa-times"></i></span>
                            </div>
                            -->
                        </div>
                        <div id="js_tag_editor_input_text" class='tag-editor-input' contenteditable="true"></div>
                    </div>
                    <div class="message error hidden">
                        Enter tags separated by commas.
                    </div>
                </div>
                <div class="actions">
                    <a id="js_tags_editor_submit" class="button tag-editor-submit" href="#"><span>save</span></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript">
  $(function() {
    var tagListSelector = '#js_rs_details_tags_list';
    var editTagsSelector = '.edit_tags_button';
    var tagEditorSelector = '#js_edit_tags_form';
    var tagEditorInputText = '#js_tag_editor_input_text';

    // Functionalities to be provided by Madjs / Appjs
    function getStartTags() {
      var tags = [];
      $(tagListSelector + ' .tag').each(function () {
        tags.push($(this).html());
      });
      return tags;
    }

    // Show the editor
    function bindEditButton() {
      $(editTagsSelector).click(function () {
        $(tagEditorSelector).removeClass("hidden");
        $(tagListSelector).addClass("hidden");
        $(tagEditorInputText).focus(); // give input focus
        return false;
      });
    }
    bindEditButton();

    // When tagEdit fires on save event callback
    function onSave(tags) {
      // remove old list
      $(tagListSelector).empty();

      // if there is no tag display something
      if (tags.length === 0) {
        var html = "<div class='edit_tags_button'>There is no tag, click here to add one.</div>";
        $(tagListSelector).append(html);
        bindEditButton();
      } else {
        // add the tags to the sidebar
        tags.forEach(function(tag) {
          var html = '<li><div class="tag">' + tag + '</div></li>';
          $(tagListSelector).append(html);
        });
      }

      $(tagListSelector).removeClass("hidden");
      $(tagEditorSelector).addClass("hidden");
    }

    // When tagEditor fires change event callback
    function onChange (tags) {
      console.log(tags);
    }

    // The TagEditor setup itself
    $(tagEditorSelector).tagEditor({
      startTags : getStartTags(),
      onSave : onSave,
      onChange : onChange
    });

  });
</script>