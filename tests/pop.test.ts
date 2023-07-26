import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can pop elements from List", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // pop once
  assert.is(list.pop(), "dolor", "popped tail");
  assert.is(list.tail, "ipsum", "updated tail");
  assert.is(list.length, 2, "updated length");

  // pop entire list
  list.pop();
  list.pop();
  assert.is(list.head, undefined, "cleared head");
  assert.is(list.tail, undefined, "cleared tail");
  assert.is(list.length, 0, "updated length");

  // empty list
  assert.is(list.pop(), undefined, "return undefined for empty list");
});

test.run();
