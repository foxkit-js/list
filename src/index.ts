import type { InspectOptions } from "util";
import { ListNode } from "./node";

export type { ListNode };

export type ListValue<L extends List<unknown>> =
  L extends List<infer R> ? R : never;

export type ListTest<T> = (
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
) => boolean;

/* NOTE: this stuff is specifically for the node.js inspector, so probably don't
         use that type elsewhere. I couldn't figure out how to import just the
         type of node:util.inspect, because there's a namespace of the same type
         and I wanted to avoid importing actual values from node, so this lib
         can still be used in browsers and other runtimes. */
const inspectSym = Symbol.for("nodejs.util.inspect.custom");
type InspectFn = (subject: unknown, opts: InspectOptions) => string;

export class List<T> {
  #head?: ListNode<T>;
  #tail?: ListNode<T>;
  #length: number = 0;

  constructor(from?: Iterable<T>) {
    if (!from) return;

    // spawn iterator
    const iterator = from[Symbol.iterator]();
    let result = iterator.next();
    if (result.done) return;

    // prepare first node
    const head = new ListNode(result.value);
    let prev = head;
    let length = 1;

    // iterate and create list
    while (!(result = iterator.next()).done) {
      const node = new ListNode(result.value);
      node.prev = prev;
      prev.next = node;
      prev = node;
      length++;
    }

    // save to properties
    this.#head = head;
    this.#tail = prev;
    this.#length = length;
  }

  /**
   * Checks if an object (or any other value) is a List
   * @param list Object that may be a list
   * @returns boolean
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isList(list: any): list is List<any> {
    return list instanceof List;
  }

  /**
   * First value of the List
   */
  get head() {
    return this.#head?.value;
  }

  /**
   * Last value of the List
   */
  get tail() {
    return this.#tail?.value;
  }

  /**
   * Current length of the List
   */
  get length() {
    return this.#length;
  }

  /**
   * Adds value to the end of the List.
   * Further methods can be chained after this method.
   * @param value Value to add
   * @returns `this` Reference
   */
  push(value: T) {
    const node = new ListNode(value);
    if (!this.#tail) {
      this.#head = node;
    } else {
      this.#tail.next = node;
      node.prev = this.#tail;
    }
    this.#tail = node;
    this.#length++;
    return this;
  }

