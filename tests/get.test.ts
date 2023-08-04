import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Gets undefined from empty list", () => {
  const list = new List();
  assert.is(list.get(0), undefined, "return undefined for empty list");
});

test("Gets undefined for numbers outside of List's range", () => {
  const list = new List(lorem);

  assert.is(list.get(-1), undefined, "reject negative number with undefined");

  assert.is(
    list.get(7),
    undefined,
    "reject number equal to length with undefined"
  );

  assert.is(
    list.get(8),
    undefined,
    "reject number greater than length with undefined"
  );
});

test("Gets correct value for valid index", () => {
  const list = new List(lorem);

  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], `get value from list for index ${i}`);
  }
});

test.run();
