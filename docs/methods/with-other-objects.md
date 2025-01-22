# Methods - Working with other Data objects

## `toArray`

Creates Array with all List values in order.

```js
const list = new List();
list.push("ipsum").push("dolor").unshift("lorem");
const arr = list.toArray(); // ["lorem", "ipsum", "dolor"]
```

## `insertArray`

Inserts all values from an Array into List at a given index and returns `true`.  
If the index is outside of the range of the List `false` is returned.

```js
const list = List.fromArray([0, 1, 2]);
list.insertArray(1, [0.5, 0.75]);
list.join(", "); // "0, 0.5, 0.75, 1, 2"
```

## `insertList`

Inserts all values from another List into List at a given index and returns `true`.  
If the index is outside of the range of the List `false` is returned.

```js
const listA = List.fromArray([0, 1, 2]);
const listB = List.fromArray("foo".split(""));
listA.insertList(2, listB);
listA.toString(); // "0,1,f,o,o,2"
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
