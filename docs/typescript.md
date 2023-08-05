# Usage with TypeScript

Lists have full support for TypeScript out of the box. The types are packaged, so no external packages are required.

Generic Types are used on constructor (and on some methods) to infer types or allow for overiding:

```ts
const list = new List<string>();
//    ^? List<string>

const numbers = new List([0, 1, 2]);
//    ^? List<number>
```

## Callbacks

Callback types are usually documented on the respective page in the Methods section. Should a callback result in a new type, such as with [`map`](./methods/transforming-lists.md#map) and [`reduce`](./methods/transforming-lists.md#reduce) a generic type is accepted by the method:

```ts
const list = new List<string>();
const mapped = list.map<number>(val => val.length);
//    ^? List<number>
```

The generic types are usually called `T` (type of the List's value) and `N` (generic type of the method) in the documentation.

## `ListValue`

The `ListValue` type helper can be used to extract the type of a List into a type.

```ts
import { List } from "@foxkit/list";
import type { ListValue } from "@foxkit/list";

const list = new List([1, 2, "episode 1", "episode 2"]);
type MyValue = ListValue<typeof list>;
//   ^? number | string
```

## `ListTest`

The test callback used by the methods in [Searching and Filtering](./methods/searching-filtering.md) is available as a type import. The `ListTest` type accepts the same generic `T` as the constructor function of the `List` class.

```ts
import type { ListTest } from "@foxkit/list";

const callback: ListTest<string> = v => v.length > 5;
```

## `ListNode`

Some callbacks as well as the [`getNode`](./methods/adding-removing.md#getnode) method have access to the internal ListNode objects used more managing relations inside the linked list data structure. It is recommended to consider these objects as readonly!

The `ListNode` type is available via type import should you need it to type something. `ListNode` takes the same generic `T` as the constructor function of the `List` class.

```ts
import type { ListNode } from "@foxkit/list";

let node: ListNode<string>;
```
