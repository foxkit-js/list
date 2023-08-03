import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can create List from Array", () => {
  const list = List.fromArray(lorem as string[]);

  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], "created list is equal to input array");
  }

  assertValidList(list);
});

test("Can create List from empty Array", () => {
  const list = List.fromArray([]);
  assert.is(list.length, 0);
  assertValidList(list);
});

test.run();
