<div class="container page quickaccess">
    <?php include('components/quickaccess_header.php'); ?>
    <div class="passphrase">
        <div class="back-link">
            <a class="primary-action">
                <span class="primary-action-title">Passphrase required</span>
            </a>
            <a href="#" class="secondary-action button-icon button">
                <span class="fa icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                </span>
                <span class="visually-hidden">cancel</span>
            </a>
        </div>
        <div class="too-many-attempts-error">
            Your passphrase is wrong ! The operation has been aborted.
        </div>
        <div class="submit-wrapper">
            <a class="button primary big full-width" role="button" autoFocus onClick={this.handleCloseButtonClick}>
            close
            </a>
        </div>
        </div>
    </div>
</div> 