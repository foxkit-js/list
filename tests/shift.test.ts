import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can shift elements from List", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // shift once
  assert.is(list.shift(), "lorem", "shifted head");
  assert.is(list.head, "ipsum", "updated head");
  assert.is(list.length, 2, "updated length");

  // shift entire list
  list.shift();
  list.shift();
  assert.is(list.head, undefined, "cleared head");
  assert.is(list.tail, undefined, "cleared tail");
  assert.is(list.length, 0, "updated length");

  // empty list
  assert.is(list.shift(), undefined, "return undefined for empty list");
});

test.run();
