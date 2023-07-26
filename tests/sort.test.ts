import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can sort list", () => {
  const list = List.fromArray(lorem);

  // with no callback
  let output = list.sort();
  assert.equal(output.toArray(), [...lorem].sort());

  // with callback
  const cb = (a: string, b: string) => a.length - b.length;
  output = list.sort(cb);
  assert.equal(output.toArray(), [...lorem].sort(cb));
});

test.run();
