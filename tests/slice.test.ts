import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can get slice of List with positive start, no end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(2).toArray(), lorem.slice(2));
  assertValidList(list);
});

test("Can get slice of List with positive start and end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(2, 6).toArray(), lorem.slice(2, 6));
  assertValidList(list);
});

test("Can get slice of List with positive start, negative end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(1, -4).toArray(), lorem.slice(1, -4));
  assertValidList(list);
});

test("Can get slice of List with negative start, no end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(-3).toArray(), lorem.slice(-3));
  assertValidList(list);
});

test("Can get slice of List with negative start, positive end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(-3, 5).toArray(), lorem.slice(-3, 5));
  assertValidList(list);
});

test("Can get slice of List with negative start, negative end", () => {
  const list = new List(lorem);
  assert.equal(list.slice(-5, -2).toArray(), lorem.slice(-5, -2));
  assertValidList(list);
});

test("Returns empty array for impossible slice", () => {
  const list = new List(lorem);
  assert.equal(list.slice(4, 2).toArray(), []);
  assertValidList(list);
});

test.run();
