# nega-donut
# \<nega-donut\>

SVG Donut as a WebComponent

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/kennethklee/nega-donut)

See: [Documentation](https://www.webcomponents.org/element/nega-donut),
  [Demo](https://kennethklee.github.io/nega-donut/demo/).


# Usage

## Installation

```shell
npm install --save nega-donut
```

## In an html file

```html
<html>
  <head>
    <script type="module">
      import 'nega-donut/nega-donut.js';
    </script>
  </head>
  <body>
    <nega-donut value="200" percent="90"></nega-donut>
  </body>
</html>
```

## In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import 'nega-donut/nega-donut.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <nega-donut value="200" percent="90"></nega-donut>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```


# Contributing

Feel free to fork and send over PRs. Still a lot of places this can be improved, i.e. styling, more options, or better behaviors.

## Installation

```
git clone https://github.com/kennethklee/nega-donut
cd nega-donut
npm install
```

## Running locally

```
$ npm start
```

## Running tests

```
$ npm test
```
