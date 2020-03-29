<br />
<div class="warning message" id="email-notification-setting-overridden-banner">
  <p>
    Settings have been found in your database as well as in your passbolt.php (or environment variables). The settings displayed in the form below are the one stored in your database and have precedence over others.
  </p>
</div>
<h3>SMTP server</h3>
<div class="input text required">
  <label for="SmtpHost">SMTP host</label>
  <input name="data[Smtp][host]" class="required fluid" id="SmtpHost" required="required" type="text" placeholder="host name or ip address">
</div>
<div class="input text required">
  <label for="SmtpTls">Use TLS?</label>
  <select name="data[Smtp][tls]" class="required fluid" id="SmtpTls" required="required">
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>
</div>
<div class="input text required">
  <label for="SmtpPort">Port</label>
  <input name="data[Smtp][port]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="port" value="587">
</div>
<div class="input text">
  <label for="SmtpUsername">Username</label>
  <input name="data[Smtp][username]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="username">
</div>
<div class="input text">
  <label for="SmtpPassword">Password</label>
  <input name="data[Smtp][password]" class="required fluid" id="SmtpPassword" required="required" type="password" placeholder="password">
</div>