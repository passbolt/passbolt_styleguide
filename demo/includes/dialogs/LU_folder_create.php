<div class="create-folder-dialog dialog-wrapper">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                <span>New folder</span>
            </h2>
            <a href="demo/LU_passwords_folders.php" class="dialog-close">
                <?php include('includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">Close</span>
            </a>
        </div>
        <div class="dialog-content">
            <form id="js_folder_create_form" class="create-form folder_create_form">
                <div class="form-content">
                    <div class="input text required clearfix js_form_element_wrapper">
                        <label for="folder-name">Name</label>
                        <input id="folder-name" class="required" maxlength="50" type="text" placeholder="Untitled folder" />
                    </div>
                    <div class="input required location">
                        <label for="folder-location">Location</label>
                        <div class="location-input">
                            <div class="breadcrumbs">
                                <ul>
                                    <li>Folders</li>
                                    <li>Plants</li>
                                    <li>Long folder name that shouldn't breaks things</li>
                                </ul>
                            </div>
                            <a href="#" role="button" class="button">Change</a>
                        </div>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input class="button primary" value="Create" data-view-id="423" type="submit">
                    <a class="cancel" href="demo/LU_passwords_folders.php">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>