# Foxkit List Manual

## Creating a List

The constructor takes any iterable (such as Arrays or Sets) and creates a List. You can also not pass anything and add things later:

```js
const list = new List(["lorem", "ipsum", "dolor"]);
```

```js
const list = new List();
list.push("lorem");
```

## Table of Contents

- [Array vs List](array-vs-list.md)
- [Usage with TypeScript](typescript.md)
- [Static Methods](static-methods.md)
- [List Properties](properties.md)
- List Methods
  - [Adding and Removing from Lists](methods/adding-removing.md)
  - [Working with other Data objects](methods/with-other-objects.md)
  - [Searching and Filtering](methods/searching-filtering.md)
  - [Transforming Lists](methods/transforming-lists.md)

## Planned Features:

- Support for asynchronous callback functions
- New Methods:
  - `findNode`
  - `values` (similar to entries)
- constructor that takes any iterable (replaces `List.fromArray`)
