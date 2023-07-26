import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can insert value into list", () => {
  const list = new List();

  // bad index
  assert.not(list.insert(-1, "bad"), "reject negative index with false");

  list.push("lorem").push("ipsum").push("dolor");

  // can unshift
  assert.ok(list.insert(0, "UNSHIFTED"), "return true");
  assert.is(list.head, "UNSHIFTED", "correctly unshifted element into list");
  assert.is(list.length, 4, "updated length after unshift");

  // can push
  assert.ok(list.insert(4, "PUSHED"), "return true");
  assert.is(list.tail, "PUSHED", "correctly pushed element into list");
  assert.is(list.length, 5, "updated length after push");

  // can insert
  assert.ok(list.insert(2, "INSERTED"), "return true");
  assert.is(list.get(1), "lorem", "correctly inserted element into list");
  assert.is(list.get(2), "INSERTED", "correctly inserted element into list");
  assert.is(list.get(3), "ipsum", "correctly inserted element into list");
  assert.is(list.length, 6, "updated length after insert");

  // bad indexes
  assert.not(list.insert(7, ""), "reject index larger than length with false");
});

test.run();
