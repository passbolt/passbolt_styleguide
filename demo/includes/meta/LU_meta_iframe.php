<base href="../src/">
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<link rel="stylesheet" type="text/css" href="css/main_webext.css">
<script src="js/jquery-2.2.4.min.js"></script>
<script type="application/javascript">
	var resizeIframe = function(selector, options) {
		// Get the dimension of the current document.
		var dimension = {
			width: $('html').outerWidth(),
			height: $('html').outerHeight()
		};
		// If options given, override the dimensions found before.
		if (typeof options != 'undefined') {
			if (options.width) {
				dimension.width = options.width;
			}
			if (options.height) {
				dimension.height = options.height;
			}
		}
		// Request the application worker to resize the iframe container.
		window.parent.resizeElement(selector, dimension);
	};
</script>