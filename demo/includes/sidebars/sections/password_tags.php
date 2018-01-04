<?php include(dirname(__DIR__) . '../../fixtures/tags.php'); ?>
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
        <ul id="js_rs_details_tags_list" class="tags">
<?php foreach ($tags as $i => $tag) : ?>
            <li>
                <a href="#" class="tag"><?= $tag['name']; ?></a>
            </li>
<?php endforeach; ?>
        </ul>
        <div id="js_edit_tags_form" class="tags-edit-wrapper form hidden">
            <div class="form-content">
                <div id="js_tags_editor" class="input tag-editor">
                    <div class="tag-editor-input-wrapper">
                        <div class="tags">
                            <div class="tag">
                                <span class="tag-content">alpha</span>
                                <span class="tag-delete"><i class="fa fa-times"></i></span>
                            </div>
                            <div class="tag">
                                <span class="tag-content">beta</span>
                                <span class="tag-delete"><i class="fa fa-times"></i></span>
                            </div>
                            <div class="tag">
                                <span class="tag-content">charly</span>
                                <span class="tag-delete"><i class="fa fa-times"></i></span>
                            </div>
                        </div>
                        <input id="js_tag_editor_input_text" type="text" value="test"/>
                    </div>
                    <div class="message error hidden">
                        Enter tags separated by commas.
                    </div>
                </div>
                <div class="actions">
                    <a id="js_edit_tags_form_button" class="button tag-submit" href="#"><span>save</span></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript">
  // Demo only
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .trim();
  }

  // Control the behavior inside the editor
  function tag_editor() {
    function onFocus() {
      $('#js_tag_editor_input_text').focus();
    }

    // Add the tag to the existing list
    function createTag(tag) {
      // keep \n in template for regular spacing
      var html = '<div class="tag">\n' +
        '<span class="tag-content">' + escapeHtml(tag) + '</span>\n' +
        '<span class="tag-delete"><i class="fa fa-times"></i></span>\n' +
        '</div>';
      $('#js_tags_editor .tags').append(html);
      bindDeleteButtons();
    }

    // Get the current value of the text input
    function getInputValue() {
      return $('#js_tag_editor_input_text').val();
    }

    // Reset the value of the tag text input
    function resetInputValue() {
      $('#js_tag_editor_input_text').val('');
    }

    // When user press backspace
    function onPressDelete(event) {
      if(!$('#js_tag_editor_input_text').val()) {
        $('#js_tags_editor .tag').last().remove();
        event.preventDefault();
      }
    }

    // When user press enter (or , or ;)
    function onPressEnter(event) {
      if(getInputValue()) {
        createTag(getInputValue());
        resetInputValue();
      }
      event.preventDefault();
    }

    // When user paste in the field
    function onPaste(event) {
      var pastedData = event.originalEvent.clipboardData.getData('text');
      var tags = pastedData.split(new RegExp(',|;', 'g'));
      console.log(tags);
      tags.forEach(function(tag) {
        createTag(tag);
      });
      resetInputValue();
    }

    // give focus to input text when clicking wherever
    $('#js_tags_editor').click(function () {
      onFocus();
    });

    // delete tag clicking on a tag 'x'
    function bindDeleteButtons() {
      $('#js_tags_editor .tag-delete').click(function () {
        $(this).parent().remove();
      });
    }

    // handle pasting in input
    $('#js_tag_editor_input_text').bind("paste", function(e) {
      onPaste(e);
    });

    // Handle typing in the input
    $("#js_tag_editor_input_text").keypress(function(event) {
      if (event.which === 8) { /* on delete */
        onPressDelete(event);
        return;
      }
      if (event.which === 13 || event.which === 44 || event.which === 39) { /* on enter or , or ; */
        onPressEnter(event);
        return;
      }
    });

    $("#js_edit_tags_form_button").click(function() {
      $("#js_edit_tags_form").addClass("hidden");
      $("#js_rs_details_tags_list").removeClass("hidden");
      return false;
    });

    $("#js_edit_tags_form").removeClass("hidden");
    $("#js_rs_details_tags_list").addClass("hidden");
    $('#js_tag_editor_input_text').val();
    bindDeleteButtons();
    return false;
  }

  $("#js_edit_tags_button").click(tag_editor);
  tag_editor();

</script>