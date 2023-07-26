class ListNode<T> {
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export type { ListNode };
export type ListTest<T> = (
  value: T,
  index: number,
  self: List<T>,
  node: ListNode<T>
) => boolean;

export class List<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #length: number = 0;

  static fromArray<T>(arr: T[]): List<T> {
    const list = new List<T>();
    for (let i = 0; i < arr.length; i++) {
      list.push(arr[i]);
    }
    return list;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isList(list: any): list is List<any> {
    return list instanceof List;
  }

  get head() {
    return this.#head?.value;
  }

  get tail() {
    return this.#tail?.value;
  }

  get length() {
    return this.#length;
  }

  push(value: T) {
    const node = new ListNode(value);
    if (this.#tail == null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
      node.prev = this.#tail;
    }
    this.#tail = node;
    this.#length++;
    return this;
  }

  pop() {
    if (this.#tail == null) return undefined;
    const node = this.#tail;

    if (this.length == 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = node.prev;
      this.#tail!.next = null;
      node.prev = null;
    }

    this.#length--;
    return node.value;
  }

  shift() {
    if (this.#head == null) return undefined;
    const node = this.#head;
    if (node.next == null) {
      this.#tail = null;
    }
    this.#head = node.next;
    this.#length--;
    return node.value;
  }

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

  getNode(n: number) {
    if (n < 0 || n >= this.#length) return undefined;
    const mid = this.#length / 2;
    let curr: ListNode<T>;
    if (n < mid) {
      curr = this.#head!;
      for (let i = 0; i < n; i++) {
        curr = curr.next!;
      }
    } else {
      curr = this.#tail!;
      for (let i = this.#length - 1; i > n; i--) {
        curr = curr.prev!;
      }
    }
    return curr;
  }

  get(index: number) {
    const node = this.getNode(index);
    if (node) return node.value;
    return undefined;
  }

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

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false;
    switch (index) {
      case 0:
        return !!this.unshift(value);
      case this.length:
        return !!this.push(value);
      default: {
        const node = new ListNode<T>(value);
        const prev = this.getNode(index - 1)!;
        const next = prev.next!;
        prev.next = node;
        node.prev = prev;
        next.prev = node;
        node.next = next;
        this.#length++;
        return true;
      }
    }
  }

  remove(index: number, amount: number = 1) {
    if (index < 0 || index > this.length || amount < 1) return false;
    let curr = this.getNode(index)!;
    if (!curr) return true; // this only happens when index == length == 0

    for (let i = 0; i < amount; i++) {
      const { prev, next } = curr;
      curr.next = null;
      curr.prev = null;
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

  toArray(): T[] {
    const arr = new Array<T>();

    let curr = this.#head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  }

  insertArray(index: number, arr: T[]): boolean {
    if (index < 0 || index > this.length) return false;
    if (arr.length == 0) return true;
    switch (index) {
      case 0:
        return this.unshift(arr[0]).insertArray(1, arr.slice(1));
      case this.length: {
        for (let i = 0; i < arr.length; i++) {
          this.push(arr[i]);
        }
        return true;
      }
      default: {
        let prev = this.getNode(index - 1)!;
        const next = prev.next;

        for (let i = 0; i < arr.length; i++) {
          const node = new ListNode<T>(arr[i]);
          prev.next = node;
          node.prev = prev;

          if (next) {
            next.prev = node;
            node.next = next;
          }

          prev = node;
          this.#length++;
        }

        return true;
      }
    }
  }

  insertList(index: number, list: List<T>): boolean {
    if (index < 0 || index > this.length || !List.isList(list)) return false;
    const arr = list.toArray();
    return this.insertArray(index, arr);
  }

  clone(): List<T> {
    const newList = new List<T>();
    let curr = this.#head;
    while (curr) {
      newList.push(curr.value);
      curr = curr.next;
    }
    return newList;
  }

  concat(value: List<T> | Array<T>): List<T> {
    const newList = this.clone();
    if (List.isList(value)) {
      newList.insertList(newList.length, value);
    } else {
      newList.insertArray(newList.length, value);
    }
    return newList;
  }

  // not tested as this is basically a proxy of the existing Array method
  entries() {
    return this.toArray().entries();
  }

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

  includes(value: T): boolean {
    return this.findIndex(v => v === value) >= 0;
  }

  indexOf(value: T): number {
    return this.findIndex(v => v === value);
  }

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

  reduce<N>(
    callback: (
      previousValue: N,
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

  reverse(): List<T> {
    const newList = new List<T>();
    let curr = this.#tail;

    while (curr) {
      newList.push(curr.value);
      curr = curr.prev;
    }

    return newList;
  }

  slice(start: number, end?: number): List<T> {
    const newList = new List<T>();
    const startAt = start < 0 ? Math.max(0, this.#length + start) : start;
    const endAt =
      (end ?? 0) < 0
        ? Math.max(0, this.#length + (end ?? 0))
        : end ?? this.#length;
    let curr: ListNode<T> | null | undefined = this.getNode(startAt);
    let index = startAt;

    while (curr && index < endAt) {
      newList.push(curr.value);
      curr = curr.next;
      index++;
    }

    return newList;
  }

  sort(callback?: (a: T, b: T) => number): List<T> {
    const arr = this.toArray().sort(callback);
    return List.fromArray(arr);
  }

  join(separator: string = ",") {
    let str = "";
    if (this.#length < 1) return str;
    str = `${this.#head!.value}`;

    let curr = this.#head!.next;
    while (curr) {
      str = `${str}${separator}${curr.value}`;
      curr = curr.next;
    }

    return str;
  }

  toString() {
    return this.join(",");
  }
}
