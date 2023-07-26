import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can get value by index", () => {
  const list = new List();

  // empty list
  assert.is(list.get(0), undefined, "return undefined for empty list");

  // fill list
  for (const item of lorem) list.push(item);

  // number out of range
  assert.is(list.get(-1), undefined, "reject negative number with undefined");
  assert.is(
    list.get(7),
    undefined,
    "reject number greater or equal to length with undefined"
  );
  assert.is(
    list.get(8),
    undefined,
    "reject number greater or equal to length with undefined"
  );

  // correct values
  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], `get value from list for index ${i}`);
  }
});

test.run();
