<?
$edit = isset($_GET['mfa_settings']['edit']) && $_GET['mfa_settings']['edit'];
$disabledAttribute = !$edit ? 'disabled="disabled"' : '';
?>
<div class="provider-section totp enabled">
    <h3><span class="input toggle-switch">
        <input class="toggle-switch-checkbox checkbox" id="provider_otp" type="checkbox" checked="checked" <?=$disabledAttribute?>>
        <label class="toggle-switch-button" for="provider_otp"></label>
    </span><label for="provider_otp">Time-based One Time Password</label></h3>
    <p class="description enabled">
        The Time-based One Time Password provider is enabled for all users. They can setup this provider in their profile and use it
        as second factor authentication.
    </p>
    <p class="description disabled">
        The Time-based One Time Password provider is disabled for all users.
    </p>
</div>

<div class="provider-section yubikey enabled">
    <h3><span class="input toggle-switch">
        <input class="toggle-switch-checkbox checkbox" id="provider_yubikey" type="checkbox" checked="checked" <?=$disabledAttribute?>>
        <label class="toggle-switch-button" for="provider_yubikey"></label>
    </span><label for="provider_yubikey">Yubikey</label></h3>
    <p class="description enabled">
        The Yubikey provider is enabled for all users. They can setup this provider in their profile and use it
        as second factor authentication.
    </p>
    <p class="description disabled">
        The Yubikey provider is disabled for all users.
    </p>
    <div class="form-content">
        <div class="input text">
            <label>Client identifier</label>
            <input type="text" class="required fluid" placeholder="123456789" <?=$disabledAttribute?>>
        </div>
        <div class="input text">
            <label>Secret key</label>
            <input type="password" class="required fluid" placeholder="**********" <?=$disabledAttribute?>>
        </div>
    </div>
</div>

<div class="provider-section duo enabled">
    <h3><span class="input toggle-switch">
        <input class="toggle-switch-checkbox checkbox" id="provider_duo" type="checkbox" checked="checked" <?=$disabledAttribute?>>
        <label class="toggle-switch-button" for="provider_duo"></label>
    </span><label for="provider_duo">Duo</label></h3>
    <p class="description enabled">
        The Duo provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.
    </p>
    <p class="description disabled">
        The Duo provider is disabled for all users.
    </p>
    <div class="form-content">
        <div class="input text">
            <label>Hostname</label>
            <input type="text" class="required fluid" placeholder="api-24zlkn4.duosecurity.com" <?=$disabledAttribute?>>
        </div>
        <div class="input text">
            <label>Integration key</label>
            <input type="text" class="required fluid" placeholder="HASJKDSQJO213123KQSLDF" <?=$disabledAttribute?>>
        </div>
        <div class="input text">
            <label>Salt</label>
            <input type="text" class="required fluid" placeholder="**********" <?=$disabledAttribute?>>
        </div>
        <div class="input text">
            <label>Secret key</label>
            <input type="password" class="required fluid" placeholder="**********" <?=$disabledAttribute?>>
        </div>
    </div>
</div>

<script type="application/javascript">
    let checked = true;
    $('.toggle-switch-button').on('click', function() {
        checked = !checked;
        $('.toggle-switch-checkbox').attr('checked', checked);
        $('.provider-section').toggleClass('enabled');
    });
</script>