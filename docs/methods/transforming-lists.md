# Methods - Transforming Lists

## `forEach`

Runs a function on every element of the list. The function is passed the same parameters as the test callback documented in [Methods - Searching and Filtering](searching-filtering.md), but the return value is ignored. Use [`map`](#map) instead to capture the return value.

```js
const list = new List();
list.push("foobar").push("bazbar");
list.forEach(val => console.log(val));
```

**Output**:

```
foobar
bazbar
```

**Callback shape**:

The full shape of the reducer callback type where `T` corresponds to the type of the List's values.

```ts
function myCallback(
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
): void;
```

## `map`

Creates a new list where each value is transformed by a callback function. The function is passed the same parameters as the test callback documented in [Methods - Searching and Filtering](searching-filtering.md).

Use [`forEach`](#foreach) instead if you do not need a return value or [reduce](#reduce) to reduce a list down to a single value.

If you are using TypeScript this method accepts a generic to set the type of values in the List. This type can also be inferred from the callback function.

```js
const list = new List();
list.push("foo").push("bar").push("foobar").push("lorem");
list.map(v => v.length).toString(); // "3,3,6,5"
```

**Callback shape**:

The full shape of the reducer callback type where `T` is the type of the original List's values and `N` is the type of the mapped List's values.

```ts
function myCallback(
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
): N;
```

## `reduce`

Reduces a List to a single new value with a reducer function callback. The callback is passed the current accumulated value, the next value taken from the list, the index of that value, a reference to the full List and the ListNode that corresponds to the value and index. The return value is used as the new accumulated value or return from this method.

If you are using TypeScript this method accepts a generic to set the type of the accumulated value. This type can also be inferred from the callback function.

```js
const list = new List();
list.push("foo").push("bar").push("foobar").push("lorem");
list.reduce((acc, val) => acc + val, 0); // 17
```

**Reducer shape**:

The full shape of the reducer callback type where `T` is the type of the List's values and `N` is the type of the result of the reduction:

```ts
function callback(
  accumulatedValue: N,
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
): N;
```

## `reverse`

Creates a copy of the current List in reverse order. The original List is not modified.

```js
const list = new List();
list.push("foo").push("bar").push("baz");
const reversed = list.reverse();
list.toString(); // "foo,bar,baz"
reversed.toString(); // "baz,bar,foo"
```

## `slice`

Creates a new List that contains a slice of value from the original List starting at a given index up to an optional end index. If no end index is given the rest of the List is included in the new List. Negative indexes are handled the same as [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

Values are copied to the new List, meaning that modifying either List will not manipulate the other!

```js
const list = new List(["foo", "bar", "baz", "foobar", "lorem", "ipsum"]);
list.slice(2, 5).toString(); // "baz,foobar,lorem"
list.slice(-3, 6).toString(); // "foobar,lorem,ipsum"
list.slice(1, -1).toString(); // "bar,baz,foobar,lorem"
```

## `sort`

Creates a new List with all values sorted by a comparison callback function. The function should return a number value the first argument should appear before the second argument, `0` if they're equal, or a positive number if the first argument should appear after the second in the new List.

If no callback is passed values are sorted in ascending ASCII character order.

```js
const list = new List([0, 7, 11, 8, 9, 15, -3]);
const sorted = list.sort((a, b) => a - b);
sorted.toString(); // -3,0,7,8,9,11,15
```

**Comparison callback shape**:

Due to this method internally using [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), the shape of the comparison callback is the same (where `T` is the type of the List values):

```ts
function myComparison(a: T, b: T): number;
```

## `join`

Joins the List into a string, separating values with a configurable separator string (`","` by default).

```js
const list = new List();
list.push("foo").push("bar").push("baz");
list.join(); // "foo,bar,baz"
list.join(" - "); // "foo - bar - baz"
```

## `toString`

Joins the List into a string using `","` as the separator. Use [`join`](#join) if you would like to use a different separator.

```js
const list = new List();
list.push("foo").push("bar").push("baz");
list.toString(); // "foo,bar,baz"
```
