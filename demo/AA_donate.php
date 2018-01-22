<!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
    <link rel="stylesheet" type="text/css" href="css/checkout.css" />

    <script src="https://js.stripe.com/v3/"></script>
	<script type="application/javascript">
      $(function() {
        var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
        var elements = stripe.elements();

        var card = elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '15px',

              '::placeholder': {
                color: '#CFD7E0',
              },
            },
          }
        });
        card.mount('#card-element');

        function setOutcome(result) {
          var successElement = document.querySelector('.success');
          var errorElement = document.querySelector('.error');
          successElement.classList.remove('visible');
          errorElement.classList.remove('visible');

          if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            successElement.querySelector('.token').textContent = result.token.id;
            successElement.classList.add('visible');
          } else if (result.error) {
            errorElement.textContent = result.error.message;
            errorElement.classList.add('visible');
          }
        }

        card.on('change', function (event) {
          setOutcome(event);
        });

        document.querySelector('form').addEventListener('submit', function (e) {
          e.preventDefault();
          var form = document.querySelector('form');
          var extraDetails = {
            name: form.querySelector('input[name=cardholder-name]').value,
          };
          stripe.createToken(card, extraDetails).then(setOutcome);
        });
      });
    </script>
</head>
<body>
<div id="container" class="page donate checkout">
    <?php include('includes/headers/AA_header.php'); ?>

    <div class="page-row">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col8">
                    <h1>Welcome to passbolt!</h1>
<!--                    <div class="form">-->
                    <form class="stripe">
                        <div class="group">
                            <div class="input text required">
                                <label for="cardholder-name">Cardholder name</label>
                                <input name="cardholder-name" class="required fluid" maxlength="255" type="text" required="required"/>
                            </div>
                        </div>
                        <div class="group">
                            <div class="input text required">
                                <label for="card-element">Card</label>
                                <div id="card-element" class="field"></div>
                            </div>
                        </div>
                        <div class="submit-wrapper clearfix">
                            <button type="submit" class="button primary big">Pay $25</button>
                        </div>
                        <div class="outcome">
                            <div class="error" role="alert"></div>
                            <div class="success">
                                Success! Your Stripe token is <span class="token"></span>
                            </div>
                        </div>
                    </form>
<!--                    </div>-->


                </div>
                <div class="col4 last">
                    <!--- --->
                </div>
            </div>
        </div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>