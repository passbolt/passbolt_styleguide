	      ____                  __          ____
	     / __ \____  _____ ____/ /_  ____  / / /_
	    / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
	   / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
	  /_/    \__,_/____/____/_.___/\____/_/\__/

	The password management solution
	(c) 2016 Bolt Softwares Pvt Ltd


About
=========

This is the official styleguide for Passbolt the open source password manager for teams.
This styleguide is used to extend, minify and test the stylesheets used by the different
passbolt components such as the website, the firefox addon, etc.

In /demo you can copy of the page HTML so that you can test them out. You will need a
simple php webserver, since we use it to factorise some of the includes. Apart from this
the HTML is static.

In /src and /build you can find the assets that are used by other projects, like the images
the less files, the minified css files, fonts, etc.

Legal
==========

Images and logos in /src/img/third_party belongs to their respective owner.
Other images are distributed under creative common BY-NC-SA
https://creativecommons.org/licenses/by-nc-sa/3.0/

Unless otherwise noted, the HTML, PHP, CSS, LESS and JS code is available under the
Free Software Foundation's GNU AGPL v3.0.
http://www.gnu.org/licenses/agpl-3.0.html

Learn more about Passbolt terms and conditions here:
https://www.passbolt.com/terms


Install
=========

Install grunt
```
	npm install -g grunt-cli
```

Install the needed modules defined in the grunt config
```
	npm install
```

Make sure Grunt watch for less changes and compile them into CSS
```
	grunt watch
```

Edit one LESS file to see if it works!


How to update the styleguide?
=============================

We are using npm to manage the styleguide package in project using it.
Checkout npm documentation: https://docs.npmjs.com/developers

In a nutshell, once you are done changing, make sure you change the version
number in the package.json.
```
	{
	  "name": "passbolt-styleguide",
	  "version": "X.X.X",
	  [...]
	}
```

You need to commit your changes and tag the new version of the styleguide.
This is how npm knows a new version is available in the project using the package.
```
	git commit -am 'X.X.X'
	git tag -a X.X.X -m 'X.X.X'
	git push origin X.X.X
	git push
```

Then we publish it again with
```
	npm publish
```

in your project using the npm package you can then run:
```
	npm update
```

You should also have a grunt task to manage the copy/pasting in the right place such as
```
	grunt styleguide-deploy
```
