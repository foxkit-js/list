import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can sort list with no callback", () => {
  const list = new List(lorem);
  const output = list.sort();
  assert.equal(output.toArray(), [...lorem].sort());
});

test("Can sort list with callback", () => {
  const list = new List(lorem);
  const cb = (a: string, b: string) => a.length - b.length;
  const output = list.sort(cb);
  assert.equal(output.toArray(), [...lorem].sort(cb));
});

test.run();
