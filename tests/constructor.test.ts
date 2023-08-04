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

test("Can create List from Set", () => {
  const set = new Set(lorem);
  const list = new List(set);
  assert.is(list.length, set.size, "equal size");
  assert.is(
    list.toArray().sort().toString(),
    Array.from(set).sort().toString(),
    "same contents"
  );
});

test("Can create List from Map values", () => {
  const map = new Map(lorem.map(([val, idx]) => [idx, val]));
  const list = new List(map.values());
  assert.is(list.length, map.size, "equal size");
  assert.is(
    list.toArray().sort().toString(),
    Array.from(map.values()).sort().toString()
  );
});

test.run();