  /**
   * Removes the last element from the List and returns it.
   * If the List is empty `undefined` is returned.
   * @returns Value or `undefined`
   */
  pop() {
    if (!this.#tail) return;
    const node = this.#tail;
    const prev = node.prev;

    if (!prev) {
      this.#head = undefined;
    } else {
      prev.next = undefined;
    }

    this.#tail = prev;
    this.#length--;
    return node.value;
  }

  /**
   * Removes the first element from the List and returns it.
   * If the List is empty `undefined` is returned.
   * @returns Value or `undefined`
   */
  shift() {
    const node = this.#head;
    if (!node) return;
    const next = node.next;
    node.next = undefined;

    if (!next) {
      this.#tail = undefined;
    } else {
      next.prev = undefined;
    }

    this.#head = next;
    this.#length--;
    return node.value;
  }

  /**
   * Adds value to the start of the List.
   * Further methods can be chained after this method.
   * @param value Value to add
   * @returns `this` Reference
   */
  unshift(value: T) {
    const node = new ListNode(value);
    if (this.#head) {
      node.next = this.#head;
      this.#head.prev = node;
    } else {
      this.#tail = node;
    }
    this.#head = node;
    this.#length++;
    return this;
  }

  /**
   * Gets `ListNode` at specific index. If the index is outside of the
   * range of the List `undefined` is returned.
   * @param n Index of the element
   * @returns `ListNode` or `undefined`
   */
  private getNode(n: number) {
    if (n < 0 || n >= this.#length) return;
    const mid = this.#length / 2;
    let curr: ListNode<T> | undefined;

    if (n < mid) {
      curr = this.#head;
      for (let i = 0; i < n; i++) {
        if (!curr) return;
        curr = curr.next;
      }
    } else {
      curr = this.#tail;
      for (let i = this.#length - 1; i > n; i--) {
        if (!curr) return;
        curr = curr.prev;
      }
    }

    return curr;
  }

  /**
   * Gets value at specific index. If the index is outside of the range
   * of the List `undefined` is returned.
   * @param index Index of the element
   * @returns Value or `undefined`
   */
  get(index: number) {
    const node = this.getNode(index);
    if (node) return node.value;
    return;
  }

  /**
   * Sets value at specific index and returns `true`. If the index is
   * outside of the range of the List `false` is returned.
   * If the index would correspond to the next new element this method
   * acts as an alias to `push`.
   * @param index Index of the element to set
   * @param value Value to set
   * @returns boolean
   */
  set(index: number, value: T) {
    if (index == this.#length) {
      this.push(value);
      return true;
    }

    const node = this.getNode(index);
    if (!node) return false;
    node.value = value;
    return true;
  }

  /**
   * Inserts value at index and returns `true`. If the index is outside
   * of the range of the List `false` is returned.
   * If the index would correspond to the next new element this method
   * acts as an alias to `push`.
   * @param index Index of where to insert the new element
   * @param value Value of the new element
   * @returns boolean
   */
  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false;
    switch (index) {
      case 0:
        return !!this.unshift(value);
      case this.length:
        return !!this.push(value);
      default: {
        const node = new ListNode<T>(value);
        const prev = this.getNode(index - 1);
        if (!prev) return false;
        const next = prev.next;
        prev.next = node;
        node.prev = prev;
        if (next) next.prev = node;
        node.next = next;
        this.#length++;
        return true;
      }
    }
  }

  /**
   * Removes one or more elements starting at a given index and returns
   * `true`. If the index is outside the range of the List or a amount
   * smaller than one is given `false` is returned.
   * @param index Index at which to remove element(s)
   * @param amount (optional) Amount of elements to remove (default: 1)
   * @returns boolean
   */
  remove(index: number, amount: number = 1) {
    if (index < 0 || index > this.length || amount < 1) return false;
    let curr = this.getNode(index);

    for (let i = 0; i < amount; i++) {
      if (!curr) return true;
      const { prev, next } = curr;
      curr.next = undefined;
      curr.prev = undefined;
      this.#length--;

      if (prev) {
        prev.next = next;
      } else {
        this.#head = next;
      }

      if (next) {
        next.prev = prev;
      } else {
        this.#tail = prev;
        break; // can't remove more, break early
      }

      curr = next;
    }

    return true;
  }

  /**
   * Creates Array with all List values in order.
   * @returns Array
   */
  toArray(): T[] {
    return Array.from(this);
  }

  /**
   * Inserts all values from another iterable (List, Array, etc.) into List at a
   * given index. If the index is out of range values will be inserted at the
   * start or end of the List as applicable.
   * @param index
   * @param iterable
   * @returns `this` Reference
   */
  insertMany(index: number, iterable: Iterable<T>) {
    let prev: undefined | ListNode<T>; // current node in loop
    let next: undefined | ListNode<T>; // node after inserted

    // get nodes before and after inserted values if applicable
    if (index <= 0) {
      prev = undefined;
      next = this.#head;
      this.#head = undefined;
    } else if (index >= this.length) {
      prev = this.#tail;
      next = undefined;
    } else {
      next = this.getNode(index);
      prev = next?.prev;
    }

    // append to list
    for (const val of iterable) {
      const node = new ListNode(val);

      // connect to previous element, if none this is the new first list node
      if (prev) {
        node.prev = prev;
        prev.next = node;
      } else {
        this.#head = node;
      }

      prev = node;
      this.#length++;
    }

    // connect to node after inserted values if applicable,
    // or update tail otherwise as there are no values past this
    if (prev) {
      if (next) {
        next.prev = prev;
        prev.next = next;
      } else {
        this.#tail = prev;
      }
    }

    return this;
  }

  /**
   * Creates a copy of the current List
   * @returns new List
   */
  clone(): List<T> {
    const newList = new List<T>(this);
    return newList;
  }

  /**
   * Combines List or Array with current List. The existing List is not modified.
   * @param value List or Array of Values
   * @returns new List
   */
  concat(value: Iterable<T>): List<T> {
    const newList = this.clone();
    newList.insertMany(newList.length, value);
    return newList;
  }

  /**
   * Checks if a test callback returns `true` for every value
   * @param callback Test callback
   * @returns boolean
   */
  every(callback: ListTest<T>): boolean {
    let index = 0;
    let curr = this.#head;

    while (curr) {
      if (!callback(curr.value, index, this, curr)) return false;
      curr = curr.next;
      index++;
    }

    return true;
  }

  /**
   * Checks if a test callback returns `true` for at least one value
   * @param callback Test callback
   * @returns boolean
   */
  some(callback: ListTest<T>): boolean {
    let index = 0;
    let curr = this.#head;

    while (curr) {
      if (callback(curr.value, index, this, curr)) return true;
      curr = curr.next;
      index++;
    }

    return false;
  }

  /**
   * Creates new list with only the values that the test callback
   * returns `true` for.
   * @param callback Test callback
   * @returns Filtered List
   */
  filter(callback: ListTest<T>): List<T> {
    const newList = new List<T>();
    let index = 0;
    let curr = this.#head;

    while (curr) {
      if (callback(curr.value, index, this, curr)) newList.push(curr.value);
      curr = curr.next;
      index++;
    }

    return newList;
  }

  /**
   * Finds the index of the first value to satisfy the test callback.
   * If no value satisfies the test `-1` is returned.
   * @param callback Test callback
   * @returns number
   */
  findIndex(callback: ListTest<T>): number {
    let curr = this.#head;
    let index = 0;

    while (curr) {
      if (callback(curr.value, index, this, curr)) return index;
      curr = curr.next;
      index++;
    }

    return -1;
  }

  /**
   * Find the first value to satisfy the test callback and returns it.
   * If no value satisfies the test `undefined` is returned.
   * @param callback Test callback
   * @returns Value or `undefined`
   */
  find(callback: ListTest<T>) {
    let curr = this.#head;
    let index = 0;

    while (curr) {
      if (callback(curr.value, index, this, curr)) return curr.value;
      curr = curr.next;
      index++;
    }

    return;
  }

  /**
   * Returns `true` if a value exists in the List, `false` if not. Values
   * are compared with strict equality (`===`).
   * @param value Value to search
   * @returns boolean
   */
  includes(value: T): boolean {
    return this.findIndex(v => v === value) >= 0;
  }

  /**
   * Searches for value in the List and returns its index. If the value
   * is not found `-1` is returned. Values are compared with strict
   * equality (`===`).
   * @param value Value to search
   * @returns number
   */
  indexOf(value: T): number {
    return this.findIndex(v => v === value);
  }

  /**
   * Runs a function on every element of the list. The function is passed the
   * current value, index, a reference to the full List and a reference to the
   * ListNode corresponding to the value. The return value of the callback is
   * ignored.
   * @param callback Function to run
   */
  forEach(
    callback: (
      value: T,
      index: number,
      self: List<T>,
      node: ListNode<T>
    ) => void
  ) {
    let curr = this.#head;
    let index = 0;

    while (curr) {
      callback(curr.value, index, this, curr);
      curr = curr.next;
      index++;
    }
    return;
  }

  /**
   * Creates a new list where each value is transformed by a callback
   * function. The function is passed the current value, index, a reference to
   * the full List and a reference to the ListNode corresponding to the value.
   * @param callback Callback to transform value
   * @returns new List
   */
  map<N>(
    callback: (value: T, index: number, self: List<T>, node: ListNode<T>) => N
  ): List<N> {
    const newList = new List<N>();
    let curr = this.#head;
    let index = 0;

    while (curr) {
      newList.push(callback(curr.value, index, this, curr));
      curr = curr.next;
      index++;
    }

    return newList;
  }

  /**
   * Reduces a List to a single new value with a reducer function callback. The
   * callback is passed the current accumulated value, the next value taken from
   * the list, the index of that value, a reference to the full List and the
   * ListNode that corresponds to the value and index. The return value is used
   * as the new accumulated value or return from this method.
   * @param callback Reducer callback function
   * @param initialValue initial value to pass to the first iteration
   * @returns accumulated value
   */
  reduce<N>(
    callback: (
      accumulatedValue: N,
      value: T,
      index: number,
      self: List<T>,
      node: ListNode<T>
    ) => N,
    initialValue: N
  ): N {
    let currentValue = initialValue;
    let curr = this.#head;
    let index = 0;

    while (curr) {
      currentValue = callback(currentValue, curr.value, index, this, curr);
      curr = curr.next;
      index++;
    }

    return currentValue;
  }

  /**
   * Creates a copy of the current List in reverse order. The original List is
   * not modified.
   * @returns new List
   */
  reverse(): List<T> {
    const newList = new List<T>();
    let curr = this.#tail;

    while (curr) {
      newList.push(curr.value);
      curr = curr.prev;
    }

    return newList;
  }

  /**
   * Creates a new List that contains a slice of value from the original List
   * starting at a given index up to an optional end index. If no end index is
   * given the rest of the List is included in the new List. Negative indexes
   * are handled the same as `Array.prototype.slice`. Values are copied to the
   * new List, meaning that modifying either List will not manipulate the other!
   * @param start Start index
   * @param end (optional) End index
   * @returns new List
   */
  slice(start: number, end?: number): List<T> {
    const newList = new List<T>();
    const startAt = start < 0 ? Math.max(0, this.#length + start) : start;
    const endAt =
      (end ?? 0) < 0
        ? Math.max(0, this.#length + (end ?? 0))
        : (end ?? this.#length);
    let curr: ListNode<T> | undefined = this.getNode(startAt);
    let index = startAt;

    while (curr && index < endAt) {
      newList.push(curr.value);
      curr = curr.next;
      index++;
    }

    return newList;
  }

  /**
   * Creates a new List with all values sorted by a comparison callback function.
   * The function should return a number value the first argument should appear
   * before the second argument, `0` if they're equal, or a positive number if
   * the first argument should appear after the second in the new List.
   * If no callback is passed values are sorted in ascending ASCII character order.
   * @param callback
   * @returns new sorted List
   */
  sort(callback?: (a: T, b: T) => number): List<T> {
    const arr = this.toArray().sort(callback);
    return new List(arr);
  }

  /**
   * Joins the List into a string, separating values with a configurable
   * separator string (`","` by default).
   * @param separator (optional) Custom separator string
   * @returns string
   */
  join(separator: string = ",") {
    let curr = this.#head;
    if (!curr) return "";
    let str = "";
    str = `${curr.value}`;
    curr = curr.next;

    while (curr) {
      str = `${str}${separator}${curr.value}`;
      curr = curr.next;
    }

    return str;
  }

  /**
   * Joins the List into a string using `","` as the separator. Use `join` if
   * you would like to use a different separator.
   * @returns
   */
  toString() {
    return this.join(",");
  }

  /**
   * Method for the Node.js Inspector
   * @param _ ignored depth parameter
   * @param options Options for the inspector to use on the list values (rendered as array)
   * @param inspect Please pass `node:util.inspect` here, thank you
   * @returns
   */
  [inspectSym](_: number, options: InspectOptions, inspect: InspectFn) {
    return `List(${this.#length}) ${inspect(this.toArray(), options)}`;
  }

  *[Symbol.iterator]() {
    const seenNodes = new Set<ListNode<T>>();
    let curr = this.#head;
    let idx = 0;

    while (idx < this.length) {
      if (curr) {
        yield curr.value;
        seenNodes.add(curr);
        curr = curr.next;
        idx++;
        continue;
      }

      if (idx >= this.length) return;

      // find current element assuming list got modified
      let temp = this.#head;
      let i = 0;
      while (temp && i < idx) {
        temp = temp.next;
        i++;
      }

      if (temp && i == idx) {
        curr = temp;
        continue;
      }
    }
  }
}
