import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";

test("Can set value by index", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // invalid index
  assert.not(list.set(-1, "foobar"), "reject negative number with false");
  assert.not(
    list.set(4, "foobar"),
    "reject number greater than length with false"
  );

  // set index 1 to foobar
  assert.ok(list.set(1, "foobar"), "don't reject good index");
  assert.is(list.get(1), "foobar", "set value");

  // set index equal to length (aka push)
  assert.ok(
    list.set(list.length, "barbaz"),
    "don't reject index equal to length"
  );
  assert.is(list.tail, "barbaz", "correctly pushed element");
  assert.is(list.length, 4, "correctly pushed element");
});

test.run();
