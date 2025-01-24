# Methods - Working with other Data objects

## `toArray`

Creates Array with all List values in order.

```js
const list = new List();
list.push("ipsum").push("dolor").unshift("lorem");
const arr = list.toArray(); // ["lorem", "ipsum", "dolor"]
```

## `insertMany`

Inserts all values from an Iterable into List at a given index. Further methods can be chained after this method.

```js
const list = new List([0, 1, 2]);
list.insertMany(1, [0.5, 0.75]);
list.join(", "); // "0, 0.5, 0.75, 1, 2"
```

## `clone`

Creates a copy of the current List

```js
const list = new List();
const copy = list.clone();
```

## `concat`

Combines List or Array with current List. The existing List is not modified.

```js
const list = new List();
list.push("foo").push("bar");
const newList = list.concat(["baz", "foobar"]);
list.toString(); // "foo,bar"
newList.toString(); // "foo,bar,baz,foobar"
```
