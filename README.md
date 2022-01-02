# \<animation-snowcss>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i animation-snowcss
```

## Usage

```html
<script type="module">
  import 'animation-snowcss/animation-snowcss.js';
</script>

<animation-snowcss num-snowflakes="200" speed="5"></animation-snowcss>
```

## Styling

- **--animation-snowcss-background-color**: Background color of the snowflakes. Default: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
