import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can find index of value", () => {
  const list = new List(lorem);

  assert.is(list.indexOf("ipsum"), 1);
  assert.is(list.indexOf("foobarbazbonk"), -1);
});

test.run();
