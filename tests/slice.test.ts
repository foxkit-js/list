import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can get slice of List with positive start, no end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(2).toArray(), lorem.slice(2));
});

test("Can get slice of List with positive start and end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(2, 6).toArray(), lorem.slice(2, 6));
});

test("Can get slice of List with positive start, negative end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(1, -4).toArray(), lorem.slice(1, -4));
});

test("Can get slice of List with negative start, no end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(-3).toArray(), lorem.slice(-3));
});

test("Can get slice of List with negative start, positive end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(-3, 5).toArray(), lorem.slice(-3, 5));
});

test("Can get slice of List with negative start, negative end", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(-5, -2).toArray(), lorem.slice(-5, -2));
});

test("Returns empty array for impossible slice", () => {
  const list = List.fromArray(lorem);
  assert.equal(list.slice(4, 2).toArray(), []);
});

test.run();
