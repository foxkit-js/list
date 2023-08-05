import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can check that value exists", () => {
  const list = new List(lorem);

  assert.ok(list.includes("ipsum"));
  assert.not(list.includes("foobarbazbonk"));
});

test.run();
