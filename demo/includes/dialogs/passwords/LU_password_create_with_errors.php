<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/src/css/themes/default/ext_app.css">
</head>

<body>
<div class="contain-item">
    <div id="app-container" class="container-wrapper">
        <div id="app" class="app" tabindex="1000">
            <div class="dialog-wrapper">
                <div class="dialog create-password-dialog">
                    <div class="dialog-header"><h2>Create a password</h2><a class="dialog-close" role="button"><span class="fa icon"><svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path
                                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></span><span
                                    class="visually-hidden">cancel</span></a></div>
                    <div class="dialog-content">
                        <form novalidate="">
                            <div class="form-content">
                                <div class="input text required error"><label
                                            for="create-password-form-name">Name</label><input
                                            id="create-password-form-name" name="name" type="text"
                                            class="required fluid" maxlength="64" required="" autocomplete="off"
                                            value="">
                                    <div class="name error message">A name is required.</div>
                                </div>
                                <div class="input text "><label for="create-password-form-uri">URL</label><input
                                            id="create-password-form-uri" name="uri" class="fluid" maxlength="1024"
                                            type="text" vautocomplete="off" alue=""></div>
                                <div class="input text "><label
                                            for="create-password-form-username">Username</label><input
                                            id="create-password-form-username" name="username" type="text" class="fluid"
                                            maxlength="64" autocomplete="off" value=""></div>
                                <div class="input-password-wrapper required  input error"><label
                                            for="create-password-form-password">Password</label>
                                    <div class="input text password"><input id="create-password-form-password"
                                                name="password" class="required" placeholder="Password" required=""
                                                type="password" value="" style="">
                                        <div class="security-token"
                                                style="background: rgb(255, 58, 58) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">ADM
                                        </div>
                                    </div>
                                    <ul class="actions inline">
                                        <li><a class="password-view button button-icon button-toggle "><span
                                                        class="fa icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"><path
                                                                d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z"></path></svg></span><span
                                                        class="visually-hidden">view</span></a></li>
                                        <li><a class="password-generate button-icon button"><span class="fa icon"><svg
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path
                                                                d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z"></path></svg></span><span
                                                        class="visually-hidden">generate</span></a></li>
                                    </ul>
                                    <div class="password-complexity not_available"><span class="progress"><span
                                                    class="progress-bar not_available"></span></span><span
                                                class="complexity-text">complexity: <strong>n/a</strong></span></div>
                                    <div class="input text">
                                        <div class="password message error">A password is required.</div>
                                    </div>
                                </div>
                                <div class="input textarea"><label
                                            for="create-password-form-description">Description</label><textarea
                                            id="create-password-form-description" name="description" maxlength="10000"
                                            class="required" placeholder="add a description"></textarea></div>
                            </div>
                            <div class="submit-wrapper clearfix"><input type="submit" class="button primary"
                                        role="button" value="Create"><a class="cancel" focusable="true">Cancel</a></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>