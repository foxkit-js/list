import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src";
import { lorem } from "./utils/lorem";

test("Can check if every element matches condition", () => {
  const list = List.fromArray(lorem);

  assert.ok(list.every(value => typeof value == "string"));
  assert.not(list.every(value => value.length <= 5));
});

test.run();
