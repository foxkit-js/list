import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";

test("Can handle invalid index", () => {
  const list = new List(["lorem", "ipsum", "dolor"]);

  assert.not(list.set(-1, "foobar"), "reject negative number with false");
  assert.not(
    list.set(4, "foobar"),
    "reject number greater than length with false"
  );
});

test("Can set value by index", () => {
  const list = new List(["lorem", "ipsum", "dolor"]);

  assert.ok(list.set(1, "foobar"), "don't reject good index");
  assert.is(list.get(1), "foobar", "set value");
  assert.is(list.toString(), "lorem,foobar,dolor");
  assertValidList(list);
});

test("Can push value given index equal to length", () => {
  const list = new List(["lorem", "ipsum", "dolor"]);

  assert.ok(
    list.set(list.length, "barbaz"),
    "don't reject index equal to length"
  );
  assert.is(list.tail, "barbaz", "correctly pushed element");
  assert.is(list.length, 4, "correctly pushed element");
  assertValidList(list);
});

test.run();
