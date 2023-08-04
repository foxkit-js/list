import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";

test("Can handle invalid index", () => {
  const list = new List();
  assert.not(list.insert(-1, "bad"), "reject negative index with false");

  const listB = new List(["with", "some", "values"]);
  assert.not(listB.insert(5, ""), "reject index larger than length with false");
});

test("Can insert value into list", () => {
  const list = new List(["lorem", "ipsum", "dolor"]);

  // can unshift
  assert.ok(list.insert(0, "UNSHIFTED"), "return true");
  assert.is(list.head, "UNSHIFTED", "correctly unshifted element into list");
  assert.is(list.length, 4, "updated length after unshift");
  assertValidList(list);

  // can push
  assert.ok(list.insert(4, "PUSHED"), "return true");
  assert.is(list.tail, "PUSHED", "correctly pushed element into list");
  assert.is(list.length, 5, "updated length after push");
  assertValidList(list);

  // can insert
  assert.ok(list.insert(2, "INSERTED"), "return true");
  assert.is(list.get(1), "lorem", "correctly inserted element into list");
  assert.is(list.get(2), "INSERTED", "correctly inserted element into list");
  assert.is(list.get(3), "ipsum", "correctly inserted element into list");
  assert.is(list.length, 6, "updated length after insert");
  assertValidList(list);
});

test.run();
