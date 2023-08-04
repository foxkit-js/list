import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can run callback on every element", () => {
  const list = new List(lorem);

  let sum = 0;
  list.forEach(value => {
    sum += value.length;
  });

  assert.is(
    sum,
    lorem.reduce((s, val) => s + val.length, 0)
  );
});

test.run();
