# Gutenberg Experiments for Planet 4

# (WORK IN PROGRESS)

This is a boilerplate repository for React-based Gutenberg blocks.

The idea is to provide a sample structure to build a plugin that will provide React Gutenberg blocks that can also use React in the frontend (which is not the default case in Wordpress).

## Setup

You'll need NPM to install the dependencies, just run `npm install` to install them.

To develop:

- run `npm start` to start a watcher on the `react-blocks/src` directory and rebuild everytime you make a change, output will be at `react-blocks/build`.

- run `npm build` to manually build the files.

## Keypoints - Notes

### `.js` vs `jsx`

`React` development is often (if not always) done in [JSX](https://reactjs.org/docs/introducing-jsx.html), a JS "syntax extension" which *transpiles* (a fancy word for compiling) to browser-valid JS.

WP's default build config uses `.js` for these files, I would advice to use the `.jsx` extension to make it absolutely explicit that these are not Javascript files and they need transpiling.

* TO-DO: update default Webpack config to transform `.jsx` files too.

You need syntax coloring for JSX to get a comfortable development experience. Otherwise you'll hate it.

JSX development happens to be done often in ES6 or ESNext, or "the most recent JS spec". So a JSX file looks like modern Javascript + the JSX goodies, which is pretty much like
having a template language for React components.

Read more:
* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [WTF is JSX by Jason Miller](https://jasonformat.com/wtf-is-jsx/)

### Build Setup

Wordpress provides a single dependency for the whole build setup including:

* Babel: the transpiler for JSX & ES6 syntax to browser-compatible JS
* Webpack: the bundler for all the JS modules and dependency resolution

The default config expects a single entry point which produces a single output bundle and adds two directories to the root.

I customized the config to have this:

```
react-blocks
  src                      - The JSX files
    blocks                   - Block definitions for the editor (title, icon)
    components               - Components used to render the blocks (reusable, shareable)
  build                    - The compiled output
  editorIndex.jsx          - The main JS for the editor
  frontendIndex.jsx        - The main JS for the frontend
```

### PHP Side

Everything is under `includes` and "borrowing" (cof, cof, stealing) code from Stefan's GPCH Gutenberg blocks.
The block files are commented to see how the React block bundles are injected in the editor and the frontend.

For example: `ArcticSunrise.php`

### `edit()`, `save()` and the absence of `render()` or `view()`

WP's native `save()` function for a Gutenberg Block is not what you may expect. It is a *pure function* that you can use if you want to **generate static content using JS in the client side, to be saved on the server**.

A JS Gutenberg Block has two main methods:
- `edit()`: Which renders the block in the editor
- `save()`: Which should output static content based on the value of the block's *attributes*, thus, it is a *pure function* of its *attributes*. The output of `save()` is **escaped**.

`save()` is invoked in several places: when you save the post in the editor, when you focus out of editable fields.

In the frontend, Wordpress will render whatever the output of `save()` was when invoked, so there is no `render()` or `view()` methods in the `registerBlockType` method.

So, `save()` is good for generating static HTML content from the client side. Think of it as if it was a printer.


### Examples

- Static: A pure Gutenberg React static block ("Hello World" example).
- StaticWithAPI: A Gutenberg React block in the editor side, which gets some data from an API.
- Covers: An implementation of our Covers block in Gutenberg/React,  PHP data processing, and PHP rendering.
- ArcticSunrise: A Gutenberg/React block which uses React on the frontend too. This is not WP's default behavior, React is only used in the editor side by default.

### Other notes

- `index.js` naming convention: Redundancy was chosen over abbreviating the import clause in JS because if you use the `MyModule/index.js` default, you'll end up having a zillion files named `index.js`, which I found quite problematic in my experience with large JS codebases.

- Gutenberg is not React. It wraps React, it uses React, and it uses some variants of the popular React stack, like Redux (for WP's "data"). It may divert from some "standard" React patterns you will find online, so this is a thing to keep in mind. The differences are pretty minor.



### Migrating a block from the Blocks plugin

Our goal for the moment is to convert the blocks from Shortcake to Gutenberg.
The rendering part of the block will still be handled by Timber/Twig templates.

In this repository, things that used to be called `someblock-controller.php` are pretty much the block files inside `includes/blocks`.

A good place to start would be the [Covers.php](includes/blocks/Covers.php) file.

We need to make some changes in the Master Theme and the Blocks Plugin to make the Gutenberg blocks
work with our current setup.

### Recommended reading

- Everything on ES6 syntax features: specially destructuring, the spread operator, arrow functions, generators.
- https://riad.blog/2018/06/07/efficient-client-data-management-for-wordpress-plugins/
- https://theeventscalendar.com/rolling-our-own-redux-gutenberg-block-editor/
