import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { assertValidList } from "./utils/assertValidList";
import { lorem } from "./utils/lorem";

test("Can sort list with no callback", () => {
  const list = List.fromArray(lorem);
  const output = list.sort();
  assert.equal(output.toArray(), [...lorem].sort());
  assertValidList(list);
});

test("Can sort list with callback", () => {
  const list = List.fromArray(lorem);
  const cb = (a: string, b: string) => a.length - b.length;
  const output = list.sort(cb);
  assert.equal(output.toArray(), [...lorem].sort(cb));
  assertValidList(list);
});

test.run();
