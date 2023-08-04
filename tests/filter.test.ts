import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can filter List", () => {
  const list = new List(lorem);
  const test = (value: string) => value.length < 5;
  const output = list.filter(test);
  assert.equal(output.toArray(), lorem.filter(test));
});

test.run();
