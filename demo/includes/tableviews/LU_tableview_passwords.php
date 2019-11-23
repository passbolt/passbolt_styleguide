<?php include('fixtures/resources.php'); ?>
<div id="js_wsp_pwd_browser" class="tableview passbolt_component_password_browser passbolt_view_component_password_browser selection">
    <div class="tableview-header">
        <table>
            <?php include('includes/tableviews/LU_tableview_passwords_table_header.php'); ?>
        </table>
    </div>
    <div class="tableview-content scroll">
        <table>
            <tbody>
            <?php for ($i = 0; $i < sizeof($resources); $i++): $resource = $resources[$i]; ?>
                <tr class="<?php if (!$i) echo 'selected'; ?>" id="resource<?= $resource['id']; ?>">
                    <td class="js_grid_column_multipleSelect cell_multipleSelect selections s-cell">
                        <div>
                            <div class="mad_form_checkbox js_checkbox_multiple_select mad_view_form_checkbox ready"
                                 id="multiple_select_checkbox_<?php $resource['id']; ?>">
                                <div class="input checkbox">
                                    <input <?php if (!$i) echo 'checked'; ?> type="checkbox" value="<?= $resource['id']; ?>" id="checkbox<?= $resource['id']; ?>">
                                    <label for="checkbox<?= $resource['id']; ?>"></label>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="js_grid_column_favorite cell_favorite selections s-cell">
                        <div>
                            <div class="passbolt_component_favorite js_component passbolt_view_component_favorite ready" id="favorite_<?= $resource['id']; ?>">
                                <a href="#" class="">
                                    <i class="icon fav"></i>
                                    <span class="visuallyhidden">add to favorites</span>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td class="js_grid_column_avatar grid_column_avatar grid_column_avatar s1-cell cell_avatar">
                        <div title="">
                            <?php include('includes/svg-icons/folder.php'); ?>
                        </div>
                    </td>
                    <td class="js_grid_column_name cell_name m-cell" data-view-id="1424">
                        <div title="<?= $resource['name']; ?>" data-view-id="1425">
                            <?= $resource['name']; ?>
                        </div>
                    </td>
                    <td class="js_grid_column_username cell_username m-cell" data-view-id="1426">
                        <div title="<?= $resource['username']; ?>" data-view-id="1427">
                            <?= $resource['username']; ?>
                        </div>
                    </td>
                    <td class="js_grid_column_secret cell_secret m-cell password">
                        <div title="" data-view-id="1429">
                            <div class="secret-copy">
                                <a id="grid_secret_copy_<?= $resource['id']; ?>" href="#copy_secret">
                                    <span>copy password to clipboard</span>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td class="js_grid_column_uri cell_uri l-cell">
                        <div title="<?= $resource['uri']; ?>" data-view-id="1431">
                            <a href="<?= $resource['uri']; ?>">
                                <?= $resource['uri']; ?>
                            </a>
                        </div>
                    </td>
                    <td class="js_grid_column_modified cell_modified m-cell">
                        <div title="<?= $resource['modified']; ?>">
                            <?= $resource['modified']; ?>
                        </div>
                    </td>
                </tr>
            <?php endfor; ?>
            </tbody>
        </table>
    </div>
</div>

<?php include('includes/inline-scripts/LU_tableview_password_drag_and_drop.php'); ?>
<?php include('includes/inline-scripts/LU_tableview_row_selection.php'); ?>

