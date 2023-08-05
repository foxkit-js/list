import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can check if any element matches condition", () => {
  const list = new List(lorem);

  assert.ok(list.some(value => value.endsWith("sum"))); // ipsum should match
  assert.not(list.some(value => value.length > 50));
});

test.run();
