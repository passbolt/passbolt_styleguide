<div class="page-row cli">
	<div class="grid grid-responsive-12">
		<div class="row">
			<div class="col5">
				<h2>Coming soon to a terminal near you!</h2>
				<p>
					Because system administrator appreciation day should be everyday we started building
					a client based on nodejs. Come join us!
				</p>
				<a href="#" class="button cancel big">
					<i class="fa fa-fw fa-github"></i>
					Show me the code!
				</a>
			</div>
			<div class="col7 last">
				<div class="cli-window">
					<div class="cli-header"><span class="visuallyhidden">Command line example</span></div>
					<div class="cli-code">
<pre>
$ passbolt find --name=root@192.168.0.1
d1acbfc1-78d8-3e25-ad8b-7ab1eb0332dc

$ passbolt get d1acbfc1-78d8-3e25-ad8b-7ab1eb0332dc
-----BEGIN PGP MESSAGE-----
Version: GnuPG v2

hQIMAw0P12ReHhxtAQ//cgr5H+SxUNoIoLsACRlyPDyXeZ6Liyksv
TB9RVSuuO225+HgQUwkRIUQ6ufyGi/VXlw2uwrDdixhWQ600UwSQN
k7pogSmKC4bCiEWy/NGlZz6hscz0hN89c+tx3wjFRsXnGsvKVnRCM
FN/pSWklYlym1Se+0banl3/EPve2
=Bhgw
-----END PGP MESSAGE-----

$ gpg --decrypt $(passbolt get last)
please enter passphrase: <span class="blink seriously">█</span>
</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
