# Methods - Searching and Filtering

The methods in this category are heavily inspired by methods known from Arrays and use a test callback that gets the following parameters (where `T` is the type of your List's values):

```ts
function myCallback(
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
): boolean;
```

Similarly to Array method callbacks the test callback is ran on each node individually and receives the current value, index of the value and a reference to the List being processed.

The major difference is the fourth parameter which is a reference to the node of the value, which allows for easier discovery of the previous/next value(s).

For simplicity the examples in this document only use the `value` parameter to provide easy to understand demonstrations of the mehods.

## `every`

Checks if a test callback returns `true` for every value

```js
const list = new List();
list.push("lorem").push("ipsum").push("dolor");

list.every(v => v.length == 5); // true
list.every(v => v.startsWith("l")); // false
```

## `some`

Checks if a test callback returns `true` for at least one value

```js
const list = new List();
list.push("foobar").push("bar").push("baz");

list.some(v => v.length == 3); // true
list.some(v => v.endsWith("foo")); // false
```

## `filter`

Creates new list with only the values that the test callback returns `true` for.

```js
const list = List.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const filtered = list.filter(v => v % 2 == 0);
filtered.toString(); // "0,2,4,6,8"
```

## `findIndex`

Finds the index of the first value to satisfy the test callback. If no value satisfies the test `-1` is returned.

```js
const list = new List();
list.push("foobar").push("foobaz").push("barfoo");

list.findIndex(v => v.startsWith("b")); // 2
list.findIndex(v => v.startsWith("y")); // -1
```

## `find`

Find the first value to satisfy the test callback and returns it. If no value satisfies the test `undefined` is returned.

```js
const list = new List();
list.push("foobar").push("foobaz").push("barfoo");

list.findIndex(v => v.startsWith("b")); // "barfoo"
list.findIndex(v => v.startsWith("y")); // undefined
```

## `includes`

Returns `true` if a value exists in the List, `false` if not. Values are compared with strict equality (`===`).

```js
const list = new List();
list.push("foobar").push("foobaz").push("bar");

list.includes("foobaz"); // true
list.includes("foo"); // true
```

## `indexOf`

Searches for value in the List and returns its index. If the value is not found `-1` is returned. Values are compared with strict equality (`===`).

```js
const list = new List();
list.push("foobar").push("foobaz").push("bar");

list.includes("bar"); // 2
list.includes("foo"); // -1
```
