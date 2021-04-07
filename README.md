# Minimalistic Web Components Starter App

This is a web components starter app which runs on the very minimal amount of scaffolding,
just enough to build for production and run a development server.

For bundling and minifaction it is using [ES Build](https://esbuild.github.io/). Currently the fastest bundling tool.

For development server it is using a custom pure node js server without express which only purpose is to serve assets.

For web components, a library is used [Hybrids JS](https://hybrids.js.org) just for having a more simplified usage of web components.

## Why

You don't always need webpack, parcel or other bundlers, and web components are now pretty much supported by all browsers so why not go light on everything?

Whole node_modules is under 12MB for the whole development server and the minimal amount of libraries used.

And as a final thing, the whole build pipeline is hackable so you can add whatever you need, as long as you know even a bit of NodeJS.

## Usage

### Development server mode

Just run `npm run serve`
Changes are detected automatically and page is reloaded after they are detected. No HMR because it is usually buggy and you end up reloading the page anyways.

Development build result will be in `dist` directory. Sourcemap is generated too so development is easier.

### Build for production

Run `npm run build`. Result is in `dist` directory.