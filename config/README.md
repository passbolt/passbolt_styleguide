# css-color-diff

`css-color-diff.js` compares the compiled theme CSS of two builds and prints every declaration whose resolved
colour changed. The migration work packages of the "Theme files simplification" specification use it: the reviewer
checks the list against the approved legacy-to-token mapping.

## Usage

Keep a copy of the compiled themes from before the change, build again, then compare the two folders:

```
cp -r build/css/themes /tmp/themes-before
npm run build
node config/css-color-diff.js /tmp/themes-before build/css/themes
```

Both arguments need the same layout: two `build` folders, or two copies of `build/css/themes`. The `*.min.css`
files are paired by their relative path.

## Output

One line per changed declaration, tab-separated: theme, output, selector, property, `old -> new`. Nothing when
the two builds are identical.

```
midgar	ext_app	.button.primary,button.primary	color	#fff -> #123456
```

Every `var(--X)` is resolved against the `:root` block of its own file, nested references included, so a legacy
colour replaced by a token of the same colour does not print. The CSS is parsed with postcss, borrowed from the
build's minimizer (`css-minimizer-webpack-plugin`) since the styleguide does not list it.
