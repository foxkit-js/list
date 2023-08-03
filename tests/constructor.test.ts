import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can create empty List", () => {
  const list = new List();
  assert.is(list.length, 0);
  assertValidList(list);
});

test("Can create List from Array", () => {
  const list = new List(lorem);

  for (let i = 0; i < lorem.length; i++) {
    assert.is(
      list.get(i),
      lorem[i],
      `created list is equal to input array (index: ${i})`
    );
  }

  assertValidList(list);
});

test("Can create List from empty Array", () => {
  const list = new List([]);
  assert.is(list.length, 0);
  assertValidList(list);
});

// TODO: test Set
// TODO: test Map.values()

test.run();
