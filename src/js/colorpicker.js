$(document).ready(function() {
	/* color picker */
	var fb = $.farbtastic('#js_colorpicker');
	var txtvalue = "";
	var txtpossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*(){}[]:;!@#$%^&*_-+=|';
	var colorpossible = 'ABCDEF0123456789';

	/* callback on color picking selection */
	fb.linkTo(function(color){
		var txtcolor = fb.hsl[2] > 0.5 ? '#000' : '#fff';
		$('#js_security_token_text')
			.css('color',txtcolor)
			.css('background-color',color);
		$('#js_security_token_background').val(color);
		$('#js_security_token_color').val(txtcolor);

	});

	/* set some random letters */
	var i=0;
	var randcolor = '';
	var randtext = '';
	for( ; i < 3; i++ )
		randtext += txtpossible.charAt(Math.floor(Math.random() * txtpossible.length));
	$('#js_security_token_text').val(randtext);

	/* set some random color */
	for(i=0; i < 6; i++ )
		randcolor += colorpossible.charAt(Math.floor(Math.random() * colorpossible.length));
	fb.setColor('#' + randcolor);

});