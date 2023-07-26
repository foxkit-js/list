# Static Methods

## `fromArray`

Creates a new List from any Array

```js
const list = List.fromArray([1, 2, 3]);
```

## `isList`

Checks if an object (or any other value) is a List

```js
const list = new List();
const arr = [1, 2, 3];
List.isList(list); // true
List.isList(arr); // false
```
