<meta charset="utf-8">
<title>Passbolt - The simple password management system</title>
<!--
         ____                  __          ____
        / __ \____  _____ ____/ /_  ____  / / /_
       / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
      / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
     /_/    \__,_/____/____/_.___/\____/_/\__/

     The password management solution
	 (c) 2018 Passbolt SARL

 -->
<base href="../src/">
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/devel.css">
<link rel="stylesheet" type="text/css" href="css/external.css">
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/jquery.tag-editor.js"></script>
<script type="application/javascript">
	var cakephpConfig = {
		app: {
			name: "Passbolt",
			punchline: "The simple password management system",
			copyright: "",
			title: "%s | Passbolt",
			version: {
				number: "2.13.3",
				name: "Sauvage",
				song: "http://youtu.be/DaRG0ukxYqQ"
			},
			url: "http://passbolt.dev/",
			debug: "3"
		},
		user: {
			id: "50cdea9c-aa88-46cb-a09b-2f4fd7a10fce"
		},
		roles: {"user": "0208f57a-c5cd-11e1-a0c5-080027796c4c", "admin": "142c1188-c5cd-11e1-a0c5-080027796c4c"},
		image_storage: {
			public_path: "img/public"
		}
	};
</script>
<script type="application/javascript">
	function resizeElement(selector, dimension) {
		if (typeof dimension.height != 'undefined') {
			$(selector).css('height', dimension.height);
		}
		if (typeof dimension.width != 'undefined') {
			$(selector).css('width', dimension.width);
		}
	}
</script>