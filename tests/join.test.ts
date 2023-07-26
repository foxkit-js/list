import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can join empty list", () => {
  const list = new List();
  assert.is(list.join(","), "", "return empty string for empty list");
});

test("Can join list with one element", () => {
  const list = new List();
  list.push("first");
  assert.is(list.join(","), "first", "return only head with no trailing comma");
});

test("Can join list with multiple elements", () => {
  const list = List.fromArray(lorem);
  assert.is(list.join(), lorem.join(), "join list with default separator");
});

test("Can join list with multiple elements and custom separator", () => {
  const list = List.fromArray(lorem);
  assert.is(list.join("!"), lorem.join("!"), "join list with custom separator");
});

test.run();
