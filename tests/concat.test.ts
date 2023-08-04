import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can concat list and array", () => {
  const list = new List(["first"]);
  const expected = ["first", ...lorem];

  const output = list.concat(lorem);
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      output.get(i),
      expected[i],
      `inserted array at end of list (index: ${i})`
    );
  }
  assert.is(output.length, expected.length, "updated length after insertion");
  assertValidList(output);
});

test("Can concat two lists", () => {
  const list = new List(["first"]);
  const expected = ["first", ...lorem];

  const output = list.concat(new List(lorem));
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      output.get(i),
      expected[i],
      `inserted list at end of list (index: ${i})`
    );
  }
  assert.is(output.length, expected.length, "updated length after insertion");
  assertValidList(output);
});

test.run();
