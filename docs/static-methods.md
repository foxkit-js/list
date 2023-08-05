# Static Methods

## `fromArray`

Creates a new List from any Array. This method has been deprecated in v1.2.0 and will be removed in a future version. Use the new constructor instead (see [Creating a List](./README.md#creating-a-list))!

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
