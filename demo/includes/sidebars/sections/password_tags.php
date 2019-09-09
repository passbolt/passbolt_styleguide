<?php include(dirname(__DIR__) . '/../../fixtures/tags.php'); ?>
<!-- Tags management -->
<div id="js_rs_details_tags" class="clearfix accordion open sidebar-section">
    <div class="accordion-header">
        <h4><a href="#" role="button">Tags</a></h4>
    </div>
    <div class="accordion-content">
        <a id="js_edit_tags_button" class="edit_tags_button section-action" href="#">
        <span class="fa icon">
						<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"></path></svg>
					</span>
            <span class="visuallyhidden">edit</span>
        </a>
<?php if (!isset($_GET['empty'])) { ?>
        <ul id="js_rs_details_tags_list" class="tags tags-list">
<?php foreach ($tags as $i => $tag) : ?>
            <li>
                <a href="#" class="tag"><?= $tag['name']; ?></a>
            </li>
<?php endforeach; ?>
        </ul>
<?php } else { ?>
        <em>There is no tag, click edit to add one</em>
<?php } ?>
        <div id="js_edit_tags_form" class="tags-edit-wrapper hidden form">
            <div class="form-content">
                <div id="js_tags_editor" class="input tag-editor">
                    <div class="tag-editor-input-wrapper">
                        <div class="tags">
                            <!-- predefined value can be set with
                            -->
                            <div class="tag">
                                <span class="tag-content">#shared</span>
                            </div>
                        </div>
                        <div id="js_tag_editor_input_text" class='tag-editor-input' contenteditable="true"></div>
                    </div>
                    <div class="message error hidden">
                        Enter tags separated by commas.
                    </div>
                    <div class="message notice">
                        <i class="fa fa-fw fa-info-circle"></i>
                        <strong>Pro tip:</strong> Tags starting with # are shared with all users who have access.
                        Separate tags using comas.
                    </div>
                </div>
                <div class="actions">
                    <a id="js_tags_editor_submit" class="button tag-editor-submit" role="button"><span>Save</span></a>
                    <a id="js_tags_editor_cancel" class="button cancel tag-editor-cancel" role="button"><span>Cancel</span></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript" src="src/js/autocomplete.js"></script>
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

    // Autocomplete
    var auto = new autoComplete({
      selector: '#js_tag_editor_input_text',
      minChars: 1,
      source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['alpha', 'beta', 'charlie', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'super-long-tag'];
        var matches = [];
        for (i=0; i<choices.length; i++)
          if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
      }
    });
  });
</script>