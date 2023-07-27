# Methods - Adding and Removing from Lists

## `push`

Adds value to the end of the List. Further methods can be chained after this method.

```js
const list = new List();
list.push("lorem");
list.push("ipsum").push("dolor");
list.toString(); // "lorem,ipsum,dolor"
```

## `pop`

Removes the last element from the List and returns it. If the List is empty `undefined` is returned.

```js
const list = List.fromArray(["lorem", "ipsum"]);

list.pop(); // "ipsum"
list.pop(); // "lorem"
list.pop(); // undefined
```

## `shift`

Removes the first element from the List and returns it. If the List is empty `undefined` is returned.

```js
const list = List.fromArray(["lorem", "ipsum"]);

list.shift(); // "lorem"
list.shift(); // "ipsum"
list.shift(); // undefined
```

## `unshift`

Adds value to the start of the List. Further methods can be chained after this method.

```js
const list = new List();
list.unshift("lorem");
list.unshift("ipsum").unshift("dolor");
list.toString(); // "dolor,ipsum,lorem"
```

## `getNode`

Gets `ListNode` at specific index. If the index is outside of the range of the List `undefined` is returned.

```js
const list = new List();
list.pop("lorem");
list.getNode(0); // ListNode { value: "lorem" }
```

## `get`

Gets value at specific index. If the index is outside of the range of the List `undefined` is returned.

```js
const list = new List();
list.pop("lorem");
list.get(0); // "lorem"
```

## `set`

Sets value at specific index and returns `true`. If the index is outside of the range of the List `false` is returned.  
If the index would correspond to the next new element this method acts as an alias to `push`.

```js
const list = new List();
list.set(0, "lorem");
list.get(0); // "lorem"
list.set(0, "foobar");
list.get(0); // "foobar"
```

## `insert`

Inserts value at index and returns `true`. If the index is outside of the range of the List `false` is returned.  
If the index would correspond to the next new element this method acts as an alias to `push`.

```js
const list = List.fromArray(["lorem", "ipsum"]);
list.insert(1, "foo");
list.insert(4, "bar");
list.toString(); // "lorem,foo,ipsum,bar"
```

## `remove`

Removes one or more elements starting at a given index and returns `true`.  
If the index is outside the range of the List or a amount smaller than one is given `false` is returned.

```js
const list = List.fromArray("foobazzbar".split(""));
list.remove(3, 4);
list.join(""); // "foobar"
```
