<!-- Comments management -->
<div id="js_rs_details_comments" class="accordion closed comments sidebar-section">
    <div class="accordion-header">
        <h4><a href="#" role="button">Comments</a></h4>
    </div>
    <div class="accordion-content">
        <a class="js_add_comment section-action" href="#">
            <i class="fa fa-fw fa-plus-circle"></i>
            <span class="visuallyhidden">create</span>
        </a>
        <div id="js_rs_details_comments_add_form" class="passbolt_form_comment_create form mad_view_form ready" style="">
            <ul>
                <li class="comment-wrapper">
                    <form class="form comment add" id="js_comment_add_form">
                        <div class="wrap-right-column">
                            <div class="right-column">
                                <div class="form-content">
                                    <input type="hidden"
                                           class="js_comment_parent_id required mad_form_textbox form-element mad_view_form_textbox success"
                                           name="data[comment][parent_id]" id="d1d6dc84-07be-7bfe-f1e9-fb3b822778ef"
                                           value="">
                                    <input type="hidden"
                                           class="js_comment_foreign_id required mad_form_textbox form-element mad_view_form_textbox success"
                                           name="data[comment][foreign_id]"
                                           id="a78119d7-fc25-3929-0369-10f9903451e4"
                                           value="17c66127-0c5e-3510-a497-2e6a105109db">
                                    <input type="hidden"
                                           class="js_comment_foreign_model required mad_form_textbox form-element mad_view_form_textbox success"
                                           name="data[comment][foreign_model]"
                                           id="267f9d06-58a3-9b6f-e7c4-6f2e1270d66e" value="Resource">
                                    <div class="input textarea required">
                                        <label for="js_field_comment_content">Add a comment</label>
                                        <textarea data-view-id="368" placeholder="add a comment" maxlength="150"
                                                  class="js_comment_content required mad_form_textbox form-element mad_view_form_textbox success"
                                                  name="data[comment][content]"
                                                  id="js_field_comment_content"></textarea>
                                        <div class="js_comment_content_feedback message mad_form_feedback js_component mad_view success"
                                             id="3f0c54bf-9007-a18f-dcd4-4c6c792b8cac"></div>
                                    </div>
                                    <div class="metadata">
                                        <span class="author username"><a href="#">You</a></span>
                                        <span class="modified">right now</span>
                                    </div>
                                    <div class="actions">
                                        <a class="button comment-submit" href="#"><span>send</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="left-column">
                            <div class="author profile picture"><a href="#">
                                    <img data-view-id="367"
                                                                                 alt="Ada Lovelace avatar"
                                                                                 src="img/avatar/user.png"></a>
                            </div>
                        </div>
                    </form>


                </li>
            </ul>
        </div>
        <ul id="js_rs_details_comments_list"
            class="passbolt_component_comments_list tree passbolt_view_component_comments_list ready">
            <li data-view-id="372" id="56546239-2db8-4ab9-b634-0958ac110004" class="comment-wrapper">
                <div class="comment">
                    <div class="wrap-right-column">
                        <div class="right-column">
                            <div class="content-wrapper">
                                <p>This is a long comment that spread accross multiple lines. Hopefully the layout
                                    is
                                    not broken. You never know with these cheeky ones.</p>
                                <div class="metadata">
                                    <span class="author username"><a href="#">Ada Lovelace</a></span>
                                    <span class="modified">6 hours ago</span>
                                </div>
                                <div class="actions">
                                    <ul>
                                        <li>
                                            <a class="js_delete_comment" href="#">
                                                <i class="fa fa-fw fa-trash"></i>
                                                <span class="visuallyhidden">delete</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-column">
                        <div class="author profile picture">
                            <a href="#">
                                <img data-view-id="373" alt="comment author picture" src="img/avatar/user.png">
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li data-view-id="370" id="56546232-c3a0-4bb2-aed8-05c1ac110005" class="comment-wrapper">
                <div class="comment">
                    <div class="wrap-right-column">
                        <div class="right-column">
                            <div class="content-wrapper">
                                <p>This is a short comment.</p>
                                <div class="metadata">
                                    <span class="author username"><a href="#">Ada Lovelace</a></span>
                                    <span class="modified">One year ago</span>
                                </div>
                                <div class="actions">
                                    <ul>
                                        <li>
                                            <a class="js_delete_comment" href="#">
                                                <i class="fa fa-fw fa-trash"></i>
                                                <span class="visuallyhidden">delete</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-column">
                        <div class="author profile picture">
                            <a href="#">
                                <img data-view-id="373" alt="comment author picture" src="img/avatar/user.png">
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
