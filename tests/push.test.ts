import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can push elements into List", () => {
  const list = new List();

  // push first element
  assert.is(list.push("lorem"), list, "return this");
  assert.is(list.head, "lorem", "updated head");
  assert.is(list.tail, "lorem", "updated tail");
  assert.is(list.length, 1, "updated length");

  // push more
  list.push("ipsum").push("dolor");
  assert.is(list.head, "lorem", "first element unchanged");
  assert.is(list.tail, "dolor", "updated tail");
  assert.is(list.length, 3, "updated length");
});

test.run();
