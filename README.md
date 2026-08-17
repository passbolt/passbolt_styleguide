	      ____                  __          ____
	     / __ \____  _____ ____/ /_  ____  / / /_
	    / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
	   / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
	  /_/    \__,_/____/____/_.___/\____/_/\__/

	Open source password manager for teams
	(c) 2026 Passbolt SA
	https://www.passbolt.com

## License

Passbolt - Open source password manager for teams

(c) 2026 Passbolt SA

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
Public License (AGPL) as published by the Free Software Foundation version 3.

The name "Passbolt" is a registered trademark of Passbolt SA, and Passbolt SA hereby declines to grant a trademark
license to "Passbolt" pursuant to the GNU Affero General Public License version 3 Section 7(e), without a separate
agreement with Passbolt SA.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not,
see [GNU Affero General Public License v3](http://www.gnu.org/licenses/agpl-3.0.html).

## About passbolt

Passbolt is an open source password manager for teams. It allows to securely share and store credentials.
For instance, the wifi password of your office, or the administrator password of a router, or your organisation social
media account password, all of them can be secured using Passbolt.

You can try a demo of passbolt at [https://demo.passbolt.com](https://demo.passbolt.com).

You will need to install a plugin, you can find a step by step guide in the website
[help section](https://www.passbolt.com/help/start/firefox)

Or, of course, you can use the code in this repository to build it yourself and run it!

## About passbolt styleguide

The styleguide gathers the UI code shared across passbolt's applications: the browser extension, the desktop application,
and the web application served by the API.

# Contributing

## Reporting a security Issue

If you've found a security related issue in Passbolt, please don't open an issue on GitHub. Follow our responsible disclosure process: https://www.passbolt.com/docs/contribute/security/vulnerability/.

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


How to publish the styleguide?
=============================

We are using npm to manage the styleguide package in project using it.
Checkout npm documentation: https://docs.npmjs.com/developers

In a nutshell, once you are done changing you can publish the styleguide using npm tools as following:

1. Change the version, rebuild and tag the new package.

If you want to bump the minor version of the package by instance to go from v3.1.2 to v3.2.0
```
npm version v3.2.0
```

In a development scenario if you want to publish an alpha version of the package, you might want to go from
v3.1.2 to v3.2.0-alpha-0
```
npm version v3.2.0-alpha.0
```

Npm offers additional versions identifiers to not have to deal manually with the version numbers, if you want check out
the [npm version documentation](https://docs.npmjs.com/cli/v7/commands/npm-version).

2. Publish the new version of the package.

Once the package versioned you can publish it on the npm production channel to make it available to others.
```
npm publish
```

In a development scenario, you would prefer to publish the package on the alpha channel
```
npm publish --tag alpha
```

3. Upgrade the styleguide in the third party projects.

Upgrade the version of the styleguide in your project.
```
npm upgrade passbolt-styleguide
```

In some passbolt projects an additional grunt task help you manage the deployment of the styleguide assets
```
grunt styleguide-update
```

How to use Storybook?
=============================

We try to refer all the styleguide components in Storybook. This way you can play with every single component in
an isolated way.

Besides, we develop any new component by first testing it against Storybook and hence avoiding
the whole application reload.

The Storybook dependencies are installed with the regular `npm install`. Storybook serves the compiled theme CSS
from `build/css`, so build the styleguide first:

```
npm run build
```

To run Storybook, you just need to run the following command:

```
npm run dev:storybook:start
```

Building the related static website is possible as well using the following command:

```
npm run dev:storybook:build
```

Executing the stories locally to ensure no regression was introduced can be done as following. The story tests
run in a Playwright-driven browser; install it once beforehand (this is what `dev:storybook:install` does, it is
not needed for the other Storybook commands):

```
npm run dev:storybook:install
npm run test:storybook
```

Credits
=========

https://www.passbolt.com/credits

