import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";

test("Can unshift elements into List", () => {
  const list = new List();

  // unshift first element
  assert.is(list.unshift("dolor"), list, "return this");
  assert.is(list.head, "dolor", "updated head");
  assert.is(list.tail, "dolor", "updated tail");
  assert.is(list.length, 1, "updated length");
  assertValidList(list);

  // unshift more
  list.unshift("ipsum").unshift("lorem");
  assert.is(list.head, "lorem", "updated head");
  assert.is(list.tail, "dolor", "tail unchanged");
  assert.is(list.length, 3, "updated length");
  assertValidList(list);
});

test.run();
