# Foxkit List

Foxkit List is a Doubly-linked List datastructure for JavaScript and TypeScript.

## Installation

Install the package using the package manager used by your project:

```sh
npm install @foxkit/list
pnpm add @foxkit/list
yarn add @foxkit/list
```

## Usage

Create a new list and use [methods](docs/README.md) to add and interact with data:

```js
import { List } from "@foxkit/list";

const list = new List(["foo", "bar"]);
list.push("baz");
list.forEach(val => console.log(val));
/* logs:
 * "foo
 * "bar"
 * "baz"
 */
```

See [Documentation](docs/README.md) for further information.
