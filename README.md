# Bredon

Bredon is a modern CSS value parser in JavaScript.
It uses very detailed nodes and provides as much information as possible for each value.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/bredon.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/bredon/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/bredon/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon.svg">
<img alt="npm version" src="https://badge.fury.io/js/bredon.svg">
<a href="https://gitter.im/rofrischmann/bredon"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/bredon.svg"></a>

## Installation
```sh
yarn add bredon
```

## Why?
I am heavily involved in the whole CSS-in-JS movement with [Fela](https://github.com/rofrischmann/fela), [Lorren](https://github.com/rofrischmann/lorren) and [Elodin](https://github.com/rofrischmann/react-look) as well as [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer). While writing Elodin, a plugin-based style object linter, I struggled to do complex value validation and related operations. That's why I built Lorren, a plugin-based style object analyzer, to get as much information as possible, for each property-value pair. While stuff like *"Is the property/value prefixed?"* or even *"Is it compatible with browser ...?"* has been pretty straightforward, I really couldn't come up with a simple solution to correctly validate CSS values with all their complexity.<br>
Here, I made the decision to write a modern CSS value parser that provides the required degree of accuracy and detail - Bredon.


## How?
Coming soon.

## The Gist
```javascript
import { parse } from 'bredon'

const input = '10px solid rgba(255, 0, 255, 0.55)'
const parsedValue = parse(input)

const ast = parsedValue.toAST()

ast === {
  type: 'CSSValue',
  body: [{
    type: 'Dimension',
    value: 10,
    unit: 'px',
    dimension: 'absolute-length'
  }, {
    type: 'Identifier',
    value: 'solid'
  }, {
    type: 'Function',
    callee: 'rgba',
    params: [{
      type: 'Integer',
      value: 255
    }, {
      type: 'Integer',
      value: 0
    }, {
      type: 'Integer',
      value: 255
    }, {
      type: 'Float',
      integer: 0,
      fractional: 55
    }]
  }]
}
```
## Documentation
* [**API Reference**](docs/API.md)
  * [parse(cssValue)](docs/API.md#parsecssvalue)
  * [ParsedCSSValue](docs/API.md#parsedcssvalue)
    * [traverse(visitors)](docs/API.md#traversevisitors)
    * [toString()](docs/API.md#tostring)
    * [toAST()](docs/API.md#toast)
* [**AST Nodes**](docs/ASTNodes.md)
  * [Identifier](docs/ASTNodes.md#identifier)
  * [Integer](docs/ASTNodes.md#integer)
  * [Keyword](docs/ASTNodes.md#keyword)
  * [Operator](docs/ASTNodes.md#operator)
  * [Dimension](docs/ASTNodes.md#dimension)
  * [Float](docs/ASTNodes.md#float)
  * [Function](docs/ASTNodes.md#function)


## Support
Join us on [Gitter](https://gitter.im/rofrischmann/bredon). We highly appreciate any contribution.<br>
We also love to get feedback.

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
