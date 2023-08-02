import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem, loremList } from "./utils/lorem";

test("rejects negative index", () => {
  const list = new List<string>();
  assert.not(
    list.insertList(-7, loremList),
    "reject negative index with false"
  );
});

test("can insert at the end of the list", () => {
  const list = new List<string>();
  list.push("first").push("second");
  assert.ok(list.insertList(2, loremList), "inserted list at the end");
  const expected = ["first", "second", ...lorem];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted list at the end (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.tail, expected[expected.length - 1], "updated tail correctly");
});

test("can insert at the start of the list", () => {
  const list = new List<string>();
  list.push("second-to-last").push("last");
  assert.ok(list.insertList(0, loremList), "inserted at start of list");
  const expected = [...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted at start of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.head, expected[0], "updated head correctly");
});

test("can insert in the middle of the list", () => {
  const list = new List<string>();
  list.push("first").push("second").push("second-to-last").push("last");
  assert.ok(list.insertList(2, loremList), "inserted in middle of list");
  const expected = ["first", "second", ...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted in middle of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
});

test("rejects index that is too large", () => {
  const list = new List<string>();
  list.push("first").push("second").push("second-to-last").push("last");
  assert.not(
    list.insertList(list.length + 1, loremList),
    "reject index larger than length with false"
  );
});

test.run();
