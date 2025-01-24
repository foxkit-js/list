import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem, loremList } from "./utils/lorem";

const elementsL = ["first", "second", "third"];
const elementsR = ["second-to-last", "last"];
const expected = elementsL.concat(elementsR);

test("can insert at the end of the list", () => {
  const list = new List(elementsL);
  list.insertMany(3, elementsR);
  assertValidList(list);

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
  const list = new List(elementsR);
  list.insertMany(0, elementsL);
  assertValidList(list);

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
  const list = new List(["first", "second", "second-to-last", "last"]);
  list.insertMany(2, loremList);
  const expected = ["first", "second", ...lorem, "second-to-last", "last"];
  assertValidList(list);

  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted in middle of list (index: ${i})`
    );
  }

  assert.is(list.length, expected.length, "updated length after insertion");
});

test("inserts at end of list if index too large", () => {
  const list = new List(elementsL);
  list.insertMany(list.length + 1, elementsR);
  assertValidList(list);

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

test("inserts at start of list if index too low", () => {
  const list = new List<string>(elementsR);
  list.insertMany(-7, elementsL);
  assertValidList(list);

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

test.run();
