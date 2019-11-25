<div class="dialog-wrapper">
    <div class="dialog create-password-dialog">
        <div class="dialog-header">
            <h2>Create a password</h2>
            <a class="dialog-close" role="button" href="demo/LU_passwords.php">
                <?php include('../includes/svg-icons/close.php'); ?>
                <span class="visually-hidden">cancel</span>
            </a>
        </div>
        <div class="dialog-content">
            <form novalidate="">
                <div class="form-content">
                    <div class="input text required">
                        <label for="create-password-form-name">Name</label>
                        <input id="create-password-form-name" name="name" type="text" class="required fluid" maxlength="64" required="" autocomplete="off" value="">
                    </div>
                    <div class="input text">
                        <label for="create-password-form-uri">URL</label>
                        <input id="create-password-form-uri" name="uri" class="fluid" maxlength="1024" type="text" autocomplete="off" value="">
                    </div>
                    <div class="input text">
                        <label for="create-password-form-username">Username</label>
                        <input id="create-password-form-username" name="username" type="text" class="fluid" maxlength="64" autocomplete="off" value="">
                    </div>
                    <div class="input-password-wrapper required">
                        <label for="create-password-form-password">Password</label>
                        <div class="input text password">
                            <input id="create-password-form-password" name="password" class="required" placeholder="Password" required="" type="password" value="yW?&amp;9kk8^}uR99Uzt0">
                            <div class="security-token" style="background: rgb(255, 58, 58) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">
                                ADM
                            </div>
                        </div>
                        <ul class="actions inline">
                            <li>
                                <a class="password-view button button-icon button-toggle">
                                    <?php include('../includes/svg-icons/view.php'); ?>
                                    <span class="visually-hidden">view</span>
                                </a>
                            </li>
                            <li>
                                <a class="password-generate button-icon button">
                                    <?php include('../includes/svg-icons/generate.php'); ?>
                                    <span class="visually-hidden">generate</span>
                                </a>
                            </li>
                        </ul>
                        <div class="password-complexity strong">
                            <span class="progress"><span class="progress-bar strong"></span></span>
                            <span class="complexity-text">complexity: <strong>strong</strong></span>
                        </div>
                    </div>
                    <div class="input textarea">
                        <label for="create-password-form-description">Description
                            <span class="tooltip tooltip-right" data-tooltip="Do not store sensitive data. This field is not end to end encrypted.">
                                <?php include('../includes/svg-icons/warning.php'); ?>
                            </span>
                        </label>
                        <textarea id="create-password-form-description" name="description" maxlength="10000" class="required" placeholder="add a description"></textarea>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input type="submit" class="button primary" role="button" value="Create">
                    <a class="cancel" role="button">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>