# Methods - Working with other Data objects

## `toArray`

Creates Array with all List values in order.

```js
const list = new List();
list.push("ipsum").push("dolor").unshift("lorem");
const arr = list.toArray(); // ["lorem", "ipsum", "dolor"]
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
