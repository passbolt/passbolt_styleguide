<!-- Description management -->
<div id="js_rs_details_description" class="description accordion closed sidebar-section">
    <div class="accordion-header">
        <h4><a href="#" role="button">Description</a></h4>
    </div>
    <div class="accordion-content">
        <a id="js_edit_description_button" class="edit_description_button section-action" href="#">
            <i class="fa fa-fw fa-edit"></i>
            <span class="visuallyhidden">edit</span>
        </a>

        <p class="description_content"><?= !$_GET['empty'] ? 'Inkscape is a professional vector graphics editor. It is free and open source.' : '<em>There is no description, click edit to add one</em>' ?>
        </p>

        <!-- edit description form -->
        <div id="js_rs_details_edit_description"
             class="passbolt_form_resource_edit_description form mad_view_form hidden">
            <div class="form-content resource-description-edit-wrapper">
                <input type="hidden"
                       class="js_resource_id required mad_form_textbox form-element mad_view_form_textbox ready"
                       name="data[Resource][id]" id="fea26624-592a-20e2-52d0-51f86413d7da"
                       value="17c66127-0c5e-3510-a497-2e6a105109db">
                <div class="input text required js_form_element_wrapper">
                    <textarea data-view-id="366" placeholder="enter description" maxlength="150"
                          class="js_resource_description required mad_form_textbox form-element mad_view_form_textbox ready"
                          name="data[Resource][description]"
                          id="e2ffe169-bc70-b2af-1c91-6d9c900d41c6">Inkscape is a professional vector graphics editor. It is free and open source.
                    </textarea>
                    <div class="js_resource_description_feedback message mad_form_feedback js_component mad_view error" id="e5a44513-944c-a83c-22d8-d3904f59bcf5">
                        The description be between 1 and 10,000 char in length.</div>
                    <div class="js_resource_description_feedback message mad_form_feedback js_component mad_view ready"
                         id="a788eb82-39c0-e249-47ed-add66a43c018">
                    </div>
                </div>
                <div class="actions">
                    <input type="submit" value="save" class="button description-submit">
                    <a class="button cancel tag-editor-cancel" role="button"><span>cancel</span></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript">
    // Demo only
    function edit_description() {
      $('#js_rs_details_description #js_rs_details_edit_description').removeClass('hidden');
      $('#js_rs_details_description .description_content').addClass('hidden');
      return false;
    }

    $('.description_content').click(edit_description);
    $('#js_rs_details_description #js_edit_description_button').click(edit_description);

    $('#js_rs_details_description .description-submit').click(function() {
      $('#js_rs_details_description #js_rs_details_edit_description').addClass('hidden');
      $('#js_rs_details_description .description_content').removeClass('hidden');
      return false;
    });
</script>