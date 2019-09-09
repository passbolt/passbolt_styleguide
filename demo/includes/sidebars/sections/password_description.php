<!-- Description management -->
<div id="js_rs_details_description" class="description accordion closed sidebar-section">
    <div class="accordion-header">
        <h4><a href="#" role="button">Description</a></h4>
    </div>
    <div class="accordion-content">
        <a id="js_edit_description_button" class="edit_description_button section-action" href="#">
        <span class="fa icon">
            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"></path></svg>
        </span>
        <span class="visuallyhidden">Edit</span>
        </a>

        <p class="description_content">
            <?php if (!isset($_GET['empty'])) { ?>
                Inkscape is a professional vector graphics editor. It is free and open source.
            <?php } else { ?>
                <em>There is no tag, click edit to add one</em>
            <?php } ?>
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
                    <textarea data-view-id="366" placeholder="Enter a description" maxlength="150"
                          class="js_resource_description required mad_form_textbox form-element mad_view_form_textbox ready"
                          name="data[Resource][description]"
                          id="e2ffe169-bc70-b2af-1c91-6d9c900d41c6">Inkscape is a professional vector graphics editor. It is free and open source.
                    </textarea>
                    <div class="message notice">
                        <span class="fa icon">
							<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
                        </span>
                        <span>
                            <strong>Pro tip:</strong> Description will not be encrypted.
                        </span>
                    </div>
                    <div class="js_resource_description_feedback message mad_form_feedback js_component mad_view error" id="e5a44513-944c-a83c-22d8-d3904f59bcf5">
                        The description be between 1 and 10,000 char in length.</div>
                    <div class="js_resource_description_feedback message mad_form_feedback js_component mad_view ready"
                         id="a788eb82-39c0-e249-47ed-add66a43c018">
                    </div>
                </div>
                <div class="actions">
                    <input type="submit" value="Save" class="button description-submit">
                    <a class="button cancel description-editor-cancel" role="button"><span>Cancel</span></a>
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