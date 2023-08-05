import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("rejects negative index", () => {
  const list = new List<string>();
  assert.not(list.insertArray(-7, lorem), "reject negative index with false");
});

test("can insert at the end of the list", () => {
  const list = new List(["first", "second"]);
  assert.ok(list.insertArray(2, lorem), "inserted array at end of list");
  const expected = ["first", "second", ...lorem];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array at end of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.tail, expected[expected.length - 1], "updated tail correctly");
  assertValidList(list);
});

test("can insert at the start of the list", () => {
  const list = new List(["second-to-last", "last"]);
  assert.ok(list.insertArray(0, lorem), "inserted array at start of list");
  const expected = [...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array at start of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.head, expected[0], "updated head correctly");
  assertValidList(list);
});

test("can insert in the middle of the list", () => {
  const list = new List(["first", "second", "second-to-last", "last"]);
  assert.ok(list.insertArray(2, lorem), "inserted array in middle of list");
  const expected = ["first", "second", ...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array in middle of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assertValidList(list);
});

test("rejects index that is too large", () => {
  const list = new List(["first", "second", "second-to-last", "last"]);
  assert.not(
    list.insertArray(list.length + 1, lorem),
    "reject index larger than length with false"
  );
});

test.run();
