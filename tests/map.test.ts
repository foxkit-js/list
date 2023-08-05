import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can map List", () => {
  const list = new List(lorem);
  const cb = (value: string) => value.length;
  assert.equal(list.map(cb)?.toArray(), lorem.map(cb));
});

test.run();
