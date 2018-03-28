<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
    <script src="js/chosen.jquery.js"></script>
</head>
<body>
<div id="container" class="page services featured cart">
    <?php include('includes/headers/AA_header.php'); ?>

<!--    <div class="page-row intro">-->
<!--        <div class="grid grid-responsive-12">-->
<!--            <div class="row">-->
<!--                <div class="col12">-->
<!--                    <h1>Your choice: </h1>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

    <div class="page-row cart">
        <div class="grid grid-responsive-12">
	        <div class="row">
                <div class="col12">
                    <h1>Your order</h1>
                </div>
		        <div class="col6 box customer_information">
                    <h2>Billing information</h2>
                    <div class="box-content">
                        <form>
                            <div class="singleline clearfix">
                                <div class="input text required">
                                    <label for="first_name">First name</label>
                                    <input type="text" id="first_name" placeholder="First Name" autocomplete="given-name">
                                </div>
                                <div class="input text required">
                                    <label for="last_name">Last name</label>
                                    <input type="text" id="last_name" placeholder="Last Name" autocomplete="family-name">
                                </div>
                            </div>
                            <div class="singleline clearfix">
                                <div class="input text required">
                                    <label for="email_address">Email address</label>
                                    <input type="email" id="email_address" placeholder="Email address" autocomplete="email">
                                </div>
                                <div class="input text required">
                                    <label for="phone_number">Phone number</label>
                                    <input type="text" id="phone_number" placeholder="Phone number">
                                </div>
                            </div>
                            <div class="input text">
                                <label for="organization_name">Organization name</label>
                                <input type="text" id="organization_name" placeholder="Organization name" autocomplete="organization">
                            </div>
                            <div class="input text required">
                                <label for="organization_address">Address</label>
                                <input type="text" id="organization_address" placeholder="Address" autocomplete="street-address">
                            </div>
                            <div class="singleline clearfix">
                                <div class="input text required">
                                    <label for="city">City</label>
                                    <input type="text" id="city" placeholder="City" autocomplete="address-level2">
                                </div>
                                <div class="input text required">
                                    <label for="zip_code">Zip code</label>
                                    <input type="text" id="zip_code" placeholder="Zip Code" autocomplete="postal-code">
                                </div>
                            </div>
                            <div class="input text required">
                                <label for="country">Country</label>
                                <select name="country" id="country" autocomplete="country-name" data-placeholder="Choose a country" class="chosen-select">
                                </select>
                            </div>
                            <div class="input text field-vat">
                                <label for="organization_name">Vat number (if any)</label>
                                <input type="text" id="organization_name" placeholder="Vat number">
                            </div>
                        </form>
                    </div>
		        </div>
		        <div class="col6 last box payment_info">
                    <h2>Passbolt Pro - Startup pack</h2>
                    <div class="box-content">
                        <div class="input text form-group price">
                            <label class="control-label block" for="quantity">Users</label>
                            <input name="products[main][quantity]" id="quantity" value="5" min="1" max="9999999" class="form-control input-small" required="required" type="number">
                            <span class="times">×</span>
                            <div class="price">
                                €44.00 <span class="price-side">per user</span>
                            </div>
                        </div>
                        <p class="license-info">
                            License validity: forever<br>
                            Updates: free for one year
                        </p>

                        <div class="subscription-total">
                            <table class="total-table create">
                                <tbody>
                                <tr>
                                    <td class="text-right">Cost:</td>
                                    <td class="text-right cost">
                                        <span class="cost">€240.00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-right">Vat (10%):</td>
                                    <td class="text-right vat">
                                        <span class="vat">€24.00</span>
                                    </td>
                                </tr>
                                <tr class="total">
                                    <td class="text-right">Order total:</td>
                                    <td class="text-right total-amount">
                                        <span class="order-total-label">€264.00</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
		        </div>
                <div class="col6 last checkout">
                    <a href="https://books.zoho.eu/portal/passbolt/secure?CInvoiceID=2-221a92df47528e1d5f613203ab2cd519376a3701673ee65d27b60f7eb3379cd577724a46555073860ae0ba6fe9e080d616f4794814460a99#/securepayment" class="button primary big payment-button">Proceed to payment</a>
                </div>
	        </div>
        </div>
    </div>

    <?php include('includes/AN_footer.php'); ?>

    <script>
        $(function() {
            var countries = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"};
            for(var i in countries) {
                $('#country').append('<option value="' + i + '">' + countries[i] + '</option>');
            }
            $("#country").chosen();
        });
    </script>
</div>
</body>
</html>