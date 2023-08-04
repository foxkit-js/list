import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("handles weird inputs", () => {
  const list = new List();

  // bad input
  assert.not(list.remove(-1), "reject negative index with false");
  assert.not(list.remove(7), "reject index larger than length with false");
  assert.not(list.remove(0, 0), "reject amount of 0 with false");
  assert.not(list.remove(0, -3), "reject negative amount with false");

  // edge case
  assert.ok(list.remove(0, 1), "don't reject removal of index 0 on empty list");
});

test("can remove item after head", () => {
  const list = new List();
  for (const item of lorem) list.push(item);

  assert.ok(list.remove(1), "remove one item in the list");
  assert.is(list.head, "lorem", "head unchanged");
  assert.is(list.get(1), lorem[2], "removed item at index 1");
  assert.is(
    list.getNode(1)?.prev,
    list.getNode(0),
    "new item at index 1 points back to head"
  );
  assert.is(
    list.getNode(0)?.next,
    list.getNode(1),
    "head updated to point to new item at index 1"
  );
  assert.is(list.length, lorem.length - 1, "updated length");
  assertValidList(list);
});

test("can remove from start of list", () => {
  const list = new List();
  for (const item of lorem) list.push(item);

  assert.ok(list.remove(0, 2), "remove two items from start of the list");
  assert.is(list.head, lorem[2], "updated head");
  assert.is(
    list.getNode(0)?.prev,
    null,
    "head does not point back at removed node"
  );
  assert.is(list.length, lorem.length - 2, "updated length");
  assertValidList(list);
});

test("can remove from end of list", () => {
  const list = new List();
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(4, 10), "remove all element starting with index 4");
  assert.is(list.tail, lorem[3], "updated tail");
  assert.is(
    list.getNode(3)?.next,
    null,
    "tail does not point forward to removed node"
  );
  assert.is(list.length, 4, "updated length");
  assertValidList(list);
});

test("can remove multiple from middle of list", () => {
  const list = new List();
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(2, 3), "remove items from middle of list");
  assert.is(list.get(0), lorem[0]);
  assert.is(list.get(1), lorem[1]);
  assert.is(list.get(2), lorem[5]);
  assert.is(list.get(3), lorem[6]);
  assert.is(list.length, 4);
  assertValidList(list);
});

test.run();
