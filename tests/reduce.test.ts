import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can reduce List", () => {
  const list = List.fromArray(lorem);
  const reducer = (a: number, v: string) => a + v.length;
  assert.is(list.reduce(reducer, 0), lorem.reduce(reducer, 0));
});

test.run();
