###atom-package-dependencies

This is a wrapper/install package that will install [package-dependencies](https://atom.io/packages/package-dependencies) when required in a `package.json` file.

Having this node package in your dependencies ensures that others who download your package will have the Atom `package-dependencies`, allowing your package to  depend on other Atom packages (i.e. force download if not already installed).

**TODO:**

- [ ] run atom-dependencies:update when this package is included in "dependencies" of `package.json`

- [ ] Expose `require('pack')` for Atom packages
