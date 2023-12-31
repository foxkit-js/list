import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can convert list to string", () => {
  const list = new List(lorem);
  assert.is(list.toString(), lorem.toString());
});

test.run();
