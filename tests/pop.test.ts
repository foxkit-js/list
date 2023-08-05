import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";

test("Can pop elements from List", () => {
  const list = new List(["lorem", "ipsum", "dolor"]);

  // pop once
  assert.is(list.pop(), "dolor", "popped tail");
  assert.is(list.tail, "ipsum", "updated tail");
  assert.is(list.length, 2, "updated length");
  assertValidList(list);

  // pop entire list
  list.pop();
  list.pop();
  assert.is(list.head, undefined, "cleared head");
  assert.is(list.tail, undefined, "cleared tail");
  assert.is(list.length, 0, "updated length");
  assertValidList(list);

  // empty list
  assert.is(list.pop(), undefined, "return undefined for empty list");
  assertValidList(list);
});

test.run();
